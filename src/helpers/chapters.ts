import { getCollection, getEntry, getEntries, render } from 'astro:content';
const uniqueBy = (arr, key) => {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}

export async function getBookStructure() {
  const chapters = await getCollection('chapters');
  const chaptersWithSections = await Promise.all(chapters.map(async (chapter) => ({
      chapter: chapter.id,
      ...chapter.data,
      sections: (await getEntries(chapter.data.contains)).map((section) => ({
        section: section.id,
        ...section.data,
      })),
  })));

  const structure = await Promise.all(chaptersWithSections.map(async (chapter) => ({
    ...chapter,
    sections: await Promise.all(chapter.sections.map(async (section) => ({
      ...section,
      modules: (await getEntries(section.contains)).filter((module) => (module)).map((module) => ({
        module: module.slug,
        lookup: `${chapter.chapter}--${section.section}--${module.id}`,
        item: module,
      }))
    })))
  })))

  return structure
}

export function mapStructureToPages(structure) {
    const pagesIndex = structure.map(({
      chapter, title: chapterTitle, order: chapterOrder,
      sections
    }) => ([
      [{
        params: { chapter, },
        props: {
          chapterTitle, chapterOrder,
          sectionTitle: null, sectionOrder: 0,
          moduleTitle: 'Introduction', 
          grouping: null,
        },
      }],
      ...sections.toSorted((a, b) => (a.order - b.order))
        .map(({ title: sectionTitle, order: sectionOrder, section, modules }) => {
          if (modules.length) {
            return modules.toSorted((a, b) => (a.item.data.order - b.item.data.order))
              .map(({ module, lookup, item, }) => ({
                params: { chapter, section, module },
                props: {
                  chapterTitle, chapterOrder,
                  sectionTitle, sectionOrder,
                  moduleTitle: item.data.name, moduleOrder: item.data.order,
                  grouping: item.data['option-group'] || null,
                }
              }))
          } else {
            return [{
              params: { chapter, section },
              props: {
                chapterTitle, chapterOrder,
                sectionTitle, sectionOrder,
                grouping: null,
              }
            }]
          }
        }),
      [{
        params: { chapter, section: 'review', },
        props: {
          chapterTitle, chapterOrder,
          sectionTitle: null, sectionOrder: sections.length + 1,
          moduleTitle: 'Review',
          grouping: null,
        },
      }],
    ]))
    .reduce((result, current) => ([...result, ...current]), [])
    .reduce((result, current) => ([...result, ...current]), [])

  const optionGroups = Object.groupBy(pagesIndex, (index) => (index.props.grouping))

  const pageLookup = structure.map(({
      chapter, title: chapterTitle, order: chapterOrder,
      sections
    }) => ([
      [{
        params: { chapter, },
        props: {
          chapterTitle, chapterOrder, sectionTitle: null, moduleTitle: 'Introduction',
          structure, moduleOrder: 0,
        },
      }],
      ...sections.toSorted((a, b) => (a.order - b.order))
        .map(({ title: sectionTitle, order: sectionOrder, section, modules }) => (
          modules.toSorted((a, b) => (a.item.data.order - b.item.data.order))
            .map(({ module, lookup, item, }) => ({
              params: { chapter, section, module },
              props: {
                chapterTitle, chapterOrder,
                sectionTitle, sectionOrder,
                moduleTitle: item.data.name, moduleOrder: item.data.order, moduleEntry: item, moduleLookup: lookup,
                siblings: modules.length,
                structure,
                grouping: item.data['option-group'],
              }
            })))),
      [{
        params: { chapter, section: 'review', },
        props: {
          chapterTitle, chapterOrder, sectionTitle: null, moduleTitle: 'Review',
          structure, moduleOrder: null,
        },
      }],
    ]))
    .reduce((result, current) => ([...result, ...current]), [])
    .reduce((result, current) => ([...result, ...current]), [])
    .map((page, index, pages) => ({
      params: page.params,
      props: {
        ...page.props,
        prevPage: index > 0 && pages[index - 1] || null,
        nextPage: index < pages.length - 1 && pages[index + 1] || null,
        nextPageOptions: (page.params.module && optionGroups[page.params.module]) || [],
      }
    }))

  return pageLookup
}

export async function getAllPages() {
  const structure = await getBookStructure()
  return mapStructureToPages(structure)
}

export async function getAllSections() {
  const structure = await getBookStructure()

  const pageLookup = structure.map(({
      chapter, title: chapterTitle, order: chapterOrder,
      sections
    }) => ([
        {
            params: { chapter, },
            props: {
                chapterTitle, chapterOrder, sectionTitle: null, moduleTitle: 'Introduction', moduleOrder: 0,
            },
        },
        ...sections.map(({ title: sectionTitle, order: sectionOrder, section, modules }) => (
            {
                params: { chapter, section, },
                props: {
                    chapterTitle, chapterOrder,
                    sectionTitle, sectionOrder,
                    structure,
                    modules,
                },
            }
        )),
        {
            params: { chapter, section: 'review', },
            props: {
                chapterTitle, chapterOrder, sectionTitle: null, moduleTitle: 'Review', moduleOrder: null,
            },
        },
    ]))
    .reduce((result, current) => ([...result, ...current]), [])
    .map((page, index, pages) => ({
      params: page.params,
      props: {
        ...page.props,
        nextPage: pages[index + 1],
        prevPage: pages[index - 1],
      }
    }))
    .filter((page) => (page.props.sectionTitle))
    
  return pageLookup
}

export async function getChapterIntros() {
  const structure = await getBookStructure()

  const pageLookup = structure.map(({
      chapter, title: chapterTitle, order: chapterOrder,
      sections
    }) => (
        {
            params: { chapter, },
            props: {
                chapterTitle, chapterOrder,
                structure,
            }
        }
    ))
    .map((page, index, pages) => {
        let firstChapterModule

        if (structure[index].sections[0].modules.length) {
            firstChapterModule = structure[index].sections[0].modules[0].item
        }
        let base = {
            params: page.params,
            props: {
                ...page.props,
                nextPage: {
                    params: {
                        ...page.params,
                        section: structure[index].sections[0].section,
                        module: structure[index].sections[0].modules.length && structure[index].sections[0].modules[0].module || null,
                    },
                    props: {
                        chapterTitle: structure[index].title,
                        chapterOrder: structure[index].order,
                        sectionTitle: structure[index].sections[0].title,
                        moduleTitle: firstChapterModule?.data.name,
                        moduleOrder: 1,
                    }
                }
            }
        }

        if (index > 0) {
            base.props.prevPage = {
                params: {
                    chapter: structure[index-1].chapter,
                    section: 'review',
                },
                props: {
                    chapterTitle: structure[index-1].title,
                    chapterOrder: structure[index-1].order,
                    sectionTitle: null,
                    moduleTitle: 'Review',
                    moduleOrder: null,
                },
            }
        }

        return base
    })
    
  return pageLookup

}

export async function getChapterReviews() {
  const structure = await getBookStructure()

  const structureWithReviewContent = await Promise.all(structure.map(async (chapter) => {
    const renderedModules = await Promise.all(
      chapter.sections
        .map((section) => (
          section.modules
            .map((module) => (module.item))
        ))
        .reduce((result, current) => ([...result, ...current]), [])
        // .reduce((result, current) => ([...result, ...current]), [])
        .map(render)
      )
        const reviewItems = await Promise.all(renderedModules
            .map(async (mod) => ({
                section: chapter.sections.find((section) => (section.modules.map(({module}) => (module)).includes(mod.remarkPluginFrontmatter.slug))),
                module: {
                    name: mod.remarkPluginFrontmatter.name,
                    order: mod.remarkPluginFrontmatter.order,
                    slug: mod.remarkPluginFrontmatter.slug,
                    minutesRead: mod.remarkPluginFrontmatter.minutesRead,
                },
                review: {
                    videos: mod.remarkPluginFrontmatter.videos,
                    checklists: mod.remarkPluginFrontmatter.checklists,
                    terms: await Promise.all(mod.remarkPluginFrontmatter.terms.map(async (term) => ({...term, lookup: await getEntry('terms', `t--${term.slug}`)}))),
                    calculators: mod.remarkPluginFrontmatter.calculators,
                    decisions: mod.remarkPluginFrontmatter.decisions,
                    resources: mod.remarkPluginFrontmatter.resources,
                },
            })))

        // const chapterVideoPlaylist = renderedModules
        //     .map((mod) => (mod.remarkPluginFrontmatter))
        //     .map((data) => (data.videos.map((video) => ({ video,
        //         module: {
        //             name: data.name,
        //             order: data.order,
        //             slug: data.slug,
        //         },
        //         section: chapter.sections.find((section) => (section.modules.map(({module}) => (module)).includes(data.slug)))
        //     }))))
        //     .reduce((acc, curr) => ([...acc, ...curr]), [])

    return {
      ...chapter,
      reviewItems,
      // chapterVideoPlaylist,
    }
  }))

  const pageLookup = structureWithReviewContent.map(({
      chapter, title: chapterTitle, order: chapterOrder,
      sections,
      reviewItems,
      // chapterVideoPlaylist,
    }) => (
      {
        params: { chapter, section: 'review'},
        props: {
            chapterTitle,
            structure,
            reviewItems: {
              videos: reviewItems.map((item) => (item.review.videos)).reduce((acc, curr) => ([...acc, ...curr]), []),
              checklists: reviewItems.map((item) => (item.review.checklists)).reduce((acc, curr) => ([...acc, ...curr]), []),
              terms: uniqueBy(
                reviewItems.map((item) => (item.review.terms)).reduce((acc, curr) => ([...acc, ...curr]), []).filter((item) => (item.lookup)),
                'slug',
              ), 
              calculators: reviewItems.map((item) => (item.review.calculators)).reduce((acc, curr) => ([...acc, ...curr]), []),
              decisions: reviewItems.map((item) => (item.review.decisions)).reduce((acc, curr) => ([...acc, ...curr]), []),
              resources: reviewItems.map((item) => (item.review.resources)).reduce((acc, curr) => ([...acc, ...curr]), []),
            },
            // chapterVideoPlaylist,
            sections,
            // terms: reviewItems.map((item) => (item.review.terms)).reduce((acc, curr) => ([...acc, ...curr]), []),
        }
      }
    ))
    .map((page, index, pages) => {
        let lastChapterModule

        const modules = structure[index].sections.map(({ modules }) => (modules)).reduce((acc, curr) => ([...acc, ...curr]), [])

        if (structure[index].sections[structure[index].sections.length - 1].modules.length) {
            lastChapterModule = modules[modules.length -1]
        }

        let base = {
            params: page.params,
            props: {
                ...page.props,
                prevPage: {
                    params: {
                        ...page.params,
                        section: structure[index].sections[structure[index].sections.length - 1].section,
                        module: structure[index].sections[structure[index].sections.length - 1].modules.length && structure[index].sections[structure[index].sections.length - 1].modules[structure[index].sections[structure[index].sections.length - 1].modules.length-1].module || null,
                    },
                    props: {
                        chapterTitle: structure[index].title,
                        chapterOrder: structure[index].order,
                        sectionTitle: structure[index].sections[structure[index].sections.length - 1].title,
                        moduleTitle: lastChapterModule?.item.data.name,

                    }
                }
            }
        }

        if (index < pages.length - 2) {
            base.props.nextPage = {
                params: {
                    chapter: structure[index+1].chapter,
                },
                props: {
                    chapterTitle: structure[index+1].title,
                    chapterOrder: structure[index+1].order,
                    moduleTitle: 'Introduction',
                },
            }
        }

        return base
    })
  console.log(pageLookup)
    
  return pageLookup
}
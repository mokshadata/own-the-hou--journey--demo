import { visit } from "unist-util-visit";

const uniqueBy = (arr, key) => {
  return [...new Map(arr.map(item => [item[key], item])).values()];
};

export function nodeAttrsToObj(node) {
  return {
    ...Object.fromEntries(
      Object.entries(
        Object.groupBy(node.attributes, (attr) => (attr.name))
      )
      .map(([attr, list]) => ([attr, list[0]]))
      .map(([attr, item]) => ([attr, item.value]))
    ),
    nodeName: node.name,
    // node: node,
  }
}

export function getNestedText(node) {

  if (!node.children) {
    return node.value
  }

  for (let index = 0; index < node.children.length; index++) {
    const element = node.children[index];
      return `${getNestedText(element)} `
  }
}

export function remarkTestArgs() {
  return function (tree, { data }) {

    data.astro.frontmatter.videos = []
    data.astro.frontmatter.checklists = []
    data.astro.frontmatter.terms = []
    data.astro.frontmatter.calculators = []
    data.astro.frontmatter.decisions = []
    data.astro.frontmatter.resources = []

    // const images = tree.children.filter((child) => (child.type === 'mdxjsEsm'))
    //   .map((item) => (item.data.estree.body))
    //   .reduce((res, curr) => ([...res, ...curr]), [])
    //   .filter((item) => (item.specifiers.map((spec) => (spec.local.name)).includes('VideoScreenshot')))
    
    // const imagesLookup = Object.fromEntries(
    //   Object.entries(
    //     Object.groupBy(
    //       images, (image) => (image.specifiers.map((spec)=>(spec.local.name)).join(''))
    //     )
    //   ).map(([varName, list]) => ([varName, list[0]]))
    // )

    visit(tree, function (node) {

      if (!node.name) {
        return
      }

      if (node.name === 'YoutubePlayer') {
        data.astro.frontmatter.videos.push(nodeAttrsToObj(node))
      }

      if (node.name === 'iframe') {
        data.astro.frontmatter.checklists.push(nodeAttrsToObj(node))
      }

      if (node.name === 'BookDecisions') {
        data.astro.frontmatter.decisions.push(nodeAttrsToObj(node))
      }

      if (node.name === 'Term') {
        data.astro.frontmatter.terms.push({
          ...nodeAttrsToObj(node),
          text: getNestedText(node).trim(),
          node,
        })
      }

      if (node.name === 'a') {
        data.astro.frontmatter.resources.push({
          ...nodeAttrsToObj(node),
          text: getNestedText(node).trim(),
          node,
        })
      }

      if (node.name.includes('Estimator')) {
        data.astro.frontmatter.calculators.push(nodeAttrsToObj(node))
      }

    })

    data.astro.frontmatter.terms = uniqueBy(data.astro.frontmatter.terms, 'slug')

  };
}
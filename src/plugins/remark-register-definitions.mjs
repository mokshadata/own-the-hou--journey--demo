import { visit } from "unist-util-visit";

export function remarkTestArgs() {
  return function (tree, { data }) {
    data.astro.frontmatter.videos = []

    const images = tree.children.filter((child) => (child.type === 'mdxjsEsm'))
      .map((item) => (item.data.estree.body))
      .reduce((res, curr) => ([...res, ...curr]), [])
      .filter((item) => (item.specifiers.map((spec) => (spec.local.name)).includes('VideoScreenshot')))
    
    const imagesLookup = Object.fromEntries(
      Object.entries(
        Object.groupBy(
          images, (image) => (image.specifiers.map((spec)=>(spec.local.name)).join(''))
        )
      ).map(([varName, list]) => ([varName, list[0]]))
    )

    visit(tree, function (node) {
      if (node.name === 'VideoPlaceholder') {
        const imageAttributes = Object.fromEntries(
          Object.entries(
            Object.groupBy(node.attributes, (attr) => (attr.name))
          )
          .map(([attr, list]) => ([attr, list[0]]))
          .map(([attr, item]) => ([attr,
            (attr === 'src' &&
            {
              ...item,
              value: imagesLookup[item.value.value].source.value,
            }) ||
            item
          ]))
          .map(([attr, item]) => ([attr, item.value]))
        )

        data.astro.frontmatter.videos.push(imageAttributes)
      }
    })

  };
}
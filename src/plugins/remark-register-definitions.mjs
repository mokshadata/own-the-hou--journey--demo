import { visit } from "unist-util-visit";

export function remarkTestArgs() {
  return function (tree, file) {
    // visit(tree, function (node) {
    //   // console.log(node)
    //   if (node.name === 'VideoPlaceholder') {
    //     console.log(node.attributes)
    //     // console.log(node.attributes[0].value.data.estree.body[0].expression)
    //     // console.log(node.attributes[0].value.data.estree.body[0].expression)
    //   }
    // })
    // console.log(file.data.astro)
    // console.log(tree)
    // console.log('tree depth', tree.children[5].children[0].children[0].children[0].children)
    // console.log('tree dept def', tree.children[5].children[0].children[0].children[1])
  };
}
export default function  createElement (vnode) {
  const { text, children, data } = vnode
  const domNode = document.createElement(vnode.sel)

  if (text !== undefined) {
    domNode.appendChild(document.createTextNode(text))
  }

  if (children !== undefined && Array.isArray(children) && children.length > 0) {
    let childNode
    for (let i = 0; i < children.length; ++i) {
      childNode = createElement(children[i])
      domNode.appendChild(childNode)
    }
  }

  if (data !== null && data !== undefined) {
    for (let key in data) {
      if (key !== 'key') domNode.setAttribute(key, data[key])
    }
  }

  vnode.elm = domNode
  return domNode
}
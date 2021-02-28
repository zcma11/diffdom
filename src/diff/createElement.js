export default function  createElement (vnode) {
  const { text, children, data } = vnode
  const attrs = data && data.attrs
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

  if (attrs !== null && attrs !== undefined) {
    for (let key in attrs) {
      domNode.setAttribute(key, attrs[key])
    }
  }

  vnode.elm = domNode
  return domNode
}
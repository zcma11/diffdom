import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'

export default function patch (oldVnode, newVnode) {
  if (oldVnode.sel === undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), undefined, undefined, undefined, oldVnode)
  }
  
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    // 同一个节点
    if (oldVnode === newVnode) return // 地址值相同 同一个对象

    patchVnode(oldVnode,newVnode)
  } else {
    // 不同节点
    console.log('不同节点')
    let pivol = oldVnode.elm
    const domNode = createElement(newVnode)
    pivol.parentNode.insertBefore(domNode, pivol)
    pivol.parentNode.removeChild(pivol)
  }
}
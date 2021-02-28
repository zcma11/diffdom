import createElement from './createElement'
import updateChildren from './updateChildren'
// 节点相同时的处理
export default function patchVnode (oldVnode, newVnode) {
  if (oldVnode === newVnode) return
  const elm = newVnode.elm = oldVnode.elm
  const oldCh = oldVnode.children
  const newCh = newVnode.children

  if (newVnode.text && oldVnode.text !== newVnode.text) {
    // 新节点有文本的时候 而且新旧节点的文本不同 不管旧节点有没有文本都创造
    // domNode = createElement(newVnode)
    console.log('新节点文本覆盖')
    elm.innerText = newVnode.text
  } else if (newCh && newCh.length > 0) {
    // 新节点有孩子的时候
    console.log('新节点有孩子的时候')
    if (oldCh && oldCh.length > 0) {
      // 比较孩子
      console.log('比较孩子')
      updateChildren(elm, oldCh, newCh)
    } else {
      // 只有新节点有孩子 追加
      console.log('只有新节点有孩子 追加')
      elm.innerText = ''
      for (let i = 0; i < newCh.length; ++i) {
        const childDom = createElement(newCh[i])
        elm.appendChild(childDom)
      }
    }
  }

  const newAttrs = (newVnode.data && newVnode.data.attrs) || {}
  const oldAttrs = (oldVnode.data && oldVnode.data.attrs) || {} // 最后只剩下旧对象 遍历删除
  const newAttrsArr = Object.keys(newAttrs)
  const oldAttrsArr = Object.keys(oldAttrs)

  if (newAttrsArr.length > 0) {
    console.log('加载data')
    if (oldAttrsArr.length === 0) {
      // 没属性 直接加上
      newAttrsArr.forEach(attr => elm.setAttribute(attr, newAttrs[attr]))
    } else {
      // 有data 比较data
      // 新对象的属性值和旧对象属性值一样 保留

      for (let i = 0; i < newAttrsArr.length; i++) {
        for (let k = 0; k < oldAttrsArr.length; k++) {
          if (newAttrsArr[i] === oldAttrsArr[k]) {
            // 如果有同一个属性 再进行值比较
            if (newAttrs[newAttrsArr[i]] !== oldAttrs[oldAttrsArr[k]]) {
              // 新对象的属性值和旧对象不一样 覆盖旧对象
              elm.setAttribute(newAttrsArr[i], newAttrs[newAttrsArr[i]])
              // oldVnode.data[oldAttrs[k]] = newVnode.data[newAttrs[i]]
              oldAttrsArr.splice(k, 1)
              break
            }
          } else if (k === oldAttrsArr.length - 1) {
            // 新对象有旧对象没有的属性  使用新对象
            elm.setAttribute(newAttrsArr[i], newAttrs[newAttrsArr[i]])
          }
        }
      }
      // 新对象没有旧对象的属性 删除旧对象
      oldAttrsArr.forEach(attr => elm.removeAttribute(attr))
    }
  }
}

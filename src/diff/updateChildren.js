import createElement from './createElement'
import patchVnode from './patchVnode'
export default function updateChildren (parentNode, oldch, newch) {
  console.log('比较孩子的方法执行了')
  let oldStartIdx = 0
  let oldEndIdx = oldch.length - 1
  let newStartIdx = 0
  let newEndIdx = newch.length - 1

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldch[oldStartIdx] === undefined) {
      ++oldStartIdx
    } else if (oldch[oldEndIdx] === undefined) {
      --oldEndIdx
    } else if (compare(oldch[oldStartIdx], newch[newStartIdx])) {
      // 新前旧前
      patchVnode(oldch[oldStartIdx], newch[newStartIdx])
      ++newStartIdx
      ++oldStartIdx
    } else if (compare(oldch[oldEndIdx], newch[newEndIdx])) {
      // 新后旧后
      patchVnode(oldch[oldEndIdx], newch[newEndIdx])
      --newEndIdx
      --oldEndIdx
    } else if (compare(oldch[oldStartIdx], newch[newEndIdx])) {
      // 新后旧前
      patchVnode(oldch[oldStartIdx], newch[newEndIdx])
      const pivol = oldch[oldEndIdx].elm.nextSibling
      parentNode.insertBefore(oldch[oldStartIdx].elm, pivol)
      ++oldStartIdx
      --newEndIdx
    } else if (compare(oldch[oldEndIdx], newch[newStartIdx])) {
      // 新前旧后
      patchVnode(oldch[oldEndIdx], newch[newStartIdx])
      const pivol = oldch[oldStartIdx].elm
      parentNode.insertBefore(oldch[oldEndIdx].elm, pivol)
      --oldEndIdx
      ++newStartIdx
    } else {
      const pivol = oldch[oldStartIdx] ? oldch[oldStartIdx].elm : null
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        if (compare(oldch[i], newch[newStartIdx])) {
          // 逐个对比找到了 移动到前面
          patchVnode(oldch[i], newch[newStartIdx])
          parentNode.insertBefore(oldch[i].elm, pivol)
          oldch[i] = undefined
          break
        }

        if (i === oldEndIdx) {
          // 逐个对比没有找到 创建新的插入到前面
          const dom = createElement(newch[newStartIdx])
          parentNode.insertBefore(dom, pivol)
        }
      }
      ++newStartIdx
    }
  }
  
  if (oldStartIdx > oldEndIdx) {
    // 旧的先结束 新节点比旧节点数量多
    for (let i = newStartIdx; i <= newEndIdx; ++i) {
      // 要不要保存在新节点中
      const pivol = newch[newEndIdx+1] ? newch[newEndIdx+1].elm : null
      // const pivol = oldch[oldStartIdx] ? oldch[oldStartIdx].elm : oldch[oldEndIdx].elm.nextSibling
      // const pivol = oldch[oldStartIdx].elm
      parentNode.insertBefore(createElement(newch[i]), pivol)
    }
  } else if (newStartIdx > newEndIdx) {
    // 新的先结束 旧节点比新节点多
    for (let i = oldStartIdx; i <= oldEndIdx; ++i) {
      oldch[i] && parentNode.removeChild(oldch[i].elm)
    }
  }
}

function compare (p1, p2) {
  if (!p1) return false
  return p1.sel === p2.sel && p1.key === p2.key
}

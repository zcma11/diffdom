import vnode from './vnode'
// h('elm', {}, [h()])
export default function (a, b, c) {
  let sel, data, children, text, elm, key

  if (c !== undefined) {
    if (b !== null) {
      data = b
    }
    
    if (Array.isArray(c)) {
      children = c
    } else if (typeof c === 'string') {
      text = c
    } else if (c.sel) {
      children = [c]
    }

  } else if (b !== undefined && b !== null) {
    if (typeof b === 'string') {
      text = b
    } else if (Array.isArray(b)) {
      children = b
    } else if (b.sel) {
      children = [b]
    } else {
      data = b
    }
  }

  sel = a
  return vnode(sel, data, children, text, elm, key)
}

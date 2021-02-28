export default function parseAttrs (attrsStr) {
  let begin = 0
  let flag = false
  const attrs = []
  attrsStr = attrsStr.trim()
  
  for (let i = 0; i < attrsStr.length; i++) {
    let one = attrsStr[i]

    if (one === '=') {
      attrs.push({name: attrsStr.substring(begin, i).trim()})
      begin = i
    } else if (one === '"' || one === `'`) {
      if (!flag) {
        flag = true
        begin = i + 1
      } else {
        attrs[attrs.length-1].value = attrsStr.substring(begin, i)
        begin = i + 1
        flag = false
      }
    }
  }
  
  return attrs
}

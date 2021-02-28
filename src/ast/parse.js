import parseAttrs from "./parseAttrs"

export default function parse(template) {
  const collections = []
  const temp = []
  const log = []
  let index = 0
  let Selector = collections
  let rest = ''
  const startRegExp = /^\<([a-z]+[1-6]?)(.*?)\>/
  const endRegExp = /^\<\/([a-z]+[1-6]?)\>/
  const wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/
  const wordNotInTag = /^([^\<]+)\<[a-z]+[1-6]?.*?\>/

  while (index < template.length - 1) {
    rest = template.substring(index)
    
    if (startRegExp.test(rest)) {
      const tagName = rest.match(startRegExp)[1]
      const attrsStr = rest.match(startRegExp)[2]
      // 处理属性
      const tag = { tag: tagName, type: 1, attrs: parseAttrs(attrsStr)}

      !Array.isArray(Selector) && (Selector = Selector.children = [])
      log.push(tagName)
      Selector.push(tag)
      Selector = tag
      temp.push(Selector)
      index += tagName.length + attrsStr.length + 2
    } else if (endRegExp.test(rest)) {
      const endtag = rest.match(endRegExp)[1]

      if (endtag !== log.pop()) {
        throw new Error('结束标签' + endtag +'不匹配')
      }

      temp.pop()
      Selector = temp.length > 0 ? temp[temp.length - 1].children : collections
      index += endtag.length + 3
    } else if (wordRegExp.test(rest)) {
      const word = rest.match(wordRegExp)[1]
      index += handleTextNode(word, Selector)
    }
    else if (wordNotInTag.test(rest)) {
      const text = rest.match(wordNotInTag)[1]
      index += handleTextNode(text, Selector)
    }
  }

  function handleTextNode(text) {
    if (text.trim() !== '') {
      Selector = Selector.children = []
      Selector.push({ 'text': text.trim(), type: 3 })
    }
    return text.length
  }

  return collections[0]
}


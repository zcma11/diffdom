import h from './h'
import patch from './patch'

// const newVnode = h('div', 'hello')
// const newVnode = h('ul', [
//   h('li', h('span', '第一个li')),
//   h('li', h('span', '第二个li')),
//   h('li', h('span', '第三个li')),
//   h('li', h('span', '第四个li'))
// ])
// const newVnode = h('ul', [
//   h('li', { key: 1}, 'A'),
//   h('li', { key: 2}, 'B'),
//   h('li', { key: 3}, 'C'),
//   h('li', { key: 4}, 'D'),
//   h('li', { key: 5}, 'E'),
//   // h('li', { key: 6}, 'F'),
// ])
const newVnode = h('ul', [
  // h('li', { key: 6}, 'F'),
  h('li', { key: 5}, 'E'),
  h('li', { key: 4, class: 'pink' }, 'D'),
  h('li', { key: 3}, 'C'),
  h('li', { key: 2}, 'B'),
  h('li', { key: 1, class: 'chocolate', name: 'abc', id: 'okk'}, 'A'),
])

const app = document.getElementById('app')
const btn = document.getElementById('btn')
console.log(app)
patch(app, newVnode)

// const newVnode1 = h('ul', [
//   h('li', { key: 6}, 'G'),
//   h('li', { key: 5}, 'E'),
//   h('li', { key: 4}, 'D'),
//   h('li', { key: 3}, 'C'),
//   h('li', { key: 2}, 'B'),
//   h('li', { key: 1}, 'A'),
//   h('li', { key: 7}, 'F'),
// ])
// const newVnode1 = h('ul', [
//   h('li', { key: 6}, 'G'),
//   // h('li', { key: 5}, 'E'),
//   // h('li', { key: 4}, 'D'),
//   h('li', { key: 2}, 'B'),
//   h('li', { key: 3}, 'C'),
//   // h('li', { key: 1}, 'A'),
//   h('li', { key: 7}, 'F'),
// ])
const newVnode1 = h('ul', [
  h('li', { key: 6}, 'F'),
  h('li', { key: 7}, 'G'),
  h('li', { key: 5}, 'E'),
  h('li', { key: 4, id: 'abc'}, 'D'),
  h('li', { key: 3}, 'C'),
  h('li', { key: 2}, 'B'),
  h('li', { key: 1, class: 'red' }, 'A'),
])
btn.onclick = function () {
  patch(newVnode, newVnode1)
}
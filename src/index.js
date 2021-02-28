import h from './diff/h'
import patch from './diff/patch'
import parse from './ast/parse'

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
  h('li', { key: 4, attrs: { class: 'pink' } }, 'D'),
  h('li', { key: 3}, 'C'),
  h('li', { key: 2}, 'B'),
  h('li', { key: 1, attrs: { class: 'chocolate', name: 'abc', id: 'okk' } }, 'A'),
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
  h('li', { key: 4, attrs: { id: 'abc' } }, 'D'),
  h('li', { key: 3}, 'C'),
  h('li', { key: 2}, 'B'),
  h('li', { key: 1, attrs: { class: 'red' } }, 'A'),
])
btn.onclick = function () {
  patch(newVnode, newVnode1)
}


/* ------------------------- */

const template = `
  <div>
    我就在外面
    <h3 class="app">hello</h3>
    <ul class="swiper pink clearfix" id="ul-warper">
      <li>
      A
      </li>
      <li>B</li>
      <li>C</li>
    </ul>
    <div>
      <div class="strong">huaq</div>
      <div>
        <p>怎么回事啊</p>
      </div>
  </div>
`

const tree = parse(template)
console.log(tree)
// react-dom.js(手写reactDom原理)
import { createUnit } from './Unit'
import $ from "jquery"

let ReactDOM = {
    render,
    rootIndex: 0
}

function render(element, container) {
    // container.innerHTML = `<span>${element}</span>`
    // 添加了一个标记data-reactid
    // container.innerHTML = `<span data-reactid=${ReactDOM.rootIndex}>${element}</span>`

    let unit = createUnit(element)
    let markUp = unit.getMarkUp(); // 用来返回HTML标记
    $(container).html(markUp)
}

export default ReactDOM
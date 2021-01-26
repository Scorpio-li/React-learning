// // Unit.js
// class Unit{
//     constructor(element){
//         this._currentElement = element
//     }
//     getMarkUp(){
//         throw Error("此方法应该被重写，不能直接被使用")
//     }
// }

// class TextUnit extends Unit{
//     getMarkUp(reactid){
//         this._reactid = reactid
//         return `<span data-reactid=${reactid}>${this._currentElement}</span>`
//     }
// }

// // createUnit判断element是字符串时就 new 一个TextUnit的对象，然后返回出去，这个也就是我们上面讲到的unit对象了。
// function createUnit(element){
//     if(typeof element === 'string' || typeof element === "number"){
//         return new TextUnit(element)
//     }
// }

// export {
//     createUnit
// }

// // Unit.js
// class Unit {
//     constructor(element) {
//         this._currentElement = element
//     }
//     getMarkUp() {
//         throw Error("此方法应该被重写，不能直接被使用")
//     }
// }
// class TextUnit extends Unit {
//     getMarkUp(reactid) {
//         this._reactid = reactid
//         return `<span data-reactid=${reactid}>${this._currentElement}</span>`
//     }
// }

// function createUnit(element) {
//     if (typeof element === 'string' || typeof element === "number") {
//         return new TextUnit(element)
//     }
// }

// export {
//     createUnit
// }

// Unit.js
import { Element } from "./element" // 新增代码
class Unit {
    constructor(element) {
        this._currentElement = element
    }
    getMarkUp() {
        throw Error("此方法应该被重写，不能直接被使用")
    }
}
class TextUnit extends Unit {
    getMarkUp(reactid) {
        this._reactid = reactid
        return `<span data-reactid=${reactid}>${this._currentElement}</span>`
    }
}

function createUnit(element) {
    if (typeof element === 'string' || typeof element === "number") {
        return new TextUnit(element)
    }
    // 新增代码
    if (element instanceof Element && typeof element.type === "string") {
        return new NativeUnit(element)
    }
}
class NativeUnit extends Unit {
    getMarkUp(reactid) {
        this._reactid = reactid
        let { type, props } = this._currentElement;
        let tagStart = `<${type} data-reactid="${this._reactid}"`
        let childString = ''
        let tagEnd = `</${type}>`
        for (let propName in props) {
            if (/^on[A-Z]/.test(propName)) { // 添加绑定事件
                //    ...
            } else if (propName === 'style') { // 如果是一个样式对象
                //    ...
            } else if (propName === 'className') { // 如果是一个类名
                //    ...
            } else if (propName === 'children') { // 如果是子元素
                // ...
            } else { // 其他 自定义的属性 例如 reactid
                tagStart += (` ${propName}=${props[propName]} `)
            }
        }
        return tagStart + '>' + childString + tagEnd
    }
}

export {
    createUnit
}
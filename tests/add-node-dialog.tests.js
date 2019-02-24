import View from '../views/add-node-dialog'
import { createView } from 'domvm/dist/dev/domvm.dev.es'
import { path } from 'ramda'
import stores from '../store'

function initView(visible = false, hidden = true) {
    const view = createView(View, { visible, hidden }, 'key')
    view.mount(document.body)
}

describe('Dialog state tests', () => { 
    
    function click(vnode) {
        path([ '_node', 'attrs', 'onclick', 'button' ])(vnode)()
    }
    
    afterEach(() => document.body.innerHTML = '')
    
    test('Dialog visibility is persisted', () => {
        initView(false)
        stores.views.addNode.toggle()
        const state = stores.views.addNode()
        expect(state.visible).toBeTruthy()
    })
    
    test('Clicking the "cancel" button hides the dialog', () => {
        initView(true)
        const footer = document.getElementsByName('modal-footer')[0]
        click(footer)
        const state = stores.views.addNode()
        expect(state.visible).toBeFalsy()
    })

})

describe('Form tests', () => {
    
    function type(vnode, text) {
        const input = path([ '_node', 'attrs', 'oninput', 'input' ])(vnode)
        input(text)
    }

    test('"Submit" button visibility is bound to form validity', () => {
        const expected = 'some-input'
        initView()
        const textbox = document.getElementById('node-textbox')
            
        type(textbox, expected)

        const submit = document.getElementsByName('add-node-submit')[0]
        const isHidden = path([ '_node', 'attrs', 'hidden' ])(submit)

        expect(isHidden).toBeFalsy()
    })
})


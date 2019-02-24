import { merge } from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'
import store, { dispatch } from '../store'
import textbox from '../templates/basic/textbox'
import { targetValue } from '../utils/dom'
import stream from '../utils/stream'
import warning from '../utils/warning'
import h from '../vdom'

const { active } = store.model
const { form, dialog, div, button } = h

const attrs = { 
    id: 'node-textbox',
    _key: 'node-textbox',
    required: true,
    placeholder: 'node'
}

function View(vm) {

    vm.stateChanged(state => state, 'views', 'addNode')

    const inputStream = stream(null, true, 
        s => s.map(targetValue).map(isNilOrEmpty), 
        val => dispatch([ 'views', 'addNode' ], 'hideSubmit', val))

    function onSubmit() {
        if (isNilOrEmpty(active())) void warning('no active node')
        else {
            const val = targetValue(inputStream())
            // TODO: key gen
            const newNode = { data: { id: val }, label: val }
            dispatch([ 'model', 'nodes' ], 'append', newNode)
        }
        return false
    }
    
    return function render(_, { visible, submitHidden }) {
        const node = textbox('name', merge(attrs, { oninput: { 'input': inputStream } }))
  
        return dialog({ 'open': visible }, [
            div({ name: 'modal' }, [ 
                form({ 'method': 'dialog', onsubmit: { 'form': onSubmit } }, [ 
                    div({ name: 'modal-body' }, [ node ]), 
                    div({ name: 'modal-footer', onclick: { 'button': () => dispatch([ 'views', 'addNode' ], 'toggle') } }, [
                        button({ 'type': 'button', 'name': 'add-node-cancel' }, 'cancel'), 
                        button({ 'type': 'submit', 'name': 'add-node-submit', hidden: submitHidden }, 'ok')
                    ])
                ]) 
            ])
        ])
    }
}

export default View
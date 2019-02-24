// import { objOf, not } from 'ramda'
import h from '../../vdom'

const { dialog, button, div } = h

function Template (form, { key, open }, onToggle) {

    function toggle() {
        onToggle(key)
    }

    function body(form) {    
        return div([ form ])
        // valid => submit.patch(objOf('hidden', not(valid)))
    }
    
    function footer() { 
        return div([
            button({ 'type': 'button', onclick: toggle }, 'cancel'), 
            submit
        ])
    }
    
    const submit = button({ 'type': 'submit', 'hidden': true, form: key, onclick: toggle }, 'ok')
    const dialogElement = dialog({ open }, 
        [ 
            body(form), 
            footer() 
        ])
    
    return dialogElement
}

export default Template

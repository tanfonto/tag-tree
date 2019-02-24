import { defineView } from 'domvm/dist/dev/domvm.dev.es'
import h from '../vdom'
import AddNodeDialogView from '../views/add-node-dialog'
import { dispatch } from '../store'

const { div, button } = h

function Template() {

    return div({ class: 'tv-toolbar' },
        [
            button({ onclick: () => dispatch([ 'views', 'addNode' ], 'toggle') }, 'add'),
            div([
                defineView(AddNodeDialogView, { visible: false, submitHidden: true }, 'add-node-form')
            ])
        ])
}

export default Template

import { path } from 'ramda'
import Hover from 'hover'
import { merge } from 'ramda'

const active = new Hover({
    set: (state, node) => node
}, null)

const nodes = new Hover({
    append: (state, node) => [ node, ...state ]
}, [])

const addNode = new Hover({
    toggle: state => merge(state, { visible: !state.visible }),
    hideSubmit: (state, value) => merge(state, { submitHidden: value })
}, { visible: false, submitHidden: true })

const views = Hover.compose({ addNode })
const model = Hover.compose({ active, nodes })
const composed = Hover.compose({ model, views })

export function dispatch(storePath, action, value) {
    path(storePath)(composed)[action](value)    
}

export default composed

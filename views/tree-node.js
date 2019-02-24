import { clone } from 'ramda'
import { isNonEmptyArray, compact } from 'ramda-adjunct'
import h from '../vdom'
import { map } from 'ramda'
import { defineView } from 'domvm/dist/dev/domvm.dev.es'

const { ul, li, span, summary, details } = h

function buildSpan ({ data, label }) {
    return span({ tabindex: 0, id: data.id }, label)
}

export function buildNode(itemData) {
    const node = isNonEmptyArray(itemData.children) ? defineView(View, clone(itemData)) : buildSpan(itemData)
    return li([ node ])
}

function buildItems(data) {    
    return isNonEmptyArray(data) ? ul(map(buildNode, data)) : []
}

function template({ label, data, children }) {
    const { id } = data
    return details({ open: true, id }, compact(
        [ 
            summary(label), 
            buildItems(children)
        ]))
}

export default function View() {
    return function render(vm, data) {
        if (data) return template(data)
    }
}
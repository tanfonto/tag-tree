import { defineView } from 'domvm/dist/dev/domvm.dev.es'
import { dispatch } from '../store'
import Toolbar from '../templates/toolbar'
import { fpath, swap } from '../utils/funcy'
import h from '../vdom'
import TreeNodeView, { buildNode } from './tree-node'
import store from '../store'
import { defaultTo, head, pipe } from 'ramda'
import { ensureArray } from 'ramda-adjunct'

const { active } = store.model
const { div } = h

function getPath(node, acc = []) {
    if (node.key) return getPath(node.parent, [ node.key, ...acc ])
    else return node.parent ? getPath(node.parent, acc) : acc
}

const swapClass = pipe(defaultTo(''), swap('', 'selected'))

function View(vm) {
    
    vm.stateChanged(wrapped => {
        wrapped.vnode.patch({ class: swapClass(fpath(wrapped, 'vnode', 'attrs', 'class')) })
    }, 'model', 'active')

    vm.stateChanged(nodes => {
        const { vnode } = defaultTo({}, active())
        if (vnode) {
            const { body: label, attrs, parent: node, children } = vnode
            node.patch(buildNode({ label, data: { id: attrs.id }, children: [ ...ensureArray(children), head(nodes) ] }))
        }
    }, 'model', 'nodes')
  
    function activate(e, vnode) {
        dispatch([ 'model', 'active' ], 'set', { path: getPath(vnode), vnode })
    }
    
    return function (_, data) {
        return div(
            { 'class': 'tree-view', onclick: { 'span': activate } },
            [ Toolbar(), div({ 'class': 'tv-nodes' }, [ defineView(TreeNodeView, data) ]) ]
        )
    }
}

export default View
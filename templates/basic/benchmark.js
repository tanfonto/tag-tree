import h from '../../vdom'
const { div, span } = h

function View(vm, { nodes, ms }) {
    return function render() {
        return div([
            span(`Generating ${nodes} nodes took ${ms} ms`)
        ])
    }
}

export default View

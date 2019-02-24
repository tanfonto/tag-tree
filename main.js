import 'babel-polyfill'
import { length } from 'ramda'
import { createView } from 'domvm/dist/dev/domvm.dev.es'
import TreeContainerView from  './views/tree-container'
import BenchmarkView from './templates/basic/benchmark'
import feed from './fake-data-provider'
import { doc, perfMeter } from './utils/dom'

(async () => {
    const data = await feed(20, { limit: 4 })
    perfMeter.bench('tree', () => {
        const root = createView(TreeContainerView, { label: '', data: { id: 0 }, children: data })
        root.mount(doc.byId('container'), true)
    })
    const stats = { nodes: length(doc.byTag('*')), ms: perfMeter.getBenchmark('tree') }
    createView(BenchmarkView, stats).mount(doc.byId('performance'))
})()    

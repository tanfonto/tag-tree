import { invoker, head, prop } from 'ramda'
import { path } from 'ramda'
import { seq } from 'ramda-adjunct'
const mark = invoker(1, 'mark')
const measure = invoker(3, 'measure')

const doc = document
const perfMeter = performance
const print = console.log.bind(console)

doc.byId = document.getElementById,
doc.byTag = document.getElementsByTagName

perfMeter.bench = (label, fn) => {
    return seq([mark('start'), fn, mark('end'), measure(label, 'start', 'end')])(perfMeter)
}

perfMeter.getBenchmark = label => {
    const result = prop('duration', head(performance.getEntriesByName(label)))
    seq([performance.clearMarks(), performance.clearMeasures()])
    return result
}

const targetValue = path(['target', 'value'])

export { doc, perfMeter, print, targetValue }
import h from '../../vdom'
import { merge } from 'ramda'

const { input, label, div } = h

function Template(text, attrs) {
    const textInput = input(merge({ type: 'text'}, attrs))
    return div([ label(text), textInput ])
}

export default Template
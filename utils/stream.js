import flyd from 'flyd' 
import { dropRepeats } from 'flyd/module/droprepeats'

export default function wrapper(val, unique, pipeline, sideEffect) {
    const raw = flyd.stream(val)
    const piped = pipeline ? pipeline(raw) : raw
    const out = unique ? dropRepeats(piped) : piped
    flyd.on(sideEffect, out)
    return raw
}
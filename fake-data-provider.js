import { dec, inc, gte, not, or } from 'ramda'
import { isPositive } from 'ramda-adjunct'
import warning from './utils/warning'

function rng(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function word() {
    return Math.random().toString(36).slice(2)
}

const qit = fn => new Promise(resolve => setTimeout(resolve(fn()), 0), () => warning('ops'))

function expand(seed, opts) {

    function exit(l, n) {
        return or(gte(l, opts.limit), not(isPositive(n)))
    }

    async function nodes(n, seed, level, acc = []) {
        if (exit(level, n)) return acc

        const item = {
            data: { id: rng(10000, 0) },
            label: word(),
            children: await nodes(n, rng(seed), inc(level))
        }

        return qit(() => nodes(dec(n), seed, level, [...acc, item]))
    }

    return nodes(rng(seed, seed / 2), seed, 0)
}

export default expand

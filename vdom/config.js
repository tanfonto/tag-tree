import { ViewModel, config } from 'domvm/dist/dev/domvm.dev.es'
import flyd from 'flyd'
import { always, compose, defaultTo, path, pipe } from 'ramda'
import store from '../store'

const hookHandler = hook => pipe(path([ 'config', 'hooks', hook ]), defaultTo(always(undefined)))

function decorateHook(vm, hook, fn) {
    vm.config({ 
        hooks: { 
            [ hook ]: compose(fn, hookHandler(this)) 
        } 
    })
}

ViewModel.prototype.stateChanged = function (reducer, ...storePath) {
    const childStore = path(storePath)(store)
    const unsubscribe = childStore(state => {
        if (state) {
            const reduced = reducer(state)
            if (reduced) this.update(reduced)
        }
    })
    decorateHook(this, 'didUnmount', unsubscribe)
}

//Copied from domvm tut, I don't like this coad
config({
    stream: {
        val: function(v, accum) {
            if (flyd.isStream(v)) {
                accum.push(v)
                return v()
            }
            return v
        },
        on: function(accum, vm) {
            let calls = 0

            const s = flyd.combine(function() {
                if (++calls == 2) {
                    vm.redraw()
                    s.end(true)
                }
            }, accum)

            return s
        },
        off: function(s) {
            s.end(true)
        }
    }
})
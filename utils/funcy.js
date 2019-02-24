import { equals, path } from 'ramda'

export function swap(a, b) {
    return function(val) {
        return equals(val, a) ? b : equals(val, b) ? a : val
    }
}

export function fpath(obj, ...path$) {
    return path(path$)(obj)
}

process.env.BABEL_ENV = 'development'

module.exports = function (wallaby) {
    return {
        testFramework: 'tape',
        env: {
            type: 'node',
            runner: 'node',
        },
        files: [
            '**/*.js',
            '!node_modules/**/*.js',
            '!tests/**/*.tests.js',
            '!dist/**/*.js',
        ],
        tests: [
            'tests/**/*.tests.js',
        ],
        compilers: {
            '**/*.js': wallaby.compilers.babel(),
        },
        setup: function() {
            // global.React = require('react')

            // Taken from https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
            // var jsdom = require('jsdom').jsdom
            const jsdom = require('jsdom')
            const { JSDOM } = jsdom

            var exposedProperties = ['window', 'navigator', 'document']

            // global.document = jsdom('')
            const dom = new JSDOM('')
            const document = dom.window.document
            global.document = document
            global.window = document.defaultView
            // global.window = dom.window
            Object.keys(document.defaultView).forEach((property) => {
                if (typeof global[property] === 'undefined') {
                    exposedProperties.push(property)
                    global[property] = document.defaultView[property]
                }
            })

            global.navigator = {
                userAgent: 'node.js'
            }
        }
    }
}
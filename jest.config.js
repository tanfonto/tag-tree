module.exports = {
    testMatch: [ '**/tests/**/*.tests.js' ],
    transformIgnorePatterns: [
        'node_modules/(?!(domvm)/)'
    ],
    testPathIgnorePatterns: [ 
        '/node_modules/', 
        '/.history/', 
        '/dist/', 
        '/.cache/'
    ]
}
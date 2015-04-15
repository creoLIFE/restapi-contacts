/**
 * Created by miroslawratman on 15/04/15.
 */

var falkor = require('../node_modules/falkor')

exports.testJsonContent = falkor.fetch('https://localhost:8080/access_token/some.email@gmail.com/12345')
    .evaluateWithJsonBody(function (test, json) {
        test.equals(json.access_token, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MzAsImVtYWlsIjoibWlyZWtAcmF0bWFuLnBsIiwicmFuZG9tIjo2MzYxMDM4MjA5ODcuMDQ1OH0.zTzlMF-kWP7R4eHuApinN4RQ6yGUoHSoWbdciWkUEAU', 'This evaluator fails if we have work to do.')
    })
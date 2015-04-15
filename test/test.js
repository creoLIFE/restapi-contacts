/**
 * Created by miroslawratman on 15/04/15.
 */

var falkor = require('../node_modules/falkor')

exports.testJsonContent = falkor.fetch('https://localhost:8080/access_token/mirek@ratman.pl/12345')
    .evaluateWithJsonBody(function (test, json) {
        test.equals(json.access_token, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjgsImVtYWlsIjoibWlyZWtAcmF0bWFuLnBsIiwicmFuZG9tIjo4NDUzMjU0MzkwMDQuMjI3NX0.tMipKWwXa5yH6-KGiEl99s87n3IpdCMsgnXTremqXzA', 'This evaluator fails if we have work to do.')
    })
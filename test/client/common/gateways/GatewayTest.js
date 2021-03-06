import {withMockedImports} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'

describe('gateway', function () {

  const superagent = {}
  const Gateway = withMockedImports('client/common/gateways/Gateway', {superagent})

  describe('fake response', function () {
    it('should return a resolved promise with the given body', function () {
      const response = Gateway.fakeResponse('whatever')
      expect(response).to.be.a('promise')

      return response.then((req) => {
        expect(req).to.include({body: 'whatever'})
      })
    })
  })
})

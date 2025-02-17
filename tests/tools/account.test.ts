import { CHAR_TYPE } from '../../src/const'
import {
  accountIdHex,
  getAccountCharsetTypes,
  isSubAccount,
  isSupportedAccount,
  toDottedStyle,
  toHashedStyle,
} from '../../src/tools/account'

describe('isSupportedAccount', function () {
  it('main account', function () {
    const isSupported = isSupportedAccount('imac.bit')

    expect(isSupported).toBe(true)
  })

  it('sub-account', function () {
    const isSupported = isSupportedAccount('a.phone.bit')

    expect(isSupported).toBe(true)
  })

  it('emoji', function () {
    const isSupported = isSupportedAccount('🐭🐮🐯🐰🐲🐍🐴🐑🐵🐔🐶🐷.bit')

    expect(isSupported).toBe(true)
  })

  it('hash-style account', function () {
    const isSupported = isSupportedAccount('imac#phone.bit')

    expect(isSupported).toBe(true)
  })

  it('only .bit', function () {
    const isSupported = isSupportedAccount('.bit')

    expect(isSupported).toBe(false)
  })

  it('ENS', function () {
    const isSupported = isSupportedAccount('vitalik.eth')

    expect(isSupported).toBe(false)
  })
})

describe('toDottedStyle', function () {
  it('hashed to dotted', function () {
    const dotted = toDottedStyle('imac#phone.bit')

    expect(dotted).toBe('phone.imac.bit')
  })

  it('dotted to dotted', function () {
    const dotted = toDottedStyle('phone.imac.bit')

    expect(dotted).toBe('phone.imac.bit')
  })

  it('main account', function () {
    const dotted = toDottedStyle('imac.bit')

    expect(dotted).toBe('imac.bit')
  })

  it('ENS', function () {
    const dotted = toDottedStyle('vitalik.eth')

    expect(dotted).toBe('vitalik.eth')
  })
})

describe('toHashedStyle', function () {
  it('dotted to hashed', function () {
    const dotted = toHashedStyle('phone.imac.bit')

    expect(dotted).toBe('imac#phone.bit')
  })

  it('hashed to hashed', function () {
    const dotted = toHashedStyle('imac#phone.bit')

    expect(dotted).toBe('imac#phone.bit')
  })

  it('main account', function () {
    const dotted = toHashedStyle('imac.bit')

    expect(dotted).toBe('imac.bit')
  })

  it('ENS', function () {
    const dotted = toHashedStyle('vitalik.eth')

    expect(dotted).toBe('vitalik.eth')
  })
})

describe('accountIdHex', function () {
  it('work', function () {
    const accountId = accountIdHex('imac.bit')

    expect(accountId).toBe('0x5728088435fb8788472a9ca601fbc0b9cbea8be3')
  })

  it('sub-account', function () {
    const accountId = accountIdHex('superdid.2077.bit')

    expect(accountId).toBe('0x85a13eea14c4bc5474e205e136df349b7dbc0442')
  })
})

describe('isSubAccount', function () {
  it('should be false for main-account', function () {
    expect(isSubAccount('imac.bit')).toBe(false)
  })

  it('should be true for sub-account', function () {
    expect(isSubAccount('superdid.2077.bit')).toBe(true)
  })

  it('should be false for hash-style account', function () {
    expect(isSubAccount('imac#001.bit')).toBe(false)
  })
})

describe('getAccountCharsetTypes', function () {
  it('english.bit', () => {
    expect(getAccountCharsetTypes('english.bit')).toEqual({
      [CHAR_TYPE.english]: true,
    })
  })

  it('quốcngữ.bit', () => {
    expect(getAccountCharsetTypes('quốcngữ.bit')).toEqual({
      [CHAR_TYPE.vietnamese]: true,
    })
  })

  it('😊🐶.bit', () => {
    expect(getAccountCharsetTypes('😊🐶.bit')).toEqual({
      [CHAR_TYPE.emoji]: true,
    })
  })

  it('english123.bit', () => {
    expect(getAccountCharsetTypes('english123.bit')).toEqual({
      [CHAR_TYPE.english]: true,
      [CHAR_TYPE.number]: true,
    })
  })

  it('english123😊.bit', () => {
    expect(getAccountCharsetTypes('english123😊.bit')).toEqual({
      [CHAR_TYPE.english]: true,
      [CHAR_TYPE.number]: true,
      [CHAR_TYPE.emoji]: true,
    })
  })

  it('quốcngữ123😊.bit', () => {
    expect(getAccountCharsetTypes('quốcngữ123😊.bit')).toEqual({
      [CHAR_TYPE.vietnamese]: true,
      [CHAR_TYPE.number]: true,
      [CHAR_TYPE.emoji]: true,
    })
  })

  it('にほんご.bit', () => {
    expect(getAccountCharsetTypes('にほんご.bit')).toEqual({
      [CHAR_TYPE.unknown]: true,
    })
  })

  it('english .bit', () => {
    expect(getAccountCharsetTypes('english .bit')).toEqual({
      [CHAR_TYPE.unknown]: true,
    })
  })
})

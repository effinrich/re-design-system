import { runIfFn } from './run-if-fn'

describe('runIfFn', () => {
  describe('with function values', () => {
    test('executes function and returns result', () => {
      const fn = () => 'result'
      expect(runIfFn(fn)).toBe('result')
    })

    test('passes arguments to function', () => {
      const fn = (a: number, b: number) => a + b
      expect(runIfFn(fn, 5, 3)).toBe(8)
    })

    test('passes single argument to function', () => {
      const fn = (name: string) => `Hello, ${name}`
      expect(runIfFn(fn, 'World')).toBe('Hello, World')
    })

    test('passes multiple arguments of different types', () => {
      const fn = (str: string, num: number, bool: boolean) => ({
        str,
        num,
        bool
      })
      const result = runIfFn(fn, 'test', 42, true)
      expect(result).toEqual({ str: 'test', num: 42, bool: true })
    })

    test('handles function returning object', () => {
      const fn = () => ({ key: 'value', count: 10 })
      expect(runIfFn(fn)).toEqual({ key: 'value', count: 10 })
    })

    test('handles function returning array', () => {
      const fn = () => [1, 2, 3, 4, 5]
      expect(runIfFn(fn)).toEqual([1, 2, 3, 4, 5])
    })

    test('handles function returning null', () => {
      const fn = () => null
      expect(runIfFn(fn)).toBeNull()
    })

    test('handles function returning undefined', () => {
      const fn = () => undefined
      expect(runIfFn(fn)).toBeUndefined()
    })

    test('handles function with no arguments', () => {
      const fn = () => 123
      expect(runIfFn(fn)).toBe(123)
    })

    test('handles arrow functions', () => {
      const arrowFn = (x: number) => x * 2
      expect(runIfFn(arrowFn, 5)).toBe(10)
    })

    test('handles function expressions', () => {
      const funcExpr = function (x: number, y: number) {
        return x - y
      }
      expect(runIfFn(funcExpr, 10, 3)).toBe(7)
    })
  })

  describe('with non-function values', () => {
    test('returns string value as is', () => {
      const value = 'hello'
      expect(runIfFn(value)).toBe('hello')
    })

    test('returns number value as is', () => {
      const value = 42
      expect(runIfFn(value)).toBe(42)
    })

    test('returns boolean true as is', () => {
      const value = true
      expect(runIfFn(value)).toBe(true)
    })

    test('returns boolean false as is', () => {
      const value = false
      expect(runIfFn(value)).toBe(false)
    })

    test('returns object value as is', () => {
      const value = { key: 'value', nested: { prop: 123 } }
      expect(runIfFn(value)).toBe(value)
      expect(runIfFn(value)).toEqual({ key: 'value', nested: { prop: 123 } })
    })

    test('returns array value as is', () => {
      const value = [1, 2, 3, 4]
      expect(runIfFn(value)).toBe(value)
      expect(runIfFn(value)).toEqual([1, 2, 3, 4])
    })

    test('returns null as is', () => {
      const value = null
      expect(runIfFn(value)).toBeNull()
    })

    test('returns undefined as is', () => {
      const value = undefined
      expect(runIfFn(value)).toBeUndefined()
    })

    test('returns zero as is', () => {
      const value = 0
      expect(runIfFn(value)).toBe(0)
    })

    test('returns empty string as is', () => {
      const value = ''
      expect(runIfFn(value)).toBe('')
    })

    test('returns empty array as is', () => {
      const value: any[] = []
      expect(runIfFn(value)).toBe(value)
      expect(runIfFn(value)).toEqual([])
    })

    test('returns empty object as is', () => {
      const value = {}
      expect(runIfFn(value)).toBe(value)
      expect(runIfFn(value)).toEqual({})
    })
  })

  describe('edge cases', () => {
    test('handles function that returns another function', () => {
      const fn = () => (x: number) => x * 2
      const result = runIfFn(fn)
      expect(typeof result).toBe('function')
      expect(result(5)).toBe(10)
    })

    test('ignores extra arguments when value is not a function', () => {
      const value = 'hello'
      expect(runIfFn(value, 'arg1', 'arg2')).toBe('hello')
    })

    test('handles function with rest parameters', () => {
      const fn = (...args: number[]) => args.reduce((sum, n) => sum + n, 0)
      expect(runIfFn(fn, 1, 2, 3, 4, 5)).toBe(15)
    })

    test('preserves function context', () => {
      const obj = {
        value: 10,
        getValue() {
          return this.value
        }
      }
      // Note: This will not preserve context as expected without explicit binding
      const fn = obj.getValue
      // The function loses context when called through runIfFn
      expect(() => runIfFn(fn)).toThrow()
    })

    test('handles async functions (returns promise)', () => {
      const asyncFn = async () => 'async result'
      const result = runIfFn(asyncFn)
      expect(result).toBeInstanceOf(Promise)
      return expect(result).resolves.toBe('async result')
    })

    test('handles Date object', () => {
      const date = new Date('2025-01-01')
      expect(runIfFn(date)).toBe(date)
    })

    test('handles RegExp object', () => {
      const regex = /test/g
      expect(runIfFn(regex)).toBe(regex)
    })

    test('handles Symbol value', () => {
      const sym = Symbol('test')
      expect(runIfFn(sym)).toBe(sym)
    })

    test('handles BigInt value', () => {
      const bigInt = BigInt(9007199254740991)
      expect(runIfFn(bigInt)).toBe(bigInt)
    })

    test('handles function returning complex nested structure', () => {
      const fn = () => ({
        level1: {
          level2: {
            level3: {
              array: [1, 2, { nested: true }],
              value: 'deep'
            }
          }
        }
      })
      expect(runIfFn(fn)).toEqual({
        level1: {
          level2: {
            level3: {
              array: [1, 2, { nested: true }],
              value: 'deep'
            }
          }
        }
      })
    })
  })

  describe('type safety', () => {
    test('maintains return type for direct values', () => {
      const stringValue: string = 'test'
      const result = runIfFn(stringValue)
      expect(typeof result).toBe('string')
    })

    test('maintains return type for function results', () => {
      const numberFn = (): number => 42
      const result = runIfFn(numberFn)
      expect(typeof result).toBe('number')
    })

    test('handles union types', () => {
      const value: string | (() => string) = 'direct'
      expect(runIfFn(value)).toBe('direct')

      const fnValue: string | (() => string) = () => 'from function'
      expect(runIfFn(fnValue)).toBe('from function')
    })
  })
})

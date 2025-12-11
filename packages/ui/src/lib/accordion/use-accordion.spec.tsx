import { renderHook, act } from '@testing-library/react'
import { useAccordion, useAccordionItem } from './use-accordion'
import {
  AccordionDescendantsProvider,
  AccordionItemProvider
} from './accordion-context'
import { ReactNode } from 'react'
import { vi } from 'vitest'

// Mock the warn function from Chakra
vi.mock('@chakra-ui/shared-utils', () => ({
  ...vi.importActual('@chakra-ui/shared-utils'),
  warn: vi.fn()
}))

describe('useAccordion', () => {
  describe('basic functionality', () => {
    test('initializes with default state', () => {
      const { result } = renderHook(() => useAccordion({}))

      expect(result.current.index).toBe(-1)
      expect(result.current.focusedIndex).toBe(-1)
      expect(result.current).toHaveProperty('getAccordionItemProps')
      expect(result.current).toHaveProperty('setIndex')
      expect(result.current).toHaveProperty('setFocusedIndex')
    })

    test('initializes with defaultIndex', () => {
      const { result } = renderHook(() => useAccordion({ defaultIndex: 0 }))

      expect(result.current.index).toBe(0)
    })

    test('initializes with defaultIndex array when allowMultiple', () => {
      const { result } = renderHook(() =>
        useAccordion({
          allowMultiple: true,
          defaultIndex: [0, 2]
        })
      )

      expect(result.current.index).toEqual([0, 2])
    })

    test('resets focusedIndex on unmount', () => {
      const { result, unmount } = renderHook(() => useAccordion({}))

      act(() => {
        result.current.setFocusedIndex(2)
      })

      expect(result.current.focusedIndex).toBe(2)
      unmount()
    })
  })

  describe('controlled mode', () => {
    test('uses controlled index when provided', () => {
      const { result, rerender } = renderHook(
        ({ index }) => useAccordion({ index }),
        { initialProps: { index: 1 } }
      )

      expect(result.current.index).toBe(1)

      rerender({ index: 2 })
      expect(result.current.index).toBe(2)
    })
    test('calls onChange when index changes', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() => useAccordion({ onChange }))
      const { onChange: itemOnChange } = result.current.getAccordionItemProps(0)

      act(() => {
        itemOnChange(true)
      })

      expect(onChange).toHaveBeenCalledWith(0)
    })
    test('handles controlled index with allowMultiple', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useAccordion({ allowMultiple: true, index: [0, 1], onChange })
      )

      expect(result.current.index).toEqual([0, 1])
    })
  })

  describe('single accordion mode', () => {
    test('opens accordion item', () => {
      const { result } = renderHook(() => useAccordion({}))

      const { onChange } = result.current.getAccordionItemProps(0)

      act(() => {
        onChange(true)
      })

      expect(result.current.index).toBe(0)
    })

    test('closes accordion item when allowToggle is true', () => {
      const { result } = renderHook(() => useAccordion({ allowToggle: true }))

      const { onChange } = result.current.getAccordionItemProps(0)

      act(() => {
        onChange(true)
      })
      expect(result.current.index).toBe(0)

      act(() => {
        onChange(false)
      })
      expect(result.current.index).toBe(-1)
    })

    test('does not close accordion item when allowToggle is false', () => {
      const { result } = renderHook(() => useAccordion({ allowToggle: false }))

      const { onChange } = result.current.getAccordionItemProps(0)

      act(() => {
        onChange(true)
      })
      expect(result.current.index).toBe(0)

      act(() => {
        onChange(false)
      })
      expect(result.current.index).toBe(0) // Should remain open
    })

    test('switches between accordion items', () => {
      const { result } = renderHook(() => useAccordion({}))

      const item1 = result.current.getAccordionItemProps(0)
      const item2 = result.current.getAccordionItemProps(1)

      act(() => {
        item1.onChange(true)
      })
      expect(result.current.index).toBe(0)

      act(() => {
        item2.onChange(true)
      })
      expect(result.current.index).toBe(1)

      // First item should no longer report as open
      expect(result.current.getAccordionItemProps(0).isOpen).toBe(false)
      expect(result.current.getAccordionItemProps(1).isOpen).toBe(true)
    })
  })

  describe('multiple accordion mode', () => {
    test('allows multiple items to be open', () => {
      const { result } = renderHook(() => useAccordion({ allowMultiple: true }))

      const item0 = result.current.getAccordionItemProps(0)
      const item1 = result.current.getAccordionItemProps(1)

      act(() => {
        item0.onChange(true)
      })
      expect(result.current.index).toEqual([0])

      act(() => {
        item1.onChange(true)
      })
      expect(result.current.index).toEqual([0, 1])
    })

    test('removes item from open list when closed', () => {
      const { result } = renderHook(() =>
        useAccordion({ allowMultiple: true, defaultIndex: [0, 1, 2] })
      )

      const item1 = result.current.getAccordionItemProps(1)

      act(() => {
        item1.onChange(false)
      })

      expect(result.current.index).toEqual([0, 2])
    })

    test('reports correct isOpen state for each item', () => {
      const { result } = renderHook(() =>
        useAccordion({ allowMultiple: true, defaultIndex: [0, 2] })
      )

      expect(result.current.getAccordionItemProps(0).isOpen).toBe(true)
      expect(result.current.getAccordionItemProps(1).isOpen).toBe(false)
      expect(result.current.getAccordionItemProps(2).isOpen).toBe(true)
    })
  })

  describe('getAccordionItemProps', () => {
    test('returns correct isOpen state', () => {
      const { result } = renderHook(() => useAccordion({ defaultIndex: 1 }))

      expect(result.current.getAccordionItemProps(0).isOpen).toBe(false)
      expect(result.current.getAccordionItemProps(1).isOpen).toBe(true)
      expect(result.current.getAccordionItemProps(2).isOpen).toBe(false)
    })

    test('handles null index', () => {
      const { result } = renderHook(() => useAccordion({}))

      const props = result.current.getAccordionItemProps(null)
      expect(props.isOpen).toBe(false)

      // onChange should not error but also not change state
      act(() => {
        props.onChange(true)
      })
      expect(result.current.index).toBe(-1)
    })

    test('returns onChange function', () => {
      const { result } = renderHook(() => useAccordion({}))

      const props = result.current.getAccordionItemProps(0)
      expect(typeof props.onChange).toBe('function')
    })
  })

  describe('focusedIndex management', () => {
    test('updates focusedIndex', () => {
      const { result } = renderHook(() => useAccordion({}))

      act(() => {
        result.current.setFocusedIndex(3)
      })

      expect(result.current.focusedIndex).toBe(3)
    })

    test('can reset focusedIndex to -1', () => {
      const { result } = renderHook(() => useAccordion({}))

      act(() => {
        result.current.setFocusedIndex(2)
      })
      expect(result.current.focusedIndex).toBe(2)

      act(() => {
        result.current.setFocusedIndex(-1)
      })
      expect(result.current.focusedIndex).toBe(-1)
    })
  })
  describe('warning validations', () => {
    let consoleWarnSpy: any

    beforeEach(() => {
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
      consoleWarnSpy.mockRestore()
    })
  })

  test('validates allowMultiple with non-array index', () => {
    const { warn } = require('@chakra-ui/shared-utils')

    renderHook(() => useAccordion({ allowMultiple: true, defaultIndex: 0 }))

    expect(warn).toHaveBeenCalledWith(
      expect.objectContaining({
        condition: true
      })
    )
  })

  test('validates allowMultiple and allowToggle together', () => {
    const { warn } = require('@chakra-ui/shared-utils')

    renderHook(() => useAccordion({ allowMultiple: true, allowToggle: true }))

    expect(warn).toHaveBeenCalled()
  })
})

describe('useAccordionItem', () => {
  const createWrapper = (accordionProps = {}) => {
    return ({ children }: { children: ReactNode }) => {
      const accordion = useAccordion(accordionProps)
      return (
        <AccordionDescendantsProvider value={accordion.descendants}>
          <AccordionItemProvider
            value={{
              ...accordion,
              reduceMotion: false
            }}
          >
            {children}
          </AccordionItemProvider>
        </AccordionDescendantsProvider>
      )
    }
  }

  test('generates unique IDs for button and panel', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useAccordionItem({}), { wrapper })

    const buttonProps = result.current.getButtonProps()
    const panelProps = result.current.getPanelProps()

    expect(buttonProps.id).toContain('accordion-button-')
    expect(panelProps.id).toContain('accordion-panel-')
    expect(buttonProps['aria-controls']).toBe(panelProps.id)
    expect(panelProps['aria-labelledby']).toBe(buttonProps.id)
  })

  test('uses custom id when provided', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useAccordionItem({ id: 'custom-id' }), {
      wrapper
    })

    const buttonProps = result.current.getButtonProps()
    const panelProps = result.current.getPanelProps()

    expect(buttonProps.id).toBe('accordion-button-custom-id')
    expect(panelProps.id).toBe('accordion-panel-custom-id')
  })

  test('returns correct isOpen state', () => {
    const wrapper = createWrapper({ defaultIndex: 0 })
    const { result } = renderHook(() => useAccordionItem({}), { wrapper })

    expect(result.current.isOpen).toBe(true)
  })

  test('returns correct isDisabled state', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(
      () => useAccordionItem({ isDisabled: true }),
      { wrapper }
    )

    expect(result.current.isDisabled).toBe(true)
  })

  test('getButtonProps sets correct ARIA attributes', () => {
    const wrapper = createWrapper({ defaultIndex: 0 })
    const { result } = renderHook(() => useAccordionItem({}), { wrapper })

    const buttonProps = result.current.getButtonProps()

    expect(buttonProps.type).toBe('button')
    expect(buttonProps['aria-expanded']).toBe(true)
    expect(buttonProps.disabled).toBe(false)
  })

  test('getButtonProps sets disabled when isDisabled', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(
      () => useAccordionItem({ isDisabled: true }),
      { wrapper }
    )

    const buttonProps = result.current.getButtonProps()

    expect(buttonProps.disabled).toBe(true)
  })

  test('getPanelProps sets correct attributes when open', () => {
    const wrapper = createWrapper({ defaultIndex: 0 })
    const { result } = renderHook(() => useAccordionItem({}), { wrapper })

    const panelProps = result.current.getPanelProps()

    expect(panelProps.role).toBe('region')
    expect(panelProps.hidden).toBe(false)
  })

  test('getPanelProps hides panel when closed', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useAccordionItem({}), { wrapper })

    const panelProps = result.current.getPanelProps()

    expect(panelProps.hidden).toBe(true)
  })

  test('onOpen calls onChange with true', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useAccordionItem({}), { wrapper })

    act(() => {
      result.current.onOpen()
    })

    expect(result.current.isOpen).toBe(true)
  })

  test('onClose calls onChange with false', () => {
    const wrapper = createWrapper({ defaultIndex: 0, allowToggle: true })
    const { result } = renderHook(() => useAccordionItem({}), { wrapper })

    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.onClose()
    })

    expect(result.current.isOpen).toBe(false)
  })
  test('merges user onClick with internal onClick', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useAccordionItem({}), { wrapper })
    const userOnClick = vi.fn()
    // const buttonProps = result.current.getButtonProps({ onClick: userOnClick })

    act(() => {
      result.current
        .getButtonProps({ onClick: userOnClick })
        .onClick?.({} as any)
    })

    expect(userOnClick).toHaveBeenCalled()
  })
  test('merges user onFocus with internal onFocus', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useAccordionItem({}), { wrapper })
    const userOnFocus = vi.fn()

    const buttonProps = result.current.getButtonProps({ onFocus: userOnFocus })

    act(() => {
      buttonProps.onFocus?.({} as any)
    })

    expect(userOnFocus).toHaveBeenCalled()
  })
  test('merges user onKeyDown with internal onKeyDown', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useAccordionItem({}), { wrapper })
    const userOnKeyDown = vi.fn()

    const buttonProps = result.current.getButtonProps({
      onKeyDown: userOnKeyDown
    })

    act(() => {
      buttonProps.onKeyDown?.({ key: 'Tab' } as any)
    })

    expect(userOnKeyDown).toHaveBeenCalled()
  })
})

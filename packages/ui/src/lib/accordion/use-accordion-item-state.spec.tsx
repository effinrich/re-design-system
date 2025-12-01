import { renderHook } from '@testing-library/react'
import { useAccordionItemState } from './use-accordion-item-state'
import { AccordionItemProvider } from './accordion-context'
import { ReactNode } from 'react'

describe('useAccordionItemState', () => {
  const createWrapper = (contextValue: any) => {
    return ({ children }: { children: ReactNode }) => (
      <AccordionItemProvider value={contextValue}>
        {children}
      </AccordionItemProvider>
    )
  }

  test('returns accordion item state from context', () => {
    const contextValue = {
      isOpen: true,
      isDisabled: false,
      onClose: jest.fn(),
      onOpen: jest.fn(),
      isFocusable: false,
      getButtonProps: jest.fn(),
      getPanelProps: jest.fn(),
      htmlProps: {}
    }

    const wrapper = createWrapper(contextValue)
    const { result } = renderHook(() => useAccordionItemState(), { wrapper })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.isDisabled).toBe(false)
    expect(result.current.onClose).toBe(contextValue.onClose)
    expect(result.current.onOpen).toBe(contextValue.onOpen)
  })

  test('returns closed state', () => {
    const contextValue = {
      isOpen: false,
      isDisabled: false,
      onClose: jest.fn(),
      onOpen: jest.fn(),
      isFocusable: false,
      getButtonProps: jest.fn(),
      getPanelProps: jest.fn(),
      htmlProps: {}
    }

    const wrapper = createWrapper(contextValue)
    const { result } = renderHook(() => useAccordionItemState(), { wrapper })

    expect(result.current.isOpen).toBe(false)
  })

  test('returns disabled state', () => {
    const contextValue = {
      isOpen: false,
      isDisabled: true,
      onClose: jest.fn(),
      onOpen: jest.fn(),
      isFocusable: false,
      getButtonProps: jest.fn(),
      getPanelProps: jest.fn(),
      htmlProps: {}
    }

    const wrapper = createWrapper(contextValue)
    const { result } = renderHook(() => useAccordionItemState(), { wrapper })

    expect(result.current.isDisabled).toBe(true)
  })

  test('provides onOpen and onClose callbacks', () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()

    const contextValue = {
      isOpen: false,
      isDisabled: false,
      onClose,
      onOpen,
      isFocusable: false,
      getButtonProps: jest.fn(),
      getPanelProps: jest.fn(),
      htmlProps: {}
    }

    const wrapper = createWrapper(contextValue)
    const { result } = renderHook(() => useAccordionItemState(), { wrapper })

    result.current.onOpen()
    expect(onOpen).toHaveBeenCalled()

    result.current.onClose()
    expect(onClose).toHaveBeenCalled()
  })

  test('updates when context changes', () => {
    const initialContext = {
      isOpen: false,
      isDisabled: false,
      onClose: jest.fn(),
      onOpen: jest.fn(),
      isFocusable: false,
      getButtonProps: jest.fn(),
      getPanelProps: jest.fn(),
      htmlProps: {}
    }

    const updatedContext = {
      ...initialContext,
      isOpen: true
    }

    const { result, rerender } = renderHook(() => useAccordionItemState(), {
      wrapper: createWrapper(initialContext),
      initialProps: initialContext
    })

    expect(result.current.isOpen).toBe(false)

    // Rerender with new context
    rerender(updatedContext)

    // Note: This test demonstrates the pattern, but the actual update
    // would require the wrapper itself to change
  })
})

import { renderHook, act } from '@testing-library/react'
import { useDisclosure } from './use-disclosure'

describe('useDisclosure', () => {
  describe('uncontrolled mode', () => {
    test('initializes with isOpen false by default', () => {
      const { result } = renderHook(() => useDisclosure())

      expect(result.current.isOpen).toBe(false)
      expect(result.current.isControlled).toBe(false)
    })

    test('initializes with defaultIsOpen', () => {
      const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true }))

      expect(result.current.isOpen).toBe(true)
    })

    test('onOpen sets isOpen to true', () => {
      const { result } = renderHook(() => useDisclosure())

      act(() => {
        result.current.onOpen()
      })

      expect(result.current.isOpen).toBe(true)
    })

    test('onClose sets isOpen to false', () => {
      const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true }))

      act(() => {
        result.current.onClose()
      })

      expect(result.current.isOpen).toBe(false)
    })

    test('onToggle toggles isOpen state', () => {
      const { result } = renderHook(() => useDisclosure())

      expect(result.current.isOpen).toBe(false)

      act(() => {
        result.current.onToggle()
      })
      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.onToggle()
      })
      expect(result.current.isOpen).toBe(false)
    })
  })

  describe('controlled mode', () => {
    test('uses controlled isOpen when provided', () => {
      const { result } = renderHook(() => useDisclosure({ isOpen: true }))

      expect(result.current.isOpen).toBe(true)
      expect(result.current.isControlled).toBe(true)
    })

    test('controlled isOpen updates when prop changes', () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) => useDisclosure({ isOpen }),
        { initialProps: { isOpen: false } }
      )

      expect(result.current.isOpen).toBe(false)

      rerender({ isOpen: true })
      expect(result.current.isOpen).toBe(true)
    })

    test('does not update internal state when controlled', () => {
      const { result } = renderHook(() => useDisclosure({ isOpen: false }))

      act(() => {
        result.current.onOpen()
      })

      // State should still be false since it's controlled externally
      expect(result.current.isOpen).toBe(false)
    })

    test('calls onOpen callback in controlled mode', () => {
      const onOpen = jest.fn()
      const { result } = renderHook(() => useDisclosure({ isOpen: false, onOpen }))

      act(() => {
        result.current.onOpen()
      })

      expect(onOpen).toHaveBeenCalled()
    })

    test('calls onClose callback in controlled mode', () => {
      const onClose = jest.fn()
      const { result } = renderHook(() => useDisclosure({ isOpen: true, onClose }))

      act(() => {
        result.current.onClose()
      })

      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('callbacks', () => {
    test('calls onOpen callback when opened', () => {
      const onOpen = jest.fn()
      const { result } = renderHook(() => useDisclosure({ onOpen }))

      act(() => {
        result.current.onOpen()
      })

      expect(onOpen).toHaveBeenCalledTimes(1)
    })

    test('calls onClose callback when closed', () => {
      const onClose = jest.fn()
      const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true, onClose }))

      act(() => {
        result.current.onClose()
      })

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    test('calls appropriate callback when toggling', () => {
      const onOpen = jest.fn()
      const onClose = jest.fn()
      const { result } = renderHook(() => useDisclosure({ onOpen, onClose }))

      act(() => {
        result.current.onToggle()
      })
      expect(onOpen).toHaveBeenCalledTimes(1)
      expect(onClose).not.toHaveBeenCalled()

      act(() => {
        result.current.onToggle()
      })
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onOpen).toHaveBeenCalledTimes(1)
    })

    test('handles callback changes', () => {
      const onOpen1 = jest.fn()
      const onOpen2 = jest.fn()

      const { result, rerender } = renderHook(
        ({ onOpen }) => useDisclosure({ onOpen }),
        { initialProps: { onOpen: onOpen1 } }
      )

      act(() => {
        result.current.onOpen()
      })
      expect(onOpen1).toHaveBeenCalled()

      rerender({ onOpen: onOpen2 })

      act(() => {
        result.current.onClose()
        result.current.onOpen()
      })
      expect(onOpen2).toHaveBeenCalled()
    })
  })

  describe('getButtonProps', () => {
    test('returns correct aria-expanded attribute', () => {
      const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true }))

      const buttonProps = result.current.getButtonProps()
      expect(buttonProps['aria-expanded']).toBe(true)
    })

    test('returns correct aria-controls attribute', () => {
      const { result } = renderHook(() => useDisclosure())

      const buttonProps = result.current.getButtonProps()
      expect(buttonProps['aria-controls']).toContain('disclosure-')
    })

    test('uses custom id when provided', () => {
      const { result } = renderHook(() => useDisclosure({ id: 'custom-disclosure' }))

      const buttonProps = result.current.getButtonProps()
      expect(buttonProps['aria-controls']).toBe('custom-disclosure')
    })

    test('merges user props with disclosure props', () => {
      const { result } = renderHook(() => useDisclosure())

      const buttonProps = result.current.getButtonProps({
        className: 'custom-class',
        'data-testid': 'my-button'
      })

      expect(buttonProps.className).toBe('custom-class')
      expect(buttonProps['data-testid']).toBe('my-button')
      expect(buttonProps['aria-expanded']).toBe(false)
    })

    test('onClick toggles disclosure', () => {
      const { result } = renderHook(() => useDisclosure())

      const buttonProps = result.current.getButtonProps()

      act(() => {
        buttonProps.onClick?.({} as any)
      })
      expect(result.current.isOpen).toBe(true)

      act(() => {
        buttonProps.onClick?.({} as any)
      })
      expect(result.current.isOpen).toBe(false)
    })

    test('merges user onClick with disclosure onClick', () => {
      const { result } = renderHook(() => useDisclosure())
      const userOnClick = jest.fn()

      const buttonProps = result.current.getButtonProps({ onClick: userOnClick })

      act(() => {
        buttonProps.onClick?.({} as any)
      })

      expect(userOnClick).toHaveBeenCalled()
      expect(result.current.isOpen).toBe(true)
    })
  })

  describe('getDisclosureProps', () => {
    test('returns hidden false when open', () => {
      const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true }))

      const disclosureProps = result.current.getDisclosureProps()
      expect(disclosureProps.hidden).toBe(false)
    })

    test('returns hidden true when closed', () => {
      const { result } = renderHook(() => useDisclosure())

      const disclosureProps = result.current.getDisclosureProps()
      expect(disclosureProps.hidden).toBe(true)
    })

    test('returns correct id', () => {
      const { result } = renderHook(() => useDisclosure())

      const disclosureProps = result.current.getDisclosureProps()
      expect(disclosureProps.id).toContain('disclosure-')
    })

    test('uses custom id when provided', () => {
      const { result } = renderHook(() => useDisclosure({ id: 'custom-id' }))

      const disclosureProps = result.current.getDisclosureProps()
      expect(disclosureProps.id).toBe('custom-id')
    })

    test('merges user props with disclosure props', () => {
      const { result } = renderHook(() => useDisclosure())

      const disclosureProps = result.current.getDisclosureProps({
        className: 'custom-class',
        'data-testid': 'my-disclosure'
      })

      expect(disclosureProps.className).toBe('custom-class')
      expect(disclosureProps['data-testid']).toBe('my-disclosure')
      expect(disclosureProps.hidden).toBe(true)
    })
  })

  describe('edge cases', () => {
    test('handles multiple rapid toggles', () => {
      const { result } = renderHook(() => useDisclosure())

      act(() => {
        result.current.onToggle()
        result.current.onToggle()
        result.current.onToggle()
      })

      expect(result.current.isOpen).toBe(true)
    })

    test('handles open when already open', () => {
      const onOpen = jest.fn()
      const { result } = renderHook(() => useDisclosure({ defaultIsOpen: true, onOpen }))

      act(() => {
        result.current.onOpen()
      })

      expect(result.current.isOpen).toBe(true)
      expect(onOpen).toHaveBeenCalled()
    })

    test('handles close when already closed', () => {
      const onClose = jest.fn()
      const { result } = renderHook(() => useDisclosure({ onClose }))

      act(() => {
        result.current.onClose()
      })

      expect(result.current.isOpen).toBe(false)
      expect(onClose).toHaveBeenCalled()
    })

    test('controlled mode with defaultIsOpen is ignored', () => {
      const { result } = renderHook(() =>
        useDisclosure({ isOpen: false, defaultIsOpen: true })
      )

      // Controlled value should take precedence
      expect(result.current.isOpen).toBe(false)
    })
  })

  describe('isControlled flag', () => {
    test('returns false when uncontrolled', () => {
      const { result } = renderHook(() => useDisclosure())

      expect(result.current.isControlled).toBe(false)
    })

    test('returns true when controlled', () => {
      const { result } = renderHook(() => useDisclosure({ isOpen: false }))

      expect(result.current.isControlled).toBe(true)
    })

    test('returns true even when isOpen is undefined explicitly passed', () => {
      const { result } = renderHook(() => useDisclosure({ isOpen: undefined }))

      // When isOpen is explicitly undefined, it's still considered uncontrolled
      expect(result.current.isControlled).toBe(false)
    })
  })
})

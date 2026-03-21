import { useState } from 'react'
import { LuSearch, LuX } from 'react-icons/lu'
import {
  type InputProps,
  IconButton,
  Input,
  InputGroup
} from '@react/ui'
import { Field } from '../snippets/field'
import { useDebounce } from 'rooks'
interface SearchProps
  extends Omit<InputProps, 'onChange' | 'defaultValue' | 'value'> {
  defaultValue?: string
  onChange(newValue: string): void
  handleClear?(): void
}

const DEFAULT_VALUE = ''
export const Search = ({
  placeholder = 'Search',
  onChange,
  defaultValue,
  ...inputProps
}: SearchProps) => {
  // Search will manage it's own value state separate from react-hook-form
  // This allows us to update the input immediately, while debouncing the actual
  // value behind the scenes. Debouncing allows us to reduce the amount of requests
  // we send to our Analytics server and API server.
  const [value, setValue] = useState(defaultValue || DEFAULT_VALUE)
  const debouncedOnChange = useDebounce(onChange, 500)
  return (
    <Field py={4}>
      <InputGroup
        startElement={<LuSearch color="gray.800" size={16} />}
        endElement={
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="clear search"
            onClick={() => {
              setValue(DEFAULT_VALUE)
              // no need to debounce clearing since it's a single action
              onChange(DEFAULT_VALUE)
            }}
            visibility={value ? 'visible' : 'hidden'}
          >
            <LuX />
          </IconButton>
        }
      >
        <Input
          size="md"
          placeholder={placeholder}
          onChange={e => {
            const newValue = e.target.value
            setValue(newValue)
            debouncedOnChange(newValue)
          }}
          value={value}
          {...inputProps}
        />
      </InputGroup>
    </Field>
  )
}

export default Search

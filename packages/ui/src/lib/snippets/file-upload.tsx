"use client"

import type { ButtonProps, RecipeProps } from "@chakra-ui/react"
import {
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone as ChakraFileUploadDropzone,
  FileUploadDropzoneContent,
  FileUploadDropzoneProps as ChakraFileUploadDropzoneProps,
  FileUploadHiddenInput,
  FileUploadItem as ChakraFileUploadItem,
  FileUploadItemContent,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemGroupProps,
  FileUploadItemName,
  FileUploadItemPreview,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRoot as ChakraFileUploadRoot,
  FileUploadRootProps as BaseFileUploadRootProps,
  FileUploadTrigger,
  useFileUploadContext,
} from "@chakra-ui/react/file-upload"
import { Button, Icon, IconButton, Span, Text, useRecipe } from "@chakra-ui/react"

import * as React from "react"
import { LuFile, LuUpload, LuX } from "react-icons/lu"

export interface FileUploadRootProps extends BaseFileUploadRootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const FileUploadRoot = React.forwardRef<
  HTMLInputElement,
  FileUploadRootProps
>(function FileUploadRoot(props, ref) {
  const { children, inputProps, ...rest } = props
  return (
    <ChakraFileUploadRoot {...rest}>
      <FileUploadHiddenInput ref={ref} {...inputProps} />
      {children}
    </ChakraFileUploadRoot>
  )
})

export interface FileUploadDropzoneProps
  extends ChakraFileUploadDropzoneProps {
  label: React.ReactNode
  description?: React.ReactNode
}

export const FileUploadDropzone = React.forwardRef<
  HTMLInputElement,
  FileUploadDropzoneProps
>(function FileUploadDropzone(props, ref) {
  const { children, label, description, ...rest } = props
  return (
    <ChakraFileUploadDropzone ref={ref} {...rest}>
      <Icon fontSize="xl" color="fg.muted">
        <LuUpload />
      </Icon>
      <FileUploadDropzoneContent>
        <div>{label}</div>
        {description && <Text color="fg.muted">{description}</Text>}
      </FileUploadDropzoneContent>
      {children}
    </ChakraFileUploadDropzone>
  )
})

interface VisibilityProps {
  showSize?: boolean
  clearable?: boolean
}

interface FileUploadItemProps extends VisibilityProps {
  file: File
}

const FileUploadItem = React.forwardRef<HTMLLIElement, FileUploadItemProps>(
  function FileUploadItem(props, ref) {
    const { file, showSize, clearable } = props
    return (
      <ChakraFileUploadItem file={file} ref={ref}>
        <FileUploadItemPreview asChild>
          <Icon fontSize="lg" color="fg.muted">
            <LuFile />
          </Icon>
        </FileUploadItemPreview>

        {showSize ? (
          <FileUploadItemContent>
            <FileUploadItemName />
            <FileUploadItemSizeText />
          </FileUploadItemContent>
        ) : (
          <FileUploadItemName flex="1" />
        )}

        {clearable && (
          <FileUploadItemDeleteTrigger asChild>
            <IconButton variant="ghost" color="fg.muted" size="xs">
              <LuX />
            </IconButton>
          </FileUploadItemDeleteTrigger>
        )}
      </ChakraFileUploadItem>
    )
  },
)

interface FileUploadListProps
  extends VisibilityProps,
    FileUploadItemGroupProps {
  files?: File[]
}

export const FileUploadList = React.forwardRef<
  HTMLUListElement,
  FileUploadListProps
>(function FileUploadList(props, ref) {
  const { showSize, clearable, files, ...rest } = props

  const fileUpload = useFileUploadContext()
  const acceptedFiles = files ?? fileUpload.acceptedFiles

  if (acceptedFiles.length === 0) return null

  return (
    <FileUploadItemGroup ref={ref} {...rest}>
      {acceptedFiles.map((file) => (
        <ChakraFileUploadItem
          key={file.name}
          file={file}
          showSize={showSize}
          clearable={clearable}
        />
      ))}
    </FileUploadItemGroup>
  )
})

type Assign<T, U> = Omit<T, keyof U> & U

interface FileInputProps extends Assign<ButtonProps, RecipeProps<"input">> {
  placeholder?: React.ReactNode
}

export const FileInput = React.forwardRef<HTMLButtonElement, FileInputProps>(
  function FileInput(props, ref) {
    const inputRecipe = useRecipe({ key: "input" })
    const [recipeProps, restProps] = inputRecipe.splitVariantProps(props)
    const { placeholder = "Select file(s)", ...rest } = restProps
    return (
      <FileUploadTrigger asChild>
        <Button
          unstyled
          py="0"
          ref={ref}
          {...rest}
          css={[inputRecipe(recipeProps), props.css]}
        >
          <FileUploadContext>
            {({ acceptedFiles }) => {
              if (acceptedFiles.length === 1) {
                return <span>{acceptedFiles[0].name}</span>
              }
              if (acceptedFiles.length > 1) {
                return <span>{acceptedFiles.length} files</span>
              }
              return <Span color="fg.subtle">{placeholder}</Span>
            }}
          </FileUploadContext>
        </Button>
      </FileUploadTrigger>
    )
  },
)

export { FileUploadLabel, FileUploadClearTrigger, FileUploadTrigger }

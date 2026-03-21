import {
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRoot,
  QrCodeRootProps,
} from "@chakra-ui/react/qr-code"
import * as React from "react"

export interface QrCodeProps
  extends Omit<QrCodeRootProps, "fill" | "overlay"> {
  fill?: string
  overlay?: React.ReactNode
}

export const QrCode = React.forwardRef<HTMLDivElement, QrCodeProps>(
  function QrCode(props, ref) {
    const { children, fill, overlay, ...rest } = props
    return (
      <QrCodeRoot ref={ref} {...rest}>
        <QrCodeFrame style={{ fill }}>
          <QrCodePattern />
        </QrCodeFrame>
        {overlay}
        {children && <QrCodeOverlay>{children}</QrCodeOverlay>}
      </QrCodeRoot>
    )
  },
)

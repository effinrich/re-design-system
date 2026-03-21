import { useState } from 'react'
import { useHasUserConsented } from '@redesignhealth/portal/data-assets'
import { Loader } from '@react/ui'

import Terms from '../terms'

interface ConsentCheckerProps {
  children: React.ReactNode
}

/**
 * Validate if the current user has accepted our Terms of Service
 */
const TermsChecker = ({ children }: ConsentCheckerProps) => {
  const { data: hasUserConsented, isFetched: hasUserConsentedFetched } =
    useHasUserConsented()

  const [open, setOpen] = useState(true)

  if (!hasUserConsentedFetched) {
    return <Loader />
  } else if (!hasUserConsented) {
    return <Terms isAskingConsent isOpen={open} onClose={() => setOpen(false)} />
  } else {
    return children
  }
}

export default TermsChecker

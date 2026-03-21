import {
  StepsCompletedContent,
  StepsContent,
  StepsDescription,
  StepsIndicator as ChakraStepsIndicator,
  StepsItem as ChakraStepsItem,
  StepsItemProps as ChakraStepsItemProps,
  StepsList,
  StepsNextTrigger,
  StepsNumber,
  StepsPrevTrigger,
  StepsRoot,
  StepsSeparator,
  StepsStatus,
  StepsTitle,
  StepsTrigger,
} from "@chakra-ui/react/steps"
import { Box } from "@chakra-ui/react"
import * as React from "react"
import { LuCheck } from "react-icons/lu"

interface StepInfoProps {
  title?: React.ReactNode
  description?: React.ReactNode
}

export interface StepsItemProps
  extends Omit<ChakraStepsItemProps, "title">,
    StepInfoProps {
  completedIcon?: React.ReactNode
  icon?: React.ReactNode
}

export const StepsItem = React.forwardRef<HTMLDivElement, StepsItemProps>(
  function StepsItem(props, ref) {
    const { title, description, completedIcon, icon, ...rest } = props
    return (
      <ChakraStepsItem {...rest} ref={ref}>
        <StepsTrigger>
          <ChakraStepsIndicator>
            <StepsStatus
              complete={completedIcon || <LuCheck />}
              incomplete={icon || <StepsNumber />}
            />
          </ChakraStepsIndicator>
          <StepInfo title={title} description={description} />
        </StepsTrigger>
        <StepsSeparator />
      </ChakraStepsItem>
    )
  },
)

const StepInfo = (props: StepInfoProps) => {
  const { title, description } = props

  if (title && description) {
    return (
      <Box>
        <StepsTitle>{title}</StepsTitle>
        <StepsDescription>{description}</StepsDescription>
      </Box>
    )
  }

  return (
    <>
      {title && <StepsTitle>{title}</StepsTitle>}
      {description && (
        <StepsDescription>{description}</StepsDescription>
      )}
    </>
  )
}

interface StepsIndicatorProps {
  completedIcon: React.ReactNode
  icon?: React.ReactNode
}

export const StepsIndicator = React.forwardRef<
  HTMLDivElement,
  StepsIndicatorProps
>(function StepsIndicator(props, ref) {
  const { icon = <StepsNumber />, completedIcon } = props
  return (
    <ChakraStepsIndicator ref={ref}>
      <StepsStatus complete={completedIcon} incomplete={icon} />
    </ChakraStepsIndicator>
  )
})

export { StepsList, StepsRoot, StepsContent, StepsCompletedContent, StepsNextTrigger, StepsPrevTrigger }

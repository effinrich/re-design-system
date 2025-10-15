import { render, screen, testA11y } from '@redesignhealth/shared-utils-jest'

import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps
} from './stepper'
import { Box } from '../box/box'

const TestStepper = ({ activeStep = 0 }: { activeStep?: number }) => {
  const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' }
  ]

  return (
    <Stepper index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus complete={`✓`} incomplete={`${index + 1}`} active={`${index + 1}`} />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}

describe('Stepper', () => {
  test('should have no accessibility issues', async () => {
    await testA11y(<TestStepper />)
  })

  test('renders all steps', () => {
    render(<TestStepper />)

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
  })

  test('renders step descriptions', () => {
    render(<TestStepper />)

    expect(screen.getByText('Contact Info')).toBeInTheDocument()
    expect(screen.getByText('Date & Time')).toBeInTheDocument()
    expect(screen.getByText('Select Rooms')).toBeInTheDocument()
  })

  test('shows first step as active by default', () => {
    render(<TestStepper activeStep={0} />)

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('shows correct active step', () => {
    render(<TestStepper activeStep={1} />)

    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  test('displays completion indicator for completed steps', () => {
    render(<TestStepper activeStep={2} />)

    const checkmarks = screen.getAllByText('✓')
    expect(checkmarks.length).toBeGreaterThanOrEqual(2)
  })
})

describe('useSteps hook', () => {
  const TestComponent = () => {
    const { activeStep, setActiveStep } = useSteps({
      index: 0,
      count: 3
    })

    return (
      <div>
        <p>Current Step: {activeStep}</p>
        <button onClick={() => setActiveStep(1)}>Go to Step 2</button>
        <button onClick={() => setActiveStep(2)}>Go to Step 3</button>
      </div>
    )
  }

  test('initializes with correct step index', () => {
    render(<TestComponent />)

    expect(screen.getByText('Current Step: 0')).toBeInTheDocument()
  })

  test('updates active step when setActiveStep is called', async () => {
    const { user } = render(<TestComponent />)

    const button = screen.getByText('Go to Step 2')
    await user.click(button)

    expect(screen.getByText('Current Step: 1')).toBeInTheDocument()
  })

  test('can navigate to different steps', async () => {
    const { user } = render(<TestComponent />)

    const step3Button = screen.getByText('Go to Step 3')
    await user.click(step3Button)

    expect(screen.getByText('Current Step: 2')).toBeInTheDocument()
  })
})

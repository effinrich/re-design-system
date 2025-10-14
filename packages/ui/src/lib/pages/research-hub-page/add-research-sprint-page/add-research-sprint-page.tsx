import { SectionHeader } from '@react/ui'

import AddResearchSprintForm from './add-research-sprint-form'

const AddResearchSprintPage = () => {
  return (
    <>
      <SectionHeader title="Add research sprint" mb="6" isDivider={false} />
      <AddResearchSprintForm />
    </>
  )
}

export default AddResearchSprintPage

import { SectionHeader } from '@react/ui'

import AddCallNoteForm from './add-call-note-form'

const AddCallNotePage = () => {
  return (
    <>
      <SectionHeader title="Add call note" isDivider={false} mb="6" />
      <AddCallNoteForm />
    </>
  )
}

export default AddCallNotePage

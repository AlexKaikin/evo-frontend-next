//import { Field, Form, Formik } from 'formik'
import { PostNoteItemType } from '@/types/club/notes'
import {BsSend} from 'react-icons/bs'
import { useActions } from '@/hooks/useActions'

type PropsType = {
  user_Id: string
}

function CreateNote({ user_Id }: PropsType) {
  const { getNotes, createNote } = useActions()
  const formState: PostNoteItemType = {
    id: 1,
    text: '',
    tags: [],
    galleryUrl: [],
    published: true,
    user: user_Id,
    group: null,
    created: '',
  }

  function textValidate(value: string) {
    if (!value) return 'Пожалуйста, напишите заметку'
  }

  async function formSubmit(values: PostNoteItemType, { resetForm }: any) {
    const res: any = await createNote(values)
    if (res === 'ok') getNotes(user_Id, 'user')
    resetForm()
  }

  return (
    <div className="user__new-note">
      {/* <Formik initialValues={formState} onSubmit={formSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className="form__field">
              <Field
                type="text"
                as="textarea"
                name="text"
                validate={textValidate}
                placeholder="Новая запись"
              ></Field>
              <button type="submit" className="btn new-note__send">
                <SendSVG />
              </button>
            </div>
            {errors.text && touched.text && (
              <div className="form__text_error">{errors.text}</div>
            )}
          </Form>
        )}
      </Formik> */}
    </div>
  )
}

export default CreateNote

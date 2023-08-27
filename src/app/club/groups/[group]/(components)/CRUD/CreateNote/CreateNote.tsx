import { useActions } from '@/hooks/useActions'
import { CreateNote } from '@/types/club/notes'
import { useForm } from 'react-hook-form'
import { BsSend } from 'react-icons/bs'

interface IProps {
  group_id: string
}

export default function CreateNote({ group_id }: IProps) {
  const { getNotes, createNote } = useActions()
  const { register, handleSubmit, formState, reset } = useForm<CreateNote>()
  const { errors } = formState

  const textValidate = {
    required: {
      value: true,
      message: 'Пожалуйста, напишите заметку',
    },
  }

  async function onSubmit(data: CreateNote) {
    data.user = null
    data.group = group_id
    const res: any = await createNote(data)
    if (res === 'ok') getNotes(group_id, 'group')
    reset()
  }

  return (
    <div className="group__new-note">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <textarea
            {...register('text', textValidate)}
            name="text"
            placeholder="Новая запись"
          />
          <button type="submit" className="new-note__send">
            <BsSend />
          </button>
        </div>
        {errors.text && (
          <div className="form__text_error">{errors.text.message}</div>
        )}
      </form>
    </div>
  )
}

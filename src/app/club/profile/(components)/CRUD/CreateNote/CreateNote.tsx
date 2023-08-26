import { useActions } from '@/hooks/useActions'
import { CreateNote } from '@/types/club/notes'
import { useForm } from 'react-hook-form'
import { BsSend } from 'react-icons/bs'

interface IProps {
  user_Id: string
}

export default function CreateNote({ user_Id }: IProps) {
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
    data.user = user_Id
    data.group = null
    const res: any = await createNote(data)
    if (res === 'ok') getNotes(user_Id, 'user')
    reset()
  }

  return (
    <div className="user__new-note">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <textarea
            {...register('text', textValidate)}
            name="text"
            placeholder="Новая запись"
          />
          <button type="submit" className="btn new-note__send">
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

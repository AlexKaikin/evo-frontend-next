import cn from 'classnames'
import { BsXLg } from 'react-icons/bs'
import './Modal.scss'

interface IProps {
  title: string
  full?: boolean
  children: any
  hideModal: () => void
  modalMaxContent?: boolean
}

export default function Modal({
  title,
  full,
  hideModal,
  children,
  modalMaxContent,
}: IProps) {
  return (
    <div className={cn('modal', { full: full })} onClick={hideModal}>
      <div
        className={cn('modal__wrapper', { maxContent: modalMaxContent })}
        onClick={e => e.stopPropagation()}
      >
        <div className={cn('modal__header', { noHeader: !title.length })}>
          {!!title.length && <div className="modal__title">{title}</div>}
          <div className="modal__close" onClick={hideModal}>
            <BsXLg />
          </div>
        </div>
        <div className="modal__body">
          <div className="modal__content">{children}</div>
        </div>
      </div>
    </div>
  )
}

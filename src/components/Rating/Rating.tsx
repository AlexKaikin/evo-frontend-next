import { BsStar, BsStarFill } from 'react-icons/bs'

interface IProps {
  number: number
}

export default function Rating({ number }: IProps) {
  let ratingStarFill: string[] = [] // полные звёзды
  let ratingStar: string[] = [] // пустые звезды
  
  if (number > 0) {
    ratingStarFill = Array(number).fill('ratingStarFill')
    if (number < 5) ratingStar = Array(5 - number).fill('ratingStar')
  }

  return (
    <>
      {ratingStarFill.length > 0 &&
        ratingStarFill.map((star, i) => <BsStarFill key={i} />)}
      {ratingStar.length > 0 && ratingStar.map((star, i) => <BsStar key={i} />)}
    </>
  )
}

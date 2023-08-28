'use client'

import { useActions } from '@/hooks/useActions'
import { recommendationsSelector } from '@/store/club/recommendations/recommendations'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Recommendations from '../(components)/Recommendations/Recommendations'
import { EventItems } from './(components)'
import './styles.scss'

export default function Events() {
  const { getEvents, getRecommendations } = useActions()
  const { recommendItems } = useSelector(recommendationsSelector)

  useEffect(() => {
    getEvents()
    getRecommendations()
  }, [getEvents, getRecommendations])

  return (
    <section className="club">
      <div className="club__content events">
        <EventItems />
      </div>
      <Recommendations recommendItems={recommendItems} />
    </section>
  )
}

'use client'

import { useActions } from '@/hooks/useActions'
import { groupsSelector } from '@/store/club/groups/groups'
import { scrollToTop } from '@/utils'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AddGroupButton, GroupItems, SearchGroup } from './(components)'
import './styles.scss'

export default function Groups() {
  const { getGroups } = useActions()
  const { groupItems, filter, status } = useSelector(groupsSelector)
  useEffect(() => {
    getGroups()
    scrollToTop()
  }, [getGroups, filter])
  return (
    <div className="club__groups">
      <div className="groups__control">
        <SearchGroup />
        <AddGroupButton />
      </div>
      <GroupItems items={groupItems} status={status} />
    </div>
  )
}

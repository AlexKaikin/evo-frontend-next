import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { actions } from '@/store/actions'
import { useAppDispatch } from '@/store/store'

export function useActions() {
  const dispatch = useAppDispatch()
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}

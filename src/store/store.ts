'use client'

import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  account,
  admin,
  auth,
  club,
  navigation,
  posts,
  products,
  theme,
} from '.'

export const store = configureStore({
  reducer: {
    theme,
    navigation,
    auth,
    ...posts,
    ...club,
    ...products,
    ...admin,
    ...account,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

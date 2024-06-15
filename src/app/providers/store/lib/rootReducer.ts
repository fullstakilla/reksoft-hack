import { sessionSlice } from '@/entities/session'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
})
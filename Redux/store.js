import { configureStore } from '@reduxjs/toolkit'
import locationSlice from './locationSlice'
import accelerometerSlice from './accelerometerSlice'

export const store = configureStore({
  reducer: {
    locationData: locationSlice,
    accelerationData: accelerometerSlice
  },
})
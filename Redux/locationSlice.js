import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  errMsg: false,
  data: {
    speed: '...',
    heading: '...',
    longitude: '...',
    latitude: '...'
  }
}

export const locationSlice = createSlice({
  name: 'locationData',
  initialState,
  reducers: {
    setErrMsg: (state, action) => {
      state.errMsg = action.payload
    },
    setLocationData: (state, action) => {
      state.data = action.payload
    }
  },
})

export const { setErrMsg, setLocationData } = locationSlice.actions

export default locationSlice.reducer
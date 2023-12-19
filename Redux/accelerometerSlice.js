import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  adjustedY: 0,
  direction: "steady",
}

export const accelerometerSlice = createSlice({
  name: 'accelerationData',
  initialState,
  reducers: {
    setAdjustedY: (state, action) => {
      state.adjustedY = action.payload
    },
    setDirection: (state, action) => {
      state.direction = action.payload
    },
  },
})

export const { setAdjustedY, setDirection } = accelerometerSlice.actions

export default accelerometerSlice.reducer
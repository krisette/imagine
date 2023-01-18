/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TripState {
  start_date: string;
  end_date: string;
  resort: string;
  parks: string[];
  hotel: string;
}

const initialState: TripState = {
  start_date: '',
  end_date: '',
  resort: '',
  parks: [],
  hotel: '',
};

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.start_date = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.end_date = action.payload;
    },
    setResort: (state, action: PayloadAction<string>) => {
      state.resort = action.payload;
    },
    setParks: (state, action: PayloadAction<string[]>) => {
      state.parks = action.payload;
    },
    setHotel: (state, action: PayloadAction<string>) => {
      state.hotel = action.payload;
    },
  },
});

export const {
  setStartDate, setEndDate, setResort, setParks, setHotel,
} = tripSlice.actions;

export default tripSlice.reducer;

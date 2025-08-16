import {createSlice} from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    weatherData: null,
    location: {cityName: '', countryName: ''},
  },
  reducers: {
    setWeather: (state, action) => {
      state.weatherData = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});
export const {setWeather, setLocation} = userSlice.actions;
export default userSlice.reducer;
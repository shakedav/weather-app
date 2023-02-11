import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getLocationWeather = (state: AppState) => state.weather.locationWeather;
const get5DaysForecast = (state: AppState) => state.weather.location5DaysForecast;
const getCurrentLocationCoordinates = (state: AppState) => state.weather.currentLocationCoordinates;

export const getLocationWeatherSelector = createSelector(getLocationWeather, (locationWeather) => locationWeather);
export const get5DaysForecastSelector = createSelector(get5DaysForecast, (locationWeather) => locationWeather);
export const getCurrentLocationCoordinatesSelector = createSelector(getCurrentLocationCoordinates, (currentLocationCoordinates) => currentLocationCoordinates);
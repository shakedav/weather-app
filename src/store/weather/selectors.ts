import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getLocationData = (state: AppState) => state.weather.locationData;
const getLocationWeather = (state: AppState) => state.weather.locationWeather;
const get5DaysForecast = (state: AppState) => state.weather.location5DaysForecast;
const getCurrentLocationCoordinates = (state: AppState) => state.weather.currentLocationCoordinates;
const getIsLocationDataPending= (state: AppState) => state.weather.isLocationDataPending;
const getIsCurrentLocationCoordinatesPending = (state: AppState) => state.weather.isCurrentLocationCoordinatesPending;
const getIsLocation5DaysForecastPending = (state: AppState) => state.weather.isLocation5DaysForecastPending;
const getIsLocationWeatherPending= (state: AppState) => state.weather.isLocationWeatherPending;

export const getIsLocationDataPendingSelector = createSelector(getIsLocationDataPending, (isPending) => isPending);
export const getIsCurrentLocationCoordinatesPendingSelector = createSelector(getIsCurrentLocationCoordinatesPending, (isPending) => isPending);
export const getIsLocation5DaysForecastPendingSelector = createSelector(getIsLocation5DaysForecastPending, (isPending) => isPending);
export const getIsLocationWeatherPendingSelector = createSelector(getIsLocationWeatherPending, (isPending) => isPending);
export const getLocationWeatherSelector = createSelector(getLocationWeather, (locationWeather) => locationWeather);
export const getLocationDataSelector = createSelector(getLocationData, (locationKey) => locationKey);
export const get5DaysForecastSelector = createSelector(get5DaysForecast, (locationWeather) => locationWeather);
export const getCurrentLocationCoordinatesSelector = createSelector(getCurrentLocationCoordinates, (currentLocationCoordinates) => currentLocationCoordinates);
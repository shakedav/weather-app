import { I5DaysForeCastRequest } from "../../interfaces/five-days-forecast-request.interface";
import { I5DaysForecast } from "../../interfaces/forecast.interface";
import { ILocationData } from "../../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../../interfaces/location-weather.interface";
import {
  FETCH_5_DAYS_FORECAST_REQUEST,
  FETCH_5_DAYS_FORECAST_SUCCESS,
  FETCH_LOCATION_COORDS_REQUEST,
  FETCH_LOCATION_COORDS_SUCCESS,
  FETCH_LOCATION_DATA_REQUEST,
  FETCH_LOCATION_DATA_SUCCESS,
    FETCH_LOCATION_WEATHER_REQUEST,
    FETCH_LOCATION_WEATHER_SUCCESS
  } from "./actionTypes";
import { IPosition } from "./location.helper";
  import {
    FetchLocationWeatherRequest,
    FetchLocationDataRequest,
    FetchLocationWeatherSuccess,
    FetchLocationKeySuccess as FetchLocationDataSuccess,
    FetchLocationCoordsSuccess,
    FetchLocationCoordsRequest,
    Fetch5DaysForecastRequest,
    Fetch5DaysForecastSuccess,
  } from "./types";

  export const fetchLocationWeatherRequest = (payload: string): FetchLocationWeatherRequest => ({
    type: FETCH_LOCATION_WEATHER_REQUEST,
    payload
  });

  export const fetchLocationWeatherSuccess = (
    payload: ILocationWeather
  ): FetchLocationWeatherSuccess => ({
    type: FETCH_LOCATION_WEATHER_SUCCESS,
    payload
  });

  export const fetchLocationCoordsRequest = (): FetchLocationCoordsRequest => ({
    type: FETCH_LOCATION_COORDS_REQUEST    
  });

  export const fetchLocationCoordsSuccess = (payload: IPosition): FetchLocationCoordsSuccess => ({
    type: FETCH_LOCATION_COORDS_SUCCESS,
    payload
  });

  export const fetchLocationDataRequest = (payload: IPosition): FetchLocationDataRequest => ({
    type: FETCH_LOCATION_DATA_REQUEST,
    payload
  })

  export const fetchLocationDataSuccess = (payload: ILocationData): FetchLocationDataSuccess => ({
    type: FETCH_LOCATION_DATA_SUCCESS,
    payload
  })

  export const fetch5DaysForcastRequest = (payload: I5DaysForeCastRequest): Fetch5DaysForecastRequest => ({
    type: FETCH_5_DAYS_FORECAST_REQUEST,
    payload
  });

  export const fetch5DaysForcastSuccess = (payload: I5DaysForecast): Fetch5DaysForecastSuccess => ({
    type: FETCH_5_DAYS_FORECAST_SUCCESS,
    payload
  });
  
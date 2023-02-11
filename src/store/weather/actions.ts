import { IAutocompleteResult } from "../../interfaces/autocomplete.interface";
import { I5DaysForecast } from "../../interfaces/forecast.interface";
import { ILocationMetaData } from "../../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../../interfaces/location-weather.interface";
import {
  FETCH_5_DAYS_FORECAST_REQUEST,
  FETCH_5_DAYS_FORECAST_SUCCESS,
  FETCH_LOCATION_COORDS_REQUEST,
  FETCH_LOCATION_COORDS_SUCCESS,
  FETCH_LOCATION_KEY_REQUEST,
  FETCH_LOCATION_KEY_SUCCESS,
    FETCH_LOCATION_WEATHER_REQUEST,
    FETCH_LOCATION_WEATHER_SUCCESS
  } from "./actionTypes";
import { IPosition } from "./location.helper";
  import {
    FetchLocationWeatherRequest,
    FetchLocationKeyRequest,
    FetchLocationWeatherSuccess,
    FetchLocationKeySuccess,
    FetchLocationCoordsSuccess,
    FetchLocationCoordsRequest,
    Fetch5DaysForecastRequest,
    Fetch5DaysForecastSuccess,
  } from "./types";

  export const fetchLocationWeatherRequest = (payload: number): FetchLocationWeatherRequest => ({
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

  export const fetchLocationKeyRequest = (payload: IPosition): FetchLocationKeyRequest => ({
    type: FETCH_LOCATION_KEY_REQUEST,
    payload
  })

  export const fetchLocationKeySuccess = (payload: ILocationMetaData): FetchLocationKeySuccess => ({
    type: FETCH_LOCATION_KEY_SUCCESS,
    payload
  })

  export const fetch5DaysForcastRequest = (payload: number): Fetch5DaysForecastRequest => ({
    type: FETCH_5_DAYS_FORECAST_REQUEST,
    payload
  });

  export const fetch5DaysForcastSuccess = (payload: I5DaysForecast): Fetch5DaysForecastSuccess => ({
    type: FETCH_5_DAYS_FORECAST_SUCCESS,
    payload
  });

  // export const fetchAutoCompleteRequest = (payload: string): FetchAutoCompleteRequest => ({
  //   type: FETCH_AUTO_COMPLETE_REQUEST,
  //   payload
  // });

  // export const fetchAutoCompleteSuccess = (payload: IAutocompleteResult): FetchAutoCompleteSuccess => ({
  //   type: FETCH_AUTO_COMPLETE_SUCCESS,
  //   payload
  // });

  
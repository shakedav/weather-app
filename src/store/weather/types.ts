import { IErrorMessage } from "../../interfaces/error.interface";
import { I5DaysForeCastRequest } from "../../interfaces/five-days-forecast-request.interface";
import { I5DaysForecast } from "../../interfaces/forecast.interface";
import { ILocationData } from "../../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../../interfaces/location-weather.interface";
import { FETCH_5_DAYS_FORECAST_REQUEST, FETCH_5_DAYS_FORECAST_SUCCESS, FETCH_LOCATION_COORDS_REQUEST, FETCH_LOCATION_COORDS_SUCCESS, FETCH_LOCATION_DATA_BY_KEY_REQUEST, FETCH_LOCATION_DATA_REQUEST, FETCH_LOCATION_DATA_SUCCESS, FETCH_LOCATION_WEATHER_REQUEST, FETCH_LOCATION_WEATHER_SUCCESS, FETCH_REQUEST_FAILED, RESET_ERROR_REQUEST } from "./actionTypes";
import { IPosition } from "../../helpers/location.helper";
  
  
  export interface WeatherState {
    locationWeather: ILocationWeather | null;
    isLocationWeatherPending: boolean;
    location5DaysForecast: I5DaysForecast | null;
    isLocation5DaysForecastPending: boolean;
    currentLocationCoordinates: IPosition | null;
    isCurrentLocationCoordinatesPending: boolean;
    locationData: ILocationData | null;
    isLocationDataPending: boolean;
    error: string | null;
  }
  
  export type FetchLocationWeatherRequest = {
    type: typeof FETCH_LOCATION_WEATHER_REQUEST;
    payload: string
  };
  
  export type FetchLocationWeatherSuccess = {
    type: typeof FETCH_LOCATION_WEATHER_SUCCESS;
    payload: ILocationWeather;
  };

  export type FetchLocationDataRequest = {
    type: typeof FETCH_LOCATION_DATA_REQUEST;
    payload: IPosition
  }

  export type FetchLocationDataByKeyRequest = {
    type: typeof FETCH_LOCATION_DATA_BY_KEY_REQUEST;
    payload: string
  }  

  export type FetchLocationKeySuccess = {
    type: typeof FETCH_LOCATION_DATA_SUCCESS;
    payload: ILocationData
  }

  export type FetchLocationCoordsRequest = {
    type: typeof FETCH_LOCATION_COORDS_REQUEST
  }

  export type FetchLocationCoordsSuccess = {
    type: typeof FETCH_LOCATION_COORDS_SUCCESS
    payload: IPosition
  }

  export type Fetch5DaysForecastRequest = {
    type: typeof FETCH_5_DAYS_FORECAST_REQUEST;
    payload: I5DaysForeCastRequest;
  }

  export type Fetch5DaysForecastSuccess = {
    type: typeof FETCH_5_DAYS_FORECAST_SUCCESS
    payload: I5DaysForecast
  }

  export type FetchRequestFailed = {
    type: typeof FETCH_REQUEST_FAILED;
    payload: string
  }

  export type ResetErrorRequest = {
    type: typeof RESET_ERROR_REQUEST;
  }

  export type WeatherActions =
    | FetchLocationWeatherRequest
    | FetchLocationWeatherSuccess
    | FetchLocationDataRequest
    | FetchLocationDataByKeyRequest
    | FetchLocationKeySuccess
    | FetchLocationCoordsRequest
    | FetchLocationCoordsSuccess
    | Fetch5DaysForecastRequest
    | Fetch5DaysForecastSuccess
    | FetchRequestFailed
    | ResetErrorRequest
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetch5DaysForecast, fetchLocationKey, fetchLocationWeather } from "../../API";
import { I5DaysForecast } from "../../interfaces/forecast.interface";
import { ILocationMetaData } from "../../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../../interfaces/location-weather.interface";

import { fetch5DaysForcastSuccess, fetchLocationCoordsSuccess, fetchLocationKeySuccess, fetchLocationWeatherSuccess } from "./actions";
import { FETCH_5_DAYS_FORECAST_REQUEST, FETCH_LOCATION_COORDS_REQUEST, FETCH_LOCATION_KEY_REQUEST, FETCH_LOCATION_WEATHER_REQUEST } from "./actionTypes";
import { getUserLocation, IGeoLocation } from "./location.helper";
import { FetchLocationWeatherRequest, FetchLocationKeyRequest, FetchLocationCoordsSuccess, Fetch5DaysForecastRequest } from './types';

interface IFetchType<T> {
  type: string;
  payload: T
}

function* fetchLocationWeatherSaga({payload} :any) {
  try {
    const response: AxiosResponse<ILocationWeather> = yield call(fetchLocationWeather, payload);
    yield put(fetchLocationWeatherSuccess(response.data));
  } catch (e: any) {
    console.log(e)
    // yield put(
    //   fetchTodoFailure({
    //     error: e.message,
    //   })
    // );
  }
}

function* fetch5DaysForecastSaga({payload} :any) {
  try {
    const response: AxiosResponse<I5DaysForecast> = yield call(fetch5DaysForecast, payload);
    yield put(fetch5DaysForcastSuccess(response.data));
  } catch (e: any) {
    console.log(e)
    // yield put(
    //   fetchTodoFailure({
    //     error: e.message,
    //   })
    // );
  }
}

function* fetchLocationKeySaga({payload}: any) {
  try {
    const response: AxiosResponse<ILocationMetaData> = yield call(fetchLocationKey, payload);
    yield put(fetchLocationKeySuccess(response.data));
  } catch(e: any) {
    console.log(e);
  }
}

function* fetchLocationCoordsSaga() {
  const position: IGeoLocation = yield getUserLocation();
  
  const coords = {lon: position.coords.longitude, lat: position.coords.latitude};
  yield put(fetchLocationCoordsSuccess(coords))
}

function* weatherSaga() {
  yield takeEvery<IFetchType<FetchLocationWeatherRequest>>(FETCH_LOCATION_WEATHER_REQUEST, fetchLocationWeatherSaga);
  yield takeEvery<IFetchType<Fetch5DaysForecastRequest>>(FETCH_5_DAYS_FORECAST_REQUEST, fetch5DaysForecastSaga);  
  yield takeEvery<IFetchType<FetchLocationKeyRequest>>(FETCH_LOCATION_KEY_REQUEST, fetchLocationKeySaga);
  yield takeEvery<IFetchType<FetchLocationCoordsSuccess>>(FETCH_LOCATION_COORDS_REQUEST, fetchLocationCoordsSaga);
}

export default weatherSaga;
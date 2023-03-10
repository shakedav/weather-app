import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetch5DaysForecast, fetchLocationData, fetchLocationDataByKey, fetchLocationWeather } from "../../API";
import { I5DaysForecast } from "../../interfaces/forecast.interface";
import { ILocationData, ILocationMetaData } from "../../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../../interfaces/location-weather.interface";

import { fetch5DaysForcastSuccess, fetchLocationCoordsSuccess, fetchLocationDataSuccess, fetchLocationWeatherSuccess, fetchRequestFailed } from "./actions";
import { FETCH_5_DAYS_FORECAST_REQUEST, FETCH_LOCATION_COORDS_REQUEST, FETCH_LOCATION_DATA_BY_KEY_REQUEST, FETCH_LOCATION_DATA_REQUEST, FETCH_LOCATION_WEATHER_REQUEST } from "./actionTypes";
import { getUserLocation, IGeoLocation } from "../../helpers/location.helper";
import { FetchLocationWeatherRequest, FetchLocationDataRequest, FetchLocationCoordsSuccess, Fetch5DaysForecastRequest, FetchLocationDataByKeyRequest } from './types';

interface IFetchType<T> {
  type: string;
  payload: T
}

function* fetchLocationDataSaga({payload}: any) {
  try {
    const response: AxiosResponse<ILocationMetaData> = yield call(fetchLocationData, payload);
    const data: ILocationData = {
      name: response.data.EnglishName,
      type: response.data.Type,
      key: response.data.Key,
      country: response.data.Country.EnglishName,
    }
    yield put(fetchLocationDataSuccess(data));
  } catch (e: any) {
    yield put(fetchRequestFailed(e.message)
    );
  }
}

function* fetchLocationDataByKeySaga({payload}: any) {
  try {
    const response: AxiosResponse<ILocationMetaData> = yield call(fetchLocationDataByKey, payload);
    const data: ILocationData = {
      name: response.data.EnglishName,
      type: response.data.Type,
      key: response.data.Key,
      country: response.data.Country.EnglishName,
    }
    yield put(fetchLocationDataSuccess(data));
  } catch (e: any) {
    yield put(fetchRequestFailed(e.message)
    );
  }
}

function* fetchLocationCoordsSaga() {
  try {
    const position: IGeoLocation = yield getUserLocation();  
    const coords = {lon: position.coords.longitude, lat: position.coords.latitude};
    yield put(fetchLocationCoordsSuccess(coords))
  } catch (e: any) {
    yield put(fetchRequestFailed(e.message)
    );
  }
}

function* fetchLocationWeatherSaga({payload}: any) {
  try {
    const response: AxiosResponse<ILocationWeather[]> = yield call(fetchLocationWeather, payload);
    yield put(fetchLocationWeatherSuccess(response.data[0]));
  } catch (e: any) {
    yield put(fetchRequestFailed(e.message)
    );
  }
}

function* fetch5DaysForecastSaga({payload} :any) {
  try {
    const response: AxiosResponse<I5DaysForecast> = yield call(fetch5DaysForecast, payload);
    yield put(fetch5DaysForcastSuccess(response.data));
  } catch (e: any) {
    yield put(fetchRequestFailed(e.message)
    );
  }
}

function* weatherSaga() {
  yield takeLatest<IFetchType<FetchLocationWeatherRequest>>(FETCH_LOCATION_WEATHER_REQUEST, fetchLocationWeatherSaga);
  yield takeLatest<IFetchType<Fetch5DaysForecastRequest>>(FETCH_5_DAYS_FORECAST_REQUEST, fetch5DaysForecastSaga);  
  yield takeLatest<IFetchType<FetchLocationDataRequest>>(FETCH_LOCATION_DATA_REQUEST, fetchLocationDataSaga);
  yield takeLatest<IFetchType<FetchLocationDataByKeyRequest>>(FETCH_LOCATION_DATA_BY_KEY_REQUEST, fetchLocationDataByKeySaga);  
  yield takeLatest<IFetchType<FetchLocationCoordsSuccess>>(FETCH_LOCATION_COORDS_REQUEST, fetchLocationCoordsSaga);
}

export default weatherSaga;
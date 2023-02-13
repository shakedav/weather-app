import axios, { AxiosResponse } from "axios";
import { I5DaysForeCastRequest } from "../interfaces/five-days-forecast-request.interface";
import { I5DaysForecast } from "../interfaces/forecast.interface";
import { ILocationData } from "../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../interfaces/location-weather.interface";
import { IPosition } from "../store/weather/location.helper";

export function fetchLocationWeather(locationKey: string): Promise<AxiosResponse<ILocationWeather[]>> {
  return axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`)
} 

export function fetch5DaysForecast(payload: I5DaysForeCastRequest): Promise<AxiosResponse<I5DaysForecast>> {
  return axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${payload.locationKey}?apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}&metric=${payload.isMetric}`);
} 

export function fetchLocationData(locationCoordinates: IPosition): Promise<AxiosResponse<ILocationData>> {
  return axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${locationCoordinates.lat},${locationCoordinates.lon}&apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`)
} 
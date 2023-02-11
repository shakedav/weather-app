import axios, { AxiosResponse } from "axios";
import { I5DaysForecast } from "../interfaces/forecast.interface";
import { ILocationMetaData } from "../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../interfaces/location-weather.interface";
import { IPosition } from "../store/weather/location.helper";

export function fetchLocationWeather(locationKey: number): any {
// Promise<AxiosResponse<ILocationWeather>> {
    return {data: {"LocalObservationDateTime":"2023-02-10T17:33:00+02:00","EpochTime":1676043180,"WeatherText":"Clear","WeatherIcon":33,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":false,"Temperature":{"Metric":{"Value":15.4,"Unit":"C","UnitType":17},"Imperial":{"Value":60.0,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us","Link":"http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"}};
    
    // return axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`)
} 

export function fetch5DaysForecast(locationKey: number): any {
    // Promise<AxiosResponse<I5DaysForecast>> {
        return {data: {"LocalObservationDateTime":"2023-02-10T17:33:00+02:00","EpochTime":1676043180,"WeatherText":"Clear","WeatherIcon":33,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":false,"Temperature":{"Metric":{"Value":15.4,"Unit":"C","UnitType":17},"Imperial":{"Value":60.0,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us","Link":"http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"}};
        
    // return axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`);
} 

export function fetchLocationKey(locationCoordinates: IPosition):any {
    // Promise<AxiosResponse<ILocationMetaData>> {
      return {
        data: {
            "Version":1,
            "Key":"212515",
            "Type":"City",
            "Rank":75,
            "LocalizedName":"Givat HaShelosha",
            "EnglishName":"Givat HaShelosha",
            "PrimaryPostalCode":"",
            "Region": {
                "ID":"MEA",
                "LocalizedName":
                "Middle East",
                "EnglishName":"Middle East"
            },
            "Country":{"ID":"IL","LocalizedName":"Israel","EnglishName":"Israel"},
            "AdministrativeArea":{
                "ID":"M","LocalizedName":"Central District","EnglishName":"Central District","Level":1,"LocalizedType":"District", 
                "EnglishType":"District","CountryID":"IL"
            },
            "TimeZone":{
                "Code":"IST",
                "Name":"Asia/Jerusalem",
                "GmtOffset":2.0,
                "IsDaylightSaving":false,
                "NextOffsetChange":"2023-03-24T00:00:00Z"},
                "GeoPosition":{"Latitude":32.097,"Longitude":34.92,
            "Elevation":{
                "Metric":{"Value":38.0,"Unit":"m","UnitType":5},
            "Imperial":{"Value":124.0,"Unit":"ft","UnitType":0}}},
            "IsAlias":false,"SupplementalAdminAreas":[],
            "DataSets":["AirQualityCurrentConditions","AirQualityForecasts","Alerts","DailyPollenForecast","ForecastConfidence","FutureRadar","MinuteCast"]
        }
    };
      
    //   return axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${locationCoordinates.lat},${locationCoordinates.lon}&apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`)
  } 
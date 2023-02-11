import axios, { AxiosResponse } from "axios";
import { I5DaysForeCastRequest } from "../interfaces/five-days-forecast-request.interface";
import { I5DaysForecast } from "../interfaces/forecast.interface";
import { ILocationData } from "../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../interfaces/location-weather.interface";
import { IPosition } from "../store/weather/location.helper";

export function fetchLocationWeather(locationKey: string): any {
// Promise<AxiosResponse<ILocationWeather>> {
    return {data: [{"LocalObservationDateTime":"2023-02-10T17:33:00+02:00","EpochTime":1676043180,"WeatherText":"Clear","WeatherIcon":33,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":false,"Temperature":{"Metric":{"Value":15.4,"Unit":"C","UnitType":17},"Imperial":{"Value":60.0,"Unit":"F","UnitType":18}},"MobileLink":"http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us","Link":"http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"}]};
    
    // return axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`)
} 

export function fetch5DaysForecast(payload: I5DaysForeCastRequest): any {
    // Promise<AxiosResponse<I5DaysForecast>> {
        // return axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${payload.locationKey}?apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}&metric=${payload.isMetric}`);

        return {data: 
            {
                "Headline": {
                  "EffectiveDate": "2023-02-11T19:00:00-03:00",
                  "EffectiveEpochDate": 1676152800,
                  "Severity": 5,
                  "Text": "A thunderstorm this evening",
                  "Category": "thunderstorm",
                  "EndDate": "2023-02-12T01:00:00-03:00",
                  "EndEpochDate": 1676174400,
                  "MobileLink": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?unit=c&lang=en-us",
                  "Link": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?unit=c&lang=en-us"
                },
                "DailyForecasts": [
                  {
                    "Date": "2023-02-11T07:00:00-03:00",
                    "EpochDate": 1676109600,
                    "Temperature": {
                      "Minimum": {
                        "Value": 19.4,
                        "Unit": "C",
                        "UnitType": 17
                      },
                      "Maximum": {
                        "Value": 23.2,
                        "Unit": "C",
                        "UnitType": 17
                      }
                    },
                    "Day": {
                      "Icon": 12,
                      "IconPhrase": "Showers",
                      "HasPrecipitation": true,
                      "PrecipitationType": "Rain",
                      "PrecipitationIntensity": "Moderate"
                    },
                    "Night": {
                      "Icon": 15,
                      "IconPhrase": "Thunderstorms",
                      "HasPrecipitation": true,
                      "PrecipitationType": "Rain",
                      "PrecipitationIntensity": "Moderate"
                    },
                    "Sources": [
                      "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?day=1&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?day=1&unit=c&lang=en-us"
                  },
                  {
                    "Date": "2023-02-12T07:00:00-03:00",
                    "EpochDate": 1676196000,
                    "Temperature": {
                      "Minimum": {
                        "Value": 19.7,
                        "Unit": "C",
                        "UnitType": 17
                      },
                      "Maximum": {
                        "Value": 24.8,
                        "Unit": "C",
                        "UnitType": 17
                      }
                    },
                    "Day": {
                      "Icon": 16,
                      "IconPhrase": "Mostly cloudy w/ t-storms",
                      "HasPrecipitation": true,
                      "PrecipitationType": "Rain",
                      "PrecipitationIntensity": "Heavy"
                    },
                    "Night": {
                      "Icon": 38,
                      "IconPhrase": "Mostly cloudy",
                      "HasPrecipitation": false
                    },
                    "Sources": [
                      "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?day=2&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?day=2&unit=c&lang=en-us"
                  },
                  {
                    "Date": "2023-02-13T07:00:00-03:00",
                    "EpochDate": 1676282400,
                    "Temperature": {
                      "Minimum": {
                        "Value": 20.1,
                        "Unit": "C",
                        "UnitType": 17
                      },
                      "Maximum": {
                        "Value": 27,
                        "Unit": "C",
                        "UnitType": 17
                      }
                    },
                    "Day": {
                      "Icon": 15,
                      "IconPhrase": "Thunderstorms",
                      "HasPrecipitation": true,
                      "PrecipitationType": "Rain",
                      "PrecipitationIntensity": "Moderate"
                    },
                    "Night": {
                      "Icon": 41,
                      "IconPhrase": "Partly cloudy w/ t-storms",
                      "HasPrecipitation": true,
                      "PrecipitationType": "Rain",
                      "PrecipitationIntensity": "Heavy"
                    },
                    "Sources": [
                      "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?day=3&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?day=3&unit=c&lang=en-us"
                  },
                  {
                    "Date": "2023-02-14T07:00:00-03:00",
                    "EpochDate": 1676368800,
                    "Temperature": {
                      "Minimum": {
                        "Value": 20.4,
                        "Unit": "C",
                        "UnitType": 17
                      },
                      "Maximum": {
                        "Value": 27.6,
                        "Unit": "C",
                        "UnitType": 17
                      }
                    },
                    "Day": {
                      "Icon": 17,
                      "IconPhrase": "Partly sunny w/ t-storms",
                      "HasPrecipitation": true,
                      "PrecipitationType": "Rain",
                      "PrecipitationIntensity": "Moderate"
                    },
                    "Night": {
                      "Icon": 36,
                      "IconPhrase": "Intermittent clouds",
                      "HasPrecipitation": true,
                      "PrecipitationType": "Rain",
                      "PrecipitationIntensity": "Moderate"
                    },
                    "Sources": [
                      "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?day=4&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?day=4&unit=c&lang=en-us"
                  },
                  {
                    "Date": "2023-02-15T07:00:00-03:00",
                    "EpochDate": 1676455200,
                    "Temperature": {
                      "Minimum": {
                        "Value": 20.1,
                        "Unit": "C",
                        "UnitType": 17
                      },
                      "Maximum": {
                        "Value": 27.6,
                        "Unit": "C",
                        "UnitType": 17
                      }
                    },
                    "Day": {
                      "Icon": 15,
                      "IconPhrase": "Thunderstorms",
                      "HasPrecipitation": true,
                      "PrecipitationType": "Rain",
                      "PrecipitationIntensity": "Moderate"
                    },
                    "Night": {
                      "Icon": 7,
                      "IconPhrase": "Cloudy",
                      "HasPrecipitation": true,
                      "PrecipitationType": "Rain",
                      "PrecipitationIntensity": "Moderate"
                    },
                    "Sources": [
                      "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?day=5&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/br/sao-simao/45875/daily-weather-forecast/45875?day=5&unit=c&lang=en-us"
                  }
                ]
              
        }};
} 

export function fetchLocationKey(locationCoordinates: IPosition):any {
    // Promise<AxiosResponse<ILocationData>> {
        //   return axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${locationCoordinates.lat},${locationCoordinates.lon}&apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`)
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
  } 
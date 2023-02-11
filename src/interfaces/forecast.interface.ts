import { UnitsData } from "./location-weather.interface"

export interface I5DaysForecast {
    Headline: Headline
    DailyForecasts: DailyForecast[]
  }
  
  export interface Headline {
    EffectiveDate: string
    EffectiveEpochDate: number
    Severity: number
    Text: string
    Category: string
    EndDate: string
    EndEpochDate: number
    MobileLink: string
    Link: string
  }
  
  export interface DailyForecast {
    Date: string
    EpochDate: number
    Temperature: Temperature
    Day: WeatherData
    Night: WeatherData
    Sources: string[]
    MobileLink: string
    Link: string
  }
  
  export interface Temperature {
    Minimum: UnitsData
    Maximum: UnitsData
  }
  
  export interface WeatherData {
    Icon: number
    IconPhrase: string
    HasPrecipitation: boolean
    PrecipitationType: string
    PrecipitationIntensity: string
  }

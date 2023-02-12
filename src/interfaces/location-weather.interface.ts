export interface UnitsData {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Temperature {
    Metric: UnitsData;
    Imperial: UnitsData;
}

export interface ILocationWeather {
    LocalObservationDateTime: string;
    EpochTime: number;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType?: any;
    IsDayTime: boolean;
    Temperature: Temperature;
    MobileLink: string;
    Link: string;
}

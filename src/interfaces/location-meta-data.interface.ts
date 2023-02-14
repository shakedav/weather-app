import { UnitsData } from "./location-weather.interface";

export interface ILocationData {
    name: string;
    type: string;
    key: string;
    country: string
}

export interface locationName {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
}

export interface AdministrativeArea {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
}

export interface TimeZone {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: Date;
}

export interface Elevation {
    Metric: UnitsData;
    Imperial: UnitsData;
}

export interface GeoPosition {
    Latitude: number;
    Longitude: number;
    Elevation: Elevation;
}

export interface ILocationMetaData {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    EnglishName: string;
    PrimaryPostalCode: string;
    Region: locationName;
    Country: locationName;
    AdministrativeArea: AdministrativeArea;
    TimeZone: TimeZone;
    GeoPosition: GeoPosition;
    IsAlias: boolean;
    SupplementalAdminAreas: any[];
    DataSets: string[];
}

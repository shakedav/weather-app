import { ILocationWeather } from "../interfaces/location-weather.interface";

interface ILocationProps {
    data: ILocationWeather | null;
    isMetric: boolean;
}
export const CurrentLocationWeather: React.FC<ILocationProps> = ({data, isMetric} )=> {
    return (

        <div>CurrentLocation: {data?.WeatherText}</div>
    );
}

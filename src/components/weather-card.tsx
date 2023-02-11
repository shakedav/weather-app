import { Card, CardContent } from "@mui/material"
import { DailyForecast } from "../interfaces/forecast.interface";

export interface IWeatherCardProps {
    forecast: DailyForecast
}
export const WeatherCard: React.FC<IWeatherCardProps> = ({forecast}) => {
    return (
        <>
        <Card>
            <CardContent>
                <div>{forecast.Date}</div>
                <div>{`${forecast.Temperature.Minimum.Value} ${forecast.Temperature.Minimum.Unit}`}</div>
                <div>{`${forecast.Temperature.Maximum.Value} ${forecast.Temperature.Maximum.Unit}`}</div>
                <div>{forecast.Day.HasPrecipitation}</div>
                <div>{forecast.Day.IconPhrase}</div>
                <div>{forecast.Night.HasPrecipitation}</div>
                <div>{forecast.Night.IconPhrase}</div>
            </CardContent>
        </Card>
        </>
    );
}
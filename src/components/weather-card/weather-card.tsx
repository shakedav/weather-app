import { Card, CardContent } from "@mui/material"
import { DailyForecast } from "../../interfaces/forecast.interface";
import { format } from 'date-fns'

import './weather-card.css'

export interface IWeatherCardProps {
    forecast: DailyForecast
}
export const WeatherCard: React.FC<IWeatherCardProps> = ({forecast}) => {
    return (
        <>
        <Card className="weather-card">
            <CardContent className="card-content">
                <div>{format(new Date(forecast.Date), 'dd/MM')}</div>
                <section className="type">
                    <h3 style={{width: '100%'}}>Day</h3>
                    <div className="card-temp">
                        <img alt="weather-icon" className="card-icon" src={forecast.Day.Icon ? `${process.env.PUBLIC_URL}/assets/accueweather-icons/${forecast.Day.Icon && forecast.Day.Icon > 10 ? `${forecast.Day.Icon}-s` : `0${forecast.Day.Icon}-s`}.png` : ''} />
                        <h3>{`${Math.ceil(forecast.Temperature.Maximum.Value)} °${forecast.Temperature.Maximum.Unit}`}</h3>
                    </div>
                    <div  className="weather-description">{forecast.Day.IconPhrase}</div>
                </section>

                <section className="type">
                    <h3 style={{width: '100%'}}>Night</h3>
                    <div className="card-temp">
                        <img alt="weather-icon" className="card-icon" src={forecast.Night.Icon ? `${process.env.PUBLIC_URL}/assets/accueweather-icons/${forecast.Night.Icon && forecast.Night.Icon > 10 ? `${forecast.Night.Icon}-s` : `0${forecast.Night.Icon}-s`}.png` : ''} />
                        <h3>{`${Math.ceil(forecast.Temperature.Minimum.Value)} °${forecast.Temperature.Minimum.Unit}`}</h3>
                    </div>
                    <div className="weather-description">{forecast.Night.IconPhrase}</div>
                </section>
            </CardContent>
        </Card>
        </>
    );
}
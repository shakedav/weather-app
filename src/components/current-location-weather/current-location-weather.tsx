import { Card, CardContent } from "@mui/material";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IsMetricContext } from "../../App";
import { ILocationData } from "../../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../../interfaces/location-weather.interface";
import { fetch5DaysForcastRequest } from "../../store/weather/actions";
import { get5DaysForecastSelector } from "../../store/weather/selectors";
import { WeatherCard } from "../weather-card/weather-card";
import { StarSharp, StarOutlineSharp } from '@mui/icons-material';

import './current-location-weather.css'
export interface ITemp {
    value?: number;
    units?: string;
}

interface ILocationProps {
    locationWeather: ILocationWeather;
    locationData: ILocationData;
}

export const CurrentLocationWeather: React.FC<ILocationProps> = ({locationData, locationWeather} )=> {
    const dispatch = useDispatch()
    const metricContext = useContext(IsMetricContext);
    const [temp, setTemp] = useState<ITemp>({});
    const [isFavorite, setIsFavorite] = useState(false);
    const fiveDaysForecast = useSelector(get5DaysForecastSelector)

    useEffect(() => {    
        const favorites = getFavorites();
        if (favorites.findIndex(item => item.key === locationData.key) !== -1) {
            setIsFavorite(true);
        }

    }, [locationData.key]);

    useEffect(() => {    
        if (locationData) {    
            dispatch(fetch5DaysForcastRequest({locationKey: locationData?.key!, isMetric: metricContext.isMetric}))
        }
    },[dispatch, locationData, locationWeather, metricContext.isMetric])

    useEffect(() => {
        if (metricContext.isMetric) {
            setTemp({value: locationWeather?.Temperature.Metric.Value, units: locationWeather?.Temperature.Metric.Unit});
        } else {
            setTemp({value: locationWeather?.Temperature.Imperial.Value, units: locationWeather?.Temperature.Imperial.Unit});
        }
    },[locationWeather, metricContext])
    
    const getFavorites= () =>{ 
        let favoritesList: ILocationData[] = [];
        const listFromFavorites = localStorage.getItem('favorites');
        if (listFromFavorites) {
            favoritesList = JSON.parse(listFromFavorites);
        }
        return favoritesList;
    }

    const handleClick = () => {
        console.log('saveToStorage')
        let favoritesList: ILocationData[] = getFavorites();
        const index = favoritesList.findIndex((item) => item.key === locationData?.key)
        if ( index < 0) {
            favoritesList.push(locationData);
        } else {
            favoritesList.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(favoritesList));
        setIsFavorite(!isFavorite);
    }

    return (
        <>
         <section className="current-location">
            <Card>
                <CardContent className="container">
                    <section className="description">
                        <div className="location-title">
                            <h2>{locationData?.country}</h2>
                            {
                            !isFavorite && <StarOutlineSharp className="location"
                                onClick={handleClick} 
                                ></StarOutlineSharp>
                            }
                            {isFavorite && <StarSharp className="favorite" onClick={handleClick} ></StarSharp>}
                        </div> 
                        <div>{locationWeather && format(new Date(locationWeather.LocalObservationDateTime), 'dd/mm/yyyy HH:MM')}</div>
                    </section>
                    <section className="conditions">
                        <img alt="weather-icon" className="icon" src={locationWeather?.WeatherIcon ? `${process.env.PUBLIC_URL}/assets/accueweather-icons/${locationWeather?.WeatherIcon && locationWeather?.WeatherIcon > 10 ? `${locationWeather?.WeatherIcon}-s` : `0${locationWeather?.WeatherIcon}-s`}.png` : ''} />
                        <div className="right-side">
                            <h2 className="degrees">{`${temp.value} °${temp.units}`}</h2>
                            <div>{locationWeather?.WeatherText}</div>
                        </div>
                    </section>
                </CardContent>
            </Card>
        </section>
            <section className="fiveDaysForecast">
                {fiveDaysForecast?.DailyForecasts.map(forecast => {
                    return <WeatherCard key={forecast.Date} forecast={forecast}></WeatherCard>
                })}
            </section>
        </>
    );
}
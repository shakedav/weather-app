import { Card, CardContent } from "@mui/material";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IsMetricContext } from "../../App";
import { ILocationData } from "../../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../../interfaces/location-weather.interface";
import { fetch5DaysForcastRequest } from "../../store/weather/actions";
import { get5DaysForecastSelector, getIsLocation5DaysForecastPendingSelector } from "../../store/weather/selectors";
import { WeatherCard } from "../weather-card/weather-card";
import { StarSharp, StarOutlineSharp } from '@mui/icons-material';

import './current-location-weather.css'
import { getFavorites, updateFavorites } from "../../helpers/storage.helper";
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
    const [metricContextState, setMetricContextState] = useState(metricContext)
    const [temp, setTemp] = useState<ITemp>({});
    const [isFavorite, setIsFavorite] = useState(false);
    const fiveDaysForecast = useSelector(get5DaysForecastSelector)
    const isLocation5DaysForecastPending = useSelector(getIsLocation5DaysForecastPendingSelector);

    useEffect(() => {    
        const favorites = getFavorites();
        if (favorites.findIndex(item => item.key === locationData.key) !== -1) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false)
        }

    }, [locationData.key]);

    useEffect(() => {    
        if (!isLocation5DaysForecastPending && locationData && (!fiveDaysForecast || 
            metricContextState.isMetric !== metricContext.isMetric)) {  
                setMetricContextState(metricContext)  
                dispatch(fetch5DaysForcastRequest({locationKey: locationData?.key!, isMetric: metricContext.isMetric}))
        }
    },[dispatch, locationData, locationWeather, isLocation5DaysForecastPending, fiveDaysForecast, metricContextState.isMetric, metricContext])

    useEffect(() => {
        if (metricContext.isMetric) {
            setTemp({value: locationWeather?.Temperature.Metric.Value, units: locationWeather?.Temperature.Metric.Unit});
        } else {
            setTemp({value: locationWeather?.Temperature.Imperial.Value, units: locationWeather?.Temperature.Imperial.Unit});
        }
    },[locationWeather, metricContext])    

    const handleClick = () => {
        updateFavorites(locationData)
        setIsFavorite(!isFavorite);
    }

    return (
        <>
         <section className="current-location">
            <Card>
                <CardContent className="current-location-container">
                    <section className="description">
                        <div className="location-title">
                            <h2>{locationData.name}, {locationData?.country}</h2>
                            {
                            !isFavorite && <StarOutlineSharp fontSize="large" className="favorite-icon"
                                onClick={handleClick} 
                                ></StarOutlineSharp>
                            }
                            {isFavorite && <StarSharp fontSize="large" className="favorite-icon favorite" onClick={handleClick} ></StarSharp>}
                        </div> 
                        <div>{locationWeather && format(new Date(locationWeather.LocalObservationDateTime), 'dd/mm/yyyy HH:MM')}</div>
                    </section>
                    <section className="conditions">
                        <img alt="weather-icon" className="weather-icon" src={locationWeather?.WeatherIcon ? `${process.env.PUBLIC_URL}/assets/accueweather-icons/${locationWeather?.WeatherIcon && locationWeather?.WeatherIcon > 10 ? `${locationWeather?.WeatherIcon}-s` : `0${locationWeather?.WeatherIcon}-s`}.png` : ''} />
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
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IsMetricContext } from "../../App";
import { ILocationData } from "../../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../../interfaces/location-weather.interface";
import { fetch5DaysForcastRequest } from "../../store/weather/actions";
import { get5DaysForecastSelector } from "../../store/weather/selectors";
import { WeatherCard } from "../weather-card";

import './current-location-weather.css'
export interface ITemp {
    value?: number;
    units?: string;
}

interface ILocationProps {
    locationWeather: ILocationWeather | null;
    locationData: ILocationData | null;
}

export const CurrentLocationWeather: React.FC<ILocationProps> = ({locationData, locationWeather} )=> {
    const dispatch = useDispatch()
    const metricContext = useContext(IsMetricContext);
    const [temp, setTemp] = useState<ITemp>({});
    const fiveDaysForecast = useSelector(get5DaysForecastSelector)

    useEffect(() => {    
        if (locationData) {    
            console.log(`dispatch with metric ${metricContext.isMetric}`)
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

    return (
        <>
            <div>name: {locationData?.name}</div>
            <div>country: {locationData?.country}</div>
            <div>key: {locationData?.key}</div>
            <div>type: {locationData?.type}</div>
            <div>{`${temp.value} °${temp.units}`}</div>

            <div>{fiveDaysForecast?.Headline.Category}</div>
            <div>{fiveDaysForecast?.Headline.Severity}</div>
            <div>{fiveDaysForecast?.Headline.Text}</div>
            <section className="fiveDaysForecast">
                {fiveDaysForecast?.DailyForecasts.map(forecast => {
                    return <WeatherCard forecast={forecast}></WeatherCard>
                })}
            </section>
        </>
    );
}
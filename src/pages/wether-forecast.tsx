import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { CurrentLocationWeather } from "../components/current-location-weather"
import { SearchBox } from "../components/search-box"
import { WeatherCard } from "../components/weather-card"
import { fetch5DaysForcastRequest, fetchLocationKeyRequest, fetchLocationWeatherRequest } from "../store/weather/actions"
import { IPosition } from "../store/weather/location.helper"
import { getCurrentLocationCoordinatesSelector, getLocationWeatherSelector } from "../store/weather/selectors"

export const WeatherForecast: React.FC = () => {
    const dispatch = useDispatch()
    const locationWeather = useSelector(getLocationWeatherSelector)
    const currentLocationCoords = useSelector(getCurrentLocationCoordinatesSelector)
    const [isMetric, setMetric] = useState(true)

    let items = []
    for (let i=0; i< 5 ; i++) {
        items.push(<WeatherCard key={i}/>)
    }

    useEffect(() => {
        dispatch(fetchLocationKeyRequest(currentLocationCoords as IPosition));
    }, [dispatch, currentLocationCoords])

    useEffect(() => {        
        dispatch(fetchLocationWeatherRequest(12145))
    },[dispatch])

    useEffect(() => {        
        dispatch(fetch5DaysForcastRequest(12145))
    },[dispatch])
 
    return (
        <>
        <SearchBox/>
        <div>I am weather details</div>
        <CurrentLocationWeather data={locationWeather} isMetric={isMetric}/>
        {items}
        {/* {Array(4).fill(true).map((_, i) => <WeatherCard key={i} />)} */}
        </>

    )
}
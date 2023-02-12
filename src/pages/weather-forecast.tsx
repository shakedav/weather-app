import { useContext, useEffect,  } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { IsMetricContext } from "../App"
import { CurrentLocationWeather } from "../components/current-location-weather/current-location-weather"
import { SearchBox } from "../components/search-box/search-box"
import { fetchLocationKeyRequest, fetchLocationWeatherRequest } from "../store/weather/actions"
import { IPosition } from "../store/weather/location.helper"
import { getCurrentLocationCoordinatesSelector, getLocationDataSelector, getLocationWeatherSelector } from "../store/weather/selectors"

export const WeatherForecast: React.FC = () => {
    const dispatch = useDispatch()
    const locationWeather = useSelector(getLocationWeatherSelector)
    const locationData = useSelector(getLocationDataSelector)
    const currentLocationCoords = useSelector(getCurrentLocationCoordinatesSelector)
    const metricContext = useContext(IsMetricContext);

    useEffect(() => {
        if (currentLocationCoords) {
            dispatch(fetchLocationKeyRequest(currentLocationCoords as IPosition));
        }
    }, [dispatch, currentLocationCoords])

    useEffect(() => {       
        if (locationData) { 
            dispatch(fetchLocationWeatherRequest(locationData?.key!))
        }
    },[dispatch, locationData, metricContext.isMetric])

    return (
        <>
        <SearchBox/>
        {locationWeather && locationData && <CurrentLocationWeather locationWeather={locationWeather} locationData = {locationData}/>}
        </>
    )
}
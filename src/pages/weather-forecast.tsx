import { useContext, useEffect,  } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { IsMetricContext } from "../App"
import { CurrentLocationWeather } from "../components/current-location-weather/current-location-weather"
import { SearchBox } from "../components/search-box/search-box"
import { fetchLocationDataRequest, fetchLocationWeatherRequest } from "../store/weather/actions"
import { IPosition } from "../store/weather/location.helper"
import { getCurrentLocationCoordinatesSelector, getIsCurrentLocationCoordinatesPendingSelector, getIsLocationDataPendingSelector, getLocationDataSelector, getLocationWeatherSelector, getIsLocationWeatherPendingSelector } from "../store/weather/selectors"

export const WeatherForecast: React.FC = () => {
    const dispatch = useDispatch()
    const locationWeather = useSelector(getLocationWeatherSelector)
    const locationData = useSelector(getLocationDataSelector)
    const currentLocationCoords = useSelector(getCurrentLocationCoordinatesSelector)
    const metricContext = useContext(IsMetricContext);
    const { locationKey } = useParams();
    const isCoordsPending = useSelector(getIsCurrentLocationCoordinatesPendingSelector);
    const isLocationDataPending = useSelector(getIsLocationDataPendingSelector);
    const isLocationWeatherPending = useSelector(getIsLocationWeatherPendingSelector);

    
    useEffect(() => {
        if (!isCoordsPending && !isLocationDataPending && currentLocationCoords && !locationData) {
            dispatch(fetchLocationDataRequest(currentLocationCoords as IPosition));
        }
    }, [isCoordsPending, isLocationDataPending, currentLocationCoords, dispatch, locationData, locationKey])

    useEffect(() => {        
        if (!locationWeather && !isLocationWeatherPending && locationKey) {
            dispatch(fetchLocationWeatherRequest(locationKey))
        }
    }, [locationKey, dispatch, isLocationWeatherPending, locationWeather])

    useEffect(() => {       
        if (!locationWeather && locationData && !isLocationWeatherPending) { 
            dispatch(fetchLocationWeatherRequest(locationData?.key!))
        }
    },[isLocationWeatherPending, locationWeather, dispatch, locationData, metricContext.isMetric, locationKey])

    return (
        <>
        <SearchBox/>
        {locationWeather && locationData && <CurrentLocationWeather locationWeather={locationWeather} locationData = {locationData}/>}
        </>
    )
}
import { useContext, useEffect,  } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { IsMetricContext } from "../App"
import { CurrentLocationWeather } from "../components/current-location-weather/current-location-weather"
import { SearchBox } from "../components/search-box/search-box"
import { fetchLocationDataRequest, fetchLocationWeatherRequest } from "../store/weather/actions"
import { IPosition } from "../store/weather/location.helper"
import { getCurrentLocationCoordinatesSelector, getIsCurrentLocationCoordinatesPendingSelector, getIsLocationDataPendingSelector, getLocationDataSelector, getLocationWeatherSelector, getIsLocationWeatherPendingSelector, getErrorSelector } from "../store/weather/selectors"

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
    const error = useSelector(getErrorSelector);

    
    useEffect(() => {
        if (!error && !isCoordsPending && !isLocationDataPending && currentLocationCoords && !locationData) {
            dispatch(fetchLocationDataRequest(currentLocationCoords as IPosition));
        }
    }, [isCoordsPending, isLocationDataPending, currentLocationCoords, dispatch, locationData, locationKey, error])

    useEffect(() => {        
        if (!error && !locationWeather && !isLocationWeatherPending && locationKey) {
            dispatch(fetchLocationWeatherRequest(locationKey))
        }
    }, [locationKey, dispatch, isLocationWeatherPending, locationWeather, error])

    useEffect(() => {       
        if (!error && !locationWeather && locationData && !isLocationWeatherPending) { 
            dispatch(fetchLocationWeatherRequest(locationData?.key!))
        }
    },[isLocationWeatherPending, locationWeather, dispatch, locationData, metricContext.isMetric, locationKey, error])

    return (
        <>
        <SearchBox/>
        {locationWeather && locationData && <CurrentLocationWeather locationWeather={locationWeather} locationData = {locationData}/>}
        </>
    )
}
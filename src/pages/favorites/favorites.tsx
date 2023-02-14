import { StarSharp } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLocationWeather } from "../../API";
import { IsMetricContext } from "../../App";
import { getFavorites, updateFavorites } from "../../helpers/storage.helper";
import { ILocationData } from "../../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../../interfaces/location-weather.interface";
import { fetchLocationDataSuccess, fetchLocationWeatherRequest, fetch5DaysForcastRequest, fetchRequestFailed } from "../../store/weather/actions";

import './favorites.css'

export interface IFavoriteWithWeather extends ILocationData {
    weather: ILocationWeather;
}

export const Favorites: React.FC = () => {
    const dispatch = useDispatch();
    const [favorites, setFavorites] = useState<ILocationData[]>([]);
    const [favoritesWithWeather, setFavoritesWithWeather] = useState<IFavoriteWithWeather[]>([])
    const metricContext = useContext(IsMetricContext);
    const navigate = useNavigate();

    useEffect(() => {    
        setFavorites(getFavorites());        
    }, []);

    useEffect(() => {
        let promises: any[] = [];
        promises = favorites.map(favorite => {
            return fetchLocationWeather(favorite.key).catch((e: any)  => {
                dispatch(fetchRequestFailed(e.message));
            })
        });
        
        Promise.all(promises)
        .then(results => {
            return favorites.map((favorite, index) => ({
                ...favorite,
                weather: results[index].data[0]
            }));
        })
        .then(favoritesWithWeather => {
            setFavoritesWithWeather(favoritesWithWeather);
        });
    }, [dispatch, favorites])
    
    const getTemprature = (weather: ILocationWeather) => {
        if (metricContext.isMetric) {
            return `${weather.Temperature.Metric.Value} °${weather.Temperature.Metric.Unit}`
        }
        return `${weather.Temperature.Imperial.Value} °${weather.Temperature.Imperial.Unit}`
    }
    const handleClick = (event: MouseEvent, locationData: ILocationData) => {
        setFavorites(updateFavorites(locationData))   
        event.stopPropagation()     
    }

    const navigateToWeather = (favorite: IFavoriteWithWeather) => {
        dispatch(fetchLocationDataSuccess(favorite))
        dispatch(fetchLocationWeatherRequest(favorite.key));
        dispatch(fetch5DaysForcastRequest({locationKey: favorite.key, isMetric: metricContext.isMetric}));
        navigate(`/weather-app/details/${favorite.key}`)
    }

    return (
        <>
            <div className="favorites-list-wrapper">
            <div style={{marginTop: '20px', marginLeft: '20px'}}>
                <h1>Favorites</h1>
            </div>
            {favoritesWithWeather.length === 0 && <div>No favorite locations yet</div>}
            { favoritesWithWeather && 
                <div className="favorites-list">
                    {favoritesWithWeather.map((favorite: IFavoriteWithWeather) => {
                    return (
                        <Card key={favorite.key} sx={{marginRight: '20px', maxHeight: '200px', width: '232px', borderRadius: '10px'}} onClick={() => navigateToWeather(favorite)}>
                            <CardContent className="favorite-container">
                                <section className="favorite-description">
                                    <div className="favorite-location-title">
                                        <div>{favorite.name}, {favorite?.country}</div>
                                        <div className="favorite-icon-wrapper">
                                            <StarSharp fontSize="large" className="favorite-icon favorite" onClick={(event: any) => handleClick(event, favorite)} ></StarSharp>
                                        </div>
                                    </div> 
                                </section>
                                <section className="favorite-temp">
                                    {favorite && favorite.weather && <h2 className="degrees favorite-degrees">{getTemprature(favorite.weather)}</h2>}
                                    <h4 style={{textAlign: 'center'}}>{favorite.weather.WeatherText}</h4>
                                </section>
                            </CardContent>
                        </Card>
                    )
                })               
            }
            </div>
            }
            </div>
        </>
    )
}
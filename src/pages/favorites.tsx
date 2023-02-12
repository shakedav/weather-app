import { StarSharp } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLocationWeather } from "../API";
import { IsMetricContext } from "../App";
import { getFavorites, updateFavorites } from "../helpers/storage.helper";
import { ILocationData } from "../interfaces/location-meta-data.interface";
import { ILocationWeather } from "../interfaces/location-weather.interface";
import { fetchLocationDataSuccess, fetchLocationWeatherRequest, fetch5DaysForcastRequest } from "../store/weather/actions";

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
        const promises = favorites.map(favorite => fetchLocationWeather(favorite.key));
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
    }, [favorites])
    
    const getTemprature = (weather: ILocationWeather) => {
        if (metricContext.isMetric) {
            return `${weather.Temperature.Metric.Value} °${weather.Temperature.Metric.Unit}`
        }
        return `${weather.Temperature.Imperial.Value} °${weather.Temperature.Imperial.Unit}`
    }
    const handleClick = (locationData: ILocationData) => {
        setFavorites(updateFavorites(locationData))        
    }

    const navigateToWeather = (favorite: IFavoriteWithWeather) => {
        dispatch(fetchLocationDataSuccess(favorite))
        dispatch(fetchLocationWeatherRequest(favorite.key));
        dispatch(fetch5DaysForcastRequest({locationKey: favorite.key, isMetric: metricContext.isMetric}));
        navigate(`/details/${favorite.key}`)
    }

    return (
        <>
            <div style={{marginTop: '20px'}}>
                <h1>Favorites</h1>
            </div>
            {favoritesWithWeather.length === 0 && <div>No favorite locations yet</div>}
            { favoritesWithWeather && 
                <div className="favorites-list">
                    {favoritesWithWeather.map((favorite: IFavoriteWithWeather) => {
                    return (
                        <Card key={favorite.key} sx={{marginRight: '20px'}} onClick={() => navigateToWeather(favorite)}>
                            <CardContent className="favorite-container">
                                <section className="favorite-description">
                                    <div className="location-title">
                                        <h2>{favorite.name}, {favorite?.country}</h2>
                                        <StarSharp fontSize="large" className="favorite-icon favorite" onClick={() => handleClick(favorite)} ></StarSharp>
                                    </div> 
                                </section>
                                <section>
                                    {favorite && favorite.weather && <h2 className="degrees favorite-degrees">{getTemprature(favorite.weather)}</h2>}
                                </section>
                            </CardContent>
                        </Card>
                    )
                })               
            }
            </div>
            }
        </>
    )
}
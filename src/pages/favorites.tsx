import { StarSharp } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react"
import { getFavorites, updateFavorites } from "../helpers/storage.helper";
import { ILocationData } from "../interfaces/location-meta-data.interface";

import './favorites.css'

export const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<ILocationData[]>([]);

    useEffect(() => {    
        setFavorites(getFavorites());        
    }, []);
    
    const handleClick = (locationData: ILocationData) => {
        setFavorites(updateFavorites(locationData))        
     }

    return (
        <>
            <div style={{marginTop: '20px'}}>
                <h1>Favorites</h1>
            </div>
            {favorites.length === 0 && <div>No favorite locations yet</div>}
            { favorites && 
                <div className="favorites-list">
                    {favorites.map((favorite: ILocationData) => {
                    return (
                        <Card key={favorite.key} sx={{marginRight: '20px'}}>
                            <CardContent className="favorite-container">
                                <section className="favorite-description">
                                    <div className="location-title">
                                        <h2>{favorite.name}, {favorite?.country}</h2>
                                        <StarSharp fontSize="large" className="favorite-icon favorite" onClick={() => handleClick(favorite)} ></StarSharp>
                                    </div> 
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
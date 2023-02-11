import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react"
import { ILocationData } from "../interfaces/location-meta-data.interface";

export const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favorites")!));
    }, [])

    return (
        <>
            <div>this is favorites</div>
            { 
                favorites.map((favorite: ILocationData) => {
                    return (
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>{favorite.name}</CardContent> 
                    </Card>
                    )
                })                
            }
        </>
    )
}
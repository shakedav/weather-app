import { ILocationData } from "../interfaces/location-meta-data.interface";

export const getFavorites= () =>{ 
    let favoritesList: ILocationData[] = [];
    const listFromFavorites = localStorage.getItem('favorites');
    if (listFromFavorites) {
        favoritesList = JSON.parse(listFromFavorites);
    }
    return favoritesList;
}

export const updateFavorites = (locationData: ILocationData) => {
    console.log('saveToStorage')
    let favoritesList: ILocationData[] = getFavorites();
    const index = favoritesList.findIndex((item) => item.key === locationData?.key)
    if ( index < 0) {
        favoritesList.push(locationData);
    } else {
        favoritesList.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
    return favoritesList;
}
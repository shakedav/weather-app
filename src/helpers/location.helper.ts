export interface IPosition {
    lat: number, 
    lon: number  
}


export interface IGeoLocation {
    coords:{
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: null
    latitude: number
    longitude: number
    speed: number
    },
    timestamp: number
}

export const getUserLocation = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return pos
};

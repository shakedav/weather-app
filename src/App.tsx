import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WeatherForecast } from "./pages/weather-forecast";
import { Favorites } from "./pages/favorites";
import { fetchLocationCoordsRequest } from "./store/weather/actions";
import { Header } from "./components/header/header";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "./components/errors/error-boundary";
import { getCurrentLocationCoordinatesSelector, getIsCurrentLocationCoordinatesPendingSelector } from "./store/weather/selectors";
import ErrorModal from "./components/errors/error-modal";

export interface IsMetricContextProps {
  isMetric: boolean;
  toggleIsMetric: Dispatch<SetStateAction<boolean>>;
}


export const IsMetricContext = createContext<IsMetricContextProps>({
  isMetric: true,
  toggleIsMetric: () => {},
});


export const App: React.FC = (props: any) => {
  const [isMetric, setIsMetric] = useState(true);
  const dispatch = useDispatch();
  const currentLocationCoords = useSelector(getCurrentLocationCoordinatesSelector)
  const isCoordsPending = useSelector(getIsCurrentLocationCoordinatesPendingSelector);

  
  useEffect(() => {
    if (!isCoordsPending && !currentLocationCoords) {
      dispatch(fetchLocationCoordsRequest());
    }
  }, [isCoordsPending, currentLocationCoords, dispatch, props]);

    return (   
      <div>
        <ErrorBoundary>
        <IsMetricContext.Provider value={{isMetric, toggleIsMetric: setIsMetric}}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={'/weather-app/'} element={<WeatherForecast />} />
            <Route path={'/weather-app/details/'} element={<WeatherForecast />} />
            <Route path={'/weather-app/details/:locationKey'} element={<WeatherForecast />} />
            <Route path={'/weather-app/favorites'} element={ <Favorites />} />
          </Routes>
        </BrowserRouter>
        </IsMetricContext.Provider>
        <ErrorModal />
        </ErrorBoundary>
      </div>
    )
  }

export default App;

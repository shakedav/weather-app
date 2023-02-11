import React, { Component, createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WeatherForecast } from "./pages/weather-forecast";
import { Favorites } from "./pages/favorites";
import { fetchLocationCoordsRequest } from "./store/weather/actions";
import { connect } from "react-redux";
import { Header } from "./components/header/header";

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

  useEffect(() => {
    props.dispatch(fetchLocationCoordsRequest());
  }, []);

    return (   
      <div>
        <IsMetricContext.Provider value={{isMetric, toggleIsMetric: setIsMetric}}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={'/'} element={<WeatherForecast />} />
            <Route path={'/details'} element={<WeatherForecast />} />
            <Route path={'/favorites'} element={ <Favorites />} />
          </Routes>
        </BrowserRouter>
        </IsMetricContext.Provider>
      </div>
    )
  }

function mapDispatchToProps (dispatch: any) {
  return {
    dispatch
  }
}

export default connect(
  mapDispatchToProps
)(App)

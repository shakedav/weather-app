import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WeatherForecast } from "./pages/wether-forecast";
import { Favorites } from "./pages/favorites";
import { fetchLocationCoordsRequest } from "./store/weather/actions";
import { connect } from "react-redux";

export class App extends Component<any, any> {
  async componentDidMount() {
    // const locationCoordinates = await getCurrentLocationCoordinates();
    this.props.dispatch(fetchLocationCoordsRequest());
  }

  render(): React.ReactNode {
    return (   
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<WeatherForecast />} />
          <Route path={'/favorites'} element={ <Favorites />} />
          <Route path={'/details'} element={<WeatherForecast />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

function mapDispatchToProps (dispatch: any) {
  return {
    dispatch
  }
}

export default connect(
  mapDispatchToProps
)(App)

// export default App;

import { Autocomplete, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IsMetricContext } from "../../App";
import { ILocationData } from "../../interfaces/location-meta-data.interface";
import { fetch5DaysForcastRequest, fetchLocationDataSuccess, fetchLocationWeatherRequest } from "../../store/weather/actions";

import './search-box.css'

export const SearchBox: React.FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<ILocationData[]>([]);
    const metricContext = useContext(IsMetricContext);
    const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z ]+$/;

    useEffect(() => {
        if (inputValue && inputValue.length >= 3) {
          const fetchData = async () => {
            await fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${inputValue}&apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`)
                          .then(res => res.json())
              .then(data => {
                const suggestions: ILocationData[] = data.map((suggestion: {AdministrativeArea: { LocalizedName: string }, Country: { LocalizedName: string }, LocalizedName: string, Key: number, Type: string }) => {
                  return {
                    name: `${suggestion.LocalizedName}(${suggestion.AdministrativeArea.LocalizedName},${suggestion.Country.LocalizedName})`, 
                    type: suggestion.Type,
                    key: suggestion.Key, 
                    country: suggestion.Country.LocalizedName
                  }
                });
                  setSuggestions(suggestions);
                })
          };    
          fetchData();
        } else {
          setSuggestions([]);
        }
      }, [inputValue]);

    const onLocationSelected = (selection: any) => {
      dispatch(fetchLocationDataSuccess(selection))
      dispatch(fetchLocationWeatherRequest(selection.key));
      dispatch(fetch5DaysForcastRequest({locationKey: selection.key, isMetric: metricContext.isMetric}));
    }
    return (
        <Autocomplete
          sx={{flexGrow: 1, marginTop: '30px', backgroundColor: 'white', borderRadius: '10px'}}
          fullWidth
          id="combo-box-demo"
          options={suggestions}
          getOptionLabel={(option) => option.name}
          onInputChange={(event, value) => {
            if (!ALPHA_NUMERIC_DASH_REGEX.test(value)) {              
              return;
            }
            setInputValue(value)
          }}          
          renderInput={(suggestions) => <TextField variant="outlined" {...suggestions} label="search location" value={inputValue}/>}
          onChange={(event, value) => onLocationSelected(value)}
        />
    )
}
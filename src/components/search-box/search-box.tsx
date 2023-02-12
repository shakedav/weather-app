import { Autocomplete, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IsMetricContext } from "../../App";
import { ILocationData } from "../../interfaces/location-meta-data.interface";
import { fetch5DaysForcastRequest, fetchLocationDataSuccess, fetchLocationWeatherRequest } from "../../store/weather/actions";

import './search-box.css'
// export const autoCompleteData = [{"Version":1,"Key":"213490","Type":"City","Rank":20,"LocalizedName":"Rome","Country":{"ID":"IT","LocalizedName":"Italy"},"AdministrativeArea":{"ID":"62","LocalizedName":"Lazio"}},{"Version":1,"Key":"274801","Type":"City","Rank":45,"LocalizedName":"Roman","Country":{"ID":"RO","LocalizedName":"Romania"},"AdministrativeArea":{"ID":"NT","LocalizedName":"Neamț"}},{"Version":1,"Key":"265799","Type":"City","Rank":51,"LocalizedName":"Romblon","Country":{"ID":"PH","LocalizedName":"Philippines"},"AdministrativeArea":{"ID":"ROM","LocalizedName":"Romblon"}},{"Version":1,"Key":"136602","Type":"City","Rank":55,"LocalizedName":"Romans-sur-Isère","Country":{"ID":"FR","LocalizedName":"France"},"AdministrativeArea":{"ID":"26","LocalizedName":"Drôme"}},{"Version":1,"Key":"133712","Type":"City","Rank":55,"LocalizedName":"Romainville","Country":{"ID":"FR","LocalizedName":"France"},"AdministrativeArea":{"ID":"93","LocalizedName":"Seine-Saint-Denis"}},{"Version":1,"Key":"232894","Type":"City","Rank":55,"LocalizedName":"Romita","Country":{"ID":"MX","LocalizedName":"Mexico"},"AdministrativeArea":{"ID":"GUA","LocalizedName":"Guanajuato"}},{"Version":1,"Key":"325701","Type":"City","Rank":55,"LocalizedName":"Romny","Country":{"ID":"UA","LocalizedName":"Ukraine"},"AdministrativeArea":{"ID":"59","LocalizedName":"Sumy"}},{"Version":1,"Key":"328220","Type":"City","Rank":55,"LocalizedName":"Rome","Country":{"ID":"US","LocalizedName":"United States"},"AdministrativeArea":{"ID":"GA","LocalizedName":"Georgia"}},{"Version":1,"Key":"338048","Type":"City","Rank":55,"LocalizedName":"Romeoville","Country":{"ID":"US","LocalizedName":"United States"},"AdministrativeArea":{"ID":"IL","LocalizedName":"Illinois"}},{"Version":1,"Key":"334623","Type":"City","Rank":55,"LocalizedName":"Rome","Country":{"ID":"US","LocalizedName":"United States"},"AdministrativeArea":{"ID":"NY","LocalizedName":"New York"}}];

export const SearchBox: React.FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<ILocationData[]>([]);
    const metricContext = useContext(IsMetricContext);
    
    useEffect(() => {
        if (inputValue && inputValue.length >= 3) {
          const fetchData = async () => {
            // const data = autoCompleteData;
            await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${inputValue}&apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`)
                          .then(res => res.json())
              .then(data => {
                const suggestions: ILocationData[] = data.map((suggestion: {AdministrativeArea: { LocalizedName: string }, Country: { LocalizedName: string }, LocalizedName: string, Key: number, Type: string }) => {
                  return {
                    name: `${suggestion.Country.LocalizedName}-${suggestion.AdministrativeArea.LocalizedName}-${suggestion.LocalizedName}`, 
                    type: suggestion.Type,
                    key: suggestion.Key, 
                    country: suggestion.Country.LocalizedName
                  }
                });
                // const suggestions: ILocationData[] = data.map((suggestion) => {
                  //         return {
                    //           name: `${suggestion.Country.LocalizedName}-${suggestion.AdministrativeArea.LocalizedName}-${suggestion.LocalizedName}`, 
                    //           type: suggestion.Type,
                    //           key: suggestion.Key, 
                    //           country: suggestion.Country.LocalizedName
                    //         }
                    //       });
                    setSuggestions(suggestions);
                  })
              // })
              // .catch(error => console.error(error));
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
          sx={{flexGrow: 1, marginTop: '30px'}}
          fullWidth
          id="combo-box-demo"
          options={suggestions}
          getOptionLabel={(option) => option.name}
          onInputChange={(event, value) => setInputValue(value)}
          renderInput={(suggestions) => <TextField variant="outlined" {...suggestions} label="search location"/>}
          onChange={(event, value) => onLocationSelected(value)}
        />
    )
}
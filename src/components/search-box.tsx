import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IsMetricContext } from "../App";
import { ILocationData } from "../interfaces/location-meta-data.interface";
import { fetch5DaysForcastRequest, fetchLocationKeySuccess, fetchLocationWeatherRequest } from "../store/weather/actions";

// export interface ISuggestion {
//     name: string;
//     key: string;
//     country: string;
// }

export const SearchBox: React.FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<ILocationData[]>([]);
    const metricContext = useContext(IsMetricContext);

    useEffect(() => {
        if (inputValue.length >= 3) {
          fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${inputValue}&apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const suggestions: ILocationData[] = data.map((suggestion: {AdministrativeArea: { LocalizedName: string }, Country: { LocalizedName: string }, LocalizedName: string, Key: number, Type: string }) => {
                    return {
                      name: `${suggestion.Country.LocalizedName}-${suggestion.AdministrativeArea.LocalizedName}-${suggestion.LocalizedName}`, 
                      type: suggestion.Type,
                      key: suggestion.Key, 
                      country: suggestion.Country.LocalizedName
                    }
                  }
                )
                setSuggestions(suggestions)
            })
            .catch(error => console.error(error));
        } else {
          setSuggestions([]);
        }
      }, [inputValue]);

    return (
        <div>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Tab' && suggestions.length > 0) {
            setInputValue(suggestions[0].name);
          }
        }}
      />
      <ul>
        {suggestions?.map(suggestion => (
          <li
            key={suggestion.key}
            onClick={() => {
                    setInputValue((suggestion.name))
                    dispatch(fetchLocationKeySuccess(suggestion))
                    dispatch(fetchLocationWeatherRequest(suggestion.key));
                    dispatch(fetch5DaysForcastRequest({locationKey: suggestion.key, isMetric: metricContext.isMetric}));
                }
            }
          >
            {suggestion.name}
          </li>
        ))}
      </ul>
    </div>
    )
}
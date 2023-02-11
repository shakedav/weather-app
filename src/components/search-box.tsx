import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLocationWeather } from "../API";
import { fetch5DaysForcastRequest, fetchLocationWeatherRequest } from "../store/weather/actions";

export interface ISuggestion {
    name: string;
    key: number;
}

export const SearchBox: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (inputValue.length >= 3) {
          fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${inputValue}&apikey=${process.env.REACT_APP_ACCCUEWEATHER_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const suggestions: ISuggestion[] = data.map((suggestion: {AdministrativeArea: { LocalizedName: string }, Country: { LocalizedName: string }, LocalizedName: string, Key: number }) => {
                    return {name: `${suggestion.Country.LocalizedName}-${suggestion.AdministrativeArea.LocalizedName}-${suggestion.LocalizedName}`, key: suggestion.Key
                }})
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
                    dispatch(fetch5DaysForcastRequest(suggestion.key));
                    dispatch(fetchLocationWeatherRequest(suggestion.key));
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
import React, {useState} from  "react";
import {useLazyQuery} from '@apollo/client';
import {getWeatherQuery} from '../graphql/Queries';

function Home() {
    const [citySearched, setCitySearched] = useState("");

    const [getWeather, {data, error}] = useLazyQuery(getWeatherQuery, {
        variables: { name: citySearched },
    });

    //handle errors
    if(error){
        return <h1>error found</h1>
    }
    if(data){
        console.log(data);
    }

    return (
        <div className="home">
            <h1>Search for the Weather</h1>
            <input
                type="text"
                placeholder="Enter City Name"
                onChange={(event) => {
                    setCitySearched(event.target.value);
                }}
            />
            <button onClick={() => getWeather()}>Search</button>
            <div className="weather">
                {data && (
                    <>
                        <h1>City: {data.getCityByName.name}</h1>
                        <h1>lat: {data.getCityByName.coord.lat}</h1>
                        <h1>lon: {data.getCityByName.coord.lon}</h1>
                        <h1>Country: {data.getCityByName.country}</h1>
                        <h1>Humidity: {data.getCityByName.weather.clouds.humidity}</h1>
                        <h1>Description: {data.getCityByName.weather.summary.description}</h1>
                        <h1>Temperature: {data.getCityByName.weather.temperature.actual}</h1>
                        <h1>Feels Like: {data.getCityByName.weather.temperature.feelsLike}</h1>
                        <h1>Wind speed: {data.getCityByName.weather.wind.speed}</h1>
                        <h1>Wind degrees: {data.getCityByName.weather.wind.deg}</h1>
                    </>
                )}
            </div>
        </div>
    )

}

export default Home;
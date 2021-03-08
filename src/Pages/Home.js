import React, {useState} from  "react";
import {useLazyQuery} from '@apollo/client';
import {getWeatherQuery} from '../graphql/Queries';
import Weather from '../app_component/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';

/*
class HomeClass extends React.Component {
    state = {}
    render() {
        return(
            <div className="HomeClass">
                <Weather />
            </div>
        );
    }
}*/

function Home() {
    const [citySearched, setCitySearched] = useState("");

    const [getWeather, {data, error}] = useLazyQuery(getWeatherQuery, {
        variables: { name: citySearched },
    });

    //handle errors
    if(error){
        return <h1>error found</h1>
    }

    //only display the data once it has been loaded.
    if(data){
        console.log(data);
    }

    return (
        <div className="home">

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
            <Weather />
        </div>

    )

}

export default Home;
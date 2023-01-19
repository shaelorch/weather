import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react';
import {TiLocation} from 'react-icons/ti';

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const [weather, setWeather] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  var apiKey = "5bb65e5dcdd88d96c09dd61a44557240";
  var lang = "fr";
  var units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  const searchLocation = (event) => {
    if(event.key === "Enter") {
      axios.get(url)
      .then((response) => {
        console.clear();
        setData(response.data);
        console.log(response.data);
        setWeather(response.data.weather);
        setErrorMessage("");
      }).catch(err => {
        console.log(err);
        setErrorMessage("Please enter another location");
        setData({});
        setWeather()
      })
      setLocation('')
  }}

  return <main className={styles.main}>
    
    
    <div className={styles.text}>
      
      <h2>{data.name}</h2><TiLocation style={display:'flex'}/>
      
    </div>
  
    <input 
    className={styles.input}
    value={location}
    onChange={event => setLocation(event.target.value)}
    placeholder="Enter Location"
    onKeyDown={searchLocation}
    type="text"
    
    />

    {
      weather && weather.map((w, index)=> {
        return(
          <div className={styles.text} key={index}>
            <div>{w.description}</div>
            <div>{w.main}</div>
            <h1>{data.main.temp} &deg;C</h1>
            <h3>Feels Like: {data.main.feels_like} &deg;C</h3>
            <h3>Wind Gust: {data.wind.speed}m/s</h3>
            
            </div>
    
    
    
    
    
  
      
   
        

        )
      })
    }
    
  </main>
    
     
    
}

import axios from 'axios'
import $ from 'jquery'
import rain from '../images/rainy.png'
import cloud from '../images/pngwing.com.png'
import haze from '../images/haze.png'
import clearsky from '../images/clearsky.png'
import drizzle from '../images/drizzle.png'
import React, { useEffect, useState } from 'react'
function Weather() {
    const [search, setSearch] = useState('')
    const [result, setResult] = useState([])
    
    const [time, setTime] = useState('')
    
    function times() {
        var obj = new Date()
        setTime(obj.toLocaleTimeString())

    }

    setInterval(times, 1000)
    var date = new Date()
    var currentdate = date.toLocaleDateString()

    function searchhandler(e) {

        var ch = (e.target.value).charAt(0).toUpperCase() + (e.target.value).slice(1)

        setSearch(ch)
    }
    useEffect(() => {
        let lat = ''
        let lon = ''
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords)
            lat = position.coords.latitude
            lon = position.coords.longitude
            console.log(lon, lat)
            current_temp(lat, lon)
        })


    }, [])
    function current_temp(lat, lon) {
        axios('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=c0362684f2ada7fd9502b79579bf3a59')
            .then(response => calculate_current_temp(response))
    }
    


    async function tempresult(e) {
        e.preventDefault()
        
        if (search != '') {
            try {
                await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + search + '&appid=c0362684f2ada7fd9502b79579bf3a59')
                    .then(response => calculate_current_temp(response))
            } catch (error) {

                console.log(error)
                if (error.message == "Network Error") {
                    alert('check your network connection')
                }
                else {
                    alert('enter a valid city name')
                    
                }
            }
        }
        else {
            let lat = ''
            let lon = ''
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords)
                lat = position.coords.latitude
                lon = position.coords.longitude
                console.log(lon, lat)
                current_temp(lat, lon)
            })
        }
    }

    function calculate_current_temp(response) {
        console.log(response)
        const loc = response.data.name
        const kelvin = response.data.main.temp
        const celcius = kelvin - 273.15
        
        const speed = (response.data.wind.speed * 3.6).toFixed(2)
        
        const coord = response.data.coord //has two keys => lon, lat
        
        const description = response.data.weather[0].description
        let icon = response.data.weather[0].icon
        var iconurl = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
        document.getElementById('iconw').src = iconurl
        setResult([loc, Math.round(celcius), coord.lon, coord.lat, response.data.weather[0].description, response.data.main.humidity, speed])

        
    }


    return (
        <>
            <div className='background'>

                <div className='weatherheader'>

                    <h2>WEATHER APPLICATION</h2>
                    <form className='inpform' onSubmit={tempresult}>
                        <span className='inpformflex'><input type='text' id='searchbox' placeholder='enter a city name' value={search} onChange={searchhandler}></input><button className='searcher'><i class="fa-solid fa-magnifying-glass "></i></button></span>
                    </form>
                </div>
                <div className='content'>
                    <div className='resultant'>
                        <div className='loc_headingdiv'><span className='location'><i class="fa-solid fa-location-dot loc"></i>{result[0]}</span><br></br><span className='txt_now'>Now</span></div>
                        <div className='result'><img id='iconw'  src='' className='weatherimg' alt='weather icon'></img>
                            <label className='temp'>{result[1]}&deg;C</label>
                            
                        </div>
                        <div className='date_time'><label>{currentdate}</label><label>{time}</label></div>
                    </div>
                    <div className='display'>
                        <div className='infos'>
                            <div className='info'>
                                <h4><span className='infohead'>Coordinates</span><i class="fa-solid fa-location-crosshairs icons"></i></h4>
                                <span className='lon_lat'>
                                    <span>Lon:&nbsp;&nbsp;{result[2]}</span>
                                    <span>Lat:&nbsp;&nbsp;{result[3]}</span>
                                </span>
                            </div>
                            <div className='info'>
                                <h4><span className='infohead'>Description</span><span class="material-symbols-outlined icons">notes</span></h4>
                                <span className='description'>
                                    {result[4]}
                                </span>
                            </div>
                        </div>
                        <div className='infos'>
                            <div className='info'>
                                <h4><span className='infohead'>humidity</span><span class="material-symbols-outlined icons">
                                    humidity_low
                                </span></h4>
                                <span className='humidity'>
                                    {result[5]}%
                                </span>
                            </div>
                            <div className='info'>
                                <h4><span className='infohead'>Wind</span><i class="fa-solid fa-wind icons"></i></h4>
                                <span className='wind'>
                                    {result[6]}<small className='windunits'>kmph</small>
                                </span>
                            </div>
                        </div>




                    </div>
                </div>
            </div>

        </>
    )
}

export default Weather

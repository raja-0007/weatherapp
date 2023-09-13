import axios from 'axios'
import $ from 'jquery'
import React, { useState } from 'react'

function Temperature() {

    const [search, setSearch] = useState('')
    const [result, setResult] = useState([])
    const [ctemp, setCtemp] = useState([])
    
    function searchhandler(e) {
        var ch = (e.target.value).charAt(0).toUpperCase() + (e.target.value).slice(1)

        setSearch(ch)
    }

    function temps(cty) {
        axios('https://api.openweathermap.org/data/2.5/weather?q=' + cty + '&appid=c0362684f2ada7fd9502b79579bf3a59')
            .then(response => {
                const kelvin = response.data.main.temp
                const celcius = kelvin - 273.15
                document.getElementById(cty).innerHTML = '<i class="fa-solid fa-temperature-low fa-lg"></i>  '+Math.round(celcius) + 'deg <br/><label className="font-weight-bold">Description: </label>  ' + response.data.weather[0].description
            })
    }
    function tempresult(e) {
        e.preventDefault()

        axios('https://api.openweathermap.org/data/2.5/weather?q=' + search + '&appid=c0362684f2ada7fd9502b79579bf3a59')
            .then(response => {
                const kelvin = response.data.main.temp
                const celcius = kelvin - 273.15
                //console.log(response.data.weather[0].description)
                setResult([Math.round(celcius)+'deg', response.data.weather[0].description,search])

            })
        $('#resulttable').slideDown(700)
        document.getElementById('citycollect').style.marginTop = '30px'
        document.getElementById('citycollect').style.marginBottom = '30px'

    }


    return (
        <>
            <div className='row pt-5 weatheroutlook'>
                <div className='col-md-2'></div>
                <div className='col-md-8 mt-3 weatherhead'>
                    <span className='text-center'>
                    <h1 className='weatherheading text-center'>WEATHER REPORT</h1>
                    <label className='text-center'>find temperature at any city across the world with just one click</label>
                    </span>
                    
                    <form className='weatherinpspan' onSubmit={tempresult}>
                        <input type='text' id='weatherinp' placeholder='enter a city name' value={search} onChange={searchhandler}></input><button className='searchbtn'><i class="fa-solid fa-magnifying-glass fa-lg"></i></button>
                    </form>
                    <div id='resulttable'>
                        <h5 className='resulthead'>REPORT:</h5>
                        <table className='m-2 mx-auto'>
                            <tr>
                                <td className='p-1 pe-3'>City</td>
                                <td className='p-1 ps-3'>{result[2]}</td>
                            </tr>
                            <tr>
                                <td className='p-1 pe-3'><i class="fa-solid fa-temperature-low fa-lg"></i></td>
                                <td className='p-1 ps-3'>{result[0]}</td>
                            </tr>
                            <tr>
                                <td className='p-1 pe-3'>Description</td>
                                <td className='p-1 ps-3'>{result[1]}</td>
                            </tr>
                        </table>

                    </div>


                    <div id='citycollect'>
                        <div className='cities'>
                            <h4 >Hyderabad</h4>
                            <p id='Hyderabad'>{temps('Hyderabad')}</p>
                        </div>
                        <div className='cities'>
                            <h4>Delhi</h4>
                            <p id='Delhi'>{temps('Delhi')}</p>
                        </div>
                        <div className='cities'>
                            <h4>Mumbai</h4>
                            <p id='Mumbai'>{temps('Mumbai')}</p>
                        </div>
                        <div className='cities'>
                            <h4>Chennai</h4>
                            <p id='Chennai'>{temps('Chennai')}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-2'></div>
            </div>
        </>
    )
}

export default Temperature

import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
import requests from "../../utils/requests"
import banner from "./banner.css"

const Banner = () => {
  const [Movie, setMovie] = useState({});
  useEffect(()=>{
    (async() => {
      try{
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request)
        setMovie(request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]);
      } catch(error){
        console.log("error", error)
      }
    })(); // Immediately invoked function expression (IIFE)
  }, []);

  function truncate(str, n){
    return str?.length > n ?  str.substr(0, n) + "...":str
  }
  return (
    <div
    className='Banner'
    style={{
      backgroundImage:`url(https://image.tmdb.org/t/p/w1280/${Movie?.backdrop_path})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
    >
      <div className="banner-contents">
        <h1 className='banner_title'>
          {Movie?.title||Movie?.name||Movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className='banner_button play'>Play</button>
          <button className='banner_button'>My Lists</button>
        </div>
        <div className="banner_desciption">{truncate(Movie?.overview, 150)}</div>
      </div>

      <div className="banner_fadebutton"></div>
    </div>
  )
}

export default Banner

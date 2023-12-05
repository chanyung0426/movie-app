import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function MovieDetail() {
    
    //경로를 구성하는 url에서 값을 추출
    const {movieId} = useParams(); //특정한 값 추출 할 때 사용
    const [movie, setMovie] = useState({});

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(`/movie/${movieId}`)
            setMovie(request.data);
        }
        fetchData()
    }, [movieId])
    return (
        <div>
           <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>  
        </div>
    )
}

export default MovieDetail

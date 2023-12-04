import React, { useEffect, useState } from 'react';
import axios02 from '../api/axios02';
import request from '../api/request';
import styled from 'styled-components';


function MainVideos() {
    const [movie, setMoive] = useState(null) //영화의 리스트가 있음을 반환
    const [videoKey, setVideoKey] = useState(null) //영화동영상을 연결할 아이디를 반환
    const [showImg, setShowImg] = useState(true) //맨처음 썸네일 이미지를 보여줄 이미지 상태값

    useEffect(()=>{
        fetchData();
    },[]) //최초 마운트 시 에만

    useEffect(()=>{
        if(videoKey){
            changeVideo()
        }
    },[videoKey])

    const fetchData = async ()=>{
        //async 비동식으로 데이터에 접근하는 메서드
        try{
            const res = await axios02.get(request.fetchNowPlayMoive) //res는 response의 약자
            //console.log(res)
            const movieId = res.data.results[
                Math.floor(Math.random()*res.data.results.length)
            ].id;

            const {data : movieDetail} = await axios02.get(`movie/${movieId}`,{
                params : {append_to_response  : 'videos'},
            })
            if(movieDetail.videos && movieDetail.videos.results.length > 0){   
            setMoive(movieDetail)
            setVideoKey(movieDetail.videos.results[0].key)

            setTimeout(()=>{
                setShowImg(false)
            },2000)

            }
           

            //console.log(movieId)
        }catch(error){
            console.error(error)
        }
    }

    const changeVideo = () =>{
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&loop=1&mute=1&playlist=${videoKey}`;
        iframe.width = '100%';
        iframe.height = '100%';
        videoContainer.appendChild(iframe);
    }
    return (
            <>
            {showImg && movie &&(
                <MainVideoImg img={movie.backdrop_path}/>
            )}
                <MainVideoWrapper id='videoContainer'/>

            </>
    )
}

export default MainVideos;

const MainVideoImg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;
    background: url(https://image.tmdb.org/t/p/original/${(props)=>props.img}) no-repeat center center;
`

const MainVideoWrapper = styled.div`
    width : 100%;   
    height : 100vh;
    
`

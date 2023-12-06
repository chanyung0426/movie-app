import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';

function Overview({setIsClick, title, movieId, backdrop_path, overview}) {
    const [isVisible, setIsVisible] = useState(false);
    const overViewRef = useRef(null)
    console.log()
    return (
        <HoverContainer ref={overViewRef} className={`overview ${isVisible ? 'visible' : ''}`}>

            <HoverWrapper>
                <CloseBtn onClick={()=>setIsClick(false)}>
                   <MdClose />
                </CloseBtn>
                <Link to={`/movie/${movieId}`}>
                   <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}/>
                </Link>
            <HoverText>
                <h2>{title}</h2>
                <p>{overview}</p>
            </HoverText>
            </HoverWrapper>

        </HoverContainer>
    )
}

export default Overview

const HoverContainer = styled.div`
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
`
const HoverWrapper = styled.div`
    max-width: 50%;
    height: auto;
    background: gray;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
`

const CloseBtn = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    position: absolute;
    top: 30px;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        width: 30px;
        height: 30px;
        path{
        color: #fff;
    }
    }
  
`

const HoverText = styled.div`
    padding: 30px;
    box-sizing: border-box;
    height: auto;
    width: 100%;
    background: gray;
`

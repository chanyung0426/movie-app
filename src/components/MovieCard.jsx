import React from 'react'
import { IoMdPlay, IoIosArrowDown } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { SlLike } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function MovieCard({movie, genreText}) {

    // const {title, backdrop_path, genre_ids}= movie;

    const navigate = useNavigate(); //링크로 이동 시켜주는 요소

    const overViewEvent = ()=>{
        navigate(`movie/${movie.id}`)
    }

    return (
        <MovieItem onClick={overViewEvent}>
            <img src = {`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
            <Content className="addi-content">
                <p>{movie.title}</p>
                <div className='btn-wrapper'>
                   <button className='btn1'><IoMdPlay /></button>
                   <button className='btn2'><LuPlus /></button>
                   <button className='btn3'><SlLike /></button>
                   <button className='btn4'><IoIosArrowDown /></button>
                </div>
                <div className='genres-wrapper'>
                        <span >{genreText}</span>
                </div>
                  
            </Content>
        </MovieItem>
    )
}

export default MovieCard

const MovieItem = styled.div`
    flex-shrink: 0;
    position: relative;
    transition: 500ms;
    img{
        width: 100%;
        display: block;
    }
  
    &:hover{
        transform: scale(1.3);
        z-index: 10;
        .addi-content{
            opacity: 1;
            position: relative;
            z-index: 99;
        }
    }
`
const Content = styled.div`
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    background: gray;
    color: white;
    transition: 500ms;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    opacity: 0;
    p{
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(-150%);
        font-size: 30px;
        opacity: 0;
        transition: 300ms 1000ms;
    }
    .btn-wrapper{
        display: flex;
        gap: 20px;
        button{
            width: 40px;
            height: 40px;
            border-radius: 100%;
            background: white;
            display: flex;
            align-items: center;    
            justify-content: center;
            svg{
                width: 20px;
                height: 20px;
                path{       
                color: black;
               
            }
            }
            
            &.btn4{
                margin-left: auto;
            }
        }
    }
`
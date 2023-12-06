import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fecthComedyMovies } from '../store';
import styled from 'styled-components';


//swiper
//yarn add swiper 설치
import {Swiper, SwiperSlide} from 'swiper/react'; //스와이퍼 적용 임포트
import { Navigation, Pagination } from 'swiper/modules'; //모듈 임포트
import 'swiper/css'; //스와이퍼 기본 css 적용 임포트
import 'swiper/css/navigation'; //스와이퍼 좌우버튼 기본 css
import 'swiper/css/pagination'; //스와이퍼 도트 리스트 기본 css
import '../styled/swiperCustomCss.css';
import Overview from './Overview';


function Comedy() {

    const [isClick, setIsClick] = useState(false)
    const dispatch = useDispatch(); //생성된 action의 state의 접근
    useEffect(()=>{
        dispatch(fecthComedyMovies())
    },[])
    //console.log(fecthActionMovies())

    const actionData = useSelector((state)=>state.comedy.movies, []) || []
    console.log(actionData.results)

    const overViewEvent = (el)=>{
        setIsClick(el)
    }
    const overViewClose = () =>{
        setIsClick(false);
    };

    return (
        <div>
            <MovieContainer>
                <MovieTitle>코미디</MovieTitle>
                <Swiper
                    spaceBetween={10} //슬라이드와 슬라이드 사이 여백(gap);
                    slidesPerView={5} //한번에 보여질 슬라이드 아이템의 갯수
                    slidesPerGroup={5} //슬라이드 이동시 한번에 움직일 슬라이드 아이템의 갯수
                    loop //무한반복
                    modules={[Navigation, Pagination]} //모듈 적용
                    navigation //모듈 실제 적용
                    pagination //모듈 실제 적용
                >
                    <MovieWrapper>
                        {actionData.results && actionData.results.map((el,index)=>(
                            <SwiperSlide>
                                <MovieItem onClick={()=>overViewEvent(el,index)}>
                                    <img src = {`https://image.tmdb.org/t/p/original/${el.backdrop_path}`}/>
                                </MovieItem>
                               
                            </SwiperSlide>
                        ))}
                    </MovieWrapper>
                </Swiper>
            </MovieContainer>
            {isClick && <Overview movie={isClick} setIsClick={overViewClose}/>}
        </div>
    )
}

export default Comedy

const MovieContainer = styled.div`
    margin-bottom: 50px;
    position: relative;
    box-sizing: border-box;
`

const MovieTitle = styled.div`
    font-size: 40px;
    font-weight: bold;
    color: #fff;
`

const MovieWrapper = styled.div`
    /* display: flex;
    gap: 30px; */
    height: 200px;
`

const MovieItem = styled.div`
img{
    display: block;
    max-width: 100%;
}
`

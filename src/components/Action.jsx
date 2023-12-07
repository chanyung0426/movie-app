import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fecthActionMovies } from '../store';
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
import MovieCard from './MovieCard';
import { fetchGenres } from '../api/api';


function Action() {

    const [itemSelect, setItemSelect] = useState({});
    const [isClick, setIsClick] = useState(false)
    const [ genres, setGenres]= useState({})
    const dispatch = useDispatch(); //생성된 action의 state의 접근
    
    useEffect(()=>{
        dispatch(fecthActionMovies())
    },[])
    //console.log(fecthActionMovies())

    const actionData = useSelector((state)=>state.action.movies, []) || []
    //console.log(actionData.results)

    const overViewEvent = (el)=>{
        setIsClick(el)
    }
    const overViewClose = () =>{
        setIsClick(false);
    };

    //장르추가
    useEffect(()=>{
        const fetchActionMovieGenres = async()=>{
            dispatch(fecthActionMovies());
            const genres = await fetchGenres();
            setGenres(genres);
        }
        fetchActionMovieGenres(); 
    })
   

    const getGenreText = (genreId)=>{
        return genreId.map((el)=>genres[el]).join()
    }

    const movieClickEvent = (movie)=>{
        setItemSelect(movie);
        setIsClick(true);
    }

    return (
        <div>
            <MovieContainer>
                <MovieTitle>액션</MovieTitle>
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
                               <MovieCard 
                               movie={el} genreText={getGenreText(el.genre_ids)}
                               onClick={movieClickEvent}
                               ></MovieCard>
                            </SwiperSlide>
                        ))}
                    </MovieWrapper>
                </Swiper>
            </MovieContainer>
            {isClick && (
            <OverViewWrapper isVisble ={!!itemSelect}>
                 <Overview {...itemSelect} setIsClick={()=>setIsClick(false)}/>
            </OverViewWrapper>
            )}
            
        </div>
    )
}

export default Action

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
const OverViewWrapper = styled.div`
    display: ${props => [props.isVisble ? 'block' : 'none']};
    width: 100vw;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
`


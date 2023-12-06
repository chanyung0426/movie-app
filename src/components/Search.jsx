import axios from '../api/axios';
import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import styled from 'styled-components';

function Search() {
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false) //인풋창의 기본 속성 값 지정
    const [showClearBtn, setShowClearBtn] = useState('');
    
    //검색어의 입력 여부를 보기 위해서 만든 상태변수 state
    const [list, setList] = useState(false) //검색리스트가 있는지 여부
    const [movieList, setMovieList] = useState([]); //검색결과 리스트 출력

    let data = []; //영화 리스트가 들어올 변수

    const API_KEY = '82776dd4e021405937c471b1f995902b';
    const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&include_adult=false&language=ko-KR&page=1`

    const onToggleEvent = (e)=>{
        e.preventDefault();
        setVisible((prev)=>!prev)
    }
    const onClear = (e)=>{
        //e.preventDefault();
        setText('');
        setShowClearBtn(false)
    }

    const fetch = async ()=>{
        const res = await axios.get(BASE_URL);
        data = res.data.results || [];
        setMovieList(data)
    }

    return (
        <>
        <SearchForm visible={`${visible}`} className={visible ? 'on' : null}>
        <button className='search-btn' onClick={onToggleEvent}><BiSearch /></button>
        {visible &&(
            <input 
            type='text'
            value={text} 
            placeholder='검색어를 입력하세요'
            onChange={(e)=>{
                setText(e.target.value)
                setShowClearBtn(e.target.value.trim()!=='')
                fetch(setMovieList());
                setList(true);
            }} //텍스트 쓰면 X표시 나오게 하기
            ></input>
        )}

        {showClearBtn &&(
            <button className='clear-btn' onClick={onClear}><MdClear /></button>
        )}
           
        </SearchForm>

        <ResultContainer className={(list ? 'on': '')}>
            <div className='searchMovie'>
                <h3>{text}로 검색한 결과입니다.</h3>
                {list ?(
                    <div className='listContainer'>
                        {movieList && movieList.map((el)=>(
                            <List props={el} key={el.id}/>
                        ))}
                    </div>
                ) : (<p>결과물을 불러오는 중입니다...</p>)}
            </div>
        </ResultContainer>
        </>
    )
}

const List = (props)=>{
    const {backdrop_path, title}=props.props;
    const imgUrl = backdrop_path;
    return(
        <div className='ListItem'>      
           <img src={`https://image.tmdb.org/t/p/original/${imgUrl}`}/>  
        </div>
    )
}
export default Search

const SearchForm = styled.form`
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    transition: 500ms;
    width: 30px;
    &.on{
        border-color: #fff;
        transition: 500ms;
        width: 240px;
        border-radius: 4px;
    }
    .search-btn{
        color: #fff;
        font-size: 30px;
        display: flex;
        align-items: center;
    }
    input{
        width: ${({visible})=>(visible ? '200px' : '0px')};
        color: #fff;
        opacity: ${(visible)=>(visible ? 1 : 0)};
        
    }
    .clear-btn{
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        font-size: 24px;
        display: flex;
        align-items: center;
    }
`
const ResultContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: -1;
    padding: 100px;
    box-sizing: border-box;
    overflow: scroll;
    display: none;
    &.on{
        display: block;
    }
    .searchMovie{
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        h3{
            color: #fff;
            font-weight: bold;
            font-size: 40px;
            text-align: center;
            margin-bottom: 24px;
        }
        .listContainer{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            .ListItem{
                img{
                    width: 350px;
                }
            }
        }
    }
`

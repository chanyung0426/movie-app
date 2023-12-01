import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import styled from 'styled-components';

function Search() {
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false) //인풋창의 기본 속성 값 지정
    const [showClearBtn, setShowClearBtn] = useState('')
    //검색어의 입력 여부를 보기 위해서 만든 

    const onToggleEvent = (e)=>{
        e.preventDefault();
        setVisible((prev)=>!prev)
    }
    const onClear = (e)=>{
        //e.preventDefault();
        setText('');
        setShowClearBtn(false)
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
            }} //텍스트 쓰면 X표시 나오게 하기
            ></input>
        )}

        {showClearBtn &&(
            <button className='clear-btn' onClick={onClear}><MdClear /></button>
        )}
           
        </SearchForm>
        </>
    )
}

export default Search

const SearchForm = styled.form`
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    transition: 500ms;
    &.on{
        border-color: #fff;
        transition: 500ms;
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

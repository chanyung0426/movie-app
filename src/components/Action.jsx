import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fecthActionMovies } from '../store';

function Action() {
    const dispatch = useDispatch(); //생성된 action의 state의 접근
    useEffect(()=>{
        dispatch(fecthActionMovies())
    },[])
    console.log(fecthActionMovies())

    const actionData = useSelector((state)=>state.action.movies, []) || []
    console.log(actionData.results)
    return (
        <div>
            
        </div>
    )
}

export default Action

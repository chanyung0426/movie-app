import axios from "axios";

export const FETCH_ACTION_MOVIES = 'FETCH_ACTION_MOVIES';

const API_KEY = '82776dd4e021405937c471b1f995902b'; //계정마다 발급받는 api키를 변수화
const BASE_URL = 'https://api.themoviedb.org/3'; //영화의 정보를 받아올 url의 공통 주소

//액션
export const fetchActionData = (data)=>{
    return{
        type: FETCH_ACTION_MOVIES,
        data
    }
}

export const fecthActionMovies = () =>{
    return(dispatch)=>{
        //dispatch : 외부에서 데이터를 가져올때 사용하는 reducer의 기능 useState의 대체
        return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`)
        .then((res)=>{
            dispatch(fetchActionData(res.data))
            //then => axios에서 콜백함수를 대체하는 return과 같은 구문
        })
    }
}
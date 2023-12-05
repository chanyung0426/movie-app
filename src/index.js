import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './styled/GlobalStyle';
import Main from './pages/Main';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import MainVideos from './components/MainVideos';
import MovieList from './components/MovieList';
import {Provider} from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './store/reducer';
import MovieDetail from './pages/MovieDetail';
import App from './App';
/* 
important시에 {}사용하는 것과 안하는 것의 차이
기능을 내보내기하는 방법에 따라서 차이가 발생


*/

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    errorElement : <NotFound/>,
      /*children
      중첩 라우터를 children으로 연결하게 되면 내부에 있는 파일은 부모 요소의 링크를 기준으로 잡힌다.
      내부에 children으로 작성하게 되면 중첩되는 url은 생략 할 수 있다.
      */
  },
  {
    path : 'movie/:movieId', // :이 붙으면 변수
    element : <MovieDetail/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    



    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

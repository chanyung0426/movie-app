import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './styled/GlobalStyle';
import Main from './pages/Main';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Main/>,
    errorElement : <NotFound/>,
    children : [
      /*children
      중첩 라우터를 children으로 연결하게 되면 내부에 있는 파일은 부모 요소의 링크를 기준으로 잡힌다.
      */
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle/>
    {/* <App /> */}
    {/* <Main/> */}
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

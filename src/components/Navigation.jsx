import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


function Navigation() {
    return (
        <Nav>
            <ul>
                <li><Link to='/'>홈</Link></li>
                <li><Link to='/'>시리즈</Link></li>
                <li><Link to='/'>영화</Link></li>
                <li><Link to='/'>NEW 요즘 대세 콘텐츠</Link></li>
                <li><Link to='/'>내가 찜한 콘텐츠</Link></li>
            </ul>
        </Nav>
    )
}

export default Navigation

const Nav = styled.nav`
    ul{
        display: flex;
        gap: 24px;
        align-items: center;
        li{
            a{
                color: rgba(255,255,255,0.6);
                transition: 500ms;
                font-size: 14px;

                &:hover{
                    color: rgba(255,255,255,1);
                }
            }
        }
    }
`

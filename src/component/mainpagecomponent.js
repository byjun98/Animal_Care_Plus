import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import Main from './maincomponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faAngleLeft,faHouse } from "@fortawesome/free-solid-svg-icons";
function MainPage() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    let [mainlist, Setmainlist] = useState([])
    const handleLogout = () => {
        // 로컬 스토리지에서 토큰 삭제
        localStorage.removeItem('accessToken');
        navigate('/login');
        // 로그인 상태 업데이트
        // 이 부분은 필요에 따라 추가적인 처리를 할 수 있습니다.
    };


    return (
        <div className="Mainpage">
           <div className={`MainTopNav ${isScrolled ? 'hidden' : ''}`}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

                    <p className='Logoname'>에케플</p>
                    <p className='Logout' onClick={handleLogout}>로그아웃</p>
                </div>
                <div className="MainTopNavListBox">
                    <Link to="/shop" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "상점" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "상점";
                        Setmainlist(copy)
                    }}>상  점</p></Link>
                    <Link to="/board" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "게시판" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "게시판";
                        Setmainlist(copy)
                    }}>게시판</p></Link>
                    <Link to="/map" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "지도" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "지도";
                        Setmainlist(copy)
                    }}>지도</p></Link>
                    <Link to="/vaccin" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "접종" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "접종";
                        Setmainlist(copy)
                    }}>접종</p></Link>


                </div>
            </div>


            <div className='MainBottomNav'>
                <Link to="/main" style={{ textDecoration: "none", color: "#9a9a9a" }}>
                    <div>
                        <FontAwesomeIcon icon={faHouse} />
                    </div>
                </Link>
                <Link to="/camera" style={{ textDecoration: "none", color: "#9a9a9a" }}>
                    <div>
                        <FontAwesomeIcon icon={faCamera} />
                    </div>
                </Link>

                <div>
                    <FontAwesomeIcon icon={faAngleLeft} onClick={() => {
                        alert("더 이상 뒤로 갈 수 없습니다")
                    }} />

                </div>

            </div>
            <Main></Main>
        </div>

    )
};
export default MainPage;
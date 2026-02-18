import React, {useState} from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faAngleLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import '../../css/map.css';

const withNavigation = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mainlist, Setmainlist] = useState(["게시판"]);

    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      navigate('/login');
    };

    return (
      <div className="Mainpage">
        <div className={`MainTopNav ${isScrolled ? 'hidden' : ''}`}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p className='Logoname'>에케플</p>
            <p className='Logout' onClick={handleLogout}>로그아웃</p>
          </div>
          <div className="MainTopNavListBox">
            <Link to="/shop" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}>
              <p className={`MainTopNavList ${mainlist[0] === "상점" ? "active" : ""}`} onClick={() => {
                let copy = [...mainlist];
                copy[0] = "상점";
                Setmainlist(copy);
              }}>상점</p>
            </Link>
            <Link to="/board" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}>
              <p className={`MainTopNavList ${mainlist[0] === "게시판" ? "active" : ""}`} onClick={() => {
                let copy = [...mainlist];
                copy[0] = "게시판";
                Setmainlist(copy);
              }}>게시판</p>
            </Link>
            <Link to="/map" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}>
              <p className={`MainTopNavList ${mainlist[0] === "지도" ? "active" : ""}`} onClick={() => {
                let copy = [...mainlist];
                copy[0] = "지도";
                Setmainlist(copy);
              }}>지도</p>
            </Link>
            <Link to="/vaccin" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}>
              <p className={`MainTopNavList ${mainlist[0] === "접종" ? "active" : ""}`} onClick={() => {
                let copy = [...mainlist];
                copy[0] = "접종";
                Setmainlist(copy);
              }}>접종</p>
            </Link>
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
                navigate(-1);
              }} />
            </div>
          </div>
        </div>
        <div className="VocContainer">
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
};

export default withNavigation;

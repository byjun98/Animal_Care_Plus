import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import '../css/Shop.css';

import TextField from '@mui/material/TextField';
import {
    ButtonGroup,
    Button

} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faAngleLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
function ShopPage(props) {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    let [filtershop, setFilterShop] = useState([]);
    let [search, setSearch] = useState("");
    const [mainlist, Setmainlist] = useState(["상점"]); // 상태를 배열로 초기화

    useEffect(() => {
        if (!filtershop) {
            setFilterShop(props.shop);
            return;
        }

        const filtered = props.shop.filter(item => {
            return item.product.toLowerCase().includes(search.toLowerCase());
            console.log(filtered)
        });
        setFilterShop(filtered);

    }, [search, props.shop]);
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

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
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '90%' },
                }}
                noValidate
                autoComplete="off"
                zIndex={-1}
            >
                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Search"
                        multiline
                        maxRows={4}
                        zIndex={-1}
                        style={{ marginTop: "140px", marginBottom: "-150px" }}
                        onChange={(e) => setSearch(e.target.value)}
                    />


                </div>

            </Box>
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
                        navigate(-1)
                    }} />

                </div>

            </div>
            {/* 여기서부터 shop html */}
            <div className='ShopContainer' >
                <div className='ShopTop' style={{marginBottom:"30px"}}>

                    {/* <input
                        type="text"
                        placeholder='Search...'
                        onChange={(e) => setSearch(e.target.value)} /> */}
                    {/* <ButtonGroup variant="contained" aria-label="Basic button group"
                        style={{ width: "70%", backgroundColor: "#45A8F0", marginTop: "20px" }}>
                        <Button style={{ backgroundColor: "#5baee9", fontWeight: "600" }} className='ShopButton'>장난감</Button>
                        <Button style={{ backgroundColor: "#5baee9", fontWeight: "600" }} className='ShopButton'>간식</Button>
                        <Button style={{ backgroundColor: "#5baee9", fontWeight: "600" }} className='ShopButton'>편리용품</Button>
                    </ButtonGroup> */}
                    <div className='MainTopLogoBox'>
                        <div className='MainSectionTopBox' style={{ marginTop: "160px!important" }}>


                            <h6 style={{ marginTop: "30px", marginBottom: "10px", color: "grey" }}>자신의 반려견 또는 유기견을 찍어보세요!</h6>
                            <h3 style={{ margin: "0" }}>질병분석,견종분석 기능 포함</h3>
                            <Link to="/camera"><button className='MainSectionTopButton'>촬영하러 가기</button></Link>
                        </div>
                    </div>
                </div>
                <div className='ShopSection' style={{ marginBottom: "100px", marginTop: "20px" }}>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                            {
                                filtershop.map(function (a, i) {
                                    return (
                                        <Grid item xs={6} >
                                            <div className='shopbox' style={{ marginTop: "5px" }}>

                                                <Link to={`/shopdetail/${a.id}`}>
                                                    <img src={`../picture/shop${a.id}.JPG`} width="100%" height="60%" className='ShopImage' />
                                                </Link>

                                                <h6 style={{ marginTop: "13px", fontSize: "13px" }}>{a.product}</h6>


                                            </div>
                                        </Grid>
                                    )
                                })
                            }



                        </Grid>
                    </Box>





                </div>
            </div>
        </div>

    )
};
export default ShopPage;
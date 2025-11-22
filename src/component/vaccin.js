import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState, } from 'react';
import '../css/Vaccin.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faAngleLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from 'date-fns';
import vaccindata1 from '../vaccindata';
function VaccinPage() {
    const handleLogout = () => {
        // 로컬 스토리지에서 토큰 삭제
        localStorage.removeItem('accessToken');
        navigate('/login');
        // 로그인 상태 업데이트
        // 이 부분은 필요에 따라 추가적인 처리를 할 수 있습니다.
    };

    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    let [vaccin, SetVaccin] = useState(null);
    let [vaccinyn, SetVaccinYn] = useState(null);
    let [startDate, setStartDate] = useState(new Date());
    const [mainlist, Setmainlist] = useState(["접종"]); // 상태를 배열로 초기화
    let [vaccinmod, setVaccinmod] = useState(false);
    const selectedVaccinData = vaccindata1.find(item => item.name == vaccin && item.num === vaccinyn);
    const ReactDatePicker = () => {
        const handleFocus = (e) => {
            e.target.blur();
          };


        return (
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy년-MM월-dd일"
                    onFocus={handleFocus}
                />
            </div>
        );
    };
    const formattedDate = startDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });




    const formattedDateObject = selectedVaccinData ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + selectedVaccinData.date) : null;
    const formattedDateString = formattedDateObject ? formattedDateObject.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : null;

    const VaccinPost = (vaccin, vaccinyn, formattedDate, selectedVaccinData) => {

        setVaccinmod(true)
        // console.log(selectedVaccinData)

    };


    return (
        <div className="Vaccinpage" style={{height:"800px"}} >
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

                <div className='MainBottomNav' style={{zIndex:"3"}}>
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

            </div>
            <div className='MainTopLogoBox' style={{ marginTop: "" }} >
                <div className='MainSectionTopBox' style={{ marginBottom: "10px" }}>


                    <h6 style={{ marginTop: "20px", marginBottom: "5px", color: "grey" }}>자신의 반려견 또는 유기견을 찍고 관리하세요!</h6>
                    <h3 style={{ margin: "0" }}>피부병분석,견종분석 기능</h3>
                    <Link to="/camera"><button className='MainSectionTopButton' style={{marginBottom:"20px"}} >촬영하러 가기</button></Link>
                </div>
            </div>

            <Grid className='GridContainer' container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                <Grid item xs={6}>
                    <button className={`vaccinselect ${vaccin === "파라인플루엔자" ? "VaccinSelected" : ""}`} onClick={() => {
                        SetVaccin("파라인플루엔자")
                    }}>파라인플루엔자</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={`vaccinselect ${vaccin === "디스템퍼" ? "VaccinSelected" : ""}`} onClick={() => {
                        SetVaccin("디스템퍼")
                    }}>디스템퍼</button>
                </Grid>

                <Grid item xs={6}>
                    <button className={`vaccinselect ${vaccin === "호흡기감염" ? "VaccinSelected" : ""}`} onClick={() => {
                        SetVaccin("호흡기감염")
                    }}>호흡기감염</button>
                </Grid>
                <Grid item xs={6}>
                    <button className={`vaccinselect ${vaccin === "광견병" ? "VaccinSelected" : ""}`} onClick={() => {
                        SetVaccin("광견병")
                    }}>광견병</button>
                </Grid>
            </Grid>
            <p style={{ fontWeight: "700", fontSize: "17px", width: "60%" }}>과거 접종 여부</p>
            <Grid className='GridContainernum' container rowSpacing={0} columnSpacing={{ xs: 0, sm: 1, md: 3 }}>
                <Grid item xs={3}>
                    <button className={`vaccinselect ${vaccinyn === 0 ? "VaccinSelected" : ""}`} onClick={() => {
                        SetVaccinYn(0)
                    }} >없음</button>
                </Grid>
                <Grid item xs={3}>
                    <button className={`vaccinselect ${vaccinyn === 1 ? "VaccinSelected" : ""}`} onClick={() => {
                        SetVaccinYn(1);

                    }}>1회</button>
                </Grid>
                <Grid item xs={3}>
                    <button className={`vaccinselect ${vaccinyn === 2 ? "VaccinSelected" : ""}`} onClick={() => {
                        SetVaccinYn(2)
                    }} >2회</button>
                </Grid>

            </Grid>
            <p style={{ fontWeight: "300", fontSize: "17px" }}>과거 접종 날짜</p>
            <ReactDatePicker className="DatePicker"></ReactDatePicker>
            <div className="VaccinButtonContainer">
                <button className='VaccinButton' onClick={() => {
                    if (vaccin && selectedVaccinData) {
                        VaccinPost(vaccin, vaccinyn, formattedDate, selectedVaccinData);
                        setVaccinmod(true);
                    }
                }}>분석하기</button>
            </div>

            <div className={`vaccinMod ${vaccinmod == true ? "active" : null}`}>
                <div className="vaccinModContentBox">

                    {selectedVaccinData && (

                        <div className={`vaccinModSection`}>
                            <div className="vaccinModTop" style={{ textAlign: "left" }}>접종</div>
                            <div className="vaccinModTitle" style={{ fontSize: "20px", marginLeft: "9%" }}>{selectedVaccinData.name}</div>
                            <div style={{ fontSize: "11px", margin: "10%", color: "#555454" }}>{selectedVaccinData.content}</div>
                            <div style={{ fontSize: "11px", margin: "10%", color: "#555454" }} dangerouslySetInnerHTML={{ __html: selectedVaccinData.vaccindatacontent }}></div>
                            <div style={{ fontSize: "11px", margin: "10%", color: "#555454" }}>접종횟수: {selectedVaccinData.num} 회</div>
                            <div style={{ fontSize: "11px", margin: "10%", color: "#555454" }}>다음 예상 접종 일자: {formattedDateString} </div>
                        </div>
                    )}
                </div>
                <button className='vaccinModButton' onClick={() => {
                    setVaccinmod(false)
                }}>닫기</button>
            </div>
        </div>
    )
};

export default VaccinPage;
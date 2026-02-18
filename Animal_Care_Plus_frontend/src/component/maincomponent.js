import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera,faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useRef, } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
function Main() {
    const [gagebars, setGagebars] = useState({
        gagebar1: 0,
        gagebar2: 0,
        gagebar3: 0,
        gagebar4: 0
    });
    let [mainlist,Setmainlist] = useState("")
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalImages = 3;
    const handleNextClick = () => {
        setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1)%totalImages);
       
    };

    const handlePreviousClick = () => {
        setCurrentImageIndex(currentImageIndex =>(currentImageIndex - 1 + totalImages)%totalImages);
        
    };
    const translateValue = -currentImageIndex * 100;
    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 초기 게이지를 설정합니다.
        if (currentImageIndex === 0 && gagebars.gagebar1 === 0 && gagebars.gagebar2 === 0 && gagebars.gagebar3 === 0 && gagebars.gagebar4 === 0) {
            setGagebars({
                gagebar1: 60,
                gagebar2: 50,
                gagebar3: 20,
                gagebar4: 20
            });
        }
    }, [currentImageIndex, gagebars]);

    useEffect(() => {
        let newGagebars = { ...gagebars };
        if (currentImageIndex === 0) {
            newGagebars = {
                gagebar1: 60,
                gagebar2: 50,
                gagebar3: 20,
                gagebar4: 20
            };
        } else if (currentImageIndex === 1) {
            newGagebars = {
                gagebar1: 10,
                gagebar2: 50,
                gagebar3: 60,
                gagebar4: 20
            };
        } else if (currentImageIndex === 2) {
            newGagebars = {
                gagebar1: 20,
                gagebar2: 20,
                gagebar3: 60,
                gagebar4: 50
            };
        }
        setGagebars(newGagebars);
    }, [currentImageIndex]);
    return (

        <div style={{ overflowX: "hidden",height:"660px"}} >
            <div className='MainTopLogoBox' style={{paddingTop:"100px"}}>
                <div className='MainSectionTopBox' style={{ marginTop: "180px!!important" }}>


                    <h6 style={{ marginTop: "20px", marginBottom: "10px", color: "grey" }}>자신의 반려견 또는 유기견을 찍고 관리하세요!</h6>
                    <h3 style={{ margin: "0" }}>피부병분석,견종분석 기능</h3>
                    <Link to="/camera"><button className='MainSectionTopButton'>촬영하러 가기</button></Link>
                </div>
            </div>
            <div className='MainSectionLogoBox'style={{ transform: `translateX(${translateValue}vw)` ,marginTop:"-10px"}} >
                <div className='MainSectionLogoBoxSection' >
                    <div className="flex-container">
                        <img className="mainSectionImg" src="../picture/포메.jpg" alt="" />
                        <span style={{ marginRight: "30%", marginTop: "5%" }} className="mainSectionText">포메라니안</span>
                    </div>

                    <div className='MainSectionLogo' style={{ marginTop: "20px" }}>
                        <p>10대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar1}%`, backgroundColor: "#e84f13", height: "8px" ,transition: "width 1s ease-in-out"}}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>20대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar2}%`, backgroundColor: "#e84f13", height: "8px" ,transition: "width 1s ease-in-out"}}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>30대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar3}%`, backgroundColor: "#e84f13", height: "8px",transition: "width 1s ease-in-out" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>40대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar4}%`, backgroundColor: "#e84f13", height: "8px",transition: "width 1s ease-in-out" }}></div>
                    </div>
                </div>
                <div className='MainSectionLogoBoxSection'>
                    <div className="flex-container">
                        <img className="mainSectionImg" src="../picture/시바견.jpg" alt="" />
                        <span style={{ marginRight: "30%", marginTop: "5%" }} className="mainSectionText">시바견</span>
                    </div>

                    <div className='MainSectionLogo' style={{ marginTop: "20px" }}>
                        <p>10대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar1}%`, backgroundColor: "#e84f13", height: "8px",transition: "width 1s ease-in-out" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>20대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar2}%`, backgroundColor: "#e84f13", height: "8px",transition: "width 1s ease-in-out" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>30대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar3}%`, backgroundColor: "#e84f13", height: "8px",transition: "width 1s ease-in-out" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>40대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar4}%`, backgroundColor: "#e84f13", height: "8px",transition: "width 1s ease-in-out" }}></div>
                    </div>
                </div>
                <div className='MainSectionLogoBoxSection'>
                    <div className="flex-container">
                        <img className="mainSectionImg" src="../picture/리트리버.jpg" alt="" />
                        <span style={{ marginRight: "30%", marginTop: "5%" }} className="mainSectionText">리트리버</span>
                    </div>

                    <div className='MainSectionLogo' style={{ marginTop: "20px" }}>
                        <p>10대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar1}%`, backgroundColor: "#e84f13", height: "8px",transition: "width 1s ease-in-out" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>20대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar2}%`, backgroundColor: "#e84f13", height: "8px" ,transition: "width 1s ease-in-out"}}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>30대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar3}%`, backgroundColor: "#e84f13", height: "8px",transition: "width 1s ease-in-out" }}></div>
                    </div>
                    <div className='MainSectionLogo'>
                        <p>40대 인기층</p>
                        <div className="MainSecionGage" style={{ width: `${gagebars.gagebar4}%`, backgroundColor: "#e84f13", height: "8px" ,transition: "width 1s ease-in-out"}}></div>
                    </div>
                </div>

            </div>

            <button style={{ marginTop: "11px" }}className="before" onClick={handlePreviousClick}>이전</button>
            <button style={{ marginBottom: "80px" }} className="next" onClick={handleNextClick}>다음</button>
        </div>

    )
}
export default Main;
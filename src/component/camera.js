import '../css/Camera.css';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import axios from 'axios';
import * as LR from '@uploadcare/blocks';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faAngleLeft, faHouse } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState, useRef } from 'react';
LR.registerBlocks(LR);

function Camera() {
    const navigate = useNavigate();
    const [mainlist, Setmainlist] = useState(["카메라"]); // 상태를 배열로 초기화
    const [files, setFiles] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const ctxProviderRef = useRef(null);
    const paragraphs = [
<<<<<<< HEAD
        "파일을 업로드 중입니다...",
=======
>>>>>>> test3
        "강아지의 집은 화장실과 멀리 떨어진 곳에 위치하는 걸 아시나요?",
        "강아지가 귀여워도 소리 지르지 말기!",
        "강아지와의 첫 접촉은 손 냄새 맡게 하기!",
        "배변 패드는 강아지 집과 살짝 먼 곳에 위치하는 걸 아시나요?",
        "배변 패드에 배변했을 때 잘했다고 칭찬해주세요!"
      ];
      const [currentIndex, setCurrentIndex] = useState(0);

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % paragraphs.length);
        }, 5000);

        return () => clearInterval(interval);
      }, [paragraphs.length]);
    const handleLogout = () => {
        // 로컬 스토리지에서 토큰 삭제
        localStorage.removeItem('accessToken');
        navigate('/login');
        // 로그인 상태 업데이트
        // 이 부분은 필요에 따라 추가적인 처리를 할 수 있습니다.
    };

    useEffect(() => {
        const ctxProvider = ctxProviderRef.current;
        if (!ctxProvider) return;

        const handleChangeEvent = (event) => {
            setFiles([...event.detail.allEntries.filter((file) => file.status === 'success')]);
        };

        ctxProvider.addEventListener('change', handleChangeEvent);

        return () => {
            ctxProvider.removeEventListener('change', handleChangeEvent);
        };
    }, [setFiles]);

    useEffect(() => {
        if (files.length === 0) {
            setImageUrl("cameralogo.png");
        } else {
            const file = files[0].file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageUrl(reader.result);
            };
        }
    }, [files]); // files 상태가 변경될 때만 호출됩니다.

    // 초기 렌더링 시에도 호출되도록 추가
    useEffect(() => {
        if (files.length === 0) {
            setImageUrl("../picture/사진등록.JPG");
        }
    }, []);

    const [isScrolled, setIsScrolled] = useState(false);
    let [cammodal, setCammodal] = useState(false);

    useEffect(() => {
        setCammodal(true);
    }, []);

    const handleUpload = async (endpoint) => {
        if (files.length === 0) {
            alert("사진을 선택하세요");
            return;
        }

        setLoading(true); // 로딩 상태 시작
        let 토큰검사 = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append('image', files[0].file);

        try {
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'token': 토큰검사
                }
            });
            console.log('File uploaded successfully:', response);
            alert("파일이 성공적으로 업로드되었습니다.");
            const responseData = response.data;
            const question = `강아지 전문가 애케플! 한글로 ${responseData} 견종의 케어법을 다섯줄 이내로 알려줘~`;
            navigate('/chatbot', { state: { question } });
        } catch (error) {
            console.error('Error uploading file:', error);
            alert("파일 업로드 중 오류가 발생했습니다.");
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
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

            <div className={`CameraContainer ${cammodal ? 'active' : ''}`} style={{ height: "850px" }}>
                <div className="PhotoUpload" style={{ marginTop: "140px" }}>
                    <div>
                        <div className='UploadPhotoSeeContainer'>
                            <div className='UploadPhotoSee' style={{ marginBottom: "30px" }}>
                                <img src={imageUrl} alt="Uploaded" />
                            </div>
                        </div>
                        <div className='UploadCare'>
                            <lr-config
                                ctx-name="my-uploader"
                                pubkey="ac19ec4b2870c4ca0de0"
                                multiple={false}
                                imgOnly={true}
                                maxLocalFileSizeBytes={10000000}
                                sourceList="local, camera"
                            />
                            <lr-file-uploader-regular
                                ctx-name="my-uploader"
                                css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css"
                            />
                            <lr-upload-ctx-provider
                                ctx-name="my-uploader"
                                ref={ctxProviderRef}
                            />
                        </div>
                        <div className='CameraButtonContainer'>
                            <button className="CameraButton" onClick={() => handleUpload('http://3.38.225.120:8080/api/images/pet')}>
                                종 분석하기
                            </button>
                            <button className="CameraButton" onClick={() => handleUpload('http://3.38.225.120:8080/api/images/skin')}>
                                질병 분석하기
                            </button>
                        </div>
                    </div>
                </div>
                {loading && (
                     <div className="modal">
<<<<<<< HEAD
                     <div className="modal-content">
                       {paragraphs.map((text, index) => (
=======
                        
                     <div className="modal-content">
                        <span>사진을 분석 중입니다...</span>
                        <img src={imageUrl} alt="Uploaded" style={{width:"150px",height:"150px",marginTop:"20px"}}/>
                        <span style={{fontSize:"15px",color:"black",paddingTop:"20px"}}>틈새 꿀팁!!</span>
                       {paragraphs.map((text, index) => (
                        
>>>>>>> test3
                         <p key={index} className={index === currentIndex ? "active" : ""}>
                           {text}
                         </p>
                       ))}
                     </div>
                   </div>
                )}
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
                        navigate(-1)
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Camera;
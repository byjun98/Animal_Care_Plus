import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/SignUp.css';

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false); // 체크박스 상태 추가
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 아이디와 비밀번호 유효성 검사
        const usernameValid = validateUsername(username);
        const passwordValid = validatePassword(password);

        if (!usernameValid) {
            setUsernameError('아이디는 4 ~10자리의 영문 소문자와 숫자를 사용해야 합니다.');
            return;
        } else {
            setUsernameError(null);
        }

        if (!passwordValid) {
            setPasswordError('비밀번호는 8~15자리의 영문 소문자와 숫자를 사용해야 합니다.');
            return;
        } else {
            setPasswordError(null);
        }

        // 체크박스가 체크되지 않았을 때 회원가입을 진행하지 않음
        if (!agree) {
            alert("약관에 동의해주세요.");
            return;
        }

        try {
            const response = await axios.post('http://3.38.225.120:8080/api/user/signup', {
                username: username,
                password: password,
                admin: false
            });

            if (response.data.response && response.data.response.status === 200) {
                alert("회원가입이 완료되었습니다.");
                navigate('/login');
            } else {
                alert("회원가입 실패: " + response.data.response.message);
            }
        } catch (error) {
            console.error("회원가입 중 오류 발생:", error);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            alert("아이디 비밀번호를 다시 확인해주세요.")
        }
    };

    const validateUsername = (username) => {
        // 아이디 유효성 검사
        const usernameRegex = /^[a-z0-9]{4,10}$/;
        return usernameRegex.test(username);
    };

    const validatePassword = (password) => {
        // 비밀번호 유효성 검사 (영문 소문자와 숫자만 사용)
        const passwordRegex = /^[a-z0-9]{8,15}$/;
        return passwordRegex.test(password);
    };

    return (
        <div className="SignUp">
            <div className="SignUpmainbg"></div>
            <div className="SignUpTop">
                <p><span>Sign</span> <span style={{ color: "#e84f13" }}>Up</span></p>
                <p>저희 사이트에 회원가입 후 서비스를 이용해보세요!</p>
            </div>
            <form className="SignUpInputContainer" style={{ textAlign: "center" }} onSubmit={handleSubmit}>
                <input type="text" name="userId" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
                {usernameError && <div className="error" style={{ fontSize: '13px', color: "red" }}>{usernameError}</div>}
                <input type="password" name="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <div className="error" style={{ fontSize: '13px', color: "red" }}>{passwordError}</div>}

                <button type="submit">회원가입</button>
            </form>
            <div className="SignUpBottom">
                <p><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <span>회원가입에 동의하십니까?</span></p>
                <p>이미 회원가입을 하셨습니까? <Link to="/login" style={{ color: "#e84f13", fontWeight: "600", textDecoration: "underline" }}>Login</Link></p>
            </div>
        </div>
    );
}

export default SignUp;

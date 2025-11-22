import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  accessToken: null,
  userAccountname: null,  // 사용자 이름 상태 추가
  login: () => {},
  logout: () => {}
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userAccountname, setUserAccountname] = useState(null);  // 사용자 이름 상태 초기화

  const login = (token, username) => {  // 로그인 함수에 사용자 이름 인자 추가
    console.log('Login called with token:', token, 'and username:', username);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userAccountname', username);  // 로컬 스토리지에 사용자 이름 저장
    setAccessToken(token);
    setUserAccountname(username);  // 상태 업데이트
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userAccountname');  // 로컬 스토리지에서 사용자 이름 제거
    setAccessToken(null);
    setUserAccountname(null);  // 상태 클리어
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const username = localStorage.getItem('userAccountname');  // 로컬 스토리지에서 사용자 이름 검색
    console.log('Loaded token from localStorage:', token);  // 디버깅용 콘솔 출력
    console.log('Loaded username from localStorage:', username);  // 디버깅용 콘솔 출력
    if (token && username) {
      login(token, username);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, accessToken, userAccountname, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
/*
  console.log(localStorage.getItem('accessToken'));
  console.log(localStorage.getItem('userAccountname'));
*/
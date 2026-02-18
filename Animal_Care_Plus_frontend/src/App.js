import logo from './logo.svg';
import './App.css';
import { Route, Routes,useNavigate,} from 'react-router-dom';
import MainPage from './component/mainpagecomponent';
import React, { useEffect, useState } from 'react';
import Login from './component/logincomponent';
import ShopPage from './component/shoppage';
import SignUp from './component/signup';
import VaccinPage from './component/vaccin';
import ShopDetail from './component/shopdetail';
import shop from './shopdata'
import Camera from './component/camera';
import Map from './component/map';
import Voc from './component/board/Voc';
import VocQuestion from './component/board/VocQuestion';
import VocView from './component/board/VocView';
import CBOT from './component/cbot';
import { AuthContextProvider } from './component/context/AuthContext';
import PostModal from './component/postmodal';
import EditPost from './component/board/EditPost';
import Board from './component/Board';
import PostDetail from './component/PostDetail';


function App() {

  return (
    <div className="App">
      <AuthContextProvider>

      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/shop" element={<ShopPage shop={shop} />}></Route>
        <Route path="/shopdetail/:id" element={<ShopDetail shop={shop}/>}></Route>
        <Route path="/vaccin" element={<VaccinPage/>}></Route>
        <Route path="/camera" element={<Camera/>}></Route>
        <Route path="/map" element={<Map/>} ></Route>
        <Route path="/chatbot" element={<CBOT/>} ></Route>
        <Route path="/board" element={<Board/>} ></Route>
        <Route path='/Voc/question' element={<VocQuestion />}  />
        <Route path='/Voc/:vocId' element={<PostDetail />}  />
        <Route path="/edit/:postId" element={<EditPost />} />
      </Routes>
      </AuthContextProvider>
    </div>


  );
}

export default App;

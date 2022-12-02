import React from 'react';
import {BrowserRouter, Routes, Route}
    from 'react-router-dom';


import Home from './pages/Home';

import NavBar from "./components/NavBar";
import Favourite from "./pages/Favourite";
import Companion from "./components/Companion";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Start from "./components/Start";
import Password from "./pages/Password";


const Main = () => {
    return (
        <>
            <BrowserRouter>
                {   window.location.pathname !== '/' &&
                    window.location.pathname !== '/login' &&
                    window.location.pathname !== '/signup' &&
                    window.location.pathname !== '/password' &&
                    <NavBar/>
                }
                <Routes>
                    <Route path='/collection' element={<Favourite />}/>
                    <Route path='/companion' element={<Companion />}/>
                    <Route path='/cards' element={<Home />}/>
                </Routes>
            </BrowserRouter>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Start />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/signup' element={<SignUp />}/>
                    <Route path='/password' element={<Password />}/>
                </Routes>
            </BrowserRouter>
        </>

    );
};

export default Main;
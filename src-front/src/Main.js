import React from 'react';
import {BrowserRouter, Routes, Route}
    from 'react-router-dom';


import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

import NavBar from "./components/NavBar";


const Main = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/sign-up' element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Main;
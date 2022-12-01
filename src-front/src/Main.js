import React from 'react';
import {BrowserRouter, Routes, Route}
    from 'react-router-dom';


import Home from './pages/Home';

import NavBar from "./components/NavBar";
import Favourite from "./pages/Favourite";
import Companion from "./components/Companion";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";


const Main = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route path='/collection' element={<Favourite />}/>
                <Route path='/companion' element={<Companion />}/>

                <Route path='/login' element={<Login />}/>
                <Route path='/signup' element={<SignUp />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Main;
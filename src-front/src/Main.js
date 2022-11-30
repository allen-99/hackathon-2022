import React from 'react';
import {BrowserRouter, Routes, Route}
    from 'react-router-dom';


import Home from './pages/Home';
import SignUp from './pages/SignUp';

import NavBar from "./components/NavBar";
import Favourite from "./pages/Favourite";


const Main = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route path='/collection' element={<Favourite />}/>
                <Route path='/sign-up' element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Main;
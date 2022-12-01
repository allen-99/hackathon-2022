import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import Collection from "../navbar/Collection";
import Search from "../navbar/Search";
import Friends from "../navbar/Friends";


const NavBar = () => {
    return (
        <Navbar aria-current="page" fixed="bottom" className={'bg-white-100 drop-shadow-xl h-[50px] shadow'}>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center gap-24">
                <Navbar.Brand href="/companion" className={'m-0'}> <Friends /> </Navbar.Brand>
                <Navbar.Brand href="/cards" className={'m-0'}> <Search /> </Navbar.Brand>
                <Navbar.Brand href="/collection" className={'m-0'}> <Collection /> </Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
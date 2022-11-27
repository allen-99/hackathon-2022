import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Collection from "../navbar/Collection";
import Search from "../navbar/Search";
import Friends from "../navbar/Friends";


const NavBar = () => {
    return (
        <Navbar fixed="bottom" className={'bg-white-200 drop-shadow-xl'}>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center gap-24">
                <Navbar.Brand href="/" className={'m-0'}> <Friends /> </Navbar.Brand>
                <Navbar.Brand href="/" className={'m-0'}> <Search /> </Navbar.Brand>
                <Navbar.Brand href="/" className={'m-0'}> <Collection /> </Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';

const Layout = () => {
    return (<>
        <Header />
            <Home />
            <Outlet />
        <Footer />
    </>);
}

export default Layout;


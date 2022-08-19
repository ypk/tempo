import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layout";

import Hi from "./components/hi";
import Hello from "./components/hello";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/hi' element={<Hi />} />
                    <Route path='/hello' element={<Hello />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
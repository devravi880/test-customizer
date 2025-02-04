import React, { useEffect, useState } from 'react'
import Header from './Main Components/Header'
import Footer from './Main Components/Footer'
import Home from './Main Components/Home'
import CategoryPage from './Main Components/CategoryPage';
import { useSelector } from 'react-redux';
import ProductPage from './Main Components/ProductPage';

function Main() {

    const header = useSelector((state) => state.header.value);
    const activePage = header.find((item) => item?.title == "activePage")
    

    return (
        <main className='customizer-home-main p-3' id="main">
            <div className='customizer-home-main-scroll half-border-rad'>
                <Header />
                {
                    (activePage?.value == "home-page") &&
                    <Home />
                }
                {
                    (activePage?.value == "category-page") &&
                    <CategoryPage />
                }
                {
                    (activePage?.value == "product-detail-page") &&
                    <ProductPage />
                }
                <Footer />
            </div>
        </main>
    )
}

export default Main
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { CgShoppingBag } from 'react-icons/cg';
import { LuCircleUser } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { frontEnd_API, header, SERVER_URL } from '../../../Config/config';
import axios from 'axios';
import { pagesList } from '../../../Data/localData';
import { updatePageHeader } from '../../../Store/Slices/Customizer/headerSlice';
import Slider from 'react-slick';

function Header() {

    const storeData = useSelector((state) => state.store.value);
    const [categoryList, setCategoryList] = useState([]);
    const dispatch = useDispatch();
    const headerSlice = useSelector((state) => state.header.value);
    const getPrimarySections = useSelector((state) => state.primarySections.value);
    const [primarySections, setPrimarySections] = useState(getPrimarySections?.find((item) => item?.value == "header")?.data);
    const [headerData, setHeaderData] = useState(headerSlice?.find((item) => item?.title == "screenSize")?.value);

    const homePageData = {
        label: pagesList[0]?.label,
        value: pagesList[0]?.value,
    }

    const categoryPageData = {
        label: pagesList[1]?.label,
        value: pagesList[1]?.value,
    }

    const getCategoryList = async () => {
        try {
            const response = await axios.get(frontEnd_API?.getCategory, header)
            if (response?.status == 200) {
                setCategoryList(response?.data?.data)
            }
        }
        catch (e) {
            console.log("Err:", e);
        }
    }

    useEffect(() => {
        getCategoryList();
    }, [])

    useEffect(() => {
        const findSize = headerSlice?.find((item) => item?.title == "screenSize")?.value;
        setHeaderData(findSize);
    }, [headerSlice])

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        setPrimarySections(getPrimarySections?.find((item) => item?.value == "header")?.data)
    }, [getPrimarySections])

    return (
        <div className='custom-header-style'>
            {
                primarySections.map((item, index) => {

                    return (
                        <div key={index} style={{ height: (!["header"].includes(item?.value) && item?.isVisible == 0) ? "32px" : "auto" }}>
                            {
                                (item?.value == "header" && item?.isVisible == 0) &&
                                <Navbar expand={headerData == "mobile" ? false : 'lg'} className="custom-nav-bg py-1" >
                                    <Container>
                                        <Navbar.Toggle
                                            aria-controls={`offcanvasNavbar-expand-${headerData == "mobile" ? 'false' : 'lg'}`}
                                            className='p-0 custom-canvas'
                                            style={{ border: '0px' }}
                                        >
                                            <i className='bi bi-list custom-menu-icon'></i>
                                        </Navbar.Toggle>
                                        <Navbar.Brand>
                                            <div className='custom-img-holder-container d-flex align-items-center gap-2'>
                                                <Link
                                                    className='custom-img-holder'
                                                    onClick={() => {
                                                        dispatch(updatePageHeader({
                                                            ...homePageData
                                                        }))
                                                    }}
                                                >
                                                    {
                                                        <img src={storeData?.logo} alt="" />
                                                    }
                                                </Link>
                                                <h3 className='m-0'>
                                                    <Link
                                                        className='text-decoration-none m-0 fw-bold text-capitalize d-none d-md-block me-3'
                                                        onClick={() => {
                                                            dispatch(updatePageHeader({
                                                                ...homePageData
                                                            }))
                                                        }}
                                                    >
                                                        {storeData?.name}
                                                    </Link>
                                                </h3>
                                                <h3 className='m-0'>
                                                    <Link
                                                        className={`${storeData?.name?.length > 12 ? "h6" : "h3"} text-decoration-none m-0 fw-bold text-capitalize d-block d-md-none`}
                                                        onClick={() => {
                                                            dispatch(updatePageHeader({
                                                                ...homePageData
                                                            }))
                                                        }}
                                                    >
                                                        {storeData?.name}
                                                    </Link>
                                                </h3>
                                            </div>
                                        </Navbar.Brand>
                                        <Navbar.Offcanvas
                                            id={`offcanvasNavbar-expand-${headerData == "mobile" ? 'false' : 'lg'}`}
                                            aria-labelledby={`offcanvasNavbarLabel-expand-${headerData == "mobile" ? 'false' : 'lg'}`}
                                            placement="start"
                                        >
                                            <Offcanvas.Header closeButton>
                                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${headerData == "mobile" ? 'false' : 'lg'}`}>
                                                    <span
                                                        className='text-capitalize'
                                                        onClick={() => {
                                                            dispatch(updatePageHeader({
                                                                ...homePageData
                                                            }))
                                                        }}
                                                    >
                                                        {storeData?.name}
                                                        {/* Full Named Store test */}
                                                    </span>
                                                </Offcanvas.Title>
                                            </Offcanvas.Header>
                                            <Offcanvas.Body className={`${headerData == "mobile" ? 'd-grid' : 'd-grid d-lg-flex'}  gap-2 align-content-start`}>
                                                <Nav className={`justify-content-center flex-grow-1 pe-3 ${headerData == "mobile" ? '' : 'align-items-lg-center'}  gap-3 custom-navs-list`}>
                                                    <h5 className='m-0 fs-16'>
                                                        <Link
                                                            className='custom-navs-list-link text-color text-capitalize text-decoration-none'
                                                            onClick={() => {
                                                                dispatch(updatePageHeader({
                                                                    ...categoryPageData,
                                                                    apiValue: ""
                                                                }))
                                                            }}
                                                        >
                                                            All Products
                                                        </Link>
                                                    </h5>
                                                    {
                                                        (categoryList?.length > 0) &&
                                                        categoryList.map((item, index) => {
                                                            return (
                                                                <h5 key={index} className='m-0 fs-16'>
                                                                    <Link
                                                                        key={index}
                                                                        className='custom-navs-list-link text-color text-capitalize text-decoration-none'
                                                                        onClick={() => {
                                                                            dispatch(updatePageHeader({
                                                                                ...categoryPageData,
                                                                                apiValue: item?.categoryName
                                                                            }))
                                                                        }}
                                                                    >
                                                                        {item?.categoryName}
                                                                    </Link>
                                                                </h5>
                                                            )
                                                        })
                                                    }
                                                </Nav>
                                            </Offcanvas.Body>
                                        </Navbar.Offcanvas>
                                        <div className={`flex-center-align px-2 custom-cart-container ${headerData == "mobile" ? 'gap-3' : 'gap-sm-4 gap-3'}`}>
                                            <Link className={`${headerData == "mobile" ? 'fs-18' : 'fs-25 fs-sm-18'} custom-account pb-1`}>
                                                <h3>
                                                    <LuCircleUser />
                                                </h3>
                                            </Link>
                                            <Link className={`${headerData == "mobile" ? 'fs-18' : 'fs-25 fs-sm-18'} grid-center-align pb-1`}>
                                                <h3>
                                                    <CgShoppingBag />
                                                    <div className={`${headerData == "mobile" ? 'd-none' : 'd-none d-sm-flex'}`}>
                                                        <span>{'0'}</span>
                                                    </div>
                                                </h3>
                                            </Link>
                                        </div>
                                    </Container >
                                </Navbar >
                            }
                            {
                                (item?.value == "announcement-bar" && item?.type == "marquee" && item?.isVisible == 0) &&
                                <marquee behavior="" direction="" className="announcement-bar py-1">
                                    {
                                        item?.data?.length > 0 &&
                                        item?.data.filter((state)=>state?.isVisible == 0).map((tempItem, tempIndex) => {
                                            return (
                                                <span key={tempIndex} className='w-100 px-5'>
                                                    {tempItem?.label}
                                                </span>
                                            )
                                        })
                                    }
                                </marquee>
                            }
                            {
                                (item?.value == "announcement-bar" && item?.type == "slides" && item?.isVisible == 0) &&
                                <div className='announcement-bar'>
                                    <Container>
                                        <div className="slider-container">
                                            <Slider {...settings}>
                                                {
                                                    item?.data?.length > 0 &&
                                                    item?.data.map((tempItem, tempIndex) => {
                                                        return (
                                                            <div key={tempIndex} className='text-center py-1'>
                                                                <span>{tempItem?.label}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Slider>
                                        </div>
                                    </Container>
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div >
    )
}

export default Header
import React, { useEffect, useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaApplePay, FaGooglePay } from 'react-icons/fa';
import { RiMastercardFill, RiVisaLine } from 'react-icons/ri';
import { SiRazorpay } from 'react-icons/si';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../../Config/config';
import Slider from 'react-slick';

function Footer() {
    const storeData = useSelector((state) => state.store.value);
    const headerSlice = useSelector((state) => state.header.value);
    const [headerData, setHeaderData] = useState(headerSlice?.find((item) => item?.title == "screenSize")?.value);
    const getPrimarySections = useSelector((state) => state.primarySections.value);
    // const [primarySections, setPrimarySections] = useState(getPrimarySections?.find((item) => item?.value == "footer")?.data);

    useEffect(() => {
        const findSize = headerSlice?.find((item) => item?.title == "screenSize")?.value;
        setHeaderData(findSize);
    }, [headerSlice])

    const primarySections = useMemo(() => {
        return getPrimarySections?.find((item) => item?.value == "footer")?.data
    }, [getPrimarySections])

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='d-grid align-content-end'>
            {
                primarySections.map((item, index) => {
                    return (
                        <div key={index} style={{ height: (!["footer"].includes(item?.value) && item?.isVisible == 0) ? "32px" : "auto" }}>
                            {
                                (item?.value == "footer" && item?.isVisible == 0) &&
                                <div className='pt-5 pb-5 ps-0 pe-0 footerclr'>
                                    <Container>
                                        <Row className='g-2 justify-content-between'>
                                            {
                                                (storeData?.mobileNumber || storeData?.emailAddress || storeData?.pinCode) && (
                                                    <Col className={`${headerData == "mobile" ? 'col-12' : 'col-12 col-lg-4'}  p-2`}>
                                                        <div className='d-grid'>
                                                            <Row className='p-2'>
                                                                <Col className='col-12 cust-fd'>
                                                                    <Row className='row'>
                                                                        <Col className='col-12 custom-img-holder-container-ftr'>
                                                                            <Link className='custom-img-holder-ftr'>
                                                                                {
                                                                                    <img src={storeData?.logo ?? siteConfig?.logo} alt="" />
                                                                                }
                                                                            </Link>
                                                                        </Col>
                                                                        <Col className='col-12'>{storeData?.shortDescription}</Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                            <Row className='p-2'>
                                                                {
                                                                    (storeData?.mobileNumberStatus == 1) && (
                                                                        <Col className='col-12 cust-fd'>
                                                                            <Row className='row'>
                                                                                <Col className='col-2'>Phone:</Col>
                                                                                <Col className='col-8'>
                                                                                    <Link to={`tel:91${storeData?.mobileNumber}`}>{storeData?.mobileNumber}</Link>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    )
                                                                }
                                                                {
                                                                    (storeData?.emailAddressStatus == 1) && (
                                                                        <Col className='col-12 cust-fd pt-1'>
                                                                            <Row className='row'>
                                                                                <Col className='col-2'>Email:</Col>
                                                                                <Col className='col-8'>
                                                                                    {/* {storeData?.emailAddress} */}
                                                                                    <Link to={`mailto:${storeData?.emailAddress}`}>{storeData?.emailAddress}</Link>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    )
                                                                }
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                )
                                            }
                                            <Col className={`${headerData == "mobile" ? 'col-6' : 'col-6 col-lg-3'} p-2`}>
                                                {
                                                    storeData?.storePageData?.length > 0 && (
                                                        <div className='p-2 pt-0 f1 text-left'>
                                                            <div className='ft'>COMPANY</div>
                                                            <div className='fd pt-3 d-grid gap-1'>
                                                                {storeData?.storePageData?.map((row, key) => <Link key={key} className='text-capitalize'>{row?.label}</Link>)}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </Col>
                                            {
                                                (storeData?.storeSocialData?.length > 0) && (
                                                    <Col className={`${headerData == "mobile" ? 'col-6' : 'col-6 col-lg-2'} p-2`}>
                                                        <div className='p-2 pt-0 f1 text-left'>
                                                            <div className='ft text-uppercase pb-3'>Social Media</div>
                                                            {
                                                                storeData?.storeSocialData?.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className='fd'>
                                                                            <Link target='_blank' className="newfd text-capitalize d-flex gap-2">
                                                                                <i className={`bi bi-${item.icon}`}></i>
                                                                                {item.icon}
                                                                            </Link>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </Col>
                                                )
                                            }
                                            <Col className={`${headerData == "mobile" ? 'col-12' : 'col-12 col-lg-3'}  p-2 d-grid align-content-start gap-3`}>
                                                {/* <span class="text-end">{storeData?.shortDescription}</span> */}
                                                <div className={`flex-between-align gap-2 ${headerData == "mobile" ? 'justify-content-center' : 'justify-content-center justify-content-lg-end'} `}>
                                                    <FaGooglePay className='semi-border p-1 bg-light' style={{ fontSize: "40px" }} />
                                                    <SiRazorpay className='semi-border p-1 bg-light' style={{ fontSize: "40px" }} />
                                                    <RiVisaLine className='semi-border p-1 bg-light' style={{ fontSize: "40px" }} />
                                                    <RiMastercardFill className='semi-border p-1 bg-light' style={{ fontSize: "40px" }} />
                                                    <FaApplePay className='semi-border p-1 bg-light' style={{ fontSize: "40px" }} />
                                                </div>
                                                {
                                                    storeData?.expired &&
                                                    <span className='text-center text-lg-end final-color'>
                                                        Powered by <Link className='fw-semibold text-decoration-none' target='_blank' to={'https://printfuse.in/'}>Printfuse</Link>
                                                    </span>
                                                }
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            }
                            {
                                (item?.value == "announcement-bar" && item?.type == "marquee" && item?.isVisible == 0) &&
                                <marquee behavior="" direction="" className="announcement-bar py-1">
                                    {
                                        item?.data?.length > 0 &&
                                        item?.data.filter((state) => state?.isVisible == 0).map((tempItem, tempIndex) => {
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

        </div>
    )
}

export default Footer
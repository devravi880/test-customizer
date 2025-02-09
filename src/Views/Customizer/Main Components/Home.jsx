import axios from 'axios'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Carousel, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { frontEnd_API, header, SERVER_URL } from '../../../Config/config';
import { pagesList } from '../../../Data/localData';
import { updatePageHeader } from '../../../Store/Slices/Customizer/headerSlice';
import MainProductDetail from './MainProductDetail';

function Home() {
    const storeBanner = useSelector((state) => state.store.value);
    const [productList, setProductList] = useState({});
    const [indexList, setIndexList] = useState({});
    const [bannerList, setBannerList] = useState([]);
    const [sorting, setSorting] = useState("id-DESC");
    const [loader, setLoader] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const tempLimit = 12;
    const dispatch = useDispatch();
    const headerSlice = useSelector((state) => state.header.value);
    const getPrimarySections = useSelector((state) => state.primarySections.value);

    const primarySections = useMemo(() => {
        return getPrimarySections?.find((item) => item?.value == "template")?.data
    }, [getPrimarySections])

    const headerData = useMemo(() => {
        return headerSlice?.find((item) => item?.title == "screenSize")?.value
    }, [headerSlice])

    const categoryPageData = {
        label: pagesList[1]?.label,
        value: pagesList[1]?.value,
    }

    const productPageData = {
        label: pagesList[2]?.label,
        value: pagesList[2]?.value,
    }

    const getProducts = async () => {
        try {
            const category = "";

            const { data } = await axios.put(frontEnd_API?.getProductList, {
                category,
                sortby: sorting,
                page: 1,
                limit: tempLimit
            }, header)
            setProductList(data?.data);
            console.log("data::", data?.data);
            setTotalCount(data?.totalCount);
            setLoader(false);
        }
        catch (e) {
            console.log("e::", e);
            setLoader(false);
        }
    }

    const getProductsList = async (category, limit) => {
        try {

            const { data } = await axios.put(frontEnd_API?.getProductList, {
                category: category == "all" ? "" : category ?? "",
                page: 1,
                limit
            }, header)
            setLoader(false);
            return data?.data;
        }
        catch (e) {
            console.log("e::", e);
            setLoader(false);
        }
    }

    const getProductsBySort = async (sort) => {
        try {
            const category = "";
            const { data } = await axios.put(frontEnd_API?.getProductList, {
                category,
                sortby: sort,
                page: 1,
                limit: tempLimit
            }, header)
            setProductList(data?.data);
            setTotalCount(data?.totalCount);
            setLoader(false);
        }
        catch (e) {
            console.log("e::", e);
            setLoader(false);
        }
    }

    // useEffect(() => {
    //     getProducts();
    //     const newList = storeBanner?.storeBannerData.slice(1);
    //     setBannerList(newList);
    // }, []);

    useEffect(() => {
        // primarySections.map((item) => {
        //     if (item?.value == "featured-collection") {
        //         getProductsList(item?.type, 4);
        //     }
        // })
        const fetchProducts = async () => {
            const productsData = {};
            setLoader(true);

            for (const item of primarySections) {
                if (item?.value == "featured-collection") {
                    const data = await getProductsList(item?.type ?? "", headerData == "mobile" ? item?.mobileItems : item?.desktopItems);
                    productsData[item?.type == "" ? "all" : item?.type] = data; // Store data per category
                }
            }

            setProductList(productsData);
            setLoader(false);
        };
        if (primarySections?.length > 0) {
            fetchProducts();
        }
    }, [primarySections, headerData])

    const handleRedirect = (item) => {
        if (item) {
            const kebabCaseStr = item.toLowerCase().replace(/-/g, '~').replace(/\s+/g, '-');
            return kebabCaseStr;
        }
    };

    return (
        <div className='custom-home-style pt-2'>
            {/* Grid View Banner */}
            {
                // (!params?.categoryName && storeBanner?.storeBannerData?.length > 0 && storeBanner?.storeBannerData?.length <= 3) &&

                // (storeBanner?.storeBannerData?.length > 0 && storeBanner?.storeBannerData?.length <= 3) &&
                // <Container className='p-0 my-md-3' style={{ overflow: "hidden" }}>
                //     <Row className='gy-3 gy-md-3'>
                //         <Col className='col-12 px-3'>
                //             <div className='custom-img-holder'>
                //                 <img
                //                     src={storeBanner?.storeBannerData[0]?.thumbnail}
                //                     alt={storeBanner?.storeBannerData[0]?.name}
                //                 />
                //             </div>
                //         </Col>
                //         <div className='flex-center-align gap-3 px-3'>
                //             {
                //                 bannerList?.map((item, index) => (
                //                     <div
                //                         className='w-100 custom-img-holder'
                //                         key={index}
                //                     >
                //                         <img src={item?.thumbnail} alt="" />
                //                     </div>
                //                 ))
                //             }
                //         </div>
                //     </Row>
                // </Container>
            }

            {/* Slider/Carousel View Banner */}
            {
                // (!params?.categoryName && storeBanner?.storeBannerData?.length > 0 && storeBanner?.storeBannerData?.length > 3) &&

                // (storeBanner?.storeBannerData?.length > 0 && storeBanner?.storeBannerData?.length > 3) &&
                // <Container>
                //     <Carousel indicators={false} className='half-border-rad overflow-hidden'>
                //         {
                //             storeBanner?.storeBannerData?.map((item, index) => (
                //                 <Carousel.Item key={index}>
                //                     <Link
                //                         className='w-100 custom-img-holder'
                //                         key={index}
                //                     >
                //                         <img src={item?.thumbnail} alt="" />
                //                     </Link>
                //                 </Carousel.Item>
                //             ))
                //         }
                //     </Carousel>
                // </Container> 
            }

            {
                primarySections?.length > 0 &&
                primarySections.map((item, index) => {
                    const tempCheck = item?.type == "" ? "all" : item?.type;
                    const productListData = ((tempCheck) in productList) ? productList[tempCheck] : [];

                    return (
                        <div className='' key={index}>
                            {
                                (item?.value == "slideshow" && item?.isVisible == 0) &&
                                <Container>
                                    <Carousel
                                        indicators={(item?.data?.length > 0 && item?.paginationType == "dots") ? true : false}
                                        interval={(item?.isAutoPlay == 0) ? null : (item?.autoPlaySpeed) ? Number(item?.autoPlaySpeed) * 1000 : 4000}
                                        className='half-border-rad overflow-hidden'
                                        fade={item?.animationType == "fade" ? true : false}
                                        slide={(item?.animationType == "slide" || item?.animationType == "fade") ? true : false}
                                        controls={item?.data.filter((state) => state?.isVisible !== 1)?.length > 1 ? true : false}
                                    >
                                        {
                                            item?.data?.length > 0 &&
                                            item?.data?.map((subItem, subIndex) => {
                                                if (subItem?.isVisible == 0) {
                                                    return (
                                                        <Carousel.Item key={subIndex} className={`custom-img-holder ${item?.type ?? ""}`}>
                                                            <Link
                                                                className='w-100'
                                                                key={subIndex}
                                                                onClick={() => {
                                                                    dispatch(updatePageHeader({
                                                                        ...categoryPageData,
                                                                        apiValue: item?.categoryName
                                                                    }))
                                                                }}
                                                            >
                                                                <img
                                                                    src={subItem?.image == "" ? require('../../../Assets/Images/temp-bg.png') : subItem?.image}
                                                                    alt={subItem?.title}
                                                                />
                                                            </Link>
                                                            {
                                                                (subItem?.title != "" || subItem?.description != "") &&
                                                                <Carousel.Caption>
                                                                    <h2 className='fs-sm-16'>{subItem?.title}</h2>
                                                                    <p className='fs-sm-12'>{subItem?.description}</p>
                                                                </Carousel.Caption>
                                                            }
                                                        </Carousel.Item>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            })
                                        }
                                    </Carousel>
                                </Container>
                            }
                            {
                                (item?.value == "featured-collection" && item?.isVisible == 0) &&
                                <Container className={`${headerData == "mobile" ? 'pt-5' : 'pt-4 pt-sm-5'} overflow-hidden`}>
                                    <div className={`col-12 ${headerData == "mobile" ? 'd-grid gap-3' : 'd-grid d-sm-flex gap-3 justify-content-sm-between align-items-sm-center'} flex-column-rev pb-4`}>
                                        <div className={`${headerData == "mobile" ? 'd-flex' : 'd-flex d-sm-grid'} gap-1 justify-content-center align-items-center`}>
                                            {/* <h4 className='m-0 fw-semibold text-capitalize'>{(params?.categoryName) ? params?.categoryName.replace('~', '-').replace('-', ' ') : "All Products"}</h4> */}
                                            <h1 className='m-0 fw-semibold text-capitalize'>{item?.title}</h1>
                                            {
                                                item?.description &&
                                                <span className='p-color'>{item?.description}</span>
                                            }
                                        </div>
                                    </div>
                                    <Row
                                        className='gy-4 pb-3'
                                        // className={`${headerData == "mobile" ? 'col-6' : 'col-6 col-sm-4 col-lg-3'} `}
                                        xs={item?.mobileItems}
                                        lg={headerData == "mobile" ? item?.mobileItems : item?.desktopItems}
                                    >
                                        {/* Heading Part */}
                                        {/* <Col className={`col-12 ${headerData == "mobile" ? 'd-grid gap-3' : 'd-grid d-sm-flex gap-3 justify-content-sm-between align-items-sm-center'} flex-column-rev`}>
                                            <div className={`${headerData == "mobile" ? 'd-flex' : 'd-flex d-sm-grid'} gap-1 justify-content-center align-items-center`}>
                                                <h1 className='m-0 fw-semibold text-capitalize'>{item?.title}</h1>
                                                {
                                                    item?.description &&
                                                    <span className='p-color'>{item?.description}</span>
                                                }
                                            </div>
                                            <div className='flex-between-align gap-2 justify-content-center'>
                                                <span className='p-color'>Sort by:</span>
                                                <select name="" onChange={(e) => {
                                                    setSorting(e?.target?.value)
                                                    setLoader(true)
                                                    getProductsBySort(e?.target?.value);
                                                }} id="" className={`${headerData == "mobile" ? 'py-1 px-2' : 'py-1 px-2 py-sm-2 px-sm-3'}`}>
                                                    <option value="id-DESC">Newest arrivals</option>
                                                    <option value="price-ASC">Price: low to high</option>
                                                    <option value="price-DESC">Price: high to low</option>
                                                </select>
                                            </div>
                                        </Col> */}
                                        {
                                            (productListData?.length > 0) ?
                                                <>
                                                    {productListData.map((subItem, subIndex) => {

                                                        return (
                                                            <Col
                                                                key={subIndex}
                                                                // className={`${headerData == "mobile" ? 'col-6' : 'col-6 col-sm-4 col-lg-3'} `}
                                                                data-aos="fade-up"
                                                                data-aos-delay="100"
                                                            >
                                                                <div className='custom-img-holder-container d-grid gap-2'>
                                                                    <div className='custom-img-holder'>
                                                                        <Link
                                                                            style={{ backgroundColor: subItem?.defaultColor ? `${subItem?.defaultColor}` : 'transparent' }}
                                                                            onClick={() => {
                                                                                dispatch(updatePageHeader({
                                                                                    ...productPageData,
                                                                                    apiValue: subItem?.slug
                                                                                }))
                                                                            }}
                                                                        >
                                                                            <img src={subItem.thumbnail} className='img-one' alt={subItem?.name} />
                                                                            <img src={subItem.thumbnailSlide} className='img-two' alt={subItem?.name} />
                                                                        </Link>
                                                                    </div>
                                                                    <div className='custom-img-cnt d-grid'>
                                                                        <Link
                                                                            className={`fw-semibold m-0 ${headerData == "mobile" ? 'fs-12' : 'fs-sm-12 fs-md-14 fs-lg-16 fs-18'} `}
                                                                            onClick={() => {
                                                                                dispatch(updatePageHeader({
                                                                                    ...productPageData,
                                                                                    apiValue: subItem?.slug
                                                                                }))
                                                                            }}
                                                                        >
                                                                            {subItem?.name}
                                                                        </Link>
                                                                        <span
                                                                            className={`fw-bold m-0 ${headerData == "mobile" ? 'fs-12' : 'fs-sm-12 fs-md-14 fs-lg-16 fs-18'} `}
                                                                        >
                                                                            ₹{Number(subItem?.price)}
                                                                            {
                                                                                (Number(subItem?.mrp) > Number(subItem?.price)) &&
                                                                                <span
                                                                                    className={`fw-semibold text-decoration-line-through mrp-text ps-1 ${headerData == "mobile" ? 'fs-10' : 'fs-sm-10 fs-md-12 fs-lg-14 fs-16'} `}
                                                                                >₹{Number(subItem?.mrp)}</span>
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        )
                                                    })}

                                                    {
                                                        item?.firstButtonText &&
                                                        <div className='flex-center-align w-100 py-2' data-aos="fade-up" data-aos-delay="0" data-aos-duration="500">
                                                            <Link
                                                                variant='success'
                                                                className={`fw-semibold custom-rich-btn-first ${headerData == "mobile" ? 'fs-10' : 'fs-14 fs-sm-10'}`}
                                                                onClick={() => {
                                                                    dispatch(updatePageHeader({
                                                                        ...categoryPageData,
                                                                        apiValue: item?.type
                                                                    }))
                                                                }}
                                                            >
                                                                {item?.firstButtonText}
                                                            </Link>
                                                        </div>
                                                    }

                                                </>
                                                : <h1 className='text-center'>Products not found</h1>
                                        }
                                    </Row>
                                </Container>
                            }
                            {
                                (item?.value == "rich-text" && item?.isVisible == 0) &&
                                <Container className='py-5'>
                                    <Row xs={1} className={`text-${item?.type} gy-3`}>
                                        {
                                            item?.title &&
                                            <Col>
                                                <h2 className='h1 m-0'>{item?.title}</h2>
                                            </Col>
                                        }
                                        {
                                            item?.tagline &&
                                            <Col>
                                                <h4 className='m-0 fw-medium'>{item?.tagline}</h4>
                                            </Col>
                                        }
                                        {
                                            item?.description &&
                                            <Col>
                                                <p className='m-0'>{item?.description}</p>
                                            </Col>
                                        }
                                        <Col className={`flex-align justify-content-${item?.type} gap-3 flex-wrap`}>
                                            {
                                                item?.firstButtonText &&
                                                <Link to={item?.firstButtonLink} className='custom-rich-btn-first'>{item?.firstButtonText}</Link>
                                            }
                                            {
                                                item?.secondButtonText &&
                                                <Link to={item?.secondButtonLink} className='custom-rich-btn-second'>{item?.secondButtonText}</Link>
                                            }
                                        </Col>
                                    </Row>
                                </Container>
                            }
                            {
                                (item?.value == "image-banner" && item?.isVisible == 0) &&
                                <div className='w-100 d-grid position-relative py-5' style={{ aspectRatio: item?.imgSize }}>
                                    <div className='w-100 h-100 position-absolute top-0 start-0'>
                                        <img
                                            src={item?.image == "" ? require('../../../Assets/Images/temp-bg.png') : item?.image}
                                            className='w-100 h-100 object-cover'
                                            alt={item?.title}
                                        />
                                    </div>
                                    <Container className='position-relative'>
                                        <div className={`position-absolute d-grid gap-3 gap-md-4 p-3 p-md-4 p-xl-5 align-image-banner-box ${item?.type ?? "middle center"} text-${item?.align}`}>
                                            {
                                                item?.title &&
                                                <h2 className='h1 m-0'>{item?.title}</h2>
                                            }
                                            {
                                                item?.description &&
                                                <p className='m-0'>{item?.description}</p>
                                            }
                                            <div className={`flex-align justify-content-${item?.align} gap-3 flex-wrap`}>
                                                {
                                                    item?.firstButtonText &&
                                                    <Link to={item?.firstButtonLink} className='custom-rich-btn-first'>{item?.firstButtonText}</Link>
                                                }
                                                {
                                                    item?.secondButtonText &&
                                                    <Link to={item?.secondButtonLink} className='custom-rich-btn-second'>{item?.secondButtonText}</Link>
                                                }
                                            </div>
                                        </div>
                                    </Container>
                                </div>
                            }
                            {
                                (item?.value == "image-with-text" && item?.isVisible == 0) &&
                                <Container style={{
                                    paddingTop: `${item?.paddingTop}px` ?? "12px",
                                    paddingBottom: `${item?.paddingBottom}px` ?? "12px",
                                }}>
                                    <Row className={`gy-4 ${item?.type == "Image second" ? "pf-flex-row-reverse" : ""}`}>
                                        <Col className={`${headerData == "mobile" ? 'col-12' : 'col-12 col-lg-6'} `}>
                                            <div className='w-100 aspect-4-3 full-border-rad overflow-hidden border border-secondary-subtle'>
                                                <img
                                                    src={item?.image == "" ? require('../../../Assets/Images/temp-bg.png') : item?.image}
                                                    className='w-100 h-100 object-cover'
                                                    alt={item?.title}
                                                />
                                            </div>
                                        </Col>
                                        <Col
                                            className={`${headerData == "mobile" ? `col-12 text-${item?.mobileAlign}` : `col-12 col-lg-6 text-${item?.mobileAlign} text-lg-${item?.desktopAlignH}`}  d-grid align-content-${item?.desktopAlignV} `}
                                        >
                                            <div className={`d-grid ${headerData == "mobile" ? "gap-3" : "gap-2 gap-sm-4"}`}>
                                                <h2 className='h1 m-0'>{item?.title}</h2>
                                                {
                                                    item?.description &&
                                                    <p className='m-0'>{item?.description}</p>
                                                }
                                                <div
                                                    className={`flex-align ${headerData == "mobile" ? `justify-content-${item?.mobileAlign}` : `justify-content-${item?.mobileAlign} justify-content-lg-${item?.desktopAlignH}`}  gap-3 flex-wrap`}
                                                >
                                                    {
                                                        item?.buttonText &&
                                                        <Link to={item?.buttonLink} className='custom-rich-btn-first'>{item?.buttonText}</Link>
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            }
                            {
                                (item?.value == "video" && item?.isVisible == 0) &&
                                <Container>
                                    <div className={`w-100 half-border-rad overflow-hidden`} style={{ aspectRatio: item?.type }}>
                                        <video controls autoPlay muted loop className='w-100 h-100 object-cover'>
                                            <source src={item?.video === "" ? require('../../../Assets/Videos/sample video.mp4') : item?.video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </Container>
                            }
                            {
                                (item?.value == "featured-product" && item?.isVisible == 0) &&
                                <span>
                                    <MainProductDetail slug={item?.type} />
                                </span>
                            }
                        </div>
                    )
                })
            }
        </div >
    )
}

export default Home

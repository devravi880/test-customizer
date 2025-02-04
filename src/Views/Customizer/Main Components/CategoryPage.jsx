import axios from 'axios'
import React, { use, useEffect, useRef, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { frontEnd_API, header, SERVER_URL } from '../../../Config/config';
import { useDispatch, useSelector } from 'react-redux';
import { updatePageHeader } from '../../../Store/Slices/Customizer/headerSlice';
import { pagesList } from '../../../Data/localData';

function CategoryPage() {
    const [productList, setProductList] = useState([]);
    const [sorting, setSorting] = useState("id-DESC");
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const productListRef = useRef(productList);
    const totalCountRef = useRef(totalCount);
    const tempLimit = 12;
    const headerSlice = useSelector((state) => state.header.value);
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState(headerSlice.find((item) => item?.title == "activePage")?.apiValue);
    const productPageData = {
        label: pagesList[2]?.label,
        value: pagesList[2]?.value,
    }
    const [headerData, setHeaderData] = useState(headerSlice?.find((item) => item?.title == "screenSize")?.value);

    useEffect(() => {
        const findSize = headerSlice?.find((item) => item?.title == "screenSize")?.value;
        setHeaderData(findSize);
    }, [headerSlice])

    const getProducts = async () => {
        try {

            const { data } = await axios.put(frontEnd_API?.getProductList, {
                category: categoryName ?? "all",
                sortby: sorting,
                page,
                limit: tempLimit
            }, header)

            setProductList((prevList) => [...prevList, ...data?.data]);
            console.log("data::", data?.data);
            setTotalCount(data?.totalCount);
            setLoader(false);
            setIsFetching(false);
        }
        catch (e) {
            console.log("e::", e);
            setLoader(false);
            setIsFetching(false);
        }
    }

    const getProductsOnly = async () => {
        try {

            const { data } = await axios.put(frontEnd_API?.getProductList, {
                category: categoryName ?? "all",
                sortby: sorting,
                page,
                limit: tempLimit
            }, header)

            setProductList(data?.data);
            console.log("data::", data?.data);
            setTotalCount(data?.totalCount);
            setLoader(false);
            setIsFetching(false);
        }
        catch (e) {
            console.log("e::", e);
            setLoader(false);
            setIsFetching(false);
        }
    }

    const getProductsBySort = async (sort) => {
        try {

            const { data } = await axios.put(frontEnd_API?.getProductList, {
                category: categoryName ?? "all",
                sortby: sort,
                page: 1,
                limit: (tempLimit * page)
            }, header)
            setProductList(data?.data);
            setTotalCount(data?.totalCount);
            setLoader(false);
            setIsFetching(false);
        }
        catch (e) {
            console.log("e::", e);
            setLoader(false);
            setIsFetching(false);
        }
    }

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 300 &&
            !isFetching
        ) {
            if (productListRef.current?.length < totalCountRef.current) {
                setIsFetching(true);
                setPage((prevPage) => prevPage + 1); // Increase page value
            }

        }
    };

    useEffect(() => {
        getProductsOnly();
    }, [categoryName])

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (page != 1 && productList?.length < totalCount) {
                getProducts();
            }
        }, 250)
    }, [page]);

    useEffect(() => {
        if (headerSlice.find((item) => item?.title == "activePage")?.apiValue != categoryName) {
            setCategoryName(headerSlice.find((item) => item?.title == "activePage")?.apiValue)
        }
    }, [headerSlice])

    useEffect(() => {
        // Keep the ref updated with the latest productList
        productListRef.current = productList;
    }, [productList]);

    useEffect(() => {
        // Keep the ref updated with the latest totalCount
        totalCountRef.current = totalCount;
    }, [totalCount]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener
    }, [isFetching]);

    return (
        <div className='custom-home-style pt-2' style={{ minHeight: '60vh' }}>

            <Container className='py-4 py-sm-5'>
                <Row className='gy-4'>
                    {/* Heading Part */}
                    <Col className={`col-12 ${headerData == "mobile" ? 'd-grid gap-3' : 'd-grid d-sm-flex gap-3 justify-content-sm-between align-items-sm-center'} flex-column-rev`}>
                        <div className={`${headerData == "mobile" ? 'd-flex' : 'd-flex d-sm-grid'} gap-1 justify-content-center align-items-center`}>
                            <h4 className='m-0 fw-semibold text-capitalize'>{(categoryName != "") ? categoryName : "All Products"}</h4>
                            <span className='p-color'>{productList?.length} items</span>
                        </div>
                        <div className='flex-between-align gap-2 justify-content-center'>
                            <span className='p-color'>Sort by:</span>
                            <select name="" onChange={(e) => {
                                console.log("e?.target::", e?.target?.value);
                                setSorting(e?.target?.value)
                                setLoader(true)
                                getProductsBySort(e?.target?.value)
                            }} id="" className={`${headerData == "mobile" ? 'py-1 px-2' : 'py-1 px-2 py-sm-2 px-sm-3'}`}>
                                <option value="id-DESC">Newest arrivals</option>
                                <option value="price-ASC">Price: low to high</option>
                                <option value="price-DESC">Price: high to low</option>
                            </select>
                        </div>
                    </Col>
                    {
                        loader ?
                            <div className='w-100 aspect-3-1 d-grid flex-center-align'>
                                <Spinner animation='border' />
                            </div>
                            : (productList?.length > 0) ?
                                productList.map((item, index) => {
                                    return (
                                        <Col key={index} className={`${headerData == "mobile" ? 'col-6' : 'col-6 col-sm-4 col-lg-3'} `} data-aos="fade-up" data-aos-delay="100">
                                            <div className='custom-img-holder-container d-grid gap-2'>
                                                <div className='custom-img-holder'>
                                                    <Link
                                                        style={{ backgroundColor: item?.defaultColor ? `${item?.defaultColor}` : 'transparent' }}
                                                        onClick={() => {
                                                            dispatch(updatePageHeader({
                                                                ...productPageData,
                                                                apiValue: item?.slug
                                                            }))
                                                        }}
                                                    >
                                                        <img src={item.thumbnail} className='img-one' alt={item?.name} />
                                                        <img src={item.thumbnailSlide} className='img-two' alt={item?.name} />
                                                    </Link>
                                                </div>
                                                <div className='custom-img-cnt d-grid'>
                                                    <Link
                                                        className={`fw-semibold m-0 ${headerData == "mobile" ? 'fs-12' : 'fs-sm-12 fs-md-14 fs-lg-16 fs-18'} `}
                                                        onClick={() => {
                                                            dispatch(updatePageHeader({
                                                                ...productPageData,
                                                                apiValue: item?.slug
                                                            }))
                                                        }}
                                                    >
                                                        {item?.name}
                                                    </Link>
                                                    <span className={`fw-bold m-0 ${headerData == "mobile" ? 'fs-12' : 'fs-sm-12 fs-md-14 fs-lg-16 fs-18'} `}>
                                                        ₹{Number(item?.price)}
                                                        {
                                                            (Number(item?.mrp) > Number(item?.price)) &&
                                                            <span className={`fw-semibold text-decoration-line-through mrp-text ps-1 ${headerData == "mobile" ? 'fs-10' : 'fs-sm-10 fs-md-12 fs-lg-14 fs-16'} `}>
                                                                ₹{Number(item?.mrp)}
                                                            </span>
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                                :
                                <h1 className='text-center'>Products not found</h1>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default CategoryPage
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Dropdown, Modal, Row, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Tooltip } from 'react-tooltip';
import { frontEnd_API, header, SERVER_URL } from '../../../Config/config';
import ProductPreviewImage from '../../../Components/ProductPreviewImage';
import { useSelector } from 'react-redux';

function MainProductDetail({ slug }) {

    const [productStatus, setProductStatus] = useState(0);
    const [product, setProduct] = useState();
    const [loader, setLoader] = useState(true);
    const [sizeChartModalStatus, setSizeChartModalStatus] = useState(false);
    const [isOutOfStock, setIsOutOfStock] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState();
    const [backColor, setBackColor] = useState();
    const headerSlice = useSelector((state) => state.header.value);
    const [headerData, setHeaderData] = useState(headerSlice?.find((item) => item?.title == "screenSize")?.value);

    const getSingleProduct = async () => {
        try {
            // const productSlug = headerSlice.find((item) => item?.title == "activePage")?.apiValue
            const productSlug = slug;
            console.log("slug::", slug);

            const { data } = await axios.get(`${frontEnd_API?.getProductDetail}/${productSlug != "" ? productSlug : "new-mens-round-neck-t-shirt-test"}`, header)
            const productData = data?.data

            setProduct(productData);
            const check = productData?.variantData?.find((item) => ["color", "colors", "colour", "colours"].includes(item?.name?.toLowerCase()))

            productData.defaultColor = productData?.defaultColor ? check?.data?.filter(e => e?.code == productData?.defaultColor)[0]?.code : check?.data[0]?.code
            setBackColor(productData?.defaultColor)
            setProductStatus(1)
            setLoader(false);

            const updatedVariantData = productData?.variantData?.reduce((acc, variant, index) => {
                const firstOption = variant?.data?.find(e => e?.value === productData?.defaultCartesin[index]);
                acc[variant.name] = firstOption?.value;
                if (["color", "colors", "colour", "colours"].includes(variant?.name)) {
                    setBackColor(firstOption?.code)
                }
                return acc;
            }, {});

            const result = productData?.cartesianData?.find(e => e?.code == Object?.values(updatedVariantData)?.sort((a, b) => a - b).join(""))
            setIsOutOfStock((result?.isAvailable ?? 0) != 1)

            setSelectedProduct({
                variantData: updatedVariantData,
                productId: parseInt(productData?.productId),
                slug: productData?.slug,
                quantity: 1
            });
        }
        catch (e) {
            console.log("e::", e);
            setProductStatus(-1)
            setLoader(false);
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, [slug])

    useEffect(() => {
        const findSize = headerSlice?.find((item) => item?.title == "screenSize")?.value;
        setHeaderData(findSize);
    }, [headerSlice])

    const changeVariant = (obj = {}) => {
        if (obj?.name) {
            if (["color", "colors", "colour", "colours"].includes(obj?.name.toLowerCase())) {
                setBackColor(obj?.data?.code);
            }
            const updatedVariant = {
                ...selectedProduct,
                variantData: {
                    ...selectedProduct.variantData,
                    [obj?.name]: obj?.data?.value
                }
            }

            console.log("Object?.values(updatedVariant?.variantData) :: ", Object?.values(updatedVariant?.variantData)?.sort((a, b) => a - b))


            const result = product?.cartesianData?.find(e => e?.code == Object?.values(updatedVariant?.variantData)?.sort((a, b) => a - b).join(""))
            console.log("result :: ", result, (result?.isAvailable ?? 0) != 1)

            setIsOutOfStock((result ? result?.isAvailable : 0) != 1)

            priceIncrease()

            setSelectedProduct({ ...updatedVariant })
        }
    }

    const priceIncrease = () => {

        const newData = (selectedProduct?.variantData) ? Object?.values(selectedProduct?.variantData) : [];
        const matchingItem = product?.cartesianData.find(item =>
            // JSON.stringify(item.cartesian) === JSON.stringify(newData)
            item.code === newData?.sort((a, b) => a - b)?.join("")
        );

        const matchingPrice = matchingItem ? matchingItem.price : null;
        const matchingMRP = matchingItem ? matchingItem.mrp : null;
        return { productPrice: matchingPrice, productMRP: matchingMRP };
    }

    const checkActive = (checkData) => {
        const preDataValues = Object.values(selectedProduct?.variantData);
        const isValueInPreData = preDataValues.includes(checkData.value);
        return isValueInPreData;
    }

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, []);

    const settingsMain = {
        asNavFor: sliderRef2.current, // Only assign when ready
        ref: sliderRef1
    };

    const settingsNav = {
        slidesToShow: 4,
        asNavFor: sliderRef1.current, // Only assign when ready
        ref: sliderRef2,
        speed: 500,
        swipeToSlide: true,
        focusOnSelect: true
    };

    const handleShare = (url) => {
        const productName = product?.name;
        const productURL = `${typeof window !== 'undefined' ? window?.location?.href : ""}?ref=1`;
        // const productURL = "https://xyz.printfuse.in/products/4";
        const shareMessage = `Check out this awesome find! ${productName} – get yours now: ${productURL}`;

        // WhatsApp Share URL
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

        // Facebook Share URL
        const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productURL)}&quote=${encodeURIComponent(shareMessage)}`;

        // Email Share URL
        const emailSubject = `Check out this awesome product: ${productName}`;
        const emailBody = `${shareMessage}`;
        const emailURL = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        let link = whatsappURL;
        if (url == "whatsapp") {
            link = whatsappURL
        }
        if (url == "facebook") {
            link = facebookURL
        }
        if (url == "email") {
            link = emailURL
        }

        typeof window !== 'undefined' && window.open(link, '_blank');

    };

    const { productPrice } = priceIncrease();

    return (
        <div className='custom-product-page'>
            {
                loader ?
                    <div className='w-100 aspect-3-1 d-grid flex-center-align'>
                        <Spinner animation='border' />
                    </div>
                    : (!product)
                        ? <h2 className='text-center py-4'><i>--- Select product first ---</i></h2>
                        : <Container className='py-4'>
                            <Row className={`${headerData == "mobile" ? "gy-4" : "gy-4 gy-lg-0"}`}>
                                <Col className={`${headerData == "mobile" ? "col-12" : "col-12 col-lg-5 ps-lg-0"}`}>
                                    <Row style={{ position: 'sticky', top: '0' }}>
                                        <Col className={`${headerData == "mobile" ? "col-12" : "col-12 col-md-0 pe-lg-0"} single-big-slider`}>
                                            <div className="slider-container">
                                                {/* Main Slider */}
                                                <Swiper
                                                    modules={[Thumbs]}
                                                    thumbs={{ swiper: thumbsSwiper }}
                                                    // navigation
                                                    className="main-slider"
                                                >
                                                    {product?.imageData.map((item, index) => (
                                                        <SwiperSlide key={index}>
                                                            <div className="img-holder">
                                                                <ProductPreviewImage
                                                                    colorCode={backColor ?? '#ffffff'}
                                                                    objectData={{ preview: item }}
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>

                                                {/* Thumbnail Slider */}
                                                <Swiper
                                                    onSwiper={setThumbsSwiper}
                                                    slidesPerView={4}
                                                    spaceBetween={10}
                                                    speed={500}
                                                    watchSlidesProgress
                                                    className="pt-1"
                                                    navigation
                                                    modules={[Navigation]}
                                                >
                                                    {product?.imageData.map((item, index) => (
                                                        <SwiperSlide key={index}>
                                                            <div className="img-holder cursor">
                                                                <img
                                                                    src={item}
                                                                    alt={product?.name}
                                                                    style={{ backgroundColor: backColor ?? 'transparent' }}
                                                                />
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className={`${headerData == "mobile" ? "col-12" : "col-12 col-lg-7 ps-lg-5"} custom-page-content`}>
                                    <div className='d-grid custom-page-title gap-4'>
                                        <div className='flex-between-align'>
                                            <h3 className='fw-semibold m-0 first-capitalize'>{product?.name}</h3>
                                            <Dropdown>
                                                <Dropdown.Toggle id="dropdown-basic" className='p-0'>
                                                    <i className="bi bi-share-fill p-2 py-1"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleShare("facebook")}>Facebook</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleShare("whatsapp")}>WhatsApp</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleShare("email")}>Email</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <h2 className='fw-semibold d-flex align-items-end gap-2 m-0'>
                                            <span>₹{parseInt(productPrice)}</span>
                                            <span className={`fw-semibold fs-16 text-decoration-line-through pb-1 text-secondary ${(product?.mrp > productPrice) ? "" : "d-none"}`}>₹{parseInt(product?.mrp)}</span>
                                            {/* <span className='fw-semibold fs-14'>Excl. Tax</span> */}
                                        </h2>
                                        {
                                            product?.variantData?.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div
                                                            className={`d-grid gap-1 
                                            ${(item?.name?.toLowerCase()?.trim() === 'size') ? 'custom-size' : ''}
                                            ${(item?.name?.toLowerCase()?.trim() === 'color') ? 'custom-color' : ''}`
                                                            }>
                                                            <div className='d-flex gap-1'>
                                                                <span className='p-color text-capitalize'>{item?.name}: </span>
                                                                {
                                                                    item?.data?.length > 0 &&
                                                                    item?.data.map((subItem, subIndex) => {
                                                                        const check = checkActive(subItem)
                                                                        if (check) {
                                                                            return (
                                                                                <span key={subIndex} className='fw-semibold text-capitalize m-0 bodyTextColor'>{subItem?.label}</span>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                                {/* <p className='fw-semibold m-0 text-capitalize'>
                                                {product?.variantData[index].data.label}
                                            </p> */}
                                                            </div>
                                                            {
                                                                (item?.name?.toLowerCase()?.trim() === "color") ?
                                                                    <div className='d-flex custom-color-list gap-2'>
                                                                        {
                                                                            item?.data.map((subItem, subIndex) => {
                                                                                return (
                                                                                    <>
                                                                                        <span
                                                                                            onClick={() => changeVariant({ name: item?.name, data: subItem })}
                                                                                            key={subIndex}
                                                                                            className={`${(checkActive(subItem)) ? 'active' : ''}`}
                                                                                            style={{ backgroundColor: subItem?.code }}
                                                                                            data-tooltip-id="my-close"
                                                                                            data-tooltip-content={`${subItem?.label}`}
                                                                                        >
                                                                                        </span>
                                                                                        <Tooltip id="my-close" place="top" />
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <div className='d-flex custom-size-list gap-2'>
                                                                            {
                                                                                item?.data.map((subItem, subIndex) => {
                                                                                    return (
                                                                                        <span
                                                                                            onClick={() => changeVariant({ name: item?.name, data: subItem })}
                                                                                            key={subIndex}
                                                                                            className={`text-uppercase ${(checkActive(subItem)) ? 'active' : ''}`}
                                                                                        >
                                                                                            {subItem?.code}
                                                                                        </span>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                        {
                                                                            (item?.name?.toLowerCase()?.trim() === "size" && product?.sizeChartImage) && (
                                                                                <div className='d-flex'>
                                                                                    <div onClick={() => setSizeChartModalStatus(true)} className='pointer fs-14 text-decoration-underline fw-semibold mt-1 p-color' >Size Chart</div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }
                                        <div className='d-grid gap-1 custom-size'>
                                            <div className='d-flex gap-1'>
                                                <span className='p-color'>Quantity: </span>
                                                <p className='fw-semibold m-0 text-capitalize'>{selectedProduct?.quantity}</p>
                                            </div>
                                            <div className='d-flex custom-qty-list gap-0'>
                                                <button
                                                    onClick={() => setSelectedProduct((prevData) => ({
                                                        ...prevData,
                                                        quantity: (selectedProduct?.quantity > 1) ? selectedProduct?.quantity - 1 : 1
                                                    }))}
                                                >
                                                    <i className="bi bi-dash-lg"></i>
                                                </button>
                                                <input type="number" value={selectedProduct?.quantity} className='text-center' readOnly />
                                                <button
                                                    onClick={() => setSelectedProduct((prevData) => ({
                                                        ...prevData,
                                                        quantity: (selectedProduct?.quantity < 20) ? selectedProduct?.quantity + 1 : 20
                                                    }))}
                                                >

                                                    <i className="bi bi-plus-lg" />
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            !isOutOfStock ? (
                                                <div className='flex-between-align gap-2 custom-cart-btn'>
                                                    <button
                                                        className='fw-semibold flex-center-align gap-2'
                                                    >
                                                        <i className="bi bi-cart-plus-fill fs-16" />
                                                        Add to Cart
                                                    </button>
                                                    <button className='fw-semibold'>Buy Now</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className='flex-between-align gap-2 custom-cart-btn'>
                                                        <button className='fw-semibold bg-danger text-white' disabled>OUT OF STOCK</button>
                                                    </div>
                                                </>
                                            )
                                        }
                                        <div className='d-grid'>
                                            {/* <h4 className='my-2 theme-color'>About product</h4> */}
                                            <p className='fs-14 first-capitalize' dangerouslySetInnerHTML={{ __html: product?.description }}></p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
            }
            <Modal
                show={sizeChartModalStatus}
                onHide={() => setSizeChartModalStatus(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className='fw-bold fs-16 mb-1'>Size Chart</div>
                    <div
                        className='w-100'
                        style={{
                            aspectRatio: "4/3",
                        }}
                    >
                        <img
                            style={{
                                objectFit: 'contain'
                            }}
                            className='h-100 w-100'
                            src={product?.sizeChartImage}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MainProductDetail
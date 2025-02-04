import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { storeSecondarySideBar } from '../../Store/Slices/Customizer/secondarySideBarSlice';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { storePrimarySections } from '../../Store/Slices/Customizer/primarySectionsSlice';
import axios from 'axios';
import { frontEnd_API, header } from '../../Config/config';
import { ButtonList, Input, RangeSlider, RangeSliderCustom, Textarea } from '../../Components/Customizer/TypeBase';
import { sliderMarks } from '../../Data/localData';
import { MdModeEdit } from 'react-icons/md';

function SecondarySidebar() {
    const secondarySidebar = useSelector((state) => state.secondarySideBar.value);
    const primarySections = useSelector((state) => state.primarySections.value);
    const [categoryList, setCategoryList] = useState([]);
    const dispatch = useDispatch();
    const [productList, setProductList] = useState([]);

    const handleBack = () => {
        dispatch(
            storeSecondarySideBar(
                {
                    ...secondarySidebar,
                    visible: false
                }
            )
        )
    }

    const switchType = (type) => {
        console.log("type::", type);
        dispatch(
            storeSecondarySideBar(
                {
                    ...secondarySidebar,
                    data: {
                        ...secondarySidebar?.data,
                        data: {
                            ...secondarySidebar?.data?.data,
                            type
                        }
                    }
                }
            )
        )
    }

    const handleInput = (data) => {
        const newData = {
            ...secondarySidebar,
            data: {
                ...secondarySidebar?.data,
                data: {
                    ...secondarySidebar?.data?.data,
                    data: secondarySidebar?.data?.data?.data.map((item) => {
                        if (item?.id == secondarySidebar?.data?.subData?.id) {
                            return {
                                ...item,
                                ...data
                            }
                        } else {
                            return { ...item }
                        }
                    })
                },
                subData: {
                    ...secondarySidebar?.data?.subData,
                    ...data
                },
            }
        }

        dispatch(storeSecondarySideBar(newData))
    }

    const handleMainInput = (data) => {
        const newData = {
            ...secondarySidebar,
            data: {
                ...secondarySidebar?.data,
                data: {
                    ...secondarySidebar?.data?.data,
                    ...data,
                },
            }
        }
        dispatch(storeSecondarySideBar(newData))
    }

    useEffect(() => {
        const newData = primarySections?.map((peraItem) => {

            if (peraItem?.value == secondarySidebar?.data?.section) {

                return {
                    ...peraItem,
                    data: peraItem?.data?.map((item) => {
                        if (item?.label == secondarySidebar?.data?.data?.label) {
                            console.log("peraItem::", {
                                ...item,
                                ...secondarySidebar?.data?.data
                            });
                            return {
                                ...item,
                                ...secondarySidebar?.data?.data
                            }
                        } else {
                            return { ...item }
                        }
                    })
                }
            } else {
                return peraItem
            }
        })

        dispatch(storePrimarySections([...newData]))
        console.log("secondarySidebar::", secondarySidebar);

    }, [secondarySidebar])

    const getCategoryList = async () => {
        try {
            const { data } = await axios.get(frontEnd_API?.getCategory, header)
            setCategoryList(data?.data);
        } catch (err) {
            console.error("err::", err);
        }
    }

    const getProducts = async () => {
        try {

            const { data } = await axios.put(frontEnd_API?.getProductList, {
                category: "all",
                // limit: tempLimit
            }, header)

            setProductList(data?.data);
            console.log("data::", data?.data);
        }
        catch (e) {
            console.log("e::", e);
        }
    }

    useEffect(() => {
        getCategoryList();
        getProducts();
    }, [])

    return (
        <div
            className={`customizer-home-secondary-sidebar ${!secondarySidebar?.visible ? "d-none" : "bg-light"}`}
            id={secondarySidebar?.position ? "secondary-sidebar" : "primary-sidebar"}
            style={{ zIndex: "1" }}
        >
            <div className='d-grid customizer-home-secondary-sidebar-scroll'>
                <div className='d-grid'>
                    <h6 className='px-3 m-0 py-2 cursor flex-align gap-2 w-fit' onClick={handleBack}>
                        <FaArrowLeftLong className='fs-14' />
                        {secondarySidebar?.data?.data?.label}
                    </h6>
                    <hr className='mt-1 mb-0' />
                </div>
                {
                    (secondarySidebar?.data?.data?.value == "announcement-bar") &&
                    <>
                        {
                            (secondarySidebar?.data?.subData)
                                ? <div className='py-2 px-3 sections-menu d-grid gap-3'>
                                    <label htmlFor={[secondarySidebar?.data?.subData?.label]} className='d-grid gap-1'>
                                        <span>Text</span>
                                        <input
                                            type="text"
                                            className='p-2 half-border-rad bg-transparent border border-secondary'
                                            placeholder='Enter text here'
                                            id={[secondarySidebar?.data?.subData?.label]}
                                            name={[secondarySidebar?.data?.subData?.label]}
                                            value={secondarySidebar?.data?.subData?.label}
                                            onChange={(e) => {
                                                handleInput({
                                                    label: e?.target?.value
                                                })
                                            }}
                                        />
                                    </label>
                                    <label htmlFor={[secondarySidebar?.data?.subData?.link]} className='d-grid gap-1'>
                                        <span>Link</span>
                                        <input
                                            type="link"
                                            className='p-2 half-border-rad bg-transparent border border-secondary'
                                            placeholder='Paste link here'
                                            id={[secondarySidebar?.data?.subData?.link]}
                                            name={[secondarySidebar?.data?.subData?.link]}
                                            value={secondarySidebar?.data?.subData?.link}
                                            onChange={(e) => {
                                                handleInput({
                                                    link: e?.target?.value
                                                })
                                            }}
                                        />
                                    </label>
                                </div>
                                : <div className='py-2 px-3 sections-menu'>
                                    <h6>Type</h6>
                                    <div className='flex-between-align half-border-rad gap-2 bg-secondary-subtle p-2'>
                                        <Button
                                            variant={secondarySidebar?.data?.data?.type == "marquee" ? "light" : 'transparent'}
                                            className={`w-50 fs-14 py-1 bg-${secondarySidebar?.data?.data?.type == "marquee" ? "light" : 'transparent'}`}
                                            onClick={() => {
                                                switchType("marquee")
                                            }}
                                        >
                                            Marquee
                                        </Button>
                                        <Button
                                            variant={secondarySidebar?.data?.data?.type == "slides" ? 'light' : "transparent"}
                                            className={`w-50 fs-14 py-1 bg-${secondarySidebar?.data?.data?.type == "slides" ? 'light' : "transparent"}`}
                                            onClick={() => {
                                                switchType("slides")
                                            }}
                                        >
                                            Slides
                                        </Button>
                                    </div>
                                </div>
                        }
                    </>
                }
                {
                    (secondarySidebar?.data?.data?.value == "featured-collection") &&
                    <>
                        <div className='py-2 px-3 sections-menu d-grid gap-3'>
                            <label htmlFor={[secondarySidebar?.data?.data?.title]} className='d-grid gap-1'>
                                <span>Title</span>
                                <input
                                    type="text"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    placeholder='Enter title here'
                                    id={[secondarySidebar?.data?.data?.title]}
                                    value={secondarySidebar?.data?.data?.title}
                                    onChange={(e) => {
                                        handleMainInput({
                                            title: e?.target?.value
                                        })
                                    }}
                                />
                            </label>
                            <label htmlFor={[secondarySidebar?.data?.data?.description]} className='d-grid gap-1'>
                                <span>Description</span>
                                <textarea
                                    rows={3}
                                    type="link"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    placeholder='Enter description here'
                                    id={[secondarySidebar?.data?.data?.description]}
                                    value={secondarySidebar?.data?.data?.description}
                                    onChange={(e) => {
                                        handleMainInput({
                                            description: e?.target?.value
                                        })
                                    }}
                                />
                            </label>
                            <label htmlFor="collection" className='d-grid gap-1'>
                                <span className='fs-14'>Collection</span>
                                <select
                                    name=""
                                    id="collection"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    value={secondarySidebar?.data?.data?.type}
                                    onChange={(e) => {
                                        handleMainInput({
                                            type: e?.target?.value
                                        })
                                    }}
                                >
                                    <option value={""}>Select collection</option>
                                    {
                                        categoryList?.map((item, index) => {
                                            return (
                                                <option value={item?.categoryName} key={index}>{item?.categoryName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </label>
                            <label htmlFor="desktopItems" className='d-grid gap-1'>
                                <span className='fs-14'>Number of products on desktop</span>
                                <select
                                    name=""
                                    id="desktopItems"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    value={secondarySidebar?.data?.data?.desktopItems}
                                    onChange={(e) => {
                                        handleMainInput({
                                            desktopItems: e?.target?.value
                                        })
                                    }}
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                            </label>
                            <label htmlFor="mobileItems" className='d-grid gap-1'>
                                <span className='fs-14'>Number of products on desktop</span>
                                <select
                                    name=""
                                    id="mobileItems"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    value={secondarySidebar?.data?.data?.mobileItems}
                                    onChange={(e) => {
                                        handleMainInput({
                                            mobileItems: e?.target?.value
                                        })
                                    }}
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                </select>
                            </label>
                        </div>
                    </>
                }
                {
                    (secondarySidebar?.data?.data?.value == "rich-text") &&
                    <>
                        <div className='py-2 px-3 sections-menu d-grid gap-3'>
                            <ButtonList
                                data={{
                                    title: "Alignment",
                                    label: "type",
                                    value: secondarySidebar?.data?.data?.type,
                                    data: [
                                        {
                                            label: "Start",
                                            value: "start"
                                        },
                                        {
                                            label: "Center",
                                            value: "center"
                                        },
                                        {
                                            label: "End",
                                            value: "end"
                                        },
                                    ],
                                }}
                                onSelect={(e) => {
                                    handleMainInput({
                                        [e.label]: e?.value
                                    })
                                }}
                            />
                            <label htmlFor={[secondarySidebar?.data?.data?.title]} className='d-grid gap-1'>
                                <span>Title</span>
                                <input
                                    type="text"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    placeholder='Enter title here'
                                    id={[secondarySidebar?.data?.data?.title]}
                                    value={secondarySidebar?.data?.data?.title}
                                    onChange={(e) => {
                                        handleMainInput({
                                            title: e?.target?.value
                                        })
                                    }}
                                />
                            </label>
                            <label htmlFor={[secondarySidebar?.data?.data?.tagline]} className='d-grid gap-1'>
                                <span>Tagline</span>
                                <input
                                    type="text"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    placeholder='Enter tagline here'
                                    id={[secondarySidebar?.data?.data?.tagline]}
                                    value={secondarySidebar?.data?.data?.tagline}
                                    onChange={(e) => {
                                        handleMainInput({
                                            tagline: e?.target?.value
                                        })
                                    }}
                                />
                            </label>
                            <label htmlFor={[secondarySidebar?.data?.data?.description]} className='d-grid gap-1'>
                                <span>Description</span>
                                <textarea
                                    rows={3}
                                    type="link"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    placeholder='Enter description here'
                                    id={[secondarySidebar?.data?.data?.description]}
                                    value={secondarySidebar?.data?.data?.description}
                                    onChange={(e) => {
                                        handleMainInput({
                                            description: e?.target?.value
                                        })
                                    }}
                                />
                            </label>
                            <label htmlFor={[secondarySidebar?.data?.data?.firstButtonText]} className='d-grid gap-1'>
                                <span>First Button Text</span>
                                <input
                                    type="text"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    placeholder='Enter tagline here'
                                    id={[secondarySidebar?.data?.data?.firstButtonText]}
                                    value={secondarySidebar?.data?.data?.firstButtonText}
                                    onChange={(e) => {
                                        handleMainInput({
                                            firstButtonText: e?.target?.value
                                        })
                                    }}
                                />
                            </label>
                            <label htmlFor={[secondarySidebar?.data?.data?.firstButtonLink]} className='d-grid gap-1'>
                                <span>First Button Link</span>
                                <input
                                    type="text"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    placeholder='Enter tagline here'
                                    id={[secondarySidebar?.data?.data?.firstButtonLink]}
                                    value={secondarySidebar?.data?.data?.firstButtonLink}
                                    onChange={(e) => {
                                        handleMainInput({
                                            firstButtonLink: e?.target?.value
                                        })
                                    }}
                                />
                            </label>
                            <label htmlFor={[secondarySidebar?.data?.data?.secondButtonText]} className='d-grid gap-1'>
                                <span>Second Button Text</span>
                                <input
                                    type="text"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    placeholder='Enter tagline here'
                                    id={[secondarySidebar?.data?.data?.secondButtonText]}
                                    value={secondarySidebar?.data?.data?.secondButtonText}
                                    onChange={(e) => {
                                        handleMainInput({
                                            secondButtonText: e?.target?.value
                                        })
                                    }}
                                />
                            </label>
                            <label htmlFor={[secondarySidebar?.data?.data?.secondButtonLink]} className='d-grid gap-1'>
                                <span>Second Button Link</span>
                                <input
                                    type="text"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    placeholder='Enter tagline here'
                                    id={[secondarySidebar?.data?.data?.secondButtonLink]}
                                    value={secondarySidebar?.data?.data?.secondButtonLink}
                                    onChange={(e) => {
                                        handleMainInput({
                                            firstButtonLink: e?.target?.value
                                        })
                                    }}
                                />
                            </label>
                        </div>
                    </>
                }
                {
                    (secondarySidebar?.data?.data?.value == "image-banner") &&
                    <>
                        <div className='py-2 px-3 sections-menu d-grid gap-3'>
                            <div className='d-grid custom-img-selector'>
                                <label htmlFor="logo" className='width-fit pointer'>
                                    <span className='fs-14'>Image</span>
                                    {
                                        (secondarySidebar?.data?.data?.image !== "")
                                            ? <div className='custom-img'>
                                                <img src={URL.createObjectURL(secondarySidebar?.data?.data?.image)} alt="" />
                                            </div> :
                                            <div className='custom-img'>
                                                <i className="bi bi-image fs-40" />
                                            </div>
                                    }
                                </label>
                                <input
                                    type="file"
                                    // value={storeData?.logo}
                                    name='logo'
                                    id='logo'
                                    // className={(err?.logo && !storeData?.logo) && 'border-red'}
                                    onChange={(e) => {
                                        // handleInputChange({ name: 'logo', file: e.target.files[0] });
                                        // setNewLogo(e.target.files[0])
                                        handleMainInput({
                                            image: e.target.files[0]
                                        })
                                    }}
                                    accept=".png, .jpg, .jpeg, .webp, .svg"
                                    autoComplete='off' />
                            </div>
                            <ButtonList
                                data={{
                                    title: "Banner height",
                                    label: "imgSize",
                                    value: secondarySidebar?.data?.data?.imgSize,
                                    data: [
                                        {
                                            label: "Small",
                                            value: "5/2"
                                        },
                                        {
                                            label: "Medium",
                                            value: "4/2"
                                        },
                                        {
                                            label: "Large",
                                            value: "4/3"
                                        },
                                    ]
                                }}
                                onSelect={(e) => {
                                    handleMainInput({
                                        [e.label]: e?.value
                                    })
                                }}
                            />
                            <label htmlFor="contentPosition" className='d-grid gap-1'>
                                <span className='fs-14'>Content position</span>
                                <select
                                    name=""
                                    id="contentPosition"
                                    className='p-2 half-border-rad bg-transparent border border-secondary'
                                    value={secondarySidebar?.data?.data?.type}
                                    onChange={(e) => {
                                        handleMainInput({
                                            type: e?.target?.value
                                        })
                                    }}
                                >
                                    <option value={"top left"}>Top Left</option>
                                    <option value={"top center"}>Top Center</option>
                                    <option value={"top right"}>Top Right</option>
                                    <option value={"middle left"}>Middle Left</option>
                                    <option value={"middle center"}>Middle Center</option>
                                    <option value={"middle right"}>Middle Right</option>
                                    <option value={"bottom left"}>Bottom Left</option>
                                    <option value={"bottom center"}>Bottom Center</option>
                                    <option value={"bottom right"}>Bottom Right</option>
                                </select>
                            </label>
                            <ButtonList
                                data={{
                                    title: "Text alignment",
                                    label: "align",
                                    value: secondarySidebar?.data?.data?.align,
                                    data: [
                                        {
                                            label: "Start",
                                            value: "start"
                                        },
                                        {
                                            label: "Center",
                                            value: "center"
                                        },
                                        {
                                            label: "End",
                                            value: "end"
                                        },
                                    ],
                                }}
                                onSelect={(e) => {
                                    handleMainInput({
                                        [e.label]: e?.value
                                    })
                                }}
                            />
                            <Input
                                data={{
                                    title: "Title",
                                    label: "title",
                                    placeholder: "Enter title here",
                                    value: secondarySidebar?.data?.data?.title
                                }}
                                onChange={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                            <Textarea
                                data={{
                                    rows: 3,
                                    title: "Description",
                                    label: "description",
                                    placeholder: "Enter description here",
                                    value: secondarySidebar?.data?.data?.description
                                }}
                                onChange={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                            <Input
                                data={{
                                    title: "First Button Text",
                                    label: "firstButtonText",
                                    placeholder: "Enter first button text",
                                    value: secondarySidebar?.data?.data?.firstButtonText
                                }}
                                onChange={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                            <Input
                                data={{
                                    title: "First Button Link",
                                    label: "firstButtonLink",
                                    placeholder: "Enter first button link",
                                    value: secondarySidebar?.data?.data?.firstButtonLink
                                }}
                                onChange={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                            <Input
                                data={{
                                    title: "Second Button Text",
                                    label: "secondButtonText",
                                    placeholder: "Enter second button text",
                                    value: secondarySidebar?.data?.data?.secondButtonText
                                }}
                                onChange={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                            <Input
                                data={{
                                    title: "Second Button Link",
                                    label: "secondButtonLink",
                                    placeholder: "Enter second button link",
                                    value: secondarySidebar?.data?.data?.secondButtonLink
                                }}
                                onChange={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                        </div>
                    </>
                }
                {
                    (secondarySidebar?.data?.data?.value == "image-with-text") &&
                    <>
                        <div className='py-2 px-3 sections-menu d-grid gap-3'>
                            <div className='d-grid custom-img-selector'>
                                <label htmlFor="logo" className='width-fit pointer'>
                                    <span className='fs-14'>Image</span>
                                    {
                                        (secondarySidebar?.data?.data?.image !== "")
                                            ? <div className='custom-img'>
                                                <img src={URL.createObjectURL(secondarySidebar?.data?.data?.image)} alt="" />
                                            </div> :
                                            <div className='custom-img'>
                                                <i className="bi bi-image fs-40" />
                                            </div>
                                    }
                                </label>
                                <input
                                    type="file"
                                    name='logo'
                                    id='logo'
                                    onChange={(e) => {
                                        if (e?.target?.files) {
                                            handleMainInput({
                                                image: e?.target?.files[0] ?? "",
                                            })
                                        }
                                    }}
                                    accept=".png, .jpg, .jpeg, .webp, .svg"
                                    autoComplete='off' />
                            </div>
                            <ButtonList
                                data={{
                                    title: "Desktop image placement",
                                    label: "type",
                                    value: secondarySidebar?.data?.data?.type,
                                    data: [
                                        {
                                            label: "Image first",
                                            value: "Image first"
                                        },
                                        {
                                            label: "Image second",
                                            value: "Image second"
                                        },
                                    ]
                                }}
                                onSelect={(e) => {
                                    handleMainInput({
                                        [e.label]: e?.value
                                    })
                                }}
                            />
                            <ButtonList
                                data={{
                                    title: "Desktop content position",
                                    label: "desktopAlignV",
                                    value: secondarySidebar?.data?.data?.desktopAlignV,
                                    data: [
                                        {
                                            label: "Top",
                                            value: "start"
                                        },
                                        {
                                            label: "Middle",
                                            value: "center"
                                        },
                                        {
                                            label: "Bottom",
                                            value: "end"
                                        },
                                    ],
                                }}
                                onSelect={(e) => {
                                    handleMainInput({
                                        [e.label]: e?.value
                                    })
                                }}
                            />
                            <ButtonList
                                data={{
                                    title: "Desktop content alignment",
                                    label: "desktopAlignH",
                                    value: secondarySidebar?.data?.data?.desktopAlignH,
                                    data: [
                                        {
                                            label: "Start",
                                            value: "start"
                                        },
                                        {
                                            label: "Center",
                                            value: "center"
                                        },
                                        {
                                            label: "End",
                                            value: "end"
                                        },
                                    ],
                                }}
                                onSelect={(e) => {
                                    handleMainInput({
                                        [e.label]: e?.value
                                    })
                                }}
                            />
                            <ButtonList
                                data={{
                                    title: "Mobile content alignment",
                                    label: "mobileAlign",
                                    value: secondarySidebar?.data?.data?.mobileAlign,
                                    data: [
                                        {
                                            label: "Start",
                                            value: "start"
                                        },
                                        {
                                            label: "Center",
                                            value: "center"
                                        },
                                        {
                                            label: "End",
                                            value: "end"
                                        },
                                    ],
                                }}
                                onSelect={(e) => {
                                    handleMainInput({
                                        [e.label]: e?.value
                                    })
                                }}
                            />
                            <Input
                                data={{
                                    title: "Title",
                                    label: "title",
                                    placeholder: "Enter title here",
                                    value: secondarySidebar?.data?.data?.title
                                }}
                                onChange={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                            <Textarea
                                data={{
                                    rows: 3,
                                    title: "Description",
                                    label: "description",
                                    placeholder: "Enter description here",
                                    value: secondarySidebar?.data?.data?.description
                                }}
                                onChange={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                            <Input
                                data={{
                                    title: "Button Text",
                                    label: "buttonText",
                                    placeholder: "Enter button text",
                                    value: secondarySidebar?.data?.data?.buttonText
                                }}
                                onChange={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                            <Input
                                data={{
                                    title: "Button Link",
                                    label: "buttonLink",
                                    placeholder: "Enter button link",
                                    value: secondarySidebar?.data?.data?.buttonLink
                                }}
                                onChange={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                            <RangeSliderCustom
                                data={{
                                    title: "Padding Top",
                                    label: "paddingTop",
                                    value: secondarySidebar?.data?.data?.paddingTop,
                                    ...sliderMarks?.paddingMarks
                                }}
                                onSelect={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                            <RangeSliderCustom
                                data={{
                                    title: "Padding Bottom",
                                    label: "paddingBottom",
                                    value: secondarySidebar?.data?.data?.paddingBottom,
                                    ...sliderMarks?.paddingMarks
                                }}
                                onSelect={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                            />
                        </div>
                    </>
                }
                {
                    (secondarySidebar?.data?.data?.value == "slideshow") &&
                    <>
                        <div className='py-2 px-3 sections-menu d-grid gap-3'>
                            {
                                (secondarySidebar?.data?.subData)
                                    ? <>
                                        <div className='d-grid custom-img-selector'>
                                            <label htmlFor="logo" className='width-fit pointer'>
                                                <span className='fs-14'>Image</span>
                                                {
                                                    (secondarySidebar?.data?.subData?.image && (secondarySidebar?.data?.subData?.image !== ""))
                                                        ? <div className='custom-img'>
                                                            <img src={URL.createObjectURL(secondarySidebar?.data?.subData?.image)} alt="" />
                                                        </div> :
                                                        <div className='custom-img'>
                                                            <i className="bi bi-image fs-40" />
                                                        </div>
                                                }
                                            </label>
                                            <input
                                                type="file"
                                                name='logo'
                                                id='logo'
                                                onChange={(e) => {
                                                    if (e?.target?.files) {
                                                        handleInput({
                                                            image: e?.target?.files[0] ?? "",
                                                            // label: e?.target?.files[0]?.name,
                                                        })
                                                    }
                                                }}
                                                accept=".png, .jpg, .jpeg, .webp, .svg"
                                                autoComplete='off' />
                                        </div>
                                        <label htmlFor="collection" className='d-grid gap-1'>
                                            <span className='fs-14'>Collection</span>
                                            <select
                                                name=""
                                                id="collection"
                                                className='p-2 half-border-rad bg-transparent border border-secondary'
                                                value={secondarySidebar?.data?.subData?.type}
                                                onChange={(e) => {
                                                    handleMainInput({
                                                        type: e?.target?.value
                                                    })
                                                }}
                                            >
                                                <option value={""}>Select collection</option>
                                                {
                                                    categoryList?.map((item, index) => {
                                                        console.log("item::", item);

                                                        return (
                                                            <option value={item?.categoryName} key={index}>{item?.categoryName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </label>
                                        <Input
                                            data={{
                                                title: "Title",
                                                label: "title",
                                                placeholder: "Enter title",
                                                value: secondarySidebar?.data?.subData?.title
                                            }}
                                            onChange={(e) => { handleInput({ [e.label]: e?.value }) }}
                                        />
                                        <Input
                                            data={{
                                                title: "Description",
                                                label: "description",
                                                placeholder: "Enter description",
                                                value: secondarySidebar?.data?.subData?.description
                                            }}
                                            onChange={(e) => { handleInput({ [e.label]: e?.value }) }}
                                        />
                                    </>
                                    :
                                    <div className='py-2 sections-menu d-grid gap-3'>
                                        <span className='pt-2'>
                                            <ButtonList
                                                data={{
                                                    title: "Slide Height",
                                                    label: "type",
                                                    value: secondarySidebar?.data?.data?.type,
                                                    data: [
                                                        {
                                                            label: "Small",
                                                            value: "sm"
                                                        },
                                                        {
                                                            label: "Medium",
                                                            value: "md"
                                                        },
                                                        {
                                                            label: "Large",
                                                            value: "lg"
                                                        },
                                                    ],
                                                }}
                                                onSelect={(e) => {
                                                    handleMainInput({
                                                        [e.label]: e?.value
                                                    })
                                                }}
                                            />
                                        </span>
                                        <ButtonList
                                            data={{
                                                title: "Animation style",
                                                label: "animationType",
                                                value: secondarySidebar?.data?.data?.animationType,
                                                data: [
                                                    {
                                                        label: "None",
                                                        value: "none"
                                                    },
                                                    {
                                                        label: "Slide",
                                                        value: "slide"
                                                    },
                                                    {
                                                        label: "Fade",
                                                        value: "fade"
                                                    },
                                                ],
                                            }}
                                            onSelect={(e) => {
                                                handleMainInput({
                                                    [e.label]: e?.value
                                                })
                                            }}
                                        />
                                        {/* <ButtonList
                                            data={{
                                                title: "Pagination style",
                                                label: "paginationType",
                                                value: secondarySidebar?.data?.data?.paginationType,
                                                data: [
                                                    {
                                                        label: "Dots",
                                                        value: "dots"
                                                    },
                                                    {
                                                        label: "Counter",
                                                        value: "counter"
                                                    },
                                                    {
                                                        label: "Numbers",
                                                        value: "numbers"
                                                    },
                                                ],
                                            }}
                                            onSelect={(e) => {
                                                handleMainInput({
                                                    [e.label]: e?.value
                                                })
                                            }}
                                        /> */}
                                        <ButtonList
                                            data={{
                                                title: "Autoplay",
                                                label: "isAutoPlay",
                                                value: secondarySidebar?.data?.data?.isAutoPlay,
                                                data: [
                                                    {
                                                        label: "On",
                                                        value: 1
                                                    },
                                                    {
                                                        label: "Off",
                                                        value: 0
                                                    },
                                                ],
                                            }}
                                            onSelect={(e) => {
                                                handleMainInput({
                                                    [e.label]: e?.value
                                                })
                                            }}
                                        />
                                        <RangeSliderCustom
                                            data={{
                                                title: "Autoplay speed",
                                                label: "autoPlaySpeed",
                                                value: secondarySidebar?.data?.data?.autoPlaySpeed,
                                                ...sliderMarks?.autoPlaySpeedMarks
                                            }}
                                            onSelect={(e) => { handleMainInput({ [e.label]: e?.value }) }}
                                        />
                                    </div>
                            }
                        </div>
                    </>
                }
                {
                    (secondarySidebar?.data?.data?.value == "video") &&
                    <div className='py-2 px-3 sections-menu d-grid gap-3'>
                        <div className='d-grid custom-img-selector'>
                            <label htmlFor="logo" className='width-fit pointer'>
                                <span className='fs-14'>Video</span>
                                {
                                    (secondarySidebar?.data?.data?.video && (secondarySidebar?.data?.data?.video !== ""))
                                        ? <div className='d-flex align-items-start gap-2'>
                                            <div className='custom-img'>
                                                {/* <img src={URL.createObjectURL(secondarySidebar?.data?.data?.video)} alt="" /> */}
                                                <video autoPlay muted loop className='w-100 h-100 object-cover'>
                                                    <source src={URL.createObjectURL(secondarySidebar?.data?.data?.video)} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                            <span className='bg-secondary text-light px-2 py-1 half-border-rad cursor'><MdModeEdit /></span>
                                        </div> :
                                        <div className='custom-img'>
                                            <i className="bi bi-camera-reels fs-40" />
                                        </div>
                                }
                            </label>
                            <input
                                type="file"
                                name='logo'
                                id='logo'
                                onChange={(e) => {
                                    if (e?.target?.files) {
                                        handleMainInput({
                                            video: e?.target?.files[0] ?? "",
                                        })
                                    }
                                }}
                                accept=".mp4"
                                autoComplete='off' />
                        </div>
                        <ButtonList
                            data={{
                                title: "Video Height",
                                label: "type",
                                value: secondarySidebar?.data?.data?.type,
                                data: [
                                    {
                                        label: "Small",
                                        value: "5/2"
                                    },
                                    {
                                        label: "Medium",
                                        value: "4/2"
                                    },
                                    {
                                        label: "Large",
                                        value: "4/3"
                                    },
                                ],
                            }}
                            onSelect={(e) => {
                                handleMainInput({
                                    [e.label]: e?.value
                                })
                            }}
                        />
                    </div>
                }
                {
                    (secondarySidebar?.data?.data?.value == "featured-product") &&
                    <div className='py-2 px-3 sections-menu d-grid gap-3'>
                        <label htmlFor="collection" className='d-grid gap-1'>
                            <span className='fs-14'>Product</span>
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic" className='custom-stop-drp-icon w-100 border border-dark text-wrap flex-between-align gap-2'>
                                    {
                                        (secondarySidebar?.data?.data?.type != "")
                                            ? <>
                                                <div className='flex-align gap-2'>
                                                    <div
                                                        className='aspect-1-1 semi-border-rad overflow-hidden'
                                                        style={{ height: "35px", backgroundColor: productList?.find((item) => item?.slug == secondarySidebar?.data?.data?.type)?.defaultColor }}
                                                    >
                                                        <img
                                                            src={productList?.find((item) => item?.slug == secondarySidebar?.data?.data?.type)?.thumbnail}
                                                            alt=""
                                                            className='w-100 h-100 object-cover'
                                                        />
                                                    </div>
                                                    <span className='text-wrap' style={{ maxWidth: "170px" }}>{
                                                        secondarySidebar?.data?.data?.type?.length > 18
                                                            ? secondarySidebar?.data?.data?.type.toString().slice(0, 18) + '...'
                                                            : secondarySidebar?.data?.data?.type
                                                    }</span>
                                                </div>
                                            </>
                                            : <span>Select Product</span>
                                    }
                                    <i className="bi fs-12 bi-caret-down-fill"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='w-100'>
                                    {
                                        productList?.map((item, index) => {
                                            return (
                                                <>
                                                    <Dropdown.Item
                                                        onClick={() => {
                                                            handleMainInput({
                                                                type: item?.slug
                                                            })
                                                        }}
                                                        className={`${item?.slug == secondarySidebar?.data?.data?.type ? "bg-secondary-subtle" : ""}`}
                                                        key={index}
                                                    >
                                                        <div className='d-flex gap-2'>
                                                            <div className='aspect-1-1 semi-border-rad' style={{ height: "35px", backgroundColor: item?.defaultColor }}>
                                                                <img src={item?.thumbnail} alt="" className='w-100 h-100 object-cover' />
                                                            </div>
                                                            <span className='text-wrap' style={{ maxWidth: "170px" }}>{item?.name}</span>
                                                        </div>
                                                    </Dropdown.Item>

                                                </>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </label>
                    </div>
                }
            </div>
        </div>
    )
}

export default SecondarySidebar
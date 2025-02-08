import React, { useEffect, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

// import icons
import { CiDesktop, CiMobile2 } from 'react-icons/ci';
import { GrRedo, GrUndo } from 'react-icons/gr';
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineWidthFull } from 'react-icons/md';

import { pagesList, sizesList } from '../../Data/localData';
import { useDispatch, useSelector } from 'react-redux';
import { storeHeader, updatePageHeader, updateSizeHeader } from '../../Store/Slices/Customizer/headerSlice';
import { storeSecondarySideBar } from '../../Store/Slices/Customizer/secondarySideBarSlice';
import axios from 'axios';
import { frontEnd_API, frontEnd_API_seller, header } from '../../Config/config';
import { storePrimarySections } from '../../Store/Slices/Customizer/primarySectionsSlice';
import { storePrimarySideBar } from '../../Store/Slices/Customizer/primarySideBarSlice';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function Header() {

    const headerData = useSelector((state) => state.header.value);
    const secondarySideBar = useSelector((state) => state.secondarySideBar.value);
    const getPrimarySections = useSelector((state) => state.primarySections.value);
    const getPrimarySideBar = useSelector((state) => state.primarySideBar.value);
    const [activePage, setActivePage] = useState(headerData.find((item) => item?.title == "activePage"));
    const [activeSize, setActiveSize] = useState(headerData.find((item) => item?.title == "screenSize"));
    const [storeData, setStoreData] = useState(false);
    const dispatch = useDispatch();

    const getStoreData = async () => {
        try {
            const { data } = await axios.get(frontEnd_API_seller?.storecustomize, header)
            if (data?.data) {
                dispatch(storePrimarySections(data?.data?.customizeData.find(state => state?.value == "sections")?.data))
                dispatch(storePrimarySideBar({
                    ...data?.data?.customizeData.find(state => state?.value == "colorPalatte"),
                    value: "color-palatte"
                }))
                setStoreData(true);
            } else {
                setStoreData(false);
            }
        } catch (err) {
            setStoreData(false);
            console.error("err::", err);
        }
    }

    useEffect(() => {
        getStoreData();
    }, [])

    useEffect(() => {
        setActivePage(headerData.find((item) => item?.title == "activePage"));
        setActiveSize(headerData.find((item) => item?.title == "screenSize"));
    }, [headerData])

    const handleSave = async () => {
        try {
            const actionType = storeData ? "put" : "post";
            const bodyData = {
                customizeData: [
                    {
                        label: "Sections",
                        value: "sections",
                        data: [...getPrimarySections]
                    },
                    {
                        label: "Color Palatte",
                        value: "colorPalatte",
                        data: [...getPrimarySideBar?.data]
                    },
                ]
            }
            const { data } = await axios[actionType](frontEnd_API_seller?.storecustomize, bodyData, header);
            console.log("data::", data);

            toast.success(`Store data ${storeData ? "updated" : "saved"} successfully!`, {
                position: "top-center", // Centers the toast at the top
            });
            getStoreData();
        } catch (error) {
            console.error("error::", error);
        }
    }


    return (
        <header className='customizer-home-header' id="header">
            <div className='customizer-home-header-exit px-2'>
                <Link className='flex-start-align exit-btn'>
                    <IoExitOutline className='exit-icon' />
                    Exit
                </Link>
            </div>
            <div className='customizer-home-header-dropdown'>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className='flex-align gap-2'>
                        {pagesList.find((item) => item?.value == activePage.value)?.icon} <span>{activePage?.label}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            pagesList.map((item, index) => {
                                return (
                                    <Dropdown.Item
                                        key={index}
                                        value={item?.value}
                                        onClick={() => {
                                            setActivePage(item);
                                            dispatch(updatePageHeader({ label: item?.label, value: item?.value }))
                                        }}
                                    >
                                        {item?.icon} {item?.label}
                                    </Dropdown.Item>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='customizer-home-header-controls gap-2 px-3'>

                {/* Screen size buttons */}
                <div className='flex-align gap-1 p-1 header-controls-btn-list'>
                    {
                        sizesList.map((item, index) => {
                            return (
                                <span key={index}>
                                    <button
                                        className={`header-controls-btn ${item?.value == activeSize?.value ? "bg-light text-success" : ""}`}
                                        data-tooltip-id={item?.value}
                                        data-tooltip-content={item?.label}
                                        onClick={() => {
                                            setActiveSize(item)
                                            dispatch(updateSizeHeader({ label: item?.label, value: item?.value }))
                                            dispatch(storeSecondarySideBar({
                                                ...secondarySideBar,
                                                visible: false
                                            }))
                                        }}
                                    >
                                        {item?.icon}
                                    </button>
                                    <Tooltip id={item?.value} place='bottom' className="header-controls-tooltip" />
                                </span>
                            )
                        })
                    }
                </div>

                {/* Redo undo button */}
                <div className='flex-align gap-0 header-controls-btn-list-redo'>
                    <button className='header-controls-btn py-1 px-2' data-tooltip-id="GrUndo" data-tooltip-content="Undo">
                        <GrUndo />
                    </button>
                    <Tooltip id="GrUndo" place='bottom' className="header-controls-tooltip" />
                    <button className='header-controls-btn py-1 px-2' data-tooltip-id="GrRedo" data-tooltip-content="Redo">
                        <GrRedo />
                    </button>
                    <Tooltip id="GrRedo" place='bottom' className="header-controls-tooltip" />
                </div>

                {/* save button */}
                <Button
                    variant='dark'
                    className='header-controls-save-btn py-1 px-3 fs-14 fw-bold ls-half'
                    data-tooltip-id="BtnSave"
                    data-tooltip-content="save"
                    onClick={() => { handleSave() }}
                >
                    Save
                </Button>
                <Tooltip id="BtnSave" place='bottom' className="header-controls-tooltip" />
            </div>
        </header>
    )
}

export default Header
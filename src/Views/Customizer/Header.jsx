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

function Header() {

    const header = useSelector((state) => state.header.value);
    const secondarySideBar = useSelector((state) => state.secondarySideBar.value);
    const [activePage, setActivePage] = useState(header.find((item) => item?.title == "activePage"));
    const [activeSize, setActiveSize] = useState(header.find((item) => item?.title == "screenSize"));
    const dispatch = useDispatch();

    useEffect(() => {
        setActivePage(header.find((item) => item?.title == "activePage"));
        setActiveSize(header.find((item) => item?.title == "screenSize"));
    }, [header])


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
                <Button variant='dark' className='header-controls-save-btn py-1 px-3 fs-14 fw-bold ls-half' data-tooltip-id="BtnSave" data-tooltip-content="save">
                    Save
                </Button>
                <Tooltip id="BtnSave" place='bottom' className="header-controls-tooltip" />
            </div>
        </header>
    )
}

export default Header
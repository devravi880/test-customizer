import React, { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip';

import { useDispatch, useSelector } from 'react-redux';
import { storePrimaryAuxSideBar } from '../../Store/Slices/Customizer/primaryAuxSideBarSlice';
import { tabList } from '../../Data/localData';
import { storeSecondarySideBar } from '../../Store/Slices/Customizer/secondarySideBarSlice';

function PrimaryAuxSidebar() {

    const dispatch = useDispatch();
    const primaryAuxSideBar = useSelector((state) => state.primaryAuxSideBar.value);
    const secondarySideBar = useSelector((state) => state.secondarySideBar.value);
    const [activeTabMain, setActiveTabMain] = useState(primaryAuxSideBar);

    useEffect(() => {
        setActiveTabMain(primaryAuxSideBar);
    }, [primaryAuxSideBar])

    return (
        <div className='customizer-home-primary-aux-sidebar' id="primary-aux-sidebar">
            <div className='d-grid gap-2 p-2'>
                {
                    tabList.map((tab, index) => {
                        return (
                            <span key={index}>
                                <button
                                    className={`tab-holder fs-20 ${(activeTabMain?.value == tab.value) ? "active-tab-holder" : ""}`}
                                    onClick={() => {
                                        dispatch(storePrimaryAuxSideBar({ label: tab?.label, value: tab?.value }))
                                        dispatch(storeSecondarySideBar({ ...secondarySideBar, visible: false }))
                                    }}
                                    data-tooltip-id={tab?.value}
                                    data-tooltip-content={tab?.label}
                                >
                                    {tab.icon}
                                </button>
                                <Tooltip id={tab?.value} place='right' className="primary-aux-sidebar-controls-tooltip header-controls-tooltip" />
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PrimaryAuxSidebar
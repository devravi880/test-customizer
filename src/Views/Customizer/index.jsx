import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { frontEnd_API, header, storeCode } from '../../Config/config';
import { addStore } from '../../Store/Slices/storeSlice';
import Loader from '../../Components/Loader';
import Header from './Header';
import PrimaryAuxSidebar from './PrimaryAuxSidebar';
import PrimarySidebar from './PrimarySidebar';
import Main from './Main';
import SecondarySidebar from './SecondarySidebar';

function Index() {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const primaryAuxSideBar = useSelector((state) => state.primaryAuxSideBar.value);
    const primarySideBar = useSelector((state) => state.primarySideBar.value);
    const headerSlice = useSelector((state) => state.header.value);
    const [headerData, setHeaderData] = useState(headerSlice?.find((item) => item?.title == "screenSize")?.value);
    const defaultStoreCode = "be1e0c67-741b-46e3-ba46-0ae72ccc4afe";
    const storeCurrentStatus = storeCode?.length > 0 ? 1 : 0;

    const [secondarySidebar, setSecondarySidebar] = useState({
        position: false,
        visible: false
    });

    const verifySnapStore = async () => {
        try {
            const response = await axios?.post(frontEnd_API?.verify, { storeCode: params?.storeCode ?? defaultStoreCode }, header);
            const { data } = response;

            if (response?.status == 200) {
                dispatch(addStore(data?.data));

                if (storeCode?.length <= 0 || storeCode != (params?.storeCode ?? defaultStoreCode)) {


                    setTimeout(() => {
                        window.location = ["localhost", "192.168.0.140"].includes(window.location.hostname)
                            ? `http://localhost:${window?.location?.port}/`
                            : `https://${window.location.hostname}/`;
                    }, 750);

                } else {

                    if (window.location.pathname.startsWith("/customize-store")) {
                        navigate("/")
                    }
                }
            }

        } catch (error) {
            console.error("error::", error);
        }
    }
    // -----

    useEffect(() => {
        verifySnapStore();
    }, []);

    const changeCSSVariable = (data) => {
        const root = document.documentElement; // Get the root element
        if (data?.length > 0) {
            data.forEach((item) => {
                root.style.setProperty(`--${item?.varName}`, item?.valueType == "px" ? `${item?.value}px` : item?.value); // Update CSS variable
            });
        }
    };

    useEffect(() => {
        const colorPalette = primarySideBar?.data;

        if (colorPalette) {
            colorPalette.map((item) => {
                if (item?.data[0]?.data?.length > 0) {
                    item?.data.map((subItem) => {
                        changeCSSVariable(subItem?.data);
                    })
                } else {
                    changeCSSVariable(item?.data);
                }
            })
        }

    }, [primarySideBar])

    useEffect(() => {
        const findSize = headerSlice?.find((item) => item?.title == "screenSize")?.value;
        setHeaderData(findSize);
    }, [headerSlice])

    // useEffect(() => {
    //     // Set the initial state based on the current window width
    //     const updateGridTemplateAreas = () => {
    //         const customizerHome = document.querySelector(".customizer-home");
    //         if (customizerHome) {
    //             if (window.innerWidth < 1600) {
    //                 customizerHome.style.gridTemplateAreas = `
    //               "header header header"
    //               "primary-aux-sidebar primary-sidebar main"
    //         `;
    //                 customizerHome.style.gridTemplateColumns = `.175fr 1fr 4.5fr`;
    //                 setSecondarySidebar({
    //                     position: false,
    //                     visible: false
    //                 })

    //             } else {
    //                 customizerHome.style.gridTemplateAreas = `
    //                     "header header header header"
    //                     "primary-aux-sidebar primary-sidebar main secondary-sidebar"
    //                   `;
    //                 customizerHome.style.gridTemplateColumns = ".175fr 1fr 3.5fr 1fr";
    //                 // customizerHome.style.gridTemplateAreas = `
    //                 //     "header header header header"
    //                 //     "primary-aux-sidebar primary-sidebar main"
    //                 //   `;
    //                 // customizerHome.style.gridTemplateColumns = `.175fr 1fr 4.5fr`;
    //                 setSecondarySidebar({
    //                     position: true,
    //                     visible: true
    //                 })
    //             }
    //         }
    //     };

    //     updateGridTemplateAreas();

    //     // Add event listener to handle window resize
    //     window.addEventListener("resize", updateGridTemplateAreas);

    //     // Cleanup event listener on component unmount
    //     return () => {
    //         window.removeEventListener("resize", updateGridTemplateAreas);
    //     };
    // }, [window.innerWidth]);

    return (
        <>
            {
                (storeCurrentStatus == 0)
                    ?
                    <Loader />
                    :
                    (storeCurrentStatus == 1) &&
                    <div className={`customizer-home ${headerData == "desktop" ? "desktop" : headerData == "mobile" ? "mobile" : headerData == "fullscreen" ? "fullscreen" : "desktop"}`}>
                        <Header />
                        <PrimaryAuxSidebar />
                        <PrimarySidebar />
                        <Main />
                        <SecondarySidebar secondarySidebar={secondarySidebar} />
                    </div >
            }
        </>
    )
}

export default Index
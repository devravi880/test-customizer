import React, { useContext, useEffect, useRef, useState } from 'react'
import { Sketch } from '@uiw/react-color';
import { Accordion, AccordionContext, Button, ButtonGroup, Card, Dropdown, ListGroup, Spinner, useAccordionButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { borderStyleList, colorsTempData, fontList, defaultSections, socialLinks, textAlign, sampleHeaderSectionsDropdown, sampleTemplateSectionsDropdown, iconsList } from '../../Data/localData';
import { storePrimarySideBar } from '../../Store/Slices/Customizer/primarySideBarSlice';
import { debounce } from 'lodash';
import { RangeSlider, SelectColor, SelectDropdown } from '../../Components/Customizer/TypeBase';
import axios from 'axios';
import { frontEnd_API, header, headerImage, SERVER_URL } from '../../Config/config';
import { addStore } from '../../Store/Slices/storeSlice';
import { toast } from 'react-toastify';
import { RiArrowRightSFill } from 'react-icons/ri';
import { TiArrowSortedUp } from 'react-icons/ti';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { arrayMove, List } from 'react-movable';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { storeSecondarySideBar } from '../../Store/Slices/Customizer/secondarySideBarSlice';
import { primarySectionsSlice, storePrimarySections } from '../../Store/Slices/Customizer/primarySectionsSlice';
import { LuCirclePlus } from 'react-icons/lu';
import Swal from 'sweetalert2';

function PrimarySidebar() {
    const primaryAuxSideBar = useSelector((state) => state.primaryAuxSideBar.value);
    const primarySideBar = useSelector((state) => state.primarySideBar.value);
    const primarySections = useSelector((state) => state.primarySections.value);
    const secondarySideBar = useSelector((state) => state.secondarySideBar.value);
    const headerSlice = useSelector((state) => state.header.value);
    const [headerPage, setHeaderPage] = useState(headerSlice.find((item) => item?.title == "activePage"))
    const storeData = useSelector((state) => state.store.value);
    const [formData, setFormData] = useState(storeData);
    const [err, setErr] = useState({});
    const [newLogo, setNewLogo] = useState(null);
    const [favicon, setFavicon] = useState(null);
    const [socialLinksList, setsocialLinksList] = useState([]);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const [primarySection, setPrimarySection] = useState(defaultSections);
    const [openAccordions, setOpenAccordions] = useState({});

    const handleColorChange = debounce((color, index) => {
        const newData = {
            ...primarySideBar,
            data: primarySideBar?.data.map((subItem) => {
                if (subItem?.value == "colors") {
                    return {
                        ...subItem,
                        data: subItem?.data.map((petaItem, petaIndex) => {
                            if (index == petaIndex) {
                                return (
                                    {
                                        ...petaItem,
                                        value: color.hex
                                    }
                                )
                            } else {
                                return { ...petaItem }
                            }
                        })
                    }
                } else {
                    return { ...subItem }
                }
            })
        }
        dispatch(storePrimarySideBar({ ...newData }));
    }, 0);

    const handleSelect = ({ data, compareWith, subCompareWith, index }) => {
        console.log("primaryAuxSideBar::", primarySideBar);
        const newData = {
            ...primarySideBar,
            data: primarySideBar.data.map((subItem) => {
                if (subItem?.value == compareWith) {
                    return {
                        ...subItem,
                        data: subItem?.data.map((petaItem, petaIndex) => {
                            if (petaItem?.value == subCompareWith) {
                                return (
                                    {
                                        ...petaItem,
                                        data: petaItem?.data.map((tempItem, tempIndex) => {
                                            if (index == tempIndex) {
                                                return (
                                                    {
                                                        ...tempItem,
                                                        ...data
                                                    }
                                                )
                                            } else {
                                                return ({ ...tempItem })
                                            }
                                        })
                                    }
                                )
                            } else {
                                return { ...petaItem }
                            }
                        })
                    }
                } else {
                    return { ...subItem }
                }
            })
        }

        dispatch(storePrimarySideBar({ ...newData }));
    }

    const handleInputChange = (val) => {

        delete err[val?.name];
        const { validation } = val;

        // For Chacking Required value
        if (val?.pattern || val?.required) {
            if (val?.required && val?.value?.length <= 0) {
                err[val?.name] = `${val?.name} is required`
            }

            if (val?.pattern && val?.value?.length > 0) {
                const patternCheck = new RegExp(val?.pattern);
                if (!patternCheck.test(val?.value))
                    err[val?.name] = `Invalid pattern for ${val?.name}`;
            }
        }

        const { name, value } = val;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))

        if (name == "shortDescription") {
            if (value && value?.toString().length > 300) {
                setErr((prevData) => ({
                    ...prevData,
                    [name]: "Enter max 300 character in short description"
                }))
            }
        }

        if (val?.file) {
            const fileType = val?.file?.type;
            const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/svg+xml'];

            if (!allowedTypes.includes(fileType)) {
                setErr({ logo: 'Only PNG, JPG, JPEG, WEBP, and SVG files are allowed.' });

                if (name == 'logo') {
                    setNewLogo(null)
                }

                setFormData((prevData) => ({
                    ...prevData,
                    [name]: null
                }))
            } else if (validation) {

                console.log("validation::", validation);
                console.log("val?.all::", val?.all);

                const file = val?.all?.target?.files[0];
                const img = new Image();
                const reader = new FileReader();

                reader.onload = (e) => {
                    img.src = e.target.result;


                    img.onload = () => {
                        console.log("img.width", img.width, img.height)
                        if (img.width > validation?.width || img.height > validation?.height) {
                            setErr({ favicon: `Logo must be less then ${validation?.height} x ${validation?.width} pixels.` });

                            setFormData((prevData) => ({
                                ...prevData,
                                [name]: null
                            }))
                        } else {
                            if (name == 'favicon') {
                                setFavicon(val?.file)
                            }

                            setFormData((prevData) => ({
                                ...prevData,
                                [name]: val?.file
                            }))
                        }
                    };
                };

                reader.readAsDataURL(file);

            } else {
                if (name == 'logo') {
                    setNewLogo(val?.value)
                }

                setFormData((prevData) => ({
                    ...prevData,
                    [name]: val?.file
                }))
            }
        }
    }

    const getStoreSocialLinks = async () => {
        try {

            const { data } = await axios.put(frontEnd_API?.getSocialLinks, {}, header)
            const newData = socialLinks.map((item) => {
                const tempData = data?.data.find((temp) => temp?.icon == item?.value)
                if (tempData) {
                    return { ...item, ...tempData }
                } else {
                    return { ...item }
                }
            })
            console.log("data?.data::", data?.data);
            setsocialLinksList([...newData]);
        } catch (error) {
            console.error("error::", error);
        }
    }

    const handleSocialSubmit = async () => {
        try {
            const tempData = socialLinksList.filter((item) => { if (item?.link && item?.link != "") return { icon: item?.icon, link: item?.link } });
            const { data } = await axios.post(frontEnd_API?.socialLinksSubmit, { data: tempData }, header)
            console.log("data::", data);
            const newStoreData = {
                ...storeData,
                storeSocialData: tempData
            }
            dispatch(addStore(newStoreData))
            toast.success('Store links updated successfully!');
            getStoreSocialLinks();
            setLoader(false);
        } catch (error) {
            console.error("error::", error);
            toast.error(error?.message ?? "Error occurs!");
            setLoader(false);
        }
    }

    const handleStoreDetailSubmit = async () => {
        try {
            const sendData = {
                name: formData?.name,
                shortDescription: formData?.shortDescription,
                logo: formData?.logo,
                favicon: formData?.favicon,
            }

            const { data } = await axios.put(frontEnd_API?.updateStore, { ...sendData }, headerImage)
            console.log("data::", data);

            const newStoreData = {
                ...storeData,
                name: data?.data?.name,
                shortDescription: data?.data?.shortDescription,
                logo: data?.data?.logo,
                fevicon: data?.data?.fevicon,
            }
            dispatch(addStore(newStoreData))
            toast.success('Store details updated successfully!');
            setLoader(false);
        } catch (error) {
            console.error("error::", error);
            toast.error(error?.message ?? "Error occurs!");
            setLoader(false);
        }
    }

    useEffect(() => {
        getStoreSocialLinks();
    }, [])

    useEffect(() => {
        setHeaderPage(headerSlice.find((item) => item?.title == "activePage"))
    }, [headerSlice])

    const CustomToggleButton = ({ eventKey, children, isDisabled }) => {
        const isOpen = openAccordions[eventKey];
        return (
            <button
                type="button"
                disabled={isDisabled}
                className={`toggle-btn ${isOpen ? 'active' : ''} ${isDisabled ? "bg-transparent" : ""}`}
                onClick={() => toggleAccordion(eventKey)}
            >
                <MdKeyboardArrowUp />
                {children}
            </button>
        );
    };

    const handleDraggingEnd = ({ oldIndex, newIndex, section }) => {

        // Wrap the heavy computation in a Promise
        const processDragging = () => {
            return new Promise((resolve) => {
                let updatedData;

                const updatedSection = primarySection?.find((item) => item?.value == section)?.data;
                updatedData = arrayMove(updatedSection, oldIndex, newIndex);

                resolve(updatedData); // Resolve the updated data
            });
        };

        processDragging()
            .then((updatedData) => {
                // Update state with the processed data
                const newData = primarySection.map((item) => {
                    if (item?.value == section) {
                        return {
                            ...item,
                            data: updatedData
                        }
                    } else {
                        return { ...item }
                    }
                })
                setPrimarySection(newData);
                dispatch(storePrimarySections(newData))
            })
            .catch((error) => {
                console.error("Error while processing dragging:", error);
            });
    };

    const toggleAccordion = (index) => {
        setOpenAccordions((prevState) => ({
            ...prevState,
            [index]: !prevState[index], // Toggle the current index
        }));
    };

    const falseAccordion = (index) => {
        setOpenAccordions((prevState) => ({
            ...prevState,
            [index]: false, // Toggle the current index
        }));
    };

    const handleSubCategorySidebar = (data) => {
        dispatch(storeSecondarySideBar({
            position: false,
            visible: true,
            data,
        }))
    }

    function generateUniqueId() {
        const timestamp = Date.now().toString().slice(-7); // Last 7 digits of the timestamp
        const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit random number
        const combine = timestamp + randomNum
        return Number(combine); // Concatenate to make a 10-digit ID
    }

    useEffect(() => {
        if (primarySections?.length > 0) {
            setPrimarySection([...primarySections])
        }
    }, [primarySections])

    const handleAddSection = ({ data, section }) => {
        const findLabelLength = primarySection?.length > 0 ? primarySection.find((temp) => temp?.value == section)?.data.filter((newTemp) => newTemp?.value == data?.value)?.length : 0;
        let newLabel = `${data?.label}${findLabelLength != 0 ? ` ${findLabelLength}` : ''}`
        const newCheck = primarySection?.length > 0 ? primarySection.find((temp) => temp?.value == section)?.data.filter((newTemp) => newTemp?.label == newLabel)?.length : 0
        if (newCheck > 0) {
            newLabel = `${data?.label}${findLabelLength != 0 ? ` ${findLabelLength + newCheck}` : ''}`
        }

        const newData = primarySection.map((item) => {
            if (item?.value == section) {
                return {
                    ...item,
                    data: [
                        ...item?.data,
                        {
                            ...data,
                            label: newLabel,
                            data: data?.data.map((subItem) => {
                                return {
                                    ...subItem,
                                    id: data?.id ?? generateUniqueId()
                                }
                            })
                        }
                    ]
                }
            } else {
                return { ...item }
            }
        })

        setPrimarySection(newData);
        dispatch(storePrimarySections(newData))
    }

    const handleAddSubSection = ({ data, section }) => {

        const newData = primarySection.map((item) => {
            if (item?.value == section) {
                return {
                    ...item,
                    data: item?.data.map((subItem) => {
                        if (subItem?.label == data?.label) {
                            return {
                                ...subItem,
                                data: [
                                    ...subItem?.data,
                                    {
                                        ...data?.data[0],
                                        id: generateUniqueId()
                                    }
                                ]
                            }
                        } else {
                            return { ...subItem }
                        }
                    })
                }
            } else {
                return { ...item }
            }
        })

        setPrimarySection(newData);
        dispatch(storePrimarySections(newData))
    }

    const handleDeleteSection = ({ data, section }) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to remove the ${data?.label}?`,
            showCancelButton: true,
            confirmButtonText: "Remove",
            confirmButtonColor: "#dc3545",
            cancelButtonText: "Cancel",
            cancelButtonColor: "#6c757d",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // Swal.fire("Saved!", "", "success");
                const newData = primarySection.map((item) => {
                    if (item?.value == section) {
                        return {
                            ...item,
                            data: item?.data?.filter((subItem) => subItem?.label !== data?.label)
                        }
                    } else {
                        return { ...item }
                    }
                })
                setPrimarySection(newData);
                dispatch(storePrimarySections(newData))
            }
        });
    }

    const handleDeleteSubSection = ({ data, subData, section }) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to remove the "${subData?.label}?"`,
            showCancelButton: true,
            confirmButtonText: "Remove",
            confirmButtonColor: "#dc3545",
            cancelButtonText: "Cancel",
            cancelButtonColor: "#6c757d",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // Swal.fire("Saved!", "", "success");
                const newData = primarySection.map((item) => {
                    if (item?.value == section) {
                        return {
                            ...item,
                            data: item?.data?.map((subItem) => {
                                if (subItem?.label == data?.label) {
                                    return {
                                        ...subItem,
                                        data: subItem?.data.filter((state) => state?.id !== subData?.id)
                                    }
                                } else {
                                    return { ...subItem }
                                }
                            })
                        }
                    } else {
                        return { ...item }
                    }
                })
                setPrimarySection(newData);
                dispatch(storePrimarySections(newData))
            }
        });
    }

    const handleVisibleSection = ({ data, section }) => {
        // Swal.fire("Saved!", "", "success");
        const newData = primarySection.map((item) => {
            if (item?.value == section) {
                return {
                    ...item,
                    data: item?.data?.map((subItem) => {
                        if (subItem?.label == data?.label) {
                            return {
                                ...subItem,
                                isVisible: subItem?.isVisible == 0 ? 1 : 0
                            }
                        } else {
                            return { ...subItem }
                        }
                    })
                }
            } else {
                return { ...item }
            }
        })
        setPrimarySection(newData);
        dispatch(storePrimarySections(newData))

    }

    const handleVisibleSubSection = ({ data, subData, section }) => {
        // Swal.fire("Saved!", "", "success");
        // console.log("subData::", subData);

        const newData = primarySection.map((item) => {
            if (item?.value == section) {
                return {
                    ...item,
                    data: item?.data?.map((subItem) => {
                        if (subItem?.label == data?.label) {
                            return {
                                ...subItem,
                                data: subItem?.data?.map((state) => {
                                    if (state?.id == subData?.id) {
                                        console.log("state?.id::", state?.id);

                                        return {
                                            ...state,
                                            isVisible: state?.isVisible == 0 ? 1 : 0
                                        }
                                    } else {
                                        return { ...state }
                                    }
                                })
                            }
                        } else {
                            return { ...subItem }
                        }
                    })
                }
            } else {
                return { ...item }
            }
        })
        setPrimarySection(newData);
        dispatch(storePrimarySections(newData))

    }

    return (
        <aside className='customizer-home-primary-sidebar' id="primary-sidebar">
            <div className='customizer-home-primary-sidebar-scroll'>
                {
                    (primaryAuxSideBar?.value == "sections") &&
                    <div className='d-grid'>
                        <div className='d-grid'>
                            <h5 className='px-3 m-0 py-2'>{headerPage?.label}</h5>
                            <hr className='mt-1 mb-0' />
                        </div>
                        {
                            primarySection?.length > 0 &&
                            primarySection.map((item, mainIndex) => {
                                return (
                                    <div key={mainIndex} className={`py-2 px-3 sections-menu ${((primarySection?.length - 1) == mainIndex) ? "" : "border-bottom"}`}>
                                        <h6>{item?.label}</h6>
                                        <Accordion className='sections-menu-accordion d-grid gap-0'>

                                            <Card>
                                                <ListGroup variant="flush" className="d-grid gap-2 custom-list-items-container">
                                                    <List
                                                        values={item?.data}
                                                        onChange={(e) => {
                                                            handleDraggingEnd({ ...e, section: item?.value });
                                                        }} // Parent dragging handler
                                                        renderList={({ children, props }) => (
                                                            <ListGroup variant="flush" {...props} className="d-grid gap-0">
                                                                {children}
                                                            </ListGroup>
                                                        )}
                                                        renderItem={({ value, props, isDragged, index }) => (
                                                            <ListGroup.Item
                                                                className={`p-0 ${isDragged ? 'dragging' : ''}`}
                                                                key={index}
                                                                {...props}
                                                            >
                                                                <Card>
                                                                    <Card.Header
                                                                        className="flex-between-align gap-2 fs-14"
                                                                        onMouseDown={(e) => {
                                                                            // Prevent dragging from non-draggable elements
                                                                            if (!e.target.classList.contains('custom-btn') && !e.target.classList.contains('custom-icon')) {
                                                                                e.stopPropagation();
                                                                            }
                                                                        }}
                                                                    >
                                                                        <div className="flex-align gap-2">
                                                                            {
                                                                                value?.data?.length > 0 &&
                                                                                <CustomToggleButton eventKey={`${mainIndex}-${index}`} isDisabled={value?.data?.length === 0} />
                                                                            }
                                                                            <span
                                                                                className="drag-btn custom-btn"
                                                                                onMouseDown={() => falseAccordion(index)}
                                                                                style={{ marginLeft: value?.data?.length > 0 ? "0px" : "30px" }}
                                                                            >
                                                                                <PiDotsSixVerticalBold className="drag-icon custom-icon" />
                                                                            </span>
                                                                            <button className="bg-transparent border-none p-0 text-start" onClick={() => {
                                                                                handleSubCategorySidebar({ section: item?.value, data: value, })
                                                                            }}>
                                                                                {value?.label}
                                                                            </button>
                                                                        </div>
                                                                        <div className="flex-align gap-2">
                                                                            {
                                                                                (value?.isDeletable == 0) &&
                                                                                <button
                                                                                    className="common-btn"
                                                                                    onClick={() => {
                                                                                        handleDeleteSection({
                                                                                            data: { ...value },
                                                                                            section: item?.value
                                                                                        })
                                                                                    }}
                                                                                >
                                                                                    <FaTrash />
                                                                                </button>
                                                                            }
                                                                            <button
                                                                                className="common-btn"
                                                                                onClick={() => {
                                                                                    handleVisibleSection({
                                                                                        data: { ...value },
                                                                                        section: item?.value
                                                                                    })
                                                                                }}
                                                                            >
                                                                                {value?.isVisible === 0 ? <FiEye /> : <FiEyeOff />}
                                                                            </button>
                                                                        </div>
                                                                    </Card.Header>
                                                                    {value?.data?.length > 0 && (
                                                                        <Accordion.Collapse eventKey={`${mainIndex}-${index}`} in={!!openAccordions[`${mainIndex}-${index}`]}>
                                                                            <Card.Body className="py-2 px-4">
                                                                                {/* Nested List */}
                                                                                {
                                                                                    value?.data.map((subValue, subIndex) => {
                                                                                        return (
                                                                                            <Card key={subIndex}>
                                                                                                <Card.Header
                                                                                                    className="flex-between-align gap-2 fs-14"
                                                                                                >
                                                                                                    <div className="flex-align gap-2">
                                                                                                        <span className="drag-btn" onMouseDown={() => falseAccordion(index)}>
                                                                                                            <PiDotsSixVerticalBold className="drag-icon" />
                                                                                                        </span>
                                                                                                        <button
                                                                                                            className="bg-transparent border-none p-0"
                                                                                                            onClick={() => {
                                                                                                                handleSubCategorySidebar({
                                                                                                                    section: item?.value,
                                                                                                                    data: value,
                                                                                                                    subData: subValue,
                                                                                                                })
                                                                                                            }}
                                                                                                        >{
                                                                                                                subValue?.label?.length > 12
                                                                                                                    ? subValue?.label.toString().slice(0, 12) + '...'
                                                                                                                    : subValue?.label
                                                                                                            }
                                                                                                        </button>
                                                                                                    </div>
                                                                                                    <div className="flex-align gap-2">
                                                                                                        {
                                                                                                            (subValue?.isDeletable == 0 && value?.data?.length !== 1) &&
                                                                                                            <button
                                                                                                                className="common-btn"
                                                                                                                onClick={(e) => {
                                                                                                                    e.stopPropagation();
                                                                                                                    handleDeleteSubSection({
                                                                                                                        data: { ...value },
                                                                                                                        subData: { ...subValue },
                                                                                                                        section: item?.value
                                                                                                                    })
                                                                                                                }}
                                                                                                            >
                                                                                                                <FaTrash />
                                                                                                            </button>
                                                                                                        }
                                                                                                        {
                                                                                                            (value?.data?.length !== 1) &&
                                                                                                            <button
                                                                                                                className="common-btn"
                                                                                                                onClick={(e) => {
                                                                                                                    e.stopPropagation();
                                                                                                                    handleVisibleSubSection({
                                                                                                                        data: { ...value },
                                                                                                                        subData: { ...subValue },
                                                                                                                        section: item?.value
                                                                                                                    })
                                                                                                                }}
                                                                                                            >
                                                                                                                {subValue?.isVisible === 0 ? <FiEye /> : <FiEyeOff />}
                                                                                                            </button>
                                                                                                        }
                                                                                                    </div>
                                                                                                </Card.Header>
                                                                                            </Card>
                                                                                        )
                                                                                    })
                                                                                }
                                                                                <Dropdown className='w-100 custom-add-section-btn'>
                                                                                    <Dropdown.Toggle className='w-100 border-none' id="dropdown-basic">
                                                                                        <div
                                                                                            className="flex-between-align gap-2 fs-14 cursor w-100"
                                                                                            style={{ paddingLeft: "34px" }}
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                handleAddSubSection({ data: { ...value }, section: item?.value })
                                                                                            }}
                                                                                        >
                                                                                            <div className="flex-align gap-2 w-100">
                                                                                                <div className="bg-transparent border-none p-0 flex-align text-info">
                                                                                                    <LuCirclePlus />
                                                                                                </div>
                                                                                                <div
                                                                                                    className="bg-transparent border-none p-0 text-info"
                                                                                                >
                                                                                                    Add section
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Dropdown.Toggle>
                                                                                </Dropdown>
                                                                            </Card.Body>
                                                                        </Accordion.Collapse>
                                                                    )}
                                                                </Card>
                                                            </ListGroup.Item>
                                                        )}
                                                    />
                                                </ListGroup>
                                            </Card>
                                            {
                                                // ["header", "footer"].includes(item?.value) &&
                                                <Dropdown className='w-100 custom-add-section-btn'>
                                                    <Dropdown.Toggle className='w-100 border-none' id="dropdown-basic">
                                                        <div
                                                            className="flex-between-align gap-2 fs-14 cursor"
                                                            style={{ paddingLeft: "34px" }}
                                                        >
                                                            <div className="flex-align gap-2 w-100">
                                                                <div className="bg-transparent border-none p-0 flex-align text-info">
                                                                    <LuCirclePlus />
                                                                </div>
                                                                <div
                                                                    className="bg-transparent border-none p-0 text-info"
                                                                >
                                                                    Add section
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className='w-100'>
                                                        {
                                                            ["header", "footer"].includes(item?.value) &&
                                                            sampleHeaderSectionsDropdown.map((subItem, subIndex) => {
                                                                const icon = iconsList.find((state) => state?.label === subItem?.value)?.value
                                                                return (
                                                                    <Dropdown.Item
                                                                        key={subIndex}
                                                                        onClick={() => handleAddSection({ data: { ...subItem }, section: item?.value })}
                                                                        className='flex-align gap-2'
                                                                    >
                                                                        <span className='fs-14'>{icon}</span>
                                                                        {subItem?.label}
                                                                    </Dropdown.Item>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            ["template"].includes(item?.value) &&
                                                            sampleTemplateSectionsDropdown.map((subItem, subIndex) => {
                                                                const icon = iconsList.find((state) => state?.label === subItem?.value)?.value
                                                                return (
                                                                    <Dropdown.Item
                                                                        key={subIndex}
                                                                        onClick={() => handleAddSection({ data: { ...subItem }, section: item?.value })}
                                                                        className='flex-align gap-2'
                                                                    >
                                                                        <span className='fs-14'>{icon}</span>
                                                                        {subItem?.label}
                                                                    </Dropdown.Item>
                                                                )
                                                            })
                                                        }
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            }
                                        </Accordion>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {
                    (primaryAuxSideBar?.value == "color-palette") &&
                    <Accordion defaultActiveKey={0}>
                        {
                            primarySideBar?.data.map((item, index) => {
                                return (
                                    <Accordion.Item eventKey={index} key={index}>
                                        <Accordion.Header>{item?.label}</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='d-grid gap-3 color-list'>
                                                {
                                                    item?.data?.length > 0 &&
                                                    item?.data.map((subItem, subIndex) => {
                                                        return (
                                                            <div
                                                                key={subIndex}
                                                                className={`${["multiFields"].includes(subItem?.type) ? "d-grid" : "flex-align"} color-items gap-2`}
                                                            >
                                                                <span className={`${["multiFields"].includes(subItem?.type) ? "w-100 pb-2 fw-semibold" : "w-50"} fs-14 fs-xxl-12 cusrsor-default`}>{subItem?.label}</span>
                                                                <div className={`${["multiFields"].includes(subItem?.type) ? "w-100" : "w-50"} `}>

                                                                    {
                                                                        subItem?.type == "color" &&
                                                                        <SelectColor
                                                                            color={subItem}
                                                                            onChange={(color) => {
                                                                                handleColorChange(color, subIndex)
                                                                            }}
                                                                        />
                                                                    }
                                                                    {
                                                                        ["multiFields"].includes(subItem?.type) &&
                                                                        <div className='d-grid gap-3'>
                                                                            {
                                                                                subItem?.data?.length > 0 &&
                                                                                subItem?.data.map((petaItem, petaIndex) => {
                                                                                    return (
                                                                                        <span key={petaIndex}>
                                                                                            {
                                                                                                (petaItem?.type === "select") &&
                                                                                                <SelectDropdown
                                                                                                    key={petaIndex}
                                                                                                    data={
                                                                                                        (petaItem?.dataType == "font-family")
                                                                                                            ? fontList
                                                                                                            : (petaItem?.dataType == "border-style")
                                                                                                                ? borderStyleList
                                                                                                                : (petaItem?.dataType == "text-align")
                                                                                                                    ? textAlign
                                                                                                                    : []
                                                                                                    }
                                                                                                    title={petaItem?.title}
                                                                                                    selectedData={petaItem}
                                                                                                    dataType={petaItem?.dataType}
                                                                                                    onSelect={(getItem) => {
                                                                                                        handleSelect({
                                                                                                            data: getItem,
                                                                                                            compareWith: item?.value,
                                                                                                            subCompareWith: subItem?.value,
                                                                                                            index: petaIndex,
                                                                                                        })
                                                                                                    }}
                                                                                                />
                                                                                            }
                                                                                            {
                                                                                                (petaItem?.type === "slider") &&
                                                                                                <RangeSlider
                                                                                                    key={petaIndex}
                                                                                                    title={petaItem?.title}
                                                                                                    selectedData={petaItem}
                                                                                                    onSelect={(getItem) => {
                                                                                                        handleSelect({
                                                                                                            data: getItem,
                                                                                                            compareWith: item?.value,
                                                                                                            subCompareWith: subItem?.value,
                                                                                                            index: petaIndex,
                                                                                                        })
                                                                                                    }}
                                                                                                />
                                                                                            }
                                                                                            {
                                                                                                (petaItem?.type == "color") &&
                                                                                                <SelectColor
                                                                                                    color={petaItem}
                                                                                                    onChange={(getItem) => {
                                                                                                        // handleSelect({color, petaIndex})
                                                                                                        handleSelect({
                                                                                                            data: {
                                                                                                                label: petaItem?.label,
                                                                                                                value: getItem?.hex,
                                                                                                            },
                                                                                                            compareWith: item?.value,
                                                                                                            subCompareWith: subItem?.value,
                                                                                                            index: petaIndex,
                                                                                                        })
                                                                                                    }}
                                                                                                />
                                                                                            }
                                                                                        </span>
                                                                                    )
                                                                                })
                                                                            }
                                                                            {
                                                                                ((item?.data?.length - 1) > subIndex) &&
                                                                                <hr className='my-1' />
                                                                            }
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            })
                        }
                    </Accordion>
                }
                {
                    (primaryAuxSideBar?.value == "theme-settings") &&
                    <Accordion defaultActiveKey={0} className='main-theme-settings'>

                        {/* Store Details */}
                        <Accordion.Item eventKey={0}>
                            <Accordion.Header>Store Details</Accordion.Header>
                            <Accordion.Body>
                                <div className='d-grid gap-3 main-theme-store-details'>
                                    <label htmlFor="name" className='d-grid gap-1'>
                                        <span className='fs-14'>Store name</span>
                                        <input
                                            type="text"
                                            id='name'
                                            name='name'
                                            className='w-100 p-2'
                                            placeholder='enter store name'
                                            value={formData?.name}
                                            onChange={(e) => handleInputChange({ name: e.target.name, value: e.target.value })}
                                        />
                                    </label>
                                    <label htmlFor="shortDescription" className='d-grid gap-1'>
                                        <span className='fs-14'>Store description</span>
                                        <textarea
                                            name="shortDescription"
                                            id="shortDescription"
                                            className='fs-14'
                                            value={formData?.shortDescription}
                                            rows={4}
                                            onChange={(e) => handleInputChange({ name: e.target.name, value: e.target.value })}
                                        />
                                        <div className='d-flex w-100 justify-content-between'>
                                            <span className='fs-12 text-danger fw-bold fs-sm-10 custom-span-height'>{err?.shortDescription}</span>
                                            <span className='fs-12 text-secondary text-end fw-bold fs-sm-10 custom-span-height'>
                                                {formData?.shortDescription?.toString().length ?? 0}/300
                                            </span>
                                        </div>
                                    </label>
                                    <div className='d-flex gap-2'>
                                        <Button
                                            variant='secondary'
                                            className='w-100 py-1 fs-14 fw-semibold'
                                            disabled={(storeData?.name == formData?.name && storeData?.shortDescription == formData?.shortDescription)}
                                            onClick={() => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    name: storeData?.name,
                                                    shortDescription: storeData?.shortDescription,
                                                }))
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant='success'
                                            className='w-100 py-1 fs-14 fw-semibold'
                                            disabled={
                                                loader ||
                                                (Object.values(err)?.length !== 0) ||
                                                (storeData?.name == formData?.name && storeData?.shortDescription == formData?.shortDescription)
                                            }
                                            onClick={() => {
                                                setLoader(true);
                                                handleStoreDetailSubmit()
                                            }}
                                        >
                                            {
                                                loader
                                                    ? <Spinner animation="border" size="sm" />
                                                    : "Update"
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Store Logo */}
                        <Accordion.Item eventKey={1}>
                            <Accordion.Header>Store Logo</Accordion.Header>
                            <Accordion.Body>
                                <div className='d-grid gap-3'>
                                    <div className='d-grid custom-img-selector'>
                                        <label htmlFor="logo" className='width-fit pointer'>
                                            <span className='fs-14'>Logo</span>
                                            {
                                                (storeData?.logo)
                                                    ? <div className='custom-img'>
                                                        <img src={
                                                            newLogo
                                                                ? URL.createObjectURL(newLogo)
                                                                : storeData?.logo
                                                        } alt="" />
                                                    </div>
                                                    : <div className='custom-img'>
                                                        <i className="bi bi-image fs-40" />
                                                    </div>
                                            }
                                        </label>
                                        <input
                                            type="file"
                                            // value={storeData?.logo}
                                            name='logo'
                                            id='logo'
                                            className={(err?.logo && !storeData?.logo) && 'border-red'}
                                            onChange={(e) => {
                                                handleInputChange({ name: 'logo', file: e.target.files[0] });
                                                setNewLogo(e.target.files[0])
                                            }}
                                            required={true}
                                            accept=".png, .jpg, .jpeg, .webp, .svg"
                                            autoComplete='off' />
                                        <span className='fs-12 text-danger fw-bold fs-sm-10 custom-span-height flex-between-align'>{err?.logo}</span>
                                    </div>
                                    <div className='d-grid custom-img-selector width-fit'>
                                        <label htmlFor="favicon" className='width-fit pointer'>
                                            <span className='fs-14'>Favicon</span>
                                            {
                                                (storeData?.favicon)
                                                    ? <div className='custom-img'>
                                                        <img src={
                                                            favicon
                                                                ? URL.createObjectURL(favicon)
                                                                : storeData?.favicon
                                                        } alt="" />
                                                    </div>
                                                    : <div className='custom-img'>
                                                        <i className={`bi bi-image fs-40 half-border-rad ${err?.favicon ? "border border-danger" : ""}`} />
                                                    </div>
                                            }
                                        </label>
                                        <input
                                            type="file"
                                            name='favicon'
                                            id='favicon'
                                            className={(err?.favicon && !storeData?.favicon) && 'border-red'}
                                            onChange={(e) => {
                                                handleInputChange({ name: 'favicon', file: e.target.files[0], validation: { height: 256, width: 256 }, all: e })
                                                setFavicon(e.target.files[0])
                                            }}
                                            required={true}
                                            accept=".png, .jpg, .jpeg, .webp, .svg"
                                            autoComplete='off' />
                                        <span className='fs-12 text-danger fw-bold fs-sm-10 custom-span-height flex-between-align'>{err?.favicon}</span>
                                    </div>
                                    <div className='d-flex gap-2'>
                                        <Button
                                            variant='secondary'
                                            className='w-100 py-1 fs-14 fw-semibold'
                                            disabled={(storeData?.logo == formData?.logo && storeData?.favicon == formData?.favicon)}
                                            onClick={() => {
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    logo: storeData?.logo,
                                                    favicon: storeData?.favicon,
                                                }))
                                                setFavicon(null)
                                                setNewLogo(null)
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant='success'
                                            className='w-100 py-1 fs-14 fw-semibold'
                                            disabled={
                                                loader ||
                                                (Object.values(err)?.length !== 0) ||
                                                (storeData?.logo == formData?.logo && storeData?.favicon == formData?.favicon)
                                            }
                                            onClick={() => {
                                                setLoader(true);
                                                handleStoreDetailSubmit()
                                            }}
                                        >
                                            {
                                                loader
                                                    ? <Spinner animation="border" size="sm" />
                                                    : "Update"
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Social Media */}
                        <Accordion.Item eventKey={2}>
                            <Accordion.Header>Social Media</Accordion.Header>
                            <Accordion.Body>
                                <div className='d-grid gap-3 main-theme-store-details'>
                                    {
                                        socialLinksList.map((item, index) => {
                                            return (
                                                <label key={index} htmlFor={item?.value} className='d-grid gap-1'>
                                                    <span className='fs-14'>{item?.label}</span>
                                                    <input
                                                        type="text"
                                                        id={item?.value}
                                                        name={item?.label}
                                                        className='w-100 px-2 py-1'
                                                        placeholder={`enter your ${item?.value} link`}
                                                        value={item?.link ?? ""}
                                                        onChange={(e) => {
                                                            setsocialLinksList((prevList) =>
                                                                prevList.map((linkItem, idx) =>
                                                                    idx === index
                                                                        ? { ...linkItem, link: e.target.value, icon: item?.value }
                                                                        : linkItem
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </label>
                                            )
                                        })
                                    }
                                    <div className='d-flex gap-2'>
                                        <Button
                                            variant='secondary'
                                            className='w-100 py-1 fs-14 fw-semibold'
                                            onClick={() => {
                                                getStoreSocialLinks();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant='success'
                                            className='w-100 py-1 fs-14 fw-semibold'
                                            onClick={() => {
                                                setLoader(true);
                                                handleSocialSubmit()
                                            }}
                                            disabled={loader}
                                        >
                                            {
                                                loader
                                                    ? <Spinner animation="border" size="sm" />
                                                    : "Update"
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                }
            </div>
           
        </aside >
    )
}

export default PrimarySidebar
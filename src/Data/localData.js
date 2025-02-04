import { AiFillStar } from "react-icons/ai"
import { BiSolidCategory } from "react-icons/bi"
import { BsLayoutSidebarInset } from "react-icons/bs"
import { CiDesktop, CiMobile2 } from "react-icons/ci"
import { FaHome, FaShoppingBag, FaTshirt } from "react-icons/fa"
import { FaVideo } from "react-icons/fa6"
import { IoIosColorFill, IoMdImages, IoMdSettings } from "react-icons/io"
import { IoImageSharp } from "react-icons/io5"
import { MdCampaign, MdOutlineWidthFull, MdTextFields } from "react-icons/md"
import { TbSection } from "react-icons/tb"

const pagesList = [
    {
        icon: <FaHome />,
        label: "Home page",
        value: "home-page"
    },
    {
        icon: <BiSolidCategory />,
        label: "Category page",
        value: "category-page"
    },
    {
        icon: <FaTshirt />,
        label: "Product Detail page",
        value: "product-detail-page"
    }
]

const sizesList = [
    {
        icon: <CiDesktop />,
        label: "Desktop",
        value: "desktop"
    },
    {
        icon: <CiMobile2 />,
        label: "Mobile",
        value: "mobile"
    },
    {
        icon: <MdOutlineWidthFull />,
        label: "Fullscreen",
        value: "fullscreen"
    }
]

const tabList = [
    {
        icon: <TbSection />,
        label: "Sections",
        value: "sections",
    },
    {
        icon: <IoIosColorFill />,
        label: "Color Palatte",
        value: "color-palette",
    },
    {
        icon: <IoMdSettings />,
        label: "Store Details",
        value: "theme-settings",
    }
]

const colorsTempData = [
    {
        label: "Background Color",
        value: "#FFFFFF",
        varName: "pageBgColor"
    },
    {
        label: "Layout Color",
        value: "#F8F9FA",
        varName: "layoutBgColor"
    },
    {
        label: "Primary Color",
        value: "#000000",
        varName: "iconsColor"
    },
    {
        label: "Secondary Color",
        value: "#FFFFFF",
        varName: "iconsTextColor"
    },
    {
        label: "Text Color",
        value: "#000000",
        varName: "headTextColor"
    },
    {
        label: "Contrast Text Color",
        value: "#FFFFFF",
        varName: "bodyTextColor"
    },
    {
        label: "Button Color",
        value: "#000000",
        varName: "buttonColor"
    },
    {
        label: "Contrast Color",
        value: "#0000FF",
        varName: "contrastColor"
    },
]

const fontList = [
    {
        label: `System UI`,
        value: `system-ui, sans-serif`,
    },
    {
        label: `Courier New`,
        value: `'Courier New', Courier, monospace`
    },
    {
        label: `Consolas`,
        value: `'Consolas', 'Courier New', monospace`
    },
    {
        label: `Lucida Console`,
        value: `'Lucida Console', 'Courier New', monospace`
    },
    {
        label: `SF Mono`,
        value: `'SF Mono', 'Menlo', monospace`
    },
    {
        label: `Roboto Mono`,
        value: `'Roboto Mono', 'Droid Sans Mono', monospace`
    },
    {
        label: `Ubuntu Mono`,
        value: `'Ubuntu Mono', 'Courier New', monospace`
    },
    {
        label: `Arial`,
        value: `Arial, Helvetica, sans-serif`
    },
    {
        label: `Segoe UI`,
        value: `'Segoe UI', Tahoma, Geneva, sans-serif`
    },
    {
        label: `Trebuchet MS`,
        value: `'Trebuchet MS', Verdana, sans-serif`
    },
    {
        label: `Gill Sans`,
        value: `'Gill Sans', 'Gill Sans MT', sans-serif`
    },
    {
        label: `Times New Roman`,
        value: `'Times New Roman', Times, serif`
    },
    {
        label: `Georgia 'Times New Roman'`,
        value: `Georgia, 'Times New Roman', serif`
    },
    {
        label: `Palatino Linotype`,
        value: `'Palatino Linotype', 'Book Antiqua', Palatino, serif`
    }
]

const borderStyleList = [
    {
        label: 'None',
        value: 'none',
    },
    {
        label: 'Dotted',
        value: 'dotted',
    },
    {
        label: 'Dashed',
        value: 'dashed',
    },
    {
        label: 'Solid',
        value: 'solid',
    },
    {
        label: 'Double',
        value: 'double',
    },
    {
        label: 'Groove',
        value: 'groove',
    },
    {
        label: 'Ridge',
        value: 'ridge',
    },
    {
        label: 'Inset',
        value: 'inset',
    },
    {
        label: 'Outset',
        value: 'outset',
    },
];

const textAlign = [
    {
        label: 'Left',
        value: 'left',
    },
    {
        label: 'Center',
        value: 'center',
    },
    {
        label: 'Right',
        value: 'right',
    },
];

const tempHeader = [
    {
        title: "activePage",
        label: "Home page",
        value: "home-page",
        apiValue: "",
    },
    {
        title: "screenSize",
        label: "Desktop",
        value: "desktop",
    }
]

const sampleHeaderSectionsDropdown = [
    {
        label: "Announcement bar",
        value: "announcement-bar",
        type: "marquee", // marquee / slides
        duration: 2,
        isVisible: 0,
        isDeletable: 0,
        data: [
            {
                label: "Add your content",
                link: "",
                isVisible: 0,
                isDeletable: 0,
            },
        ]
    },
]

const sampleTemplateSectionsDropdown = [
    {
        label: "Slideshow",
        value: "slideshow",
        type: "md", // sm / md / lg
        // paginationType: "counter", // dots / counter / numbers
        animationType: "slide", // none / slide / fade
        isVisible: 0,
        isDeletable: 0,
        isAutoPlay: 1,
        autoPlaySpeed: 2,
        data: [
            {
                label: "Slide 1",
                image: "",
                link: "", //category name
                title: "",
                description: "",
                isVisible: 0,
                isDeletable: 0,
            }
        ]
    },
    {
        label: "Featured collection",
        value: "featured-collection",
        type: "Mens clothing", // category name
        isVisible: 0,
        isDeletable: 0,
        title: "Featured collection",
        description: "",
        desktopItems: 4,
        mobileItems: 2,
        data: []
    },
    {
        label: "Featured Product",
        value: "featured-product",
        type: "", // Product slug
        isVisible: 0,
        isDeletable: 0,
        data: []
    },
    {
        label: "Rich text",
        value: "rich-text",
        type: "center", // start / center / end
        isVisible: 0,
        isDeletable: 0,
        title: "Talk about your brand",
        tagline: "Add a tagline",
        description: "Share information about your brand with your customers. Describe a product, make announcements, or welcome customers to your store.",
        firstButtonText: "Sample button",
        firstButtonLink: "",
        secondButtonText: "",
        secondButtonLink: "",
        data: []
    },
    {
        label: "Image banner",
        value: "image-banner",
        type: "middle center", // top / middle / bottom --- left / center / right
        isVisible: 0,
        isDeletable: 0,
        imgSize: "4/2", // 5/2 4/2 4/3
        align: "center",  // start / center / end
        title: "Image Banner",
        description: "Share information about your brand with your customers.",
        image: "",
        firstButtonText: "Sample button",
        firstButtonLink: "",
        secondButtonText: "Sample button",
        secondButtonLink: "",
        data: []
    },
    {
        label: "Image with text",
        value: "image-with-text",
        type: "Image first", // Image first / Image second
        isVisible: 0,
        isDeletable: 0,
        desktopAlignV: "start",  // start / center / end
        desktopAlignH: "start",  // start / center / end
        mobileAlign: "center",  // start / center / end
        title: "Image Banner",
        description: "Share information about your brand with your customers.",
        image: "",
        buttonText: "Sample button",
        buttonLink: "",
        paddingTop: 16,
        paddingBottom: 16,
        data: []
    },
    {
        label: "Video",
        value: "video",
        video: "",
        type: "4/2", // 5/2 4/2 4/3
        isVisible: 0,
        isDeletable: 0,
        data: []
    },
]

const tempPrimarySidebar = {
    label: "Color Palatte",
    value: "color-palette",
    data: [
        {
            label: "Colors",
            value: "colors",
            data: [
                {
                    label: "Header & Footer background",
                    value: "#F8F9FA",
                    varName: "layoutBgColor",
                    type: "color"
                },
                {
                    label: "Page Background Color",
                    value: "#FFFFFF",
                    varName: "pageBgColor",
                    type: "color"
                },
                {
                    label: "Icons Color",
                    value: "#000000",
                    varName: "iconsColor",
                    type: "color"
                },
                {
                    label: "Icons Text Color",
                    value: "#FFFFFF",
                    varName: "iconsTextColor",
                    type: "color"
                },
                {
                    label: "Head Text Color",
                    value: "#000000",
                    varName: "headTextColor",
                    type: "color"
                },
                {
                    label: "Body Text Color",
                    value: "#000000",
                    varName: "bodyTextColor",
                    type: "color"
                },
                {
                    label: "MRP Text Color",
                    value: "#000000",
                    varName: "priceTextColor",
                    type: "color"
                },
                {
                    label: "Button Color",
                    value: "#000000",
                    varName: "buttonColor",
                    type: "color"
                },
                {
                    label: "Contrast Color",
                    value: "#0000FF",
                    varName: "contrastColor",
                    type: "color"
                },
                {
                    label: "Announcement bar background",
                    value: "#000000",
                    varName: "announcementBarBgColor",
                    type: "color"
                },
                {
                    label: "Announcement bar Text",
                    value: "#FFFFFF",
                    varName: "announcementBarTextColor",
                    type: "color"
                },
                {
                    label: "Announcement bar nav color",
                    value: "#FFFFFF",
                    varName: "announcementBarNavsColor",
                    type: "color"
                },
            ]
        },
        {
            label: "Typography",
            value: "typography",
            data: [
                {
                    label: "Headings",
                    value: "headings",
                    type: "multiFields",
                    data: [
                        {
                            title: "Font",
                            label: `System UI`,
                            value: `system-ui, sans-serif`,
                            varName: "headingsFontFamily",
                            type: "select",
                            dataType: "font-family"
                        },
                        {
                            title: "Font size scale",
                            label: `Courier New`,
                            value: 1,
                            varName: "headingsFontSize",
                            type: "slider",
                            min: 0.8,
                            max: 1.5,
                            step: 0.1,
                            marks: {
                                0.8: '0.8',
                                0.9: '0.9',
                                1.0: '1.0',
                                1.0: '1.0',
                                1.1: '1.1',
                                1.2: '1.2',
                                1.3: '1.3',
                                1.4: '1.4',
                                1.5: '1.5'
                            }
                        },
                    ]
                },
                {
                    label: "Body",
                    value: "body",
                    type: "multiFields",
                    data: [
                        {
                            title: "Font",
                            label: `System UI`,
                            value: `system-ui, sans-serif`,
                            varName: "bodyFontFamily",
                            type: "select",
                            dataType: "font-family"
                        },
                        {
                            title: "Font size scale",
                            label: `Courier New`,
                            value: 1,
                            varName: "bodyFontSize",
                            type: "slider",
                            min: 0.8,
                            max: 1.5,
                            step: 0.1,
                            marks: {
                                0.8: '0.8',
                                0.9: '0.9',
                                1.0: '1.0',
                                1.1: '1.1',
                                1.2: '1.2',
                                1.3: '1.3',
                                1.4: '1.4',
                                1.5: '1.5'
                            }
                        },
                    ]
                }
            ]
        },
        {
            label: "Buttons",
            value: "buttons",
            data: [
                {
                    label: "Border",
                    value: "border",
                    type: "multiFields",
                    data: [
                        {
                            title: "Thickness",
                            label: `Thickness`,
                            value: 1,
                            varName: "buttonBorderWidth",
                            valueType: "px",
                            type: "slider",
                            min: 0,
                            max: 5,
                            step: 1,
                            marks: {
                                0: '0',
                                1: '1',
                                2: '2',
                                3: '3',
                                4: '4',
                                5: '5'
                            }
                        },
                        {
                            title: "Border style",
                            label: `Solid`,
                            value: `solid`,
                            varName: "buttonBorderStyle",
                            type: "select",
                            dataType: "border-style",
                        },
                        {
                            title: "Border radius",
                            label: `Border radius`,
                            value: 0,
                            varName: "buttonBorderRadius",
                            valueType: "px",
                            type: "slider",
                            min: 0,
                            max: 10,
                            step: 2,
                            marks: {
                                0: '0',
                                2: '2',
                                4: '4',
                                6: '6',
                                8: '8',
                                10: '10',
                            }
                        },
                        {
                            title: "Border Color",
                            label: "Border Color",
                            value: "#000000",
                            varName: "buttonBorderColor",
                            type: "color"
                        },
                        {
                            title: "Constrast Border Color",
                            label: "Constrast Border Color",
                            value: "#0000FF",
                            varName: "buttonConstrastBorderColor",
                            type: "color"
                        },
                    ]
                },
                {
                    label: "Shadow",
                    value: "shadow",
                    type: "multiFields",
                    data: [
                        {
                            title: "Horizontal offset",
                            label: `Horizontal offset`,
                            value: 0,
                            varName: "buttonBoxShadowX",
                            valueType: "px",
                            type: "slider",
                            min: -8,
                            max: 8,
                            step: 3,
                            marks: {
                                "-8": '-8',
                                "-6": '-6',
                                "-4": '-4',
                                "-2": '-2',
                                0: '0',
                                2: '2',
                                4: '4',
                                6: '6',
                                8: '8',
                            }
                        },
                        {
                            title: "Vertical offset",
                            label: `Vertical offset`,
                            value: 0,
                            varName: "buttonBoxShadowY",
                            valueType: "px",
                            type: "slider",
                            min: -8,
                            max: 8,
                            step: 3,
                            marks: {
                                "-8": '-8',
                                "-6": '-6',
                                "-4": '-4',
                                "-2": '-2',
                                0: '0',
                                2: '2',
                                4: '4',
                                6: '6',
                                8: '8',
                            }
                        },
                        {
                            title: "Blur",
                            label: "Blur",
                            value: 0,
                            varName: "buttonBoxShadowBlur",
                            valueType: "px",
                            type: "slider",
                            min: 0,
                            max: 20,
                            step: 5,
                            marks: {
                                0: '0',
                                5: '5',
                                10: '10',
                                15: '15',
                                20: '20',
                            }
                        },
                        {
                            title: "Shadow Color",
                            label: "Shadow Color",
                            value: "#000000",
                            varName: "buttonBoxShadowColor",
                            type: "color"
                        },
                    ]
                }
            ]
        },
        {
            label: "Product Cards",
            value: "productCards",
            data: [
                {
                    label: "Product",
                    value: "product",
                    type: "multiFields",
                    data: [
                        {
                            title: "Image Padding",
                            label: `Image Padding`,
                            value: 4,
                            varName: "productImagePadding",
                            valueType: "px",
                            type: "slider",
                            min: 0,
                            max: 20,
                            step: 4,
                            marks: {
                                0: '0',
                                4: '4',
                                8: '8',
                                12: '12',
                                16: '16',
                                20: '20'
                            }
                        },
                        {
                            title: "Image radius",
                            label: `Image radius`,
                            value: 8,
                            varName: "productImageBorderRadius",
                            valueType: "px",
                            type: "slider",
                            min: 0,
                            max: 12,
                            step: 2,
                            marks: {
                                0: '0',
                                2: '2',
                                4: '4',
                                6: '6',
                                8: '8',
                                10: '10',
                                12: '12',
                            }
                        },
                        {
                            title: "Text alignment",
                            label: `Left`,
                            value: `left`,
                            varName: "productTextAlign",
                            type: "select",
                            dataType: "text-align",
                        },
                    ]
                },
                {
                    label: "Border",
                    value: "border",
                    type: "multiFields",
                    data: [
                        {
                            title: "Thickness",
                            label: `Thickness`,
                            value: 1,
                            varName: "productBorderWidth",
                            valueType: "px",
                            type: "slider",
                            min: 0,
                            max: 5,
                            step: 1,
                            marks: {
                                0: '0',
                                1: '1',
                                2: '2',
                                3: '3',
                                4: '4',
                                5: '5'
                            }
                        },
                        {
                            title: "Border style",
                            label: `Solid`,
                            value: `solid`,
                            varName: "productBorderStyle",
                            type: "select",
                            dataType: "border-style",
                        },
                        {
                            title: "Border radius",
                            label: `Border radius`,
                            value: 12,
                            varName: "productBorderRadius",
                            valueType: "px",
                            type: "slider",
                            min: 0,
                            max: 12,
                            step: 2,
                            marks: {
                                0: '0',
                                2: '2',
                                4: '4',
                                6: '6',
                                8: '8',
                                10: '10',
                                12: '12',
                            }
                        },
                        {
                            title: "Border Color",
                            label: "Border Color",
                            value: "#e3e4e5",
                            varName: "productBorderColor",
                            type: "color"
                        },
                    ]
                },
                {
                    label: "Shadow",
                    value: "shadow",
                    type: "multiFields",
                    data: [
                        {
                            title: "Horizontal offset",
                            label: `Horizontal offset`,
                            value: 0,
                            varName: "productBoxShadowX",
                            valueType: "px",
                            type: "slider",
                            min: -8,
                            max: 8,
                            step: 3,
                            marks: {
                                "-8": '-8',
                                "-6": '-6',
                                "-4": '-4',
                                "-2": '-2',
                                0: '0',
                                2: '2',
                                4: '4',
                                6: '6',
                                8: '8',
                            }
                        },
                        {
                            title: "Vertical offset",
                            label: `Vertical offset`,
                            value: 0,
                            varName: "productBoxShadowY",
                            valueType: "px",
                            type: "slider",
                            min: -8,
                            max: 8,
                            step: 3,
                            marks: {
                                "-8": '-8',
                                "-6": '-6',
                                "-4": '-4',
                                "-2": '-2',
                                0: '0',
                                2: '2',
                                4: '4',
                                6: '6',
                                8: '8',
                            }
                        },
                        {
                            title: "Blur",
                            label: "Blur",
                            value: 0,
                            varName: "productBoxShadowBlur",
                            valueType: "px",
                            type: "slider",
                            min: 0,
                            max: 20,
                            step: 5,
                            marks: {
                                0: '0',
                                5: '5',
                                10: '10',
                                15: '15',
                                20: '20',
                            }
                        },
                        {
                            title: "Shadow Color",
                            label: "Shadow Color",
                            value: "#000000",
                            varName: "productBoxShadowColor",
                            type: "color"
                        },
                    ]
                }
            ]
        },
    ]
}

const defaultSections = [
    {
        label: "Header",
        value: "header",
        data: [
            // {
            //     label: "Announcement bar",
            //     value: "announcement-bar",
            //     type: "marquee", // marquee / slides
            //     duration: 2,
            //     isVisible: 0,
            //     isDeletable: 0,
            //     data: [
            //         {
            //             label: "Trying First Marquee",
            //             link: "https://xyz.com/",
            //             type: "input",
            //             isVisible: 0,
            //             isDeletable: 0,
            //         },
            //         {
            //             label: "Trying Second Slide",
            //             link: "https://xyz.com/",
            //             type: "input",
            //             isVisible: 0,
            //             isDeletable: 0,
            //         },
            //     ]
            // },
            {
                label: "Header",
                value: "header",
                type: "center", // left / center
                duration: null,
                isVisible: 0,
                isDeletable: 1,
                data: []
            }
        ]
    },
    {
        label: "Template",
        value: "template",
        data: [
            {
                label: "Slideshow",
                value: "slideshow",
                type: "md", // sm / md / lg
                // paginationType: "counter", // dots / counter / numbers
                animationType: "slide", // none / slide / fade
                isVisible: 0,
                isDeletable: 0,
                isAutoPlay: 1,
                autoPlaySpeed: 2,
                data: [
                    {
                        label: "Slide 1",
                        image: "",
                        link: "", //category name
                        title: "",
                        description: "",
                        isVisible: 0,
                        isDeletable: 0,
                    }
                ]
            },
            {
                label: "Featured collection",
                value: "featured-collection",
                type: "", // category name
                isVisible: 0,
                isDeletable: 1,
                title: "Featured collection",
                description: "",
                desktopItems: 4,
                mobileItems: 2,
                data: []
            }
        ]
    },
    {
        label: "Footer",
        value: "footer",
        data: [
            {
                label: "Footer",
                value: "footer",
                type: "center", // left / center
                duration: null,
                isVisible: 0,
                isDeletable: 1,
                data: []
            }
        ]
    },
]

const socialLinks = [
    {
        value: 'whatsapp',
        label: 'WhatsApp'
    },
    {
        value: 'facebook',
        label: 'Facebook'
    },
    {
        value: 'instagram',
        label: 'Instagram'
    },
    {
        value: 'linkedin',
        label: 'Linkedin'
    },
    {
        value: 'twitter-x',
        label: 'Twitter'
    },
    {
        value: 'pinterest',
        label: 'Pinterest'
    }
];

const iconsList = [
    {
        label: "announcement-bar",
        value: <MdCampaign />
    },
    {
        label: "featured-collection",
        value: <FaShoppingBag />
    },
    // {
    //     label: "featured-product",
    //     value: <AiFillStar />
    // },
    {
        label: "rich-text",
        value: <MdTextFields />
    },
    {
        label: "image-banner",
        value: <IoImageSharp />
    },
    {
        label: "image-with-text",
        value: <BsLayoutSidebarInset />
    },
    {
        label: "slideshow",
        value: <IoMdImages />
    },
    {
        label: "video",
        value: <FaVideo />
    },
    {
        label: "featured-product",
        value: <FaTshirt />
    },
]

const sliderMarks = {
    paddingMarks: {
        min: 0,
        max: 48,
        step: 8,
        marks: {
            0: '0',
            8: '8',
            16: '16',
            24: '24',
            32: '32',
            40: '40',
            48: '48'
        }
    },
    autoPlaySpeedMarks: {
        min: 1,
        // max: 8,
        max: 5,
        step: 1,
        marks: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            // 6: '6',
            // 7: '7',
            // 8: '8'
        }
    },
}

export {
    pagesList,
    sizesList,
    tabList,
    colorsTempData,
    tempPrimarySidebar,
    fontList,
    borderStyleList,
    textAlign,
    tempHeader,
    socialLinks,
    defaultSections,
    sampleHeaderSectionsDropdown,
    sampleTemplateSectionsDropdown,
    iconsList,
    sliderMarks,
}
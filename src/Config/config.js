// const SERVER_URL = (window?.location?.hostname === 'app.printfuse.in') ? "https://api.printfuse.in/" : "http://192.168.0.141:4000/"
const SERVER_URL = (window?.location?.hostname === 'app.printfuse.in') ? "https://api.printfuse.in/" : "https://api.printfuse.in/"
const STORE_API_URL = `${SERVER_URL}customizer/`;
const STORE_API_URL_SELLER = `${SERVER_URL}seller/`;

const frontEnd_API = {
    verify: `${STORE_API_URL}home/verify`,
    getCategory: `${STORE_API_URL}home/category`,
    getProductList: `${STORE_API_URL}product/list`,
    getProductDetail: `${STORE_API_URL}product/detail`,
    getSocialLinks: `${STORE_API_URL}social`,
    socialLinksSubmit: `${STORE_API_URL}social/submit`,
    updateStore: `${STORE_API_URL}store`,
    updateStore: `${STORE_API_URL}document`,
}

const frontEnd_API_seller = {
    storecustomize: `${STORE_API_URL_SELLER}storecustomize`,
    storeDocument: `${STORE_API_URL_SELLER}storecustomize/document`,
}

const storage = {
    user: 'seller',
    loader: 'loader',
    store: 'activeStore',
    domain: 'domain',
    canvas: 'canvas',
    cart: 'cart',
}

const siteConfig = {
    name: 'Printfuse',
    logo: require('../Assets/Images/try-logo.png'),
    logoText: require('../Assets/Images/oglogo.png'),
    tagLine: 'Join The Next Revolution',
    address: {
        addressLine1: '64, Akshay Industrial Estate,',
        addressLine2: 'Near New Cloth Market',
        city: 'Ahmedabad',
        pinCode: '385620',
    },
    websiteLink: 'https://printfuse.in/',
    email: 'printfuse@help.com',
    GSTIN: '24HDE7487RE5RT4',
    bankName: 'State Bank of India',
    branchName: 'RAF CAMP',
    bankAccountNumber: '2000000004512',
    IFSCCode: 'SBIN0000488',
    rules: ["Subject to Ahmedabad Jurisdiction.", "Our responsibility ceases as soon as the goods leave our premises.", "Goods once sold will not be taken back.", "Delivery ex-premises."]
};

const token = JSON.parse(localStorage?.getItem(storage.user))
    ? `Bearer ${JSON.parse(localStorage?.getItem(storage.user))?.token}`
    : 'essentials';

const storeCode = JSON.parse(localStorage?.getItem(storage.store))
    ? `${JSON.parse(localStorage?.getItem(storage.store))?.storeCode}`
    : '';

const header = {
    headers: {
        'token': token,
        'storecode': storeCode,
        'Content-Type': 'application/json'
    }
}

const headerImage = {
    headers: {
        'token': token,
        'storecode': storeCode,
        'Content-Type': 'multipart/form-data'
    }
}

export {
    SERVER_URL,
    frontEnd_API,
    token,
    storeCode,
    header,
    headerImage,
    storage,
    siteConfig,
    frontEnd_API_seller,
};
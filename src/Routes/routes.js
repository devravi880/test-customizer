import Index from "../Views/Customizer"

const routes = [
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/customize-store/:storeCode",
        element: <Index />
    },
]

export {
    routes
}
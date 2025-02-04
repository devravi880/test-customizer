import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <div className='custom-loader'>
            <div className='d-flex justify-content-center align-items-center gap-2'>
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" size="xl" />
                <Spinner animation="grow" size="sm" />
            </div>
        </div>
    )
}

export default Loader

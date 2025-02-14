import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div className='flex-center-align' style={{ minHeight: "100vh" }}>
            <div className="custom-card">
                <div className="card-border-top" />
                <div className="img p-2">
                    <img src={require('../Assets/Images/try-logo.png')} alt="" />
                </div>
                <h2 className='title'>Store details not found !</h2>
                <p className="job"> Please login one more time to continue.</p>
                <div className='flex-center-align'>
                    <Link to={"https://app.printfuse.in/"} className='btn btn-light mb-3 text-success'>Back to Printfuse</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
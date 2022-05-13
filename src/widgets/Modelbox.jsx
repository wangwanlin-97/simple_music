import React from 'react'
import './modelbox.css'
export default function Modelbox(props) {
    // console.log(props)
    return (
        <div className='modelbox'>
            <h5 className='model_title'>{props.modelTitle}</h5>
            {
                props.children
            }


        </div>
    )
}

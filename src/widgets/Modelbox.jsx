import React from 'react'
import './modelbox.css'
export default function Modelbox(props) {
    // console.log(props)
    return (
        <>
            <div onClick={() => { props.handleclose() }} className='side_virtual'>

            </div>
            <div className='modelbox'>
                <h5 className='model_title'>{props.modelTitle}</h5>
                {
                    props.children
                }


            </div>
        </>
    )
}

import React, { useRef } from 'react'
import './input.css'

export default function Input(props) {

    return (

        <>
            {props.type !== 'button' ? < div className='input_item'>
                <div>
                    <span className='input_item_name'>{props.input_item_name}:</span><input onChange={(e) => { props.getvalue(e.target.value) }} className='input_item_box' type={props.type}></input>
                </div>
            </div> :
                // < span className='input_item'>

                <input className='button' value={props.input_item_name} onClick={() => { props.onclick() }} type={props.type}></input>

                // </span>
            }
        </>


    )
}

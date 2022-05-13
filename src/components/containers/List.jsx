import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Biglist from '../../widgets/Biglist'

export default function List() {
    const [list, setlist] = useState([])
    useEffect(() => {
        axios.get(`/toplist`).then(res => {
            setlist(res.data.list)
        })



    }, [])
    return (
        <>
            <Biglist data={list} />
        </>
    )
}

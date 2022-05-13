import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

export default function Allplaylist() {

    const { tag } = useParams()

    const [alllist, setalllist] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`/top/playlist/highquality?cat=${tag}`).then(res => {
            console.log(res.data)
            setalllist(res.data.playlists)
        })

    }, [])
    return (



        <div className='playlist'>
            <div className='title_bar'><span className='tag_title'>全部歌单</span><span onClick={() => { navigate(-1) }} className='float_right'>返回</span></div>
            <ul className='playlist_list'>
                {
                    alllist.map(item => <li onClick={() => { navigate(`/playlist/${item.id}`) }} onBlur={() => { console.log('blur') }} key={item.id}>
                        <span><img src={item.coverImgUrl}></img></span>
                        <a>{item.name}</a>
                    </li>)
                }
            </ul>

        </div>


    )
}

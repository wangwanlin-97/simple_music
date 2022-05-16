import React, { useEffect, useState } from 'react'
import './banner.css'
import { handleGetSongUrl } from '../methods'
import { savePlaylist, setIndex, toggleManualyFlag, toggle } from '../redux/store'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Banner(props) {

    const { data } = props
    const [index, setindex] = useState(0)
    const { toggleManualyFlag, savePlaylist, setIndex } = props

    return (
        <>
            <div className='bannerbox'>

                <ul

                    style={{ width: `${data.length}00%`, transition: `all 1s`, transform: `translateX(-${index}00vw)` }}
                    className='banner'>

                    {
                        data?.map(item => <li onClick={() => {
                            if (item.typeTitle === '新歌首发') {
                                console.log(999)



                                toggle(false);
                                savePlaylist([item.song])
                                toggleManualyFlag(true)
                                setIndex(0)
                                handleGetSongUrl(item.song.id, {
                                    id: item.song.id,
                                    name: item.song.name, author: item.song.al.name, picUrl: item.song.al.picUrl
                                })

                            } else if (item.typeTitle === '活动' || item.typeTitle === '数字专辑') {
                                const w = window.open()
                                w.location.href = `${item.url}`

                            }
                        }} className='banneritem' key={item.bannerId * Math.random()}>
                            <img src={item.pic}></img>
                            <span className='typetitle'>{item.typeTitle}</span>

                        </li>)
                    }
                </ul>
                <div onClick={() => {
                    if (index > 0) {
                        setindex(index => index - 1)
                    }
                    else {
                        setindex(data.length - 1)
                    }
                }} className='left'></div>
                <div onClick={() => {
                    if (index < data.length - 1) {
                        setindex(index => index + 1)
                    }
                    else {
                        setindex(0)
                    }
                }} className='right'></div>
            </div>

        </>
    )
}
export default connect((state) => {
    return {}
}, { toggleManualyFlag, savePlaylist, setIndex, toggle })(Banner)

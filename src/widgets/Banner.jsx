import React, { useEffect, useState } from 'react'
import './banner.css'
import { handleGetSongUrl } from '../methods'
import { savePlaylist, setIndex, toggleManualyFlag, toggle } from '../redux/store'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Banner(props) {

    const app = navigator.appVersion.indexOf('Mobile')
    const { data } = props
    let start = 0
    const [index, setindex] = useState(0)
    const { toggleManualyFlag, savePlaylist, setIndex } = props

    return (
        <>
            <div className='bannerbox'>

                <ul

                    style={{ width: `${data.length}00%`, transition: `all 1s`, transform: `translateX(-${index}00vw)` }}
                    className='banner'>

                    {
                        data?.map(item => <li onTouchStart={(e) => {
                            console.log(e.changedTouches[0].clientX)
                            start = e.changedTouches[0].clientX

                        }} onTouchEnd={(e) => {
                            console.log(e.changedTouches[0].clientX)
                            if (e.changedTouches[0].clientX - start > 150) {
                                if (index < data.length - 1) {
                                    setindex(index => index + 1)
                                }
                                else {
                                    setindex(0)
                                }
                            } else if (e.changedTouches[0].clientX - start < - 150) {
                                if (index > 0) {
                                    setindex(index => index - 1)
                                }
                                else {
                                    setindex(data.length - 1)
                                }
                            }
                        }}
                            onClick={() => {
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
                            }}
                            className='banneritem' key={item.bannerId * Math.random()}>
                            <img src={item.pic}></img>
                            <span className='typetitle'>{item.typeTitle}</span>

                        </li>)
                    }
                </ul>
                {
                    app === -1 && <div onClick={() => {
                        if (index > 0) {
                            setindex(index => index - 1)
                        }
                        else {
                            setindex(data.length - 1)
                        }
                    }} className='left'></div>

                }
                {
                    app === -1 && <div onClick={() => {
                        if (index < data.length - 1) {
                            setindex(index => index + 1)
                        }
                        else {
                            setindex(0)
                        }
                    }} className='right'></div>
                }
            </div>

        </>
    )
}
export default connect((state) => {
    return {}
}, { toggleManualyFlag, savePlaylist, setIndex, toggle })(Banner)

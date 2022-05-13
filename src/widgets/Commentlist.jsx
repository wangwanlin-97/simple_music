import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './commentlist.css'


export default function Commentlist(props) {
    const { data, getmore } = props
    const lastref = useRef()
    const [list, setlist] = useState([])
    const observer = new IntersectionObserver((entries) => {
        console.log(entries[0].intersectionRatio)
        if (entries[0].isIntersecting) {
            console.log(1)
            getmore()
        }

    }, {})
    useEffect(() => {
        setlist(data)
    }, [data])
    useEffect(() => {
        lastref.current && observer.observe(lastref.current)
        return () => {
            lastref.current && observer.unobserve(lastref.current)
        }
    }, [])

    function timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        // var h = date.getHours() + ':';
        // var m = date.getMinutes() + ':';
        // var s = date.getSeconds();
        return Y + M + D;
    }
    return (
        <div className='commentbox'>
            <ul>
                {
                    list.length > 0 && list.map(item => <li className='commentItem' key={item.commentId}>
                        <div className='comment-userinfo'>
                            <div className='avatarbox'>
                                <img className='avatar' src={`${item.user.avatarUrl}`}></img>
                            </div>
                            <div style={{ flex: '1' }}>
                                <span className='nickname'>{item.user.nickname}：</span>
                                <span className='publishtime'>{timestampToTime(item.time)}</span>
                            </div>
                        </div>
                        <div className='comment-content'>{item.content}</div>
                        <ul className='replied'>
                            {
                                item.beReplied.length > 0 && item.beReplied.map(item => <li className='subcommentItem' key={item.beRepliedCommentId}>
                                    <div className='comment-userinfo'>
                                        {/* <div className='avatarbox'>
                                            <img className='avatar' src={`${item.user.avatarUrl}`}></img>
                                            
                                        </div> */}
                                        <span className='reply'>回复：    </span>
                                        <div style={{ flex: '1' }}>
                                            <span className='nickname'>{item.user.nickname}：</span>
                                            {/* <span className='publishtime'>{timestampToTime(item.time)}</span> */}
                                        </div>
                                    </div>
                                    <div className='comment-content'>{item.content}</div>

                                </li>)
                            }
                        </ul>
                    </li>)
                }
                <li style={{ height: '1px' }} className='last-item' ref={lastref}></li>
            </ul>
        </div>
    )
}

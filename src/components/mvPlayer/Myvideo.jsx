import React, { useEffect, useRef, useState } from 'react'
import './myvideo.css'


export default function Myvideo(props) {

    const { ismvplaying, togglemvplaying } = props

    const app = navigator.appVersion.indexOf('Mobile')
    // console.log(app)

    //获取video标签节点
    const vref = useRef()
    //获取最外层标签节点
    const bref = useRef()
    //获取进度条节点
    const pref = useRef()
    const [active, setactive] = useState(false)
    const [isfull, setisfull] = useState(false)
    const [playing, setplaying] = useState(false)
    const [playdata, setplaydata] = useState({ currentTime: 0, duration: 0 })
    // console.log(vref)
    const { src } = props
    useEffect(() => {
        console.log(vref)
        if (active) {

        }
    }, [active, document.fullscreenElement])

    useEffect(() => {
        if (playing) {
            togglemvplaying(true)
        }
        else {
            togglemvplaying(false)
        }
    }, [playing])

    const clearTimmer = () => {
        let a = setTimeout(() => {

        }, 0);
        for (let i = 0; i < a; i++) {
            clearTimeout(i)
        }
    }
    return (
        <div onClick={() => {
            if (app !== -1) {

                setactive(() => !active)

            } else {
                // console.log(vref.current.played)
                clearTimmer()
                console.log('click')
                //设置定时器来延迟单击事件的触发，来避免在双击时触发两次单击事件
                setTimeout(() => {
                    if (playing) {
                        vref.current.pause()


                    } else {
                        vref.current.play()
                    }
                    setTimeout(() => {
                        console.log('timmer')
                        setactive(() => false)
                    }, 2000)
                }, 200);
            }
        }} onDoubleClick={(e) => {
            clearTimmer()
            if (document.fullscreenElement == null) {
                bref.current.requestFullscreen()
                setisfull(true)

            } else {
                document.exitFullscreen()
                setisfull(false)
            }
        }} onMouseMove={() => {
            if (app === -1) {
                clearTimmer()
                console.log('move')
                    ; setactive(true);
                setTimeout(() => {
                    setactive(() => false)
                }, 2000);
            }

        }} onKeyUp={(e) => {
            //按下空格键可实现暂停和播放
            if (e.key === ' ') {

                if (playing) {
                    vref.current.pause()

                } else {
                    vref.current.play()
                }
            }

        }}
            //添加tabindex属性是为了让绑定的键盘事件生效
            tabIndex='1'
            ref={bref} className='videobox'>
            <video
                controls={false}
                onPlaying={() => { setplaying(true) }}
                onPause={() => { setplaying(false) }}
                onTimeUpdate={(e) => {
                    // console.log(e)
                    // console.log('playing')
                    setplaydata({ currentTime: e.target.currentTime, duration: e.target.duration })
                }} className='video' src={src} ref={vref}>
                {/* <source type="video/mp4" src={src}></source> */}

            </video>
            {
                //当鼠标在播放界面移动时，active为true，控件渲染，鼠标停止移动2秒后active为false控件隐藏
                active &&
                <div
                    // onMouseEnter={() => { clearTimmer(); setactive(true); console.log(1) }}
                    // onMouseLeave={() => { setactive(false) }}
                    onClick={(e) => { e.stopPropagation() }}
                    className='controll_full '>
                    {/* <div className='video-ctr'> */}
                    <span onClick={() => {
                        if (playing) {
                            vref.current.pause()

                        } else {
                            vref.current.play()
                        }
                    }} className={playing ? 'icon-pause-outline ' : 'icon-play-outline'}></span>
                    {
                        isfull &&
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                vref.current.currentTime = (e.pageX - e.target.offsetLeft - bref.current.offsetLeft) / e.target.clientWidth * vref.current.duration
                            }}
                            ref={pref}
                            className='video-progress'
                            style={{ backgroundImage: `linear-gradient( to right,red 0 ${playdata.currentTime / playdata.duration * 100}%,grey ${playdata.currentTime / playdata.duration * 100}% 100% )` }}>

                        </span>

                    }
                    <span className='video-duration'>{`
                    ${Math.floor(playdata.currentTime / 60) > 9 ?
                            Math.floor(playdata.currentTime / 60) :
                            '0' + Math.floor(playdata.currentTime / 60)}:${Math.floor(playdata.currentTime % 60) > 9 ?
                                Math.floor(playdata.currentTime % 60) :
                                '0' + Math.floor(playdata.currentTime % 60)}`}
                        /
                        {`${!playdata.duration ?
                            '00' :
                            (Math.floor(playdata.duration / 60) > 9 ?
                                Math.floor(playdata.duration / 60) :
                                '0' + Math.floor(playdata.duration / 60))
                            }:
                            ${!playdata.duration ?
                                '00' :
                                Math.floor(playdata.duration % 60) > 9 ?
                                    Math.floor(playdata.duration % 60) :
                                    '0' + Math.floor(playdata.duration % 60)}`}</span>


                    <span className='icon-screen-full' onClick={() => {
                        if (document.fullscreenElement == null) {
                            bref.current.requestFullscreen()
                            setisfull(true)

                        } else {
                            document.exitFullscreen()
                            setisfull(false)
                        }
                    }} ></span>
                    {
                        !isfull && <div className='video-minibar' >
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log(e.target.offsetLeft, e.pageX, bref.current.offsetLeft)
                                    vref.current.currentTime = (e.pageX - e.target.offsetLeft - bref.current.offsetLeft) / e.target.clientWidth * vref.current.duration
                                }}
                                ref={pref}
                                className='video-progress-mini'
                                style={{ backgroundImage: `linear-gradient( to right,red 0 ${playdata.currentTime / playdata.duration * 100}%,grey ${playdata.currentTime / playdata.duration * 100}% 100% )` }}>

                            </span>
                        </div>}

                </div>
            }

        </div>
    )
}

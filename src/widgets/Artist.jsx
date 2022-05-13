import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import axios from 'axios'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { getsongurl, saveSongInfo, savePlaylist, setIndex, toggleManualyFlag } from '../redux/store'
import { toggle } from '../redux/store'
import { handleGetSongUrl } from '../methods'

import LazyLoad from 'react-lazyload'

function Artist(props) {

    const { more, getmore } = props
    const [count, setcount] = useState(0)
    const [offset, setOffset] = useState(0)
    const hasmore = useRef(true)
    const refmore = useRef(more)

    const lastref = useRef()
    const test = useRef([])
    var observer = useRef(new IntersectionObserver((entries) => {
        console.log(entries)
        entries.forEach(item => {
            // console.log(item)

            if (item.isIntersecting) {
                console.log('hasmore', hasmore.current)
                console.log(item.target)
                item.target.setAttribute('src', item.target.getAttribute('data-src'))
                if (item.target.id === 'test') {
                    console.log('test')
                    hasmore.current && setOffset((offset => offset + 30))
                    if (refmore.current) {
                        getmore()
                    }
                }
                setcount(() => Math.random())
                // console.log(item)

            }

        })

    }, { threshold: [1] }))

    const handleGetSongUrl = useRef((id, obj) => {
        console.log('准备播放')
        toggle(true);
        saveSongInfo(obj)


        // axios.get(`/song/url?id=${id}`).then(res => {
        //     console.log(res.data, id, obj)
        //     // console.log(id, obj)
        //     console.log(res.data.data[0].url)
        //         // getsongurl(res.data.data[0].url)
        //         (() => {
        //             // getsongurl(res.data.data[0].url);


        //         })()
        // })

    })
    useEffect(() => {
        // axios.get(`/playlist/track/all?id=${listid}&limit=${10}&page=${2}`).then(res => {})

        refmore.current = more
    }, [more])



    const { toggleManualyFlag, manualyFlag, songinfo, saveSongInfo, isloading, data, title, listid, getsongurl, back, toggle, savePlaylist, playlist, currentIndex, setIndex } = props
    const [songlist, setsonglist] = useState([])
    // const [test, settest] = useState([])
    // const [flag, setflag] = useState(true)
    // const [ok, setok] = useState(true)
    // const [fn, setfn] = useState(null)

    const navigate = useNavigate()





    // console.log('00')
    useEffect(() => {


        // setTimeout(() => {
        if (playlist.length > 0 && manualyFlag) {
            console.log('该更新列表了')
            handleGetSongUrl.current(playlist[currentIndex].id, { name: playlist[currentIndex].name, author: playlist[currentIndex].al.name, picUrl: playlist[currentIndex].al.picUrl, id: playlist[currentIndex].id })

        }
        // }, 1000);


    }, [playlist])

    // useEffect(() => {
    //     setcurrentid(songinfo.id)
    // }, [songinfo])

    useEffect(() => {

        data ? setsonglist(data) : axios.get(`/playlist/track/all?id=${listid}&limit=${offset}`).then(res => {
            console.log(res.data)
            if (res.data.songs.length < offset) {
                hasmore.current = false
            }
            //用于筛选歌曲是否能播放
            res.data.songs.map(item => {

                // axios.get(`/song/url?id=${item.id}`).then(res => {

                //歌曲的URL不是null，就将歌曲保存到状态里
                // if (res.data.data[0].url !== null) {
                // console.log(songlist.find(item))
                // setsonglist(songlist => { return [...songlist, item] })
                // console.log('find', test.current.indexOf(item.id), item.name)

                if (test.current.indexOf(item.id) < 0) {
                    // settest(test.cu => { return [...test, item.id] })
                    test.current.push(item.id)
                    setsonglist(songlist => { return [...songlist, item] })


                }


                // }
                // })

            })


            // setsonglist(res.data.songs)
        })

    }, [props.data, offset])


    useLayoutEffect(() => {
        // console.log(observer)
        observer.current.observe(lastref.current)
        const imgs = document.querySelectorAll('img')
        imgs.forEach((item) => {
            if (item.getAttribute('src') === '') {
                observer.current.observe(item)
            } else {
                observer.current.unobserve(item)

            }
        })
        console.log(imgs)
        return () => {
            // console.log(lastref.current)
            // console.log(observer.current)
            observer.current.unobserve(lastref.current)
            imgs.forEach((item) => {
                observer.current.unobserve(item)
            })
            console.log('over')

            // observer.current.disconnect()
        }
    }, [songlist])




    return (
        <>
            <div className='list_container'>
                <div className='title_bar'><span className='tag_title'>{title}<span
                    // onClick={() => {
                    //     console.log(songlist)
                    //     savePlaylist(songlist);
                    //     toggleManualyFlag(true)
                    //     setIndex(0)



                    // }} 
                    className='playall'>歌手列表</span></span>{back && <span onClick={() => { navigate(-1) }} className='float_right'>back</span>}</div>
                {

                    <ul style={{ overflow: 'auto', height: '100%' }}
                        // onScroll={(e) => { console.log(e) }} 
                        id='haha' >
                        {
                            // data === undefined ? 
                            songlist.map(item => <li className={item.id == songinfo.id ? 'active' : ''}
                                // onClick={() => {
                                //     toggle(false);
                                //     // playlist.push(item);
                                //     console.log('前', playlist.length)
                                //     savePlaylist([item])
                                //     setIndex(0)

                                //     console.log('后', playlist.length)

                                //     // setIndex(playlist.length - 1);
                                //     handleGetSongUrl.current(item.id, { name: item.name, author: item.al.name, picUrl: item.al.picUrl });
                                // }} 
                                key={item.id}>
                                <><img className='songimg'
                                    src={''}
                                    data-src={item.img1v1Url}
                                ></img></>
                                <span className='songname'>{item.name}</span>

                            </li>)
                            // : data.map(item => <li onClick={() => { toggle(false); handleGetSongUrl(item.id, { name: item.name, author: item.al.name, picUrl: item.al.picUrl }); }} key={item.id}>
                            //     <><img className='songimg' src={item.al.picUrl}></img></>
                            //     <span className='songname'>{item.name}</span>

                            // </li>)
                        }
                        <li ref={lastref} id='test' style={{ height: '30px', textAlign: 'center' }} onClick={(evt) => { }}></li>
                    </ul>
                }

            </div>
        </>
    )
}

export default connect((state) => ({
    isloading: state.sideBarSlicereducer.isLoading,
    playlist: state.nowPlayingSlicereducer.playlist,
    currentIndex: state.nowPlayingSlicereducer.currentIndex,
    songinfo: state.nowPlayingSlicereducer.songInfo,
    manualyFlag: state.nowPlayingSlicereducer.manualyFlag
}), { saveSongInfo, toggle, getsongurl, savePlaylist, setIndex, toggleManualyFlag })(Artist)

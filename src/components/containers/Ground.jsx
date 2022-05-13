import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './ground.css'

import { connect } from 'react-redux'
import { getsongurl } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { saveTag } from '../../redux/store'
import List from '../../widgets/List'
import LazyLoad from 'react-lazyload'
import Biglist from '../../widgets/Biglist'

function Ground(props) {

    //状态


    const [tags, settags] = useState([])
    const [currenttag, setcurrenttag] = useState('')
    const [tagSonglist, settagSonglist] = useState([])
    const [moreList, setmoreList] = useState(false)
    const [recommend, setrecommend] = useState([])



    //navigate钩子
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/playlist/catlist`, { withCredentials: true }).then(res => {
            // console.log(res.data)
            settags(res.data.sub)
        })
        axios.get(`/recommend/songs`).then(res => {
            // console.log(res.data)
            setrecommend(res.data.data.dailySongs)
        })
    }, [])
    useEffect(() => {
        axios.get(`/top/playlist/highquality?cat=${encodeURIComponent(props.selectedtag)}&limit=6`, { withCredentials: true }).then(res => {
            console.log(res.data)
            settagSonglist(res.data.playlists)
            res.data.more ? setmoreList(true) : setmoreList(false)
        })
    }, [props.selectedtag])

    // console.log(props)
    const handleGetSongUrl = (id) => {
        axios.get(`/song/url?id=${id}`).then(res => {
            // console.log(res.data.data[0].url)
            props.getsongurl(res.data.data[0].url)
        })

    }
    return (
        <>
            <div className='box'>
                <div className='title_bar'><span className='tag_title'>标签</span></div>
                <ul className='tags'>
                    {
                        // console.log(typeof(tags))
                        tags.map(item => <li className={props.selectedtag === item.name ? 'active' : ''} onClick={() => { props.saveTag(item.name) }} key={item.name}>{item.name}</li>)
                    }
                </ul>
            </div>
            {/* <div className='playlist'>
                <div className='title_bar'><span className='tag_title'>歌单</span>{moreList && <span onClick={() => { navigate(`/playlist/all/${encodeURIComponent(props.selectedtag)}`) }} className='more_palylist'>更多</span>}</div>
                <ul className='playlist_list'>
                    {
                        tagSonglist.map(item => <li onClick={() => { navigate(`/playlist/${item.id}`) }} onBlur={() => { console.log('blur') }} key={item.id}>
                            <span><img src={item.coverImgUrl}></img></span>
                            <a>{item.name}</a>
                        </li>)
                    }
                </ul>

            </div> */}
            <Biglist more={moreList} data={tagSonglist} />
            <List back={false} del={false} title='今日推荐' data={recommend} getsongurl={props.getsongurl} />
            {/* <div className='daily_recommend'>
                <div className='title_bar'><span className='tag_title'>每日推荐</span></div>
                <ul>
                    {
                        recommend.map(item => <li onClick={() => { handleGetSongUrl(item.id) }} key={item.id}>
                            <img className='songimg' src={item.al.picUrl}></img>
                            <span className='songname'>{item.name}</span>

                        </li>)
                    }
                </ul>

            </div> */}


            {/* <audio autoPlay style={{ position: 'absolute', bottom: '40px', width: '100%' }} controls src={props.songurl}></audio> */}
        </>
    )
}


export default connect((state) => {
    // console.log(state)

    return {
        songurl: state.nowPlayingSlicereducer.url,
        selectedtag: state.selectedtagSlicereducer.selectedtag
    }
}, { getsongurl, saveTag })(Ground)

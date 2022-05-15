import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Myvideo from './Myvideo'
import './mvplayer.css'
import Commentlist from '../../widgets/Commentlist'
import { togglemvplaying } from '../../redux/store'
import { connect } from 'react-redux'

function Mvplayer(props) {
    const param = useParams()
    const [mvurl, setmvurl] = useState('')
    const [mvinfo, setmvinfo] = useState({})
    const [mvcom, setmvcom] = useState([])
    const [page, setpage] = useState(0)
    const test = useRef([])
    const { togglemvplaying, ismvplaying } = props
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/mv/detail?mvid=${param.id}`).then(res => {
            // console.log(res.data.data.brs)
            // console.log(res.data)
            setmvinfo(res.data.data)
        })
        axios.get(`/mv/url?id=${param.id}`).then(res => {
            // console.log(res.data)
            setmvurl(res.data.data.url)
        })
    }, [])
    useEffect(() => {
        axios.get(`/comment/mv?id=${param.id}&&offset=${20 * page}`).then(res => {
            console.log(res.data)
            res.data.comments.map(item => {
                // console.log(1)
                console.log(test.current.indexOf(item.commentId))
                if (test.current.indexOf(item.commentId) == -1) {
                    // console.log(2)
                    test.current.push(item.commentId)
                    setmvcom(mvcom => [...mvcom, item])
                }
            })

        })
    }, [page])
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='mv-title'>{mvinfo.name}<span onClick={() => { navigate(-1) }} className='back'>返回</span></div>

            {/* <video width={375} controls src={`${mvurl}`}></video> */}
            <Myvideo ismvplaying={ismvplaying} togglemvplaying={togglemvplaying} src={`${mvurl}`}></Myvideo>
            <div className='mv-artists'>歌手：
                {
                    mvinfo.artists && mvinfo.artists.map(item => <span key={item.id}>{item.name}</span>)
                }
                <span style={{ float: 'right' }}>播放{mvinfo.playCount}次</span>
            </div>
            <div className='mv-description'>{mvinfo.desc}</div>
            <div className='side-box'>

                <div>
                    <span onClick={() => {

                    }}>评论</span>
                </div>
                {mvcom.length > 0 && <Commentlist getmore={() => { setpage(page => page + 1) }} data={mvcom} />}


            </div>
        </div>
    )
}

export default connect((state) => {

    return {

        ismvplaying: state.nowPlayingSlicereducer.ismvplaying
    }

}, { togglemvplaying })(Mvplayer)
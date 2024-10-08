import axios from "axios"
import React, {useEffect, useRef, useState} from "react"
import {useParams} from "react-router-dom"
import Myvideo from "./Myvideo"
import "./mvplayer.css"
import Commentlist from "../../widgets/Commentlist"

export default function Videoplayer() {
  const param = useParams()
  const [mvurl, setmvurl] = useState("")
  const [mvinfo, setmvinfo] = useState({})
  const [mvcom, setmvcom] = useState([])
  const [page, setpage] = useState(0)
  const test = useRef([])

  useEffect(() => {
    axios.get(`/video/detail?id=${param.id}`).then(res => {
      // setmvinfo(res.data.data)
    })
    axios.get(`/video/url?id=${param.id}`).then(res => {
      // setmvurl(res.data)
    })
  }, [])
  useEffect(() => {
    // axios.get(`/comment/mv?id=${param.id}&&offset=${20 * page}`).then(res => {
    //     res.data.comments.map(item => {
    //         if (test.current.indexOf(item.commentId)===-1) {
    //             test.current.push(item.commentId)
    //             setmvcom(mvcom => [...mvcom, item])
    //         }
    //     })
    // })
  }, [page])
  return (
    <div>
      <div className="mv-title">{mvinfo.name}</div>
      <div className="mv-description">{mvinfo.desc}</div>

      <Myvideo src={`${mvurl}`}></Myvideo>
      <div className="side-box">
        <div className="mv-artists">
          歌手：
          {mvinfo.artists &&
            mvinfo.artists.map(item => <span key={item.id}>{item.name}</span>)}
          <span style={{float: "right"}}>播放{mvinfo.playCount}次</span>
        </div>
        <div>
          <span onClick={() => {}}>评论</span>
        </div>
        {mvcom.length > 0 && (
          <Commentlist
            getmore={() => {
              setpage(page => page + 1)
            }}
            data={mvcom}
          />
        )}
      </div>
    </div>
  )
}

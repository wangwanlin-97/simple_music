import axios from "axios"
import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import {useParams} from "react-router-dom"
import List from "../../widgets/List"
import {getsongurl} from "../../redux/store"

function Playlistdetail(props) {
  const {id} = useParams()
  const userinfo = JSON.parse(localStorage.getItem("neteaseToken"))

  const [userid, setuserid] = useState(0)
  useEffect(() => {
    axios.get(`/playlist/detail?id=${id}`).then(res => {
      setuserid(res.data.playlist.userId)
    })
  }, [])

  // useEffect(() => {
  //     const li = document.getElementById('haha')
  //     li.addEventListener('scroll', (e) => {

  //     })

  // })
  // const [songlist, setsonglist] = useState([])

  // useEffect(() => {
  //     axios.get(`/playlist/track/all?id=${id}`).then(res => {

  //         setsonglist(res.data.songs)
  //     })

  //     return () => {

  //     }
  // }, [])

  return (
    <div style={{width: "100vw"}}>
      <List
        userid={userid}
        subscribbutton={userinfo?.account.id === userid ? false : true}
        back={true}
        title="所有歌曲"
        listid={id}
        getsongurl={props.getsongurl}
      />
    </div>
  )
}

export default connect(() => ({}), {getsongurl})(Playlistdetail)

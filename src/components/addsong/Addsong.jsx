import axios from "axios"
import React, {useEffect, useRef, useState} from "react"
import {connect} from "react-redux"
import {useParams} from "react-router-dom"
import {toggleSearchlist} from "../../redux/store"
import List from "../../widgets/List"

function Addsong(props) {
  const userinfo = JSON.parse(localStorage.getItem("neteaseToken"))
  const ipref = useRef()
  const {id} = useParams()
  const [list, setlist] = useState([])

  const {searchlist, toggleSearchlist} = props
  useEffect(() => {
    axios.get(`/record/recent/song?id=${userinfo.account.id}`).then(res => {})
  }, [])

  const test = useRef([])
  const middlelist = useRef([])
  const offset = useRef(0)
  const [more, setmore] = useState(true)

  const getinfo = useRef(() => {
    const temp = []
    test.current = []
    axios
      .get(
        `/cloudsearch?keywords=${ipref.current.value}&offset=${offset.current}`,
      )
      .then(res => {
        if (res.data.result && res.data.result.songCount === 0) {
          setmore(false)
        } else {
          res.data.result.songs &&
            res.data.result.songs.map(item => {
              if (middlelist.current.indexOf(item.id) < 0) {
                test.current.push(item.id)

                temp.push(item)
              }
            })
          middlelist.current = [...middlelist.current, ...temp]

          toggleSearchlist(middlelist.current)
        }

        // //用于筛选歌曲是否能播放
        // res.data.result.songs.map(item => {

        //     axios.get(`/song/url?id=${item.id}`).then(res => {

        //         //歌曲的URL不是null，就将歌曲保存到状态里
        //         if (res.data.data[0].url !== null) {
        //             setdatalist(datalist => { return [...datalist, item] })

        //         }
        //     })

        // })
      })
  })

  return (
    <div>
      <div
        style={{
          width: "100vw",
          display: "flex",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: "3333",
        }}
      >
        <input style={{flex: "1"}} ref={ipref}></input>
        <button
          style={{width: "50px"}}
          onClick={() => {
            middlelist.current = []
            getinfo.current()
          }}
        >
          搜索
        </button>
      </div>
      <div style={{overflow: "auto", width: "100%"}}>
        {searchlist.length > 0 && (
          <List
            listid={id}
            operation={true}
            more={more}
            getmore={() => {
              offset.current += 30
              getinfo.current()
            }}
            data={searchlist}
          ></List>
        )}
      </div>
    </div>
  )
}

export default connect(
  state => {
    return {
      // searchType: state.nowPlayingSlicereducer.searchType,
      searchlist: state.nowPlayingSlicereducer.searchlist,
    }
  },
  {toggleSearchlist},
)(Addsong)

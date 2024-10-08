import axios from "axios"
import React, {useEffect, useRef, useState} from "react"
import {connect} from "react-redux"
import {setIndex} from "../../redux/store"
import {handleGetSongUrl} from "../../methods"
import List from "../../widgets/List"
import {useNavigate} from "react-router-dom"
import "./mylist.css"
import Modelbox from "../../widgets/Modelbox"
import Input from "../../widgets/Input"
import {savePlaylist, toggleshowlist} from "../../redux/store"

function MyList(props) {
  const userinfo = JSON.parse(localStorage.getItem("neteaseToken"))
  const [list, setlist] = useState([])
  const [value, setvalue] = useState("")
  const [flag, setflag] = useState(false)
  const [del_confirm, setdel_confirm] = useState(false)
  const [del_id, setdel_id] = useState(0)
  const {playlist, setIndex, songInfo, savePlaylist, toggleshowlist, showlist} =
    props
  const navigate = useNavigate()
  const ipvalue = d => {
    setvalue(d)
  }

  useEffect(() => {
    userinfo &&
      axios
        .post(
          `/user/playlist?uid=${userinfo.account.id}&timestamp=${Date.now()}`,
        )
        .then(res => {
          setlist(res.data.playlist)
        })
  }, [localStorage.getItem("neteaseToken")])

  return (
    <>
      {flag && (
        <Modelbox
          handleclose={() => {
            setflag(false)
          }}
          modelTitle="创建歌单"
        >
          <Input getvalue={ipvalue} input_item_name="名称" type="text"></Input>

          <Input
            onclick={() => {
              axios.post(`/playlist/create?name=${value}`).then(res => {
                axios
                  .post(
                    `/user/playlist?uid=${
                      userinfo.account.id
                    }&timestamp=${Date.now()}`,
                  )
                  .then(res => {
                    setlist(res.data.playlist)
                  })
                setflag(false)
              })
            }}
            input_item_name="确认"
            type="button"
          ></Input>
          <Input
            onclick={() => {
              setflag(false)
            }}
            input_item_name="取消"
            type="button"
          ></Input>
        </Modelbox>
      )}
      {del_confirm && (
        <Modelbox
          handleclose={() => {
            setdel_confirm(false)
          }}
          modelTitle="确认删除？"
        >
          <Input
            onclick={() => {
              axios
                .post(`/playlist/delete?id=${del_id}&timestamp=${Date.now()}`)
                .then(res => {
                  setdel_confirm(false)
                  setlist(list => list.filter(v => v.id != del_id))
                })
            }}
            input_item_name="确认"
            type="button"
          ></Input>
          <Input
            onclick={() => {
              setdel_confirm(false)
            }}
            input_item_name="取消"
            type="button"
          ></Input>
        </Modelbox>
      )}
      <ul className="myplaylist">
        <li>
          <h4
            onClick={e => {
              toggleshowlist(!showlist)
            }}
            className="listname"
          >
            当前播放列表 {playlist?.length}
          </h4>
          <ul>
            {showlist &&
              playlist.map((item, index) => {
                return (
                  <li
                    className={
                      item.id === songInfo.id ? "active_player " : "listitem"
                    }
                    onClick={() => {
                      setIndex(playlist.indexOf(item))
                      handleGetSongUrl(item.id, {
                        name: item.name,
                        author: item.al.name,
                        picUrl: item.al.picUrl,
                        id: item.id,
                      })
                    }}
                    key={item.id}
                  >
                    {item.name}
                    <span
                      onClick={e => {
                        e.stopPropagation()

                        savePlaylist(playlist.filter(v => v.id !== item.id))
                        if (index < props.currentIndex) {
                          setIndex(props.currentIndex - 1)
                        }
                      }}
                      title={"删除"}
                      className="icon-delete_button"
                    ></span>
                  </li>
                )
              })}
          </ul>
        </li>
        {userinfo && (
          <div>
            <li>
              <h4>
                我创建的歌单
                <span
                  title="新建歌单"
                  onClick={() => {
                    setflag(true)
                  }}
                  className="create_playlist icon-plus"
                ></span>
              </h4>
              <ul>
                {list.length > 0 &&
                  list
                    .filter(item => item.userId === userinfo.account.id)
                    .map(item => {
                      return (
                        <li key={item.id}>
                          <div
                            onClick={e => {
                              navigate(`/playlist/${item.id}`)
                            }}
                            className="listitem"
                          >
                            <img
                              alt="coverimg"
                              className="coverImg"
                              src={`${item.coverImgUrl}?param=50y50`}
                            ></img>
                            <div className="playlistinfo">
                              <span className="playlist_name">{item.name}</span>
                              <span className="song_count">
                                {item.trackCount}&nbsp;songs
                              </span>
                            </div>
                            <div
                              title="删除歌单"
                              onClick={e => {
                                e.stopPropagation()
                                setdel_id(item.id)
                                setdel_confirm(true)
                              }}
                              className="icon-delete"
                            ></div>
                          </div>
                        </li>
                      )
                    })}
              </ul>
            </li>
            <li>
              <h4>我收藏的歌单</h4>
              <ul>
                {list.length > 0 &&
                  list
                    .filter(item => item.userId !== userinfo.account.id)
                    .map(item => {
                      return (
                        <li key={item.id}>
                          <div
                            onClick={e => {
                              navigate(`/playlist/${item.id}`)
                            }}
                            className="listitem"
                          >
                            <img
                              alt="coverimg"
                              style={{display: "block", width: "50px"}}
                              className="coverImg"
                              src={`${item.coverImgUrl}?param=50y50`}
                            ></img>
                            <div className="playlistinfo">
                              <span className="playlist_name">{item.name}</span>
                              <span className="song_count">
                                {item.trackCount}&nbsp;songs
                              </span>
                            </div>
                          </div>
                          {/* <div style={{ height: 0, overflow: 'hidden' }}>
                                <List title='所有歌曲' listid={item.id}  ></List>
                            </div> */}
                        </li>
                      )
                    })}
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  )
}
export default connect(
  state => {
    return {
      // songurl: state.nowPlayingSlicereducer.url,
      // isplaying: state.nowPlayingSlicereducer.isplaying,
      songInfo: state.nowPlayingSlicereducer.songInfo,
      // playInfo: state.nowPlayingSlicereducer.playInfo,
      // time: state.nowPlayingSlicereducer.currentTime,
      currentIndex: state.nowPlayingSlicereducer.currentIndex,
      playlist: state.nowPlayingSlicereducer.playlist,
      showlist: state.nowPlayingSlicereducer.showlist,
      // isShow: state.nowPlayingSlicereducer.isShow,
    }
  },
  {setIndex, savePlaylist, toggleshowlist},
)(MyList)

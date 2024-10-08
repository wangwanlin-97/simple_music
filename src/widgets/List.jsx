import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import axios from "axios"
import "./index.css"
import {useNavigate} from "react-router-dom"
import {connect} from "react-redux"
import {
  getsongurl,
  saveSongInfo,
  savePlaylist,
  setIndex,
  toggleManualyFlag,
} from "../redux/store"
import {toggle} from "../redux/store"
import {handleGetSongUrl} from "../methods"

function List(props) {
  const [count, setcount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [subscribed, setsubscribed] = useState(false)
  const hasmore = useRef(true)

  const userinfo = JSON.parse(localStorage.getItem("neteaseToken"))

  const lastref = useRef()
  const test = useRef([])
  const {
    operation,
    more,
    getmore,
    userid,
    subscribbutton,
    toggleManualyFlag,
    manualyFlag,
    songinfo,
    saveSongInfo,
    isloading,
    data,
    title,
    listid,
    getsongurl,
    back,
    toggle,
    savePlaylist,
    playlist,
    currentIndex,
    setIndex,
  } = props

  const refmore = useRef(more)
  var observer = useRef(
    new IntersectionObserver(
      entries => {
        entries.forEach(item => {
          if (item.isIntersecting) {
            item.target.setAttribute(
              "src",
              item.target.getAttribute("data-src"),
            )
            if (item.target.id === "test") {
              hasmore.current && setOffset(offset => offset + 30)
              // alert(refmore.current)
              if (refmore.current) {
                getmore()
              }
            }
            setcount(() => Math.random())
          }
        })
      },
      {threshold: [1]},
    ),
  )

  const handleGetSongUrl = useRef((id, obj) => {
    toggle(true)
    saveSongInfo(obj)

    // axios.get(`/song/url?id=${id}`).then(res => {

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

  const [songlist, setsonglist] = useState([])
  // const [test, settest] = useState([])
  // const [flag, setflag] = useState(true)
  // const [ok, setok] = useState(true)
  // const [fn, setfn] = useState(null)

  const navigate = useNavigate()
  useEffect(() => {
    subscribbutton &&
      axios.get(`/playlist/detail/dynamic?id=${listid}`).then(res => {
        setsubscribed(res.data.subscribed)
      })
  }, [])

  useEffect(() => {
    // setTimeout(() => {
    if (playlist.length > 0 && manualyFlag) {
      handleGetSongUrl.current(playlist[currentIndex].id, {
        name: playlist[currentIndex].name,
        author: playlist[currentIndex].al.name,
        picUrl: playlist[currentIndex].al.picUrl,
        id: playlist[currentIndex].id,
      })
    }
    // }, 1000);
  }, [playlist])

  // useEffect(() => {
  //     setcurrentid(songinfo.id)
  // }, [songinfo])

  useEffect(() => {
    data
      ? setsonglist(data)
      : axios
          .get(`/playlist/track/all?id=${listid}&limit=${offset}`)
          .then(res => {
            if (res.data.songs.length < offset) {
              hasmore.current = false
            }
            //用于筛选歌曲是否能播放
            res.data.songs.map(item => {
              // axios.get(`/song/url?id=${item.id}`).then(res => {

              //歌曲的URL不是null，就将歌曲保存到状态里
              // if (res.data.data[0].url !== null) {

              // setsonglist(songlist => { return [...songlist, item] })

              if (test.current.indexOf(item.id) < 0) {
                // settest(test.cu => { return [...test, item.id] })
                test.current.push(item.id)
                setsonglist(songlist => {
                  return [...songlist, item]
                })
              }

              // }
              // })
            })

            // setsonglist(res.data.songs)
          })
  }, [props.data, offset])

  useLayoutEffect(() => {
    observer.current.observe(lastref.current)
    const imgs = document.querySelectorAll("img")
    imgs.forEach(item => {
      if (item.getAttribute("src") === "") {
        observer.current.observe(item)
      } else {
        observer.current.unobserve(item)
      }
    })

    return () => {
      observer.current.unobserve(lastref.current)
      imgs.forEach(item => {
        observer.current.unobserve(item)
      })

      // observer.current.disconnect()
    }
  }, [songlist])

  return (
    <>
      <div className="list_container">
        <div className="title_bar">
          <span className="tag_title">
            {title}

            <span
              onClick={() => {
                savePlaylist(songlist)
                toggleManualyFlag(true)
                setIndex(0)
              }}
              className="playall"
            >
              全部播放
            </span>
            {subscribbutton && (
              // 订阅按钮
              <span
                onClick={() => {
                  !subscribed
                    ? axios
                        .get(`/playlist/subscribe?t=1&id=${listid}`)
                        .then(res => {
                          setsubscribed(true)
                        })
                    : axios
                        .get(`/playlist/subscribe?t=2&id=${listid}`)
                        .then(res => {
                          setsubscribed(false)
                        })
                }}
                className={subscribed ? "icon-heart-red" : "icon-heart"}
              ></span>
            )}

            {userid
              ? userid === userinfo?.account.id
              : false && (
                  <span
                    title="添加歌曲"
                    onClick={() => {
                      navigate(`/addsong/${listid}`)
                    }}
                    className="icon-editlist"
                  ></span>
                )}
          </span>
          {back && (
            <span
              onClick={() => {
                navigate(-1)
              }}
              className="float_right"
            >
              back
            </span>
          )}
        </div>
        {
          <ul
            style={{overflow: "auto", height: "100%"}}
            onScroll={e => {}}
            id="haha"
          >
            {
              // data === undefined ?
              songlist.map(item => (
                <li
                  style={{
                    height: "39px",
                  }}
                  className={item.id === songinfo.id ? "active" : ""}
                  onClick={() => {
                    if (operation) {
                      axios
                        .get(
                          `/playlist/tracks?op=add&pid=${listid}&tracks=${item.id}`,
                        )
                        .then(res => {})
                    } else {
                      toggle(false)
                      // playlist.push(item);

                      savePlaylist([item])
                      toggleManualyFlag(true)
                      setIndex(0)

                      // setIndex(playlist.length - 1);
                      handleGetSongUrl.current(item.id, {
                        id: item.id,
                        name: item.name,
                        author: item.al.name,
                        picUrl: item.al.picUrl,
                      })
                    }
                  }}
                  key={item.id}
                >
                  <>
                    <img
                      className="songimg"
                      src={""}
                      data-src={`${item.al.picUrl}?param=35y35`}
                    ></img>
                  </>
                  <span className="songname">{item.name}</span>

                  {userid
                    ? userid === userinfo?.account.id
                    : false && (
                        <span
                          onClick={e => {
                            e.stopPropagation()
                            axios
                              .get(
                                `/playlist/tracks?op=del&pid=${listid}&tracks=${item.id}`,
                              )
                              .then(res => {})
                            setsonglist(songlist =>
                              songlist.filter(i => i.id != item.id),
                            )
                          }}
                          title={"删除"}
                          className="icon-delete_button"
                        ></span>
                      )}
                </li>
              ))
              // : data.map(item => <li onClick={() => { toggle(false); handleGetSongUrl(item.id, { name: item.name, author: item.al.name, picUrl: item.al.picUrl }); }} key={item.id}>
              //     <><img className='songimg' src={item.al.picUrl}></img></>
              //     <span className='songname'>{item.name}</span>

              // </li>)
            }
            <li
              ref={lastref}
              id="test"
              style={{height: "30px", textAlign: "center"}}
              onClick={evt => {}}
            ></li>
          </ul>
        }
      </div>
    </>
  )
}

export default connect(
  state => ({
    isloading: state.sideBarSlicereducer.isLoading,
    playlist: state.nowPlayingSlicereducer.playlist,
    currentIndex: state.nowPlayingSlicereducer.currentIndex,
    songinfo: state.nowPlayingSlicereducer.songInfo,
    manualyFlag: state.nowPlayingSlicereducer.manualyFlag,
  }),
  {saveSongInfo, toggle, getsongurl, savePlaylist, setIndex, toggleManualyFlag},
)(List)

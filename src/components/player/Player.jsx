import React, {useEffect, useRef, useState} from "react"
import {connect} from "react-redux"
import {
  toggle,
  changebig,
  setIndex,
  toggleIsShow,
  toggleManualyFlag,
  list,
  toggleplaymode,
} from "../../redux/store"
import {handleGetSongUrl} from "../../methods"
import axios from "axios"
import Commentlist from "../../widgets/Commentlist"

function Player(props) {
  const barref = useRef()
  const spotref = useRef()
  const totalbarref = useRef()
  const pref = useRef()
  const {
    isplaying,
    toggle,
    changebig,
    songInfo,
    playInfo,
    setIndex,
    currentIndex,
    playlist,
    isShow,
    toggleIsShow,
    toggleManualyFlag,
    playmode,
    toggleplaymode,
  } = props
  const [prew, setprew] = useState(0)
  const [start, setstart] = useState(0)
  const [dragw, setdragw] = useState(0)
  const [isdrag, setisdrag] = useState(false)
  const [lyric, setlyric] = useState([])
  const [splittime, setsplittime] = useState([])
  const [songcom, setsongcom] = useState([])
  const [page, setpage] = useState(0)
  const [showsongcom, setshowsongcom] = useState(false)
  const test = useRef([])

  const lyricbox = useRef(null)
  const lrcindex = useRef(0)
  const transY = useRef("0px")
  const mode = ["icon-sort", "icon-circle", "icon-shuffle", "icon-single"]
  const m_titile = ["顺序播放", "循环播放", "随机播放", "单曲循环"]

  useEffect(() => {
    setpage(0)
    setsongcom([])
    transY.current = "0px"
    lrcindex.current = 0
    playlist.length > 0 &&
      axios.get(`/lyric?id=${playlist[currentIndex].id}`).then(res => {
        let outertemp = []

        res.data.lrc.lyric.split(/[\n]/).map(item => {
          let temp = item.split(/\[(.+?)\]/)

          outertemp.push({
            time: temp[1],
            lrc: temp[2],
          })
        })
        setlyric(outertemp.filter(item => item.time))
      })
  }, [currentIndex])

  useEffect(() => {
    showsongcom &&
      axios
        .get(`/comment/music?id=${songInfo.id}&&offset=${20 * page}`)
        .then(res => {
          res.data.comments.map(item => {
            if (test.current.indexOf(item.commentId) === -1) {
              test.current.push(item.commentId)
              setsongcom(songcom => [...songcom, item])
            }
          })
        })
  }, [page, currentIndex])

  useEffect(() => {
    !isdrag &&
      (() => {
        barref.current.style.width =
          Math.floor(
            (totalbarref.current.clientWidth * playInfo.currentTime) /
              playInfo.duration,
          ) + "px"
      })()
    const d = new Date()

    for (let i = 0; i < lyric.length; i++) {
      if (lyric.length > 0) {
        // if (lyric[i + 1] && playInfo.currentTime < (lyric[i + 1].time.split(':')[0] * 60 + lyric[i + 1].time.split(':')[1] * 1) && playInfo.currentTime > (lyric[i].time.split(':')[0] * 60 + lyric[i].time.split(':')[1] * 1)) {

        //     lrcindex.current = i
        //     transY.current = `-${i * 27}px`
        // }
        if (
          lyric[i].time.split(":")[0] * 60 +
            lyric[i].time.split(":")[1] * 1 -
            playInfo.currentTime <
          0.01
        ) {
          lrcindex.current = i

          transY.current = `-${i * 27}px`
        }
      }
    }

    if (lrcindex.current < lyric.length - 1) {
      const a =
        (playInfo.currentTime -
          (lyric[lrcindex.current].time.split(":")[0] * 60 +
            lyric[lrcindex.current].time.split(":")[1] * 1)) /
        (lyric[lrcindex.current + 1].time.split(":")[0] * 60 +
          lyric[lrcindex.current + 1].time.split(":")[1] * 1 -
          (lyric[lrcindex.current].time.split(":")[0] * 60 +
            lyric[lrcindex.current].time.split(":")[1] * 1))

      setsplittime(a)
    } else if (lrcindex.current === lyric.length - 1) {
      const a =
        (playInfo.currentTime -
          (lyric[lrcindex.current].time.split(":")[0] * 60 +
            lyric[lrcindex.current].time.split(":")[1] * 1)) /
        (playInfo.duration -
          (lyric[lrcindex.current].time.split(":")[0] * 60 +
            lyric[lrcindex.current].time.split(":")[1] * 1))
      setsplittime(a)
    }

    // let interval1 = setInterval(() => {
    //     // barref.current.style.width = totalbarref.current.clientWidth * Math.random() + 'px'

    // }, 1000)

    // return () => {
    //     clearInterval(interval1)

    // }
  }, [playInfo, lyric])
  // useEffect(() => {
  //     handleGetSongUrl(playlist[currentIndex].id, {
  //         name: playlist[currentIndex].name,
  //         author: playlist[currentIndex].al.name,
  //         picUrl: playlist[currentIndex].al.picUrl,
  //         id: playlist[currentIndex].id
  //     })

  // }, [currentIndex])

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      setIndex(currentIndex + 1)
    } else {
      if (playmode === 1) {
        setIndex(0)
      } else {
        alert("已经是最后一首了！")
      }
    }
  }
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1)
    } else {
      alert("再不能后退了，我也是有底限的[○･｀Д´･ ○]")
    }
  }
  // setInterval(() => {

  // }, 1000)

  // let start = 0
  // let move = 0
  // let end = 0
  // let prewidth = 0
  return (
    <div>
      <div
        onClick={() => {
          axios.get(`/comment/music?id=${songInfo.id}`).then(res => {
            setsongcom(res.data.comments)
          })
          setshowsongcom(true)
        }}
        className="icon-comments"
      ></div>

      {showsongcom && songcom.length > 0 && (
        <div className="songcombox">
          <div className="com_title">
            评论
            <span
              onClick={() => {
                setshowsongcom(false)
              }}
              className="back"
            >
              返回
            </span>
          </div>
          <Commentlist
            getmore={() => {
              setpage(page => page + 1)
            }}
            data={songcom}
          />
        </div>
      )}
      <div className="player">
        <div
          style={{background: `url(${songInfo.picUrl}) `, filter: "blur(20px)"}}
          className="play_background"
        ></div>
        <div className="player_header">
          <div
            onClick={() => {
              changebig(false)
            }}
            className="back"
          >
            返回
          </div>
          <i className="playing_songname">{songInfo.name}</i>
        </div>
        <div className="cd">
          <img
            // onClick={() => { toggle(!isplaying) }}
            className={isplaying ? "rotate" : "paused"}
            src={`${songInfo.picUrl}`}
          />
        </div>
        <div
          ref={lyricbox}
          // onScroll={(e) => {

          // }}
          className="lyric"
        >
          <ul style={{transform: `translate(-50%,${transY.current})`}}>
            {lyric.length > 0 &&
              lyric.map((item, index, a) => {
                return (
                  <li
                    className={index === lrcindex.current ? "lyric-active" : ""}
                    key={Math.random()}
                  >
                    <span
                      style={
                        index === lrcindex.current
                          ? {
                              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0,.75) 0% ${
                                splittime * 100
                              }%,rgba(238, 229, 227,.5) ${
                                splittime * 100
                              }% 100%)`,
                            }
                          : {}
                      }
                    >
                      {item.lrc}
                    </span>
                    <i>{}</i>
                  </li>
                )
              })}
          </ul>
        </div>
        {isShow && (
          <div
            onClick={() => {
              toggleIsShow(false)
            }}
            className="virtuebar"
          ></div>
        )}

        <div ref={pref} className="progress_bar">
          {isShow && (
            <ul className="list player_list">
              {playlist.map(item => {
                return (
                  <li
                    className={item.id === songInfo.id ? "active_player" : ""}
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
                  </li>
                )
              })}
            </ul>
          )}
          <span className="start">
            {Math.floor(playInfo.currentTime / 60)}:
            {playInfo.currentTime % 60 < 10
              ? 0 + `${Math.floor(playInfo.currentTime % 60)}`
              : Math.floor(playInfo.currentTime % 60)}
          </span>
          <span
            onClick={e => {
              e.stopPropagation()
              console.log(
                e.clientX -
                  e.target.offsetLeft -
                  e.target.offsetParent.offsetLeft +
                  e.target.offsetParent.clientWidth / 2,
              )
              props.change(
                ((e.clientX -
                  e.target.offsetLeft -
                  e.target.offsetParent.offsetLeft +
                  e.target.offsetParent.clientWidth / 2) /
                  e.target.clientWidth) *
                  props.playInfo.duration,
              )

              !isplaying && props.play()

              toggleManualyFlag(true)
            }}
            ref={totalbarref}
            className="bar"
          >
            <span
              onClick={e => {
                e.stopPropagation()
                console.log(
                  e.clientX -
                    e.target.offsetParent.offsetLeft -
                    e.target.offsetParent.offsetParent.offsetLeft +
                    e.target.offsetParent.offsetParent.clientWidth / 2,
                )
                props.change(
                  ((e.clientX -
                    e.target.offsetParent.offsetLeft -
                    e.target.offsetParent.offsetParent.offsetLeft +
                    e.target.offsetParent.offsetParent.clientWidth / 2) /
                    e.target.offsetParent.clientWidth) *
                    props.playInfo.duration,
                )
                !isplaying && props.play()
                toggleManualyFlag(true)
              }}
              ref={barref}
              className="hover_bar"
            >
              <i
                onClick={e => {
                  e.stopPropagation()
                }}
                ref={spotref}
                onTouchStart={evt => {
                  setisdrag(true)
                  setstart(evt.changedTouches[0].clientX)
                  setprew(barref.current.clientWidth)
                }}
                onTouchMove={evt => {
                  setdragw(
                    prew + evt.changedTouches[0].clientX - start >
                      totalbarref.current.clientWidth
                      ? totalbarref.current.clientWidth
                      : prew + evt.changedTouches[0].clientX - start,
                  )
                  barref.current.style.width = dragw + "px"
                }}
                onTouchEnd={() => {
                  setisdrag(false)
                  props.change(
                    (dragw / totalbarref.current.clientWidth) *
                      props.playInfo.duration,
                  )
                }}
                className="spot"
              ></i>
            </span>
          </span>
          <span className="end">
            {!playInfo.duration ? "0" : Math.floor(playInfo.duration / 60)}:
            {!playInfo.duration
              ? "00"
              : playInfo.duration % 60 < 10
              ? 0 + `${Math.floor(playInfo.duration % 60)}`
              : Math.floor(playInfo.duration % 60)}
          </span>
        </div>

        <div className="controll_bar">
          <span
            onClick={() => {
              if (playmode < 3) {
                toggleplaymode(playmode + 1)
              } else {
                toggleplaymode(0)
              }
            }}
            title={m_titile[playmode]}
            className={mode[playmode]}
          ></span>
          <span
            onClick={() => {
              handlePrevious()
            }}
            className="icon-left"
          ></span>
          <span
            onClick={() => {
              // toggle(!isplaying);
              isplaying
                ? (() => {
                    props.pause()
                    toggleManualyFlag(false)
                    // props.cleartimmer()
                  })()
                : (() => {
                    props.play()
                    toggleManualyFlag(true)
                    // props.starttimmer()
                  })()
            }}
            className={isplaying ? "icon-paused" : "icon-playing"}
          ></span>
          <span
            onClick={() => {
              handleNext()
            }}
            className="icon-right"
          ></span>
          <span
            onClick={() => {
              toggleIsShow(!isShow)
            }}
            className="icon-currentlist-little"
          ></span>
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => {
    return {
      songurl: state.nowPlayingSlicereducer.url,
      isplaying: state.nowPlayingSlicereducer.isplaying,
      songInfo: state.nowPlayingSlicereducer.songInfo,
      playInfo: state.nowPlayingSlicereducer.playInfo,
      time: state.nowPlayingSlicereducer.currentTime,
      currentIndex: state.nowPlayingSlicereducer.currentIndex,
      playlist: state.nowPlayingSlicereducer.playlist,
      isShow: state.nowPlayingSlicereducer.isShow,
      playmode: state.nowPlayingSlicereducer.playmode,
    }
  },
  {
    toggle,
    changebig,
    setIndex,
    toggle,
    toggleIsShow,
    toggleManualyFlag,
    toggleplaymode,
  },
)(Player)

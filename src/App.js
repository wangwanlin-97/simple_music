import "./App.css"

import MyRoutes from "./router/MyRoutes"
import {connect} from "react-redux"
import {useEffect, useRef, useState} from "react"
import {
  toggle,
  savePlayInfo,
  setIndex,
  savePlaylist,
  toggleManualyFlag,
  toggleIsShow,
  toggleprestate,
} from "./redux/store"
import Miniplayer from "./components/miniplayer/Miniplayer"
import Player from "./components/player/Player"
// import { icons } from 'antd/lib/image/PreviewGroup';
import {handleGetSongUrl} from "./methods"

function App(props) {
  // const [alltimer, setalltimmer] = useState([])

  const audisref = useRef()
  const mainref = useRef()
  const [totop, settotop] = useState(false)
  const [singlecircle, setsinglecircle] = useState(0)

  const {
    ismvplaying,
    isplaying,
    toggle,
    currentIndex,
    setIndex,
    savePlaylist,
    playlist,
    toggleManualyFlag,
    manualyFlag,
    toggleIsShow,
    isshow,
    playmode,
    prestate,
    toggleprestate,
  } = props

  useEffect(() => {
    isplaying ? audisref.current.play() : audisref.current.pause()
  }, [isplaying])
  useEffect(() => {
    if (ismvplaying) {
      toggleprestate(isplaying)
      if (isplaying) toggle(false)
    } else {
      if (playlist.length > 0 && prestate) toggle(true)
    }
  }, [ismvplaying])

  useEffect(() => {
    if (playlist.length > 0 && manualyFlag) {
      handleGetSongUrl(playlist[currentIndex].id, {
        name: playlist[currentIndex].name,
        author: playlist[currentIndex].al.name,
        picUrl: playlist[currentIndex].al.picUrl,
        id: playlist[currentIndex].id,
      })
    }
  }, [currentIndex, singlecircle])

  const runtimmer = () => {
    closetimmer()
    setInterval(() => {
      props.savePlayInfo({
        duration: audisref.current.duration,
        currentTime: audisref.current.currentTime,
      })
    }, 100)
  }
  const closetimmer = () => {
    //清除所有定时器
    var qc = setInterval(() => {}, 1)
    for (var i = 0; i < qc; i++) {
      clearInterval(i)
    }
  }
  const handleEnd = () => {
    audisref.current.pause()
    props.toggle(false)
    closetimmer()

    //顺序播放
    if (playmode === 0) {
      if (currentIndex === playlist.length - 1) {
        toggle(false)
        closetimmer()
        toggleManualyFlag(false)
      } else {
        setIndex(currentIndex + 1)
        runtimmer()
      }
    }
    //循环播放
    else if (playmode === 1) {
      if (playlist.length === 1) {
        //列表只有一首歌曲，则单曲循环
        setsinglecircle(Math.random())
      }
      //歌曲数大于一
      else {
        //是最后一首，切换到第一首
        if (currentIndex === playlist.length - 1) {
          setIndex(0)
        }
        //不是最后一首，切换下一首
        else {
          setIndex(currentIndex + 1)
          runtimmer()
        }
      }
    }
    //随机播放
    else if (playmode === 2) {
      if (playlist.length === 1) {
        setsinglecircle(Math.random())
      } else {
        var a = Math.floor(Math.random() * (playlist.length - 1))
        if (currentIndex !== a) {
          setIndex(a)
        } else {
          if (currentIndex === 0) {
            setIndex(1)
          } else {
            setIndex(playlist.length - 1)
          }
        }
      }
    }
    //单曲循环
    else {
      setsinglecircle(Math.random())
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <div
        ref={mainref}
        onScroll={e => {
          if (mainref.current && mainref.current.scrollTop > 607) {
            settotop(true)
          } else {
            settotop(false)
          }
        }}
        className="main"
        style={{
          flex: "1",
          overflow: "scroll",
          width: "100vw",
          //  position: 'relative'
        }}
      >
        <MyRoutes></MyRoutes>
      </div>
      {isshow && (
        <div
          onClick={() => {
            toggleIsShow(false)
          }}
          className="virtuebar"
        ></div>
      )}
      {totop && (
        <div
          onClick={() => {
            mainref.current.scrollTop = "0"
            settotop(false)
          }}
          className="totop"
        >
          返回顶部
        </div>
      )}

      <div
        style={{
          // height: '50px',
          overflow: "hidden",
        }}
      >
        <audio
          onEmptied={() => {}}
          onAbort={() => {}}
          onStalled={() => {}}
          onPlay={() => {
            runtimmer()
          }}
          onEnded={() => {
            handleEnd()
          }}
          ref={audisref}
          className="w"
          autoPlay
          style={{display: "none", width: "100vw", height: "0"}}
          controls
          src={
            playlist.length > 0
              ? `https://music.163.com/song/media/outer/url?id=${playlist[currentIndex].id}.mp3 `
              : ""
          }
        ></audio>
        {!props.isbig && isplaying && (
          <Miniplayer
            // cleartimmer={() => { closetimmer() }}
            // starttimmer={() => { runtimmer() }}
            play={() => {
              audisref.current.play().then(
                () => {
                  runtimmer()
                  toggle(!isplaying)
                },
                () => {
                  alert("The element has no supported sources.")
                },
              )
            }}
            pause={() => {
              audisref.current.pause()
              closetimmer()
              toggle(!isplaying)
            }}
          ></Miniplayer>
        )}
      </div>

      {props.isbig && (
        <Player
          change={t => {
            audisref.current.currentTime = t
          }}
          play={() => {
            audisref.current.play().then(
              () => {
                runtimmer()
                toggle(!isplaying)
              },
              () => {
                alert("The element has no supported sources.")
              },
            )
          }}
          pause={() => {
            audisref.current.pause()
            closetimmer()
            toggle(!isplaying)
          }}
        />
      )}
    </div>
  )
}

export default connect(
  state => {
    return {
      songurl: state.nowPlayingSlicereducer.url,
      isplaying: state.nowPlayingSlicereducer.isplaying,
      isbig: state.nowPlayingSlicereducer.isbig,
      playInfo: state.nowPlayingSlicereducer.playInfo,
      currentIndex: state.nowPlayingSlicereducer.currentIndex,
      playlist: state.nowPlayingSlicereducer.playlist,
      manualyFlag: state.nowPlayingSlicereducer.manualyFlag,
      isshow: state.nowPlayingSlicereducer.isShow,
      playmode: state.nowPlayingSlicereducer.playmode,
      ismvplaying: state.nowPlayingSlicereducer.ismvplaying,
      prestate: state.nowPlayingSlicereducer.prestate,
    }
  },
  {
    toggle,
    savePlayInfo,
    setIndex,
    toggleManualyFlag,
    toggleIsShow,
    toggleprestate,
  },
)(App)

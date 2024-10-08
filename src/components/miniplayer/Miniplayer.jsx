import React, {useState} from "react"
import {connect} from "react-redux"

import {useEffect, useRef} from "react"
import {
  toggle,
  changebig,
  savePlaylist,
  setIndex,
  toggleIsShow,
  saveSongInfo,
  toggleManualyFlag,
} from "../../redux/store"
import {handleGetSongUrl} from "../../methods"

function Miniplayer(props) {
  const canvasref = useRef()
  const {
    currentIndex,
    isplaying,
    toggle,
    changebig,
    songInfo,
    playInfo,
    playlist,
    toggleIsShow,
    isShow,
    setIndex,
    toggleManualyFlag,
    manualyFlag,
  } = props
  const progress = playInfo.currentTime / playInfo.duration
  const [list, setlist] = useState([])

  useEffect(() => {
    if (canvasref.current) {
      const ctx = canvasref.current.getContext("2d")
      ctx.clearRect(0, 0, canvasref.current.width, canvasref.current.height)
      ctx.lineWidth = "1"
      ctx.beginPath()
      ctx.arc(
        15,
        15,
        12,
        (-1 * Math.PI) / 2,
        2 * Math.PI * progress - Math.PI / 2,
        false,
      )

      ctx.stroke()
    }
  }, [progress])
  // useEffect(() => {
  //     if (playlist.length > 0 && manualyFlag) {
  //         handleGetSongUrl(playlist[currentIndex].id, {
  //             name: playlist[currentIndex].name,
  //             author: playlist[currentIndex].al.name,
  //             picUrl: playlist[currentIndex].al.picUrl,
  //             id: playlist[currentIndex].id
  //         })
  //     }
  // }, [currentIndex])
  // useEffect(() => {
  //     setlist(playlist)

  // }, [playlist])

  return (
    <>
      <div className="miniplayer">
        <i
          onClick={() => {
            changebig(true)
          }}
          className={isplaying ? "rotate mini_img" : "paused mini_img"}
          style={{
            background: `url("${songInfo.picUrl}")center / 50px 50px `,
            overflow: "hidden",
          }}
          // src={`${songInfo.picUrl}`}
        />
        <div className="minibar">
          <div className="info">
            <span className="songname">{songInfo.name}</span>
            <span className="artist">{songInfo.author}</span>
          </div>
          <div className="minicontroll">
            <div
              onClick={() => {
                // toggle(!isplaying);
                isplaying
                  ? (() => {
                      props.pause()
                      toggleManualyFlag(false)

                      //  props.cleartimmer()
                    })()
                  : (() => {
                      props.play()
                      toggleManualyFlag(true)
                    })()
              }}
              className={isplaying ? "icon-paused" : "icon-playing"}
            >
              <canvas
                className="canvas"
                height={"30px"}
                width={"30px"}
                ref={canvasref}
              ></canvas>
            </div>
            <div
              onClick={() => {
                toggleIsShow(!isShow)
              }}
              className="icon-currentlist"
            ></div>
          </div>
        </div>
      </div>
      {isShow && (
        <ul className="list">
          {playlist.map(item => {
            return (
              <li
                className={item.id === songInfo.id ? "active" : ""}
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
    </>
  )
}

export default connect(
  state => {
    return {
      songurl: state.nowPlayingSlicereducer.url,
      isplaying: state.nowPlayingSlicereducer.isplaying,
      songInfo: state.nowPlayingSlicereducer.songInfo,
      playInfo: state.nowPlayingSlicereducer.playInfo,
      playlist: state.nowPlayingSlicereducer.playlist,
      playIndex: state.nowPlayingSlicereducer.currentIndex,
      isShow: state.nowPlayingSlicereducer.isShow,
      currentIndex: state.nowPlayingSlicereducer.currentIndex,
      manualyFlag: state.nowPlayingSlicereducer.manualyFlag,
    }
  },
  {toggle, changebig, savePlaylist, setIndex, toggleIsShow, toggleManualyFlag},
)(Miniplayer)

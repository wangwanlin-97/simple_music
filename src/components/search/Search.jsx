import axios from "axios"
import React, {useEffect, useRef, useState, useLayoutEffect} from "react"
import List from "../../widgets/List"
import Albumlist from "../../widgets/Albumlist"
import Artist from "../../widgets/Artist"
import Biglist from "../../widgets/Biglist"
import {connect} from "react-redux"
import {
  toggleSearchlist,
  toggleSearchType,
  togglesearchword,
} from "../../redux/store"
import User from "../../widgets/User"
import Mv from "../../widgets/Mv"
import {useNavigate} from "react-router-dom"
import Video from "../../widgets/Video"

function Search(props) {
  const {
    toggleSearchlist,
    toggleSearchType,
    togglesearchword,
    searchType,
    searchlist,
    searchword,
  } = props
  const searchref = useRef()
  const searchtype = useRef(1)
  const [datalist, setdatalist] = useState([])
  const test = useRef([])
  const middlelist = useRef([])
  const offset = useRef(0)
  const [more, setmore] = useState(true)
  // const url = useRef([])

  const navigate = useNavigate()
  const getinfo = useRef(a => {
    // setdatalist(() => { return [] })
    // more.current = true
    const temp = []
    test.current = []
    axios
      .get(
        `/cloudsearch?keywords=${searchref.current.value}&type=${a}&offset=${offset.current}`,
      )
      .then(res => {
        setmore(true)

        switch (a) {
          case 1:
            if (res.data.result && res.data.result.songCount === 0) {
              setmore(false)
              break
            } else {
              res.data.result.songs &&
                res.data.result.songs.map(item => {
                  toggleSearchType(1)
                  searchtype.current = 1

                  // axios.get(`http://localhost:3000/getimage/song/media/outer/url/?id=${item.id}.mp3`).then(res => {

                  //歌曲的URL不是null，就将歌曲保存到状态里

                  // if (res.data.data[0].url !== null) {

                  // setsonglist(songlist => { return [...songlist, item] })

                  if (middlelist.current.indexOf(item.id) < 0) {
                    // settest(test.cu => { return [...test, item.id] })
                    test.current.push(item.id)
                    // setdatalist(datalist => { return [...datalist, item] })
                    temp.push(item)
                  }

                  // }
                  // })
                })
              // setdatalist(datalist => [...datalist, ...temp])

              middlelist.current = [...middlelist.current, ...temp]

              toggleSearchlist(middlelist.current)
            }
            break
          case 10:
            if (res.data.result && res.data.result.albumCount === 0) {
              setmore(false)
              break
            } else {
              res.data.result.albums &&
                res.data.result.albums.map(item => {
                  toggleSearchType(10)

                  searchtype.current = 10

                  // axios.get(`http://localhost:3000/getimage/song/media/outer/url/?id=${item.id}.mp3`).then(res => {

                  //歌曲的URL不是null，就将歌曲保存到状态里

                  // if (res.data.data[0].url !== null) {

                  // setsonglist(songlist => { return [...songlist, item] })

                  if (test.current.indexOf(item.id) < 0) {
                    // settest(test.cu => { return [...test, item.id] })
                    test.current.push(item.id)
                    // setdatalist(datalist => { return [...datalist, item] })
                    temp.push(item)
                  }

                  // }
                  // })
                })
              middlelist.current = [...middlelist.current, ...temp]

              toggleSearchlist(middlelist.current)

              break
            }
          case 100:
            if (res.data.result && res.data.result.artistCount === 0) {
              setmore(false)
              break
            } else {
              res.data.result.artists &&
                res.data.result.artists.map(item => {
                  toggleSearchType(100)

                  searchtype.current = 100

                  // axios.get(`http://localhost:3000/getimage/song/media/outer/url/?id=${item.id}.mp3`).then(res => {

                  //歌曲的URL不是null，就将歌曲保存到状态里

                  // if (res.data.data[0].url !== null) {

                  // setsonglist(songlist => { return [...songlist, item] })

                  if (test.current.indexOf(item.id) < 0) {
                    // settest(test.cu => { return [...test, item.id] })
                    test.current.push(item.id)
                    // setdatalist(datalist => { return [...datalist, item] })
                    temp.push(item)
                  }

                  // }
                  // })
                })
              middlelist.current = [...middlelist.current, ...temp]

              toggleSearchlist(middlelist.current)

              break
            }
          case 1000:
            if (res.data.result && res.data.result.playlistCount === 0) {
              setmore(false)
              break
            } else {
              res.data.result.playlists &&
                res.data.result.playlists.map(item => {
                  searchtype.current = 1000
                  toggleSearchType(1000)

                  // axios.get(`http://localhost:3000/getimage/song/media/outer/url/?id=${item.id}.mp3`).then(res => {

                  //歌曲的URL不是null，就将歌曲保存到状态里

                  // if (res.data.data[0].url !== null) {

                  // setsonglist(songlist => { return [...songlist, item] })

                  if (test.current.indexOf(item.id) < 0) {
                    // settest(test.cu => { return [...test, item.id] })
                    test.current.push(item.id)
                    // setdatalist(datalist => { return [...datalist, item] })
                    temp.push(item)
                  }

                  // }
                  // })
                })
              middlelist.current = [...middlelist.current, ...temp]

              toggleSearchlist(middlelist.current)
            }

            break
          case 1002:
            if (res.data.result?.userprofileCount === 0) {
              setmore(false)
              break
            } else {
              res.data.result.userprofiles &&
                res.data.result.userprofiles.map(item => {
                  searchtype.current = 1002
                  toggleSearchType(1002)

                  // axios.get(`http://localhost:3000/getimage/song/media/outer/url/?id=${item.id}.mp3`).then(res => {

                  //歌曲的URL不是null，就将歌曲保存到状态里

                  // if (res.data.data[0].url !== null) {

                  // setsonglist(songlist => { return [...songlist, item] })
                  console.log(
                    "find",
                    test.current.indexOf(item.userId),
                    item.nickname,
                  )

                  if (test.current.indexOf(item.userId) < 0) {
                    // settest(test.cu => { return [...test, item.id] })
                    test.current.push(item.userId)
                    // setdatalist(datalist => { return [...datalist, item] })
                    temp.push(item)
                  }

                  // }
                  // })
                })
              middlelist.current = [...middlelist.current, ...temp]

              toggleSearchlist(middlelist.current)
            }

            break
          case 1004:
            if (res.data.result?.mvCount === 0) {
              setmore(false)
              break
            } else {
              res.data.result.mvs &&
                res.data.result.mvs.map(item => {
                  searchtype.current = 1004
                  toggleSearchType(1004)

                  // axios.get(`http://localhost:3000/getimage/song/media/outer/url/?id=${item.id}.mp3`).then(res => {

                  //歌曲的URL不是null，就将歌曲保存到状态里

                  // if (res.data.data[0].url !== null) {

                  // setsonglist(songlist => { return [...songlist, item] })

                  if (test.current.indexOf(item.id) < 0) {
                    // settest(test.cu => { return [...test, item.id] })
                    test.current.push(item.id)
                    // setdatalist(datalist => { return [...datalist, item] })
                    temp.push(item)
                  }

                  // }
                  // })
                })
              middlelist.current = [...middlelist.current, ...temp]

              toggleSearchlist(middlelist.current)
            }

            break
          case 1006:
            if (res.data.result?.songCount === 0) {
              setmore(false)
              break
            } else {
              res.data.result.songs &&
                res.data.result.songs.map(item => {
                  searchtype.current = 1006
                  toggleSearchType(1006)

                  // axios.get(`http://localhost:3000/getimage/song/media/outer/url/?id=${item.id}.mp3`).then(res => {

                  //歌曲的URL不是null，就将歌曲保存到状态里

                  // if (res.data.data[0].url !== null) {

                  // setsonglist(songlist => { return [...songlist, item] })

                  if (test.current.indexOf(item.id) < 0) {
                    // settest(test.cu => { return [...test, item.id] })
                    test.current.push(item.id)
                    // setdatalist(datalist => { return [...datalist, item] })
                    temp.push(item)
                  }

                  // }
                  // })
                })
              middlelist.current = [...middlelist.current, ...temp]

              toggleSearchlist(middlelist.current)
            }

            break
          case 1014:
            if (res.data.result?.videoCount === 0) {
              setmore(false)
              break
            } else {
              res.data.result.videos?.map(item => {
                searchtype.current = 1014
                toggleSearchType(1014)

                // axios.get(`http://localhost:3000/getimage/song/media/outer/url/?id=${item.id}.mp3`).then(res => {

                //歌曲的URL不是null，就将歌曲保存到状态里

                // if (res.data.data[0].url !== null) {

                // setsonglist(songlist => { return [...songlist, item] })

                if (test.current.indexOf(item.vid) < 0) {
                  // settest(test.cu => { return [...test, item.id] })
                  test.current.push(item.vid)
                  // setdatalist(datalist => { return [...datalist, item] })
                  temp.push(item)
                }

                // }
                // })
              })
              middlelist.current = [...middlelist.current, ...temp]

              toggleSearchlist(middlelist.current)
            }

            break
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
  // useLayoutEffect(() => {
  //     setdatalist(() => url.current)

  // }, [url.current.length])

  return (
    <>
      <div className="searchBar">
        <button
          style={{
            width: "40px",
            lineHeight: "30px",
            border: "1px solid #ccc",
            backgroundColor: "yellow",
          }}
          onClick={() => {
            navigate(-1)
          }}
        >
          返回
        </button>
        <input
          onKeyUp={e => {
            if (e.key === "Enter") {
              middlelist.current = []
              getinfo.current(1)
            }
          }}
          value={searchword}
          onChange={e => {
            togglesearchword(e.target.value)
          }}
          ref={searchref}
          type={"text"}
        />
        <button
          onClick={() => {
            middlelist.current = []
            getinfo.current(1)
          }}
        >
          搜索
        </button>
      </div>

      {searchlist.length > 0 && (
        <div className="category">
          <span
            className={searchType === 1 ? "active" : ""}
            onClick={() => {
              middlelist.current = []
              offset.current = 0
              getinfo.current(1)
            }}
          >
            单曲
          </span>
          <span
            className={searchType === 10 ? "active" : ""}
            onClick={() => {
              middlelist.current = []
              offset.current = 0
              getinfo.current(10)
            }}
          >
            专辑
          </span>
          <span
            className={searchType === 100 ? "active" : ""}
            onClick={() => {
              middlelist.current = []
              offset.current = 0
              getinfo.current(100)
            }}
          >
            歌手
          </span>
          <span
            className={searchType === 1000 ? "active" : ""}
            onClick={() => {
              middlelist.current = []
              offset.current = 0
              getinfo.current(1000)
            }}
          >
            歌单
          </span>
          <span
            className={searchType === 1002 ? "active" : ""}
            onClick={() => {
              middlelist.current = []
              offset.current = 0
              getinfo.current(1002)
            }}
          >
            用户
          </span>
          <span
            className={searchType === 1004 ? "active" : ""}
            onClick={() => {
              middlelist.current = []
              offset.current = 0
              getinfo.current(1004)
            }}
          >
            MV
          </span>
          <span
            className={searchType === 1006 ? "active" : ""}
            onClick={() => {
              middlelist.current = []
              offset.current = 0
              getinfo.current(1006)
            }}
          >
            歌词
          </span>
        </div>
      )}

      {searchlist.length > 0 && (
        <div className="searchlist">
          {searchType === 1 && (
            <List
              del={false}
              more={more}
              getmore={() => {
                offset.current += 30
                getinfo.current(1)
              }}
              data={searchlist}
            ></List>
          )}
          {searchType === 10 && (
            <Albumlist
              more={more}
              getmore={() => {
                offset.current += 30
                getinfo.current(10)
              }}
              data={searchlist}
            ></Albumlist>
          )}
          {searchType === 100 && (
            <Artist
              more={more}
              getmore={() => {
                offset.current += 30
                getinfo.current(100)
              }}
              data={searchlist}
            ></Artist>
          )}
          {searchType === 1000 && (
            <Biglist
              more={more}
              getmore={() => {
                offset.current += 30
                getinfo.current(1000)
              }}
              data={searchlist}
            ></Biglist>
          )}
          {searchType === 1002 && (
            <User
              more={more}
              getmore={() => {
                offset.current += 30
                getinfo.current(1002)
              }}
              data={searchlist}
            ></User>
          )}
          {searchType === 1004 && (
            <Mv
              more={more}
              getmore={() => {
                offset.current += 30
                getinfo.current(1004)
              }}
              data={searchlist}
            ></Mv>
          )}
          {searchType === 1006 && (
            <List
              del={false}
              more={more}
              getmore={() => {
                offset.current += 30
                getinfo.current(1006)
              }}
              data={searchlist}
            ></List>
          )}
        </div>
      )}
    </>
  )
}

export default connect(
  state => {
    return {
      searchType: state.nowPlayingSlicereducer.searchType,
      searchlist: state.nowPlayingSlicereducer.searchlist,
      searchword: state.nowPlayingSlicereducer.searchword,
    }
  },
  {toggleSearchlist, toggleSearchType, togglesearchword},
)(Search)

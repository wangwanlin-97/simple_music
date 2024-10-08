import React, {useEffect, useLayoutEffect, useRef, useState} from "react"
import {useNavigate} from "react-router-dom"
import {connect} from "react-redux"
import axios from "axios"

function Albumlist(props) {
  const {data, more, getmore} = props
  const navigate = useNavigate()
  const lastref = useRef()
  const refmore = useRef(more)
  const [list, setlist] = useState([])

  var observer = useRef(
    new IntersectionObserver(
      entries => {
        entries.forEach(item => {
          if (item.isIntersecting) {
            if (refmore.current) {
              getmore()
            }
            item.target.setAttribute(
              "src",
              item.target.getAttribute("data-src"),
            )
            if (item.target.id === "test") {
              // hasmore.current && setOffset((offset => offset + 30))
              // alert(refmore.current)
            }
            // setcount(() => Math.random())
          }
        })
      },
      {threshold: [0], root: document.body},
    ),
  )

  useEffect(() => {
    data && setlist(data)
  }, [])

  useLayoutEffect(() => {
    observer.current.observe(lastref.current)
    // const imgs = document.querySelectorAll('img')
    // imgs.forEach((item) => {
    //     if (item.getAttribute('src') === '') {
    //         observer.current.observe(item)
    //     } else {
    //         observer.current.unobserve(item)

    //     }
    // })

    return () => {
      observer.current.unobserve(lastref.current)
      // imgs.forEach((item) => {
      //     observer.current.unobserve(item)
      // })

      // observer.current.disconnect()
    }
  }, [list])
  return (
    <>
      <div className="playlist">
        <div className="title_bar">
          <span className="tag_title">歌单</span>
        </div>
        <ul className="playlist_list">
          {data.map(item => (
            <li
              onClick={() => {
                navigate(`/albumlist/${item.id}`)
                // axios.get(`/album?id=${item.id}`)
              }}
              onBlur={() => {}}
              key={item.id}
            >
              <span>
                <img src={item.blurPicUrl}></img>
              </span>
              <a>{item.name}</a>
            </li>
          ))}
          <div ref={lastref} style={{width: "100vw", height: "20px"}}></div>
        </ul>
      </div>
    </>
  )
}

export default connect(state => {
  return {
    selectedtag: state.selectedtagSlicereducer.selectedtag,
  }
})(Albumlist)

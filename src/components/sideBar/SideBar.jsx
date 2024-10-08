import React, {useEffect, useRef, useState} from "react"
import axios from "axios"

import Register from "./register/Register"
import cookie from "react-cookies"
import Login from "./login/Login"
import {connect} from "react-redux"
import {hideBar} from "../../redux/store"

function SideBar(props) {
  const [isLogin, setIsLogin] = useState(true)
  const {hideBar} = props

  const handleRegist = () => {
    setIsLogin(false)
  }
  const handleLogin = () => {
    setIsLogin(true)
  }
  const logout = () => {
    axios.get(`/logout`).then(res => {
      localStorage.removeItem("neteaseToken")
      cookie.remove("neteaseLogin")
      hideBar()
    })
  }

  const logged = JSON.parse(localStorage.getItem("neteaseToken"))

  // async function uploadAvatar(file) {

  //     // 创建新文件对象
  //     var newfile = new File([file], 'imgFile.jpg', { type: 'image/jpeg' })
  //     let formdata = new FormData()

  //     // const imgSize = await getImgSize(file)
  //     formdata.append('imgFile', file)

  //     let reader = new FileReader()
  //     reader.readAsDataURL(newfile)
  //     reader.onload = (theFile) => {

  //     }

  //     var formData = new FormData()
  //     formData.append('imgFile', file)

  //     // const res = await axios({
  //     //     method: 'get',
  //     //     url: `http://localhost:3000/avatar/upload?cookie=${logged.cookie}&imgSize=${imgSize.width
  //     //         }&imgX=0&imgY=0&timestamp=${Date.now()}`,
  //     //     headers: {
  //     //         'Content-Type': 'multipart/form-data',
  //     //     },
  //     //     data: formData,
  //     // })
  //     // axios.post(`/avatar/upload?cookie=${logged.cookie}&imgSize=${imgSize.width
  //     //     }&imgX=0&imgY=0&timestamp=${Date.now()}`, {
  //     //     headers: {
  //     //         'Content-Type': 'multipart/form-data',
  //     //     },
  //     //     data: formData,

  //     // document.querySelector('#avatar').src = res.data.data.url

  // }
  // function getImgSize(file) {
  //     return new Promise((resolve, reject) => {
  //         let reader = new FileReader()
  //         reader.readAsDataURL(file)
  //         reader.onload = function (theFile) {
  //             let image = new Image()
  //             image.src = theFile.target.result
  //             image.onload = function () {
  //                 resolve({
  //                     width: this.width,
  //                     height: this.height,
  //                 })
  //             }
  //         }
  //     })
  // }

  return (
    <>
      {
        <div
          onClick={() => {
            hideBar()
          }}
          className="side_virtual"
        ></div>
      }
      <aside
        style={{
          zIndex: 44,
          position: "absolute",
          top: 0,
          width: "300px",
          minHeight: "100%",
          backgroundColor: "rgb(250, 235, 215)",
          background:
            "url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F17%2F20200317180935_oofgc.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654960596&t=39f1915810d6af99841e8cbdb6e1db93) -200px 0px",
          border: "10px solid #2aa5628c",
          borderLeft: "none",
          borderRadius: "10px",
        }}
      >
        {logged ? (
          <div>
            <div>
              <span
                onClick={() => {
                  logout()
                }}
                style={{float: "right"}}
              >
                退出登录
              </span>
              <img
                style={{
                  margin: "5px",
                  display: "block",
                  width: "30px",
                  borderRadius: "50%",
                  float: "left",
                }}
                src={logged.profile.avatarUrl}
              ></img>
              <span>{logged.account.userName}</span>
              <br />
              <span title="ID" style={{fontSize: "12px", color: "#ccc"}}>
                {logged.account.id}
              </span>
            </div>
          </div>
        ) : (
          <div>
            <span
              onClick={() => {
                handleLogin()
              }}
            >
              登录
            </span>
            <span
              onClick={() => {
                handleRegist()
              }}
            >
              注册
            </span>
            <span
              onClick={() => {
                hideBar()
              }}
              style={{float: "right"}}
            >
              back
            </span>

            {!isLogin && (
              <Register
                hideregbar={() => {
                  hideBar()
                }}
              />
            )}

            {isLogin && (
              <Login
                hidelogbar={() => {
                  hideBar()
                }}
              />
            )}
          </div>
        )}

        {/* <button onClick={() => {
                    axios.get(`/user/detail?uid=${logged.account.id}`).then(res => {
                        
                        setuserInfo(res.data)
                    })
                }}>haha</button> */}
        {/* <input onChange={(e) => { uploadAvatar(e.target.files[0]) }} ref={fileref} type={'file'}></input>
                <progress></progress> */}
      </aside>
    </>
  )
}

export default connect(() => ({}), {hideBar})(SideBar)

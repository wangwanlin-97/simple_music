import Header from "../Header"
import Footer from "../Footer"

import SideBar from "../sideBar/SideBar"

import {connect} from "react-redux"
import {Outlet} from "react-router-dom"

function Mainpage(props) {
  const {isdisplay} = props

  return (
    <>
      <div className="top">
        <Header />
      </div>
      <div className="content">
        <Outlet />
      </div>
      {isdisplay && <SideBar />}
      <div className="bar">
        <Footer />
      </div>
    </>
  )
}

export default connect(state => {
  return {
    isdisplay: state.sideBarSlicereducer.isDisplay,
  }
})(Mainpage)

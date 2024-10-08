import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './footer.css'
import { connect } from 'react-redux'

import { ground, list, myList, hideBar } from '../redux/store';

function Footer(props) {
    return (
        <>

            <footer>
                <ul className='footer'>
                    <li><NavLink onClick={() => { props.ground() }} to={'/main/ground'}>广场</NavLink ></li>
                    <li><NavLink onClick={() => { props.list() }} to={'/main/list'}>榜单</NavLink></li>
                    <li><NavLink onClick={() => { props.myList() }} to={'/main/mylist'}>我的歌单</NavLink></li>
                </ul>



            </footer>
        </>
    )
}

const mapDispatchToProps = {
    ground,
    list,
    myList,
    hideBar
}

export default connect(() => { return {} }, mapDispatchToProps)(Footer)



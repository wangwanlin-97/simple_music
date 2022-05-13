import React from 'react'
import './header.css'
import { connect, useSelector, useDispatch } from 'react-redux';
import { showBar, hideBar } from '../redux/store';


import {
    MenuOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const titlelist = ['广场', '榜单', '我的']
    const navigate = useNavigate()
    const handleShowBar = () => {

    }


    // console.log(props)

    return (
        <>
            <header>
                <span className='setting'>
                    <MenuOutlined onClick={() => { props.showBar() }} />
                </span>
                <span className='title'>{titlelist[props.page]}</span>
                <span onClick={() => { navigate('/search') }} >搜索</span>
            </header>

        </>
    )
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        page: state.sightSlicereducer.page,
        isdisplay: state.sideBarSlicereducer.isDisplay

    }
}



export default connect(mapStateToProps, { showBar, hideBar })(Header)
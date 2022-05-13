import React, { useRef } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import { hideBar } from '../../../redux/store'

function Login(props) {

    console.log(props)


    const userref = useRef()
    const logpwdref = useRef()

    const handleLogin = () => {
        axios.get(`/login/cellphone?phone=${userref.current.value}&password=${logpwdref.current.value}&timestamp=${Date.now()}`).then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
                localStorage.setItem('neteaseToken', JSON.stringify(res.data))
                cookie.save('neteaseLogin', res.data.cookie)
                props.hidelogbar()
                props.hideBar()

            }
            else {
                alert('账户信息错误')
            }


        })
    }

    const q = encodeURIComponent(cookie.load('neteaseLogin'))
    return (
        <div className='loginbox' style={{ position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)', padding: '10px', display: 'flex', width: '300px', height: '150px', flexDirection: 'column' }}>
            <h2>登录</h2>
            <div>
                <label style={{ display: 'inline-block', width: '70px', textAlign: 'right', color: "rgba(92, 230, 64, 0.5)" }}>手机号码:</label><input className='loginput' ref={userref} type={'text'}></input>
            </div>
            <div>
                <label style={{ display: 'inline-block', width: '70px', textAlign: 'right', color: "rgba(92, 230, 64, 0.5)" }}>密码:</label><input className='loginput' ref={logpwdref} type={'password'}></input>
            </div>
            <div>
                <button className='logbutton' onClick={() => { handleLogin() }}>登录</button>
                <button className='logbutton' onClick={() => { props.hidelogbar() }}>取消</button>
            </div>
        </div>
    )
}

export default connect(() => {
    return {}
}, { hideBar })(Login)

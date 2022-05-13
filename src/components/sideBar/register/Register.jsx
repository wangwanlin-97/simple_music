import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Sider from 'antd/lib/layout/Sider'

export default function Register(props) {

    const [islogin, setislogin] = useState(false)

    const [nicknameIpt, setnicknameIpt] = useState({})
    const [disable, setdisable] = useState(false)
    const [second, setsecond] = useState(60)
    const nickref = useRef()
    const pwdref = useRef()
    const phoneref = useRef()
    const capref = useRef()
    useEffect(() => {
        axios.get(`/login/status`, { withCredentials: true }).then(res => {
            console.log(res.data)
        })
    }, [])
    let count = 60




    const checkNickname = () => {
        nickref.current.value && axios.get(`/nickname/check?nickname=${nickref
            .current.value}`).then(res => {
                setnicknameIpt(res.data)
            })
    }
    const getCaptcha = () => {


        axios.get(`/captcha/sent?phone=${phoneref.current.value}`).then(res => {
            console.log(res.data);

        })
        setdisable(true)
        const timmer1 = setInterval(() => {

            setsecond(count--)


        }, 1000);
        const timmer = setTimeout(() => {
            clearInterval(timmer1)


            setdisable(false)
            count = 60
            clearTimeout(timmer)


        }, 60000);
    }

    const handleregister = () => {
        axios.get(`/captcha/verify?phone=${phoneref.current.value}&captcha=${capref.current.value}`).then(res => {
            console.log(res.data)
            if (res.data.data) {
                axios.get(`/register/cellphone?phone=${phoneref.current.value}&password=${pwdref.current.value}&captcha=${capref.current.value}&nickname=${nickref.current.value}`).then(res => {
                    console.log(res.data)
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div>

            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', padding: '10px', display: 'flex', width: '300px', height: '200px', backgroundColor: 'rgba(255, 192, 203,.6)', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <label style={{ width: '70px', display: 'inline-block', textAlign: 'right' }}>昵称</label><input ref={nickref} onBlur={() => checkNickname()} type={'text'}></input><span>{nicknameIpt?.code === 400 ? nicknameIpt.message : nicknameIpt.duplicated ? '昵称重复' : ''}</span><br />
                    </div>
                    <div>
                        <label style={{ width: '70px', display: 'inline-block', textAlign: 'right' }}>密码</label><input ref={pwdref} type={'password'}></input><br />
                    </div>
                    <div>
                        <label style={{ width: '70px', display: 'inline-block', textAlign: 'right' }}>手机号码</label><input ref={phoneref} type={'text'}></input><br /><button style={{ float: 'right' }} disabled={disable} onClick={() => { getCaptcha() }}>发送验证码 </button>{disable && <p >{second}</p>}<br />
                    </div>
                    <div>
                        <label>验证码</label><input style={{ width: '50px' }} ref={capref} type={'text'}></input><br />
                    </div>

                    <div>
                        <button onClick={() => { handleregister() }}>注册</button>
                        <button onClick={() => { props.hideregbar() }}>取消</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

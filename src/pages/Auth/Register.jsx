import React from 'react'
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registerAction} from "../../store/actions";
import BreadCumps from '../../components/BreadCumps'
import Hamburger from '../../components/Hamburger';
import Pagination from '../../components/Pagination';
import Title from '../../components/Title'
import {Link, useNavigate} from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/register.css'
import {_storage} from "../../helpers/helper";
const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        password_confirm:''
    })
    const [error, setError] = useState('')
    const registration = () =>{
        if(user.password.length >= 8 && user.password === user.password_confirm){
            dispatch(registerAction(user)).then(res =>{
                // console.log(res)
                navigate('/login')
            }).catch(err=>{
                setError('Данная почта уже используется!')
            })
        }     
    }
    return (
        <div style={{padding: '0px 0px 4rem'}}>
            <div className="container">
            <Hamburger />
            <BreadCumps 
                            items={
                                [
                                    {
                                        link: "/",
                                        name: 'Главная'
                                    },
                                    {
                                        link: "/register",
                                        name: 'Регистрация'
                                    },
                                    // {
                                    //     link: "/",
                                    //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                    // }
                                ]
                            }
                        /> 
            <Title title="Регистрация" style={{textAlign:'center'}}></Title>
            <div className="register-form">
                <div className="register-inner">
                    <div className="form">
                        <p>
                            <input onInput={(e)=>setUser({...user,name:e.target.value})} type="text" placeholder="Ваше имя" />
                        </p>
                        <p>
                            <input onInput={(e)=>setUser({...user,email:e.target.value})} type="text" placeholder="Ваша почта" />
                            {error && <span style={{color: 'red'}}>{error}</span>}
                        </p>
                        <p>
                            <input onInput={(e)=>setUser({...user,password:e.target.value})} type="password" placeholder="Введите пароль" />
                        </p>
                        <p>
                            <input onInput={(e)=>setUser({...user,password_confirm:e.target.value})} type="password" placeholder="Потверждение пароля" />
                            {(user.password.length > 0 && user.password.length <= 8) && <span style={{color: 'red'}}>Пароль должен состоять из 8 букв!</span>}
                            {user.password.length > 0 && user.password !== user.password_confirm && <span style={{color: 'red'}}>Пароли должны совпадать!</span>}
                        </p>
                        <button onClick={()=>registration()} style={{margin: '0 auto'}} className="make-order">
                                Регистрация

                        </button>
                        <Link to="/reset">
                            <p style={{textAlign: 'center'}}>Забыли пароль?</p>
                        </Link>
                        <Link to="/login">
                            <p className="login-link" style={{textAlign: 'center'}}>Войти</p>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ScrollWrapper(Register)

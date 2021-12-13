import React from 'react'
import {imgImport} from '../../helpers/helper';
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authAction} from "../../store/actions";
import Card from '../../components/Card'
import BreadCumps from '../../components/BreadCumps'
import Hamburger from '../../components/Hamburger';
import Pagination from '../../components/Pagination';
import Title from '../../components/Title'
import {Link, useNavigate} from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/register.css'
import {_storage} from "../../helpers/helper";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email:'',
        password:'',
    })
    const auth = () =>{
        // console.log(user.password > 0 && user.password <= 8)
        if(user.password.length >= 8){
            dispatch(authAction(user)).then(res =>{
                    if(_storage.get('smartg-token')){
                        navigate('/cabinet/profile')
                    }
                })
            }  
        }
    return (
        <div style={{padding: '0px 0px 4rem'}}>
            <div className="container">
            <BreadCumps 
                            items={
                                [
                                    {
                                        link: "/",
                                        name: 'Главная'
                                    },
                                    {
                                        link: "/login",
                                        name: 'Авторизация'
                                    },
                                    // {
                                    //     link: "/",
                                    //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                    // }
                                ]
                            }
                        /> 
            <Title title="Авторизация" style={{textAlign:'center'}}></Title>
            <div className="register-form" style={{height: '390px'}}>
                <div className="register-inner">
                    <div className="form">
                        <p>
                            <input onInput={(e)=>setUser({...user,email:e.target.value})} type="text" placeholder="Ваша почта" />
                        </p>
                        <p>
                            <input onInput={(e)=>setUser({...user,password:e.target.value})} type="password" placeholder="Введите пароль" />
                            {(user.password.length > 0 && user.password.length <= 8) && <span style={{color: 'red'}}>Пароль должен состоять из 8 букв!</span>}
                        </p>
                        <button onClick={()=>auth()} style={{margin: '0 auto'}} className="make-order">
                                Войти

                        </button>
                        <Link to="/reset">
                            <p style={{textAlign: 'center'}}>Забыли пароль?</p>
                        </Link>
                        <Link to="/register">
                            <p className="login-link" style={{textAlign: 'center'}}>Зарегестрироваться</p>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login

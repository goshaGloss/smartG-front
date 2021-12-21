import React from 'react'
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {resetAction} from "../../store/actions";
import BreadCumps from '../../components/BreadCumps'
import Hamburger from '../../components/Hamburger';
import Title from '../../components/Title'
import {Link, useNavigate} from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/register.css'
import {_storage} from "../../helpers/helper";
const Reset = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState({
        email:''
    })
    const reset = () =>{
        // if(user.email.length > 0){
            dispatch(resetAction(email)).then(res =>{
                // console.log(res)
                navigate('/confirm',{state:res.user_id})
            })
            // }  
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
                                        link: "/reset",
                                        name: 'Сброс пароля'
                                    },
                                    // {
                                    //     link: "/",
                                    //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                    // }
                                ]
                            }
                        /> 
            <Title title="Сброс пароля" style={{textAlign:'center'}}></Title>
            <div className="register-form" style={{height: '390px'}}>
                <div className="register-inner">
                    <div className="form">
                        <p>
                            <input onInput={(e)=>setEmail({...email,email:e.target.value})} type="text" placeholder="Ваша почта" />
                            {/* {user.password <= 8 && <span style={{color: 'red'}}>Пароль должен состоять из 8 букв!</span>} */}
                        </p>
                        <button onClick={()=>reset()} style={{margin: '0 auto'}} className="make-order">
                                Сбросить пароль

                        </button>
                        <Link to="/login">
                            <p style={{textAlign: 'center'}}>Войти</p>
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

export default ScrollWrapper(Reset)

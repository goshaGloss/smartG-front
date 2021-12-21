import React from 'react'
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {newPassAction} from "../../store/actions";
import BreadCumps from '../../components/BreadCumps'
import Hamburger from '../../components/Hamburger';
import Pagination from '../../components/Pagination';
import Title from '../../components/Title'
import {Link, useNavigate,useLocation} from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/register.css'
import {_storage} from "../../helpers/helper";
const PasswordUpdate = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [newPass, setNewPass] = useState({
        password:'',
        password_confirmation:'',
        user_id:location.state
    })
    const reset = () =>{
        // if(user.email.length > 0){
            dispatch(newPassAction(newPass)).then(res =>{
                navigate('/login')
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
                                        link: "/confirm",
                                        name: 'Подтверждение кода'
                                    },
                                    // {
                                    //     link: "/",
                                    //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                    // }
                                ]
                            }
                        /> 
            <Title title="Сменить пароль" style={{textAlign:'center'}}></Title>
            <div className="register-form" style={{height: '390px'}}>
                <div className="register-inner">
                    <div className="form">
                        <p>
                            <input onInput={(e)=>setNewPass({...newPass,password:e.target.value})} type="password" placeholder="Введите код" />
                            {/* {user.password <= 8 && <span style={{color: 'red'}}>Пароль должен состоять из 8 букв!</span>} */}
                        </p>
                        <p>
                            <input onInput={(e)=>setNewPass({...newPass,password_confirmation:e.target.value})} type="password" placeholder="Введите код" />
                            {(newPass.password.length > 0 && newPass.password_confirmation.length > 0 ) && (newPass.password.length <= 8 && newPass.password_confirmation.length <= 8) && <span style={{color: 'red'}}>Пароль должен состоять из 8 букв!</span>}
                        </p>
                        <button onClick={()=>(newPass.password.length > 0 && 
                            newPass.password_confirmation.length > 0) && 
                            newPass.password.length >= 8 && 
                            newPass.password == newPass.password_confirmation && 
                            reset()} style={{margin: '0 auto'}} className="make-order">
                                Сменить пароль

                        </button>
                        <Link to="/reset">
                            <p style={{textAlign: 'center'}}>Отправить код ещё раз</p>
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

export default ScrollWrapper(PasswordUpdate)

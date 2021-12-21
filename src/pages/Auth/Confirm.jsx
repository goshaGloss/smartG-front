import React from 'react'
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {confirmAction} from "../../store/actions";
import BreadCumps from '../../components/BreadCumps'
import Hamburger from '../../components/Hamburger';
import Title from '../../components/Title'
import {Link, useNavigate,useLocation} from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/register.css'
import {_storage} from "../../helpers/helper";
const Confirm = (props) => {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(location)
    const [confirm, setConfirm] = useState({
        code:'',
        user_id:location.state
    })
    const reset = () =>{
        // if(user.email.length > 0){
            dispatch(confirmAction(confirm)).then(res =>{
                navigate('/update',{state:confirm.user_id})
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
            <Title title="Подтверждение кода" style={{textAlign:'center'}}></Title>
            <div className="register-form" style={{height: '390px'}}>
                <div className="register-inner">
                    <div className="form">
                        <p>
                            <input onInput={(e)=>setConfirm({...confirm,code:e.target.value})} type="text" placeholder="Ваша код" />
                            {/* {user.password <= 8 && <span style={{color: 'red'}}>Пароль должен состоять из 8 букв!</span>} */}
                        </p>
                        <button onClick={()=>reset()} style={{margin: '0 auto'}} className="make-order">
                                Подтвердить код

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

export default ScrollWrapper(Confirm)

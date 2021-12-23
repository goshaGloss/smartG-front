import React from 'react'
import '../style/components/hamburger.css'
import { useNavigate } from 'react-router'
const Hamburger = () => {
    const navigate = useNavigate()
    return (
        <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" htmlFor="menu__toggle">
                <span></span>
            </label>

            <ul className="menu__box">
                <li><a style={{ cursor: 'pointer' }} className="menu__item" onClick={() => navigate('/')}>Главная</a></li>
                <li><a href="" className="menu__item" onClick={() => navigate('/about')}>О компании</a></li>
                <li><a href="" className="menu__item" onClick={() => navigate('/wholesale')}>Оптовые продажи</a></li>
                {/* <li><a href="" className="menu__item">Запчасти</a></li> */}
                <li><a href="" className="menu__item" onClick={() => navigate('/')}>Акции</a></li>
                <li><a href="" className="menu__item" onClick={() => navigate('/service')}>Сервис</a></li>
            </ul>
        </div>
    )
}

export default Hamburger

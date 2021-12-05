import React from 'react'
import '../style/components/hamburger.css'

const Hamburger = () => {
    return (
        <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" for="menu__toggle">
                <span></span>
            </label>

            <ul className="menu__box">
                <li><a className="menu__item" href="/">Главная</a></li>
                <li><a href="" className="menu__item">О компании</a></li>
                <li><a href="" className="menu__item">Оптовые продажи</a></li>
                <li><a href="" className="menu__item">Запчасти</a></li>
                <li><a href="" className="menu__item">Акции</a></li>
                <li><a href="" className="menu__item">Контакты</a></li>
            </ul>
        </div>
    )
}

export default Hamburger

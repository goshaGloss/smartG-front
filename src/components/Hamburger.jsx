import React from 'react'
import '../style/components/hamburger.css'

const Hamburger = () => {
    return (
        <div class="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label class="menu__btn" for="menu__toggle">
                <span></span>
            </label>

            <ul class="menu__box">
                <li><a class="menu__item" href="/">Главная</a></li>
                <li><a href="" class="menu__item">О компании</a></li>
                <li><a href="" class="menu__item">Оптовые продажи</a></li>
                <li><a href="" class="menu__item">Запчасти</a></li>
                <li><a href="" class="menu__item">Акции</a></li>
                <li><a href="" class="menu__item">Контакты</a></li>
            </ul>
        </div>
    )
}

export default Hamburger

import React from 'react'
import '../style/components/header.css'
import {imgImport} from '../helpers/helper.js'
import {Link, useNavigate} from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate()
    return (
        <div className="header-component">

        <header>
            <div className="container">
                <div className="header-wrap">
                    <div className="phone-numbers">
                            <img src={imgImport('header', 'phone.png')} alt="" />
                        <div className="phone-nums-cont">
                            <p>+7 (727) 346 55 66</p>
                            <div className="line"></div>
                            <p>+7 (727) 346 55 66(Оптовикам)</p>
                        </div>
                    </div>
                    <div className="service-center">
                        <p>Сервис-центр: +7 (707) 260-90-83 +7 (775) 540 00 04</p>
                    </div>
                    <div className="user">
                        <Link to="/basket">
                            <div className="img-border">
                                <img src={imgImport('header', 'cart.png')} alt="" />
                            </div>
                        </Link>
                        <Link to="/cabinet/favorite">
                            <div className="img-border">
                                <img src={imgImport('header', 'heart.png')} alt="" />
                            </div>
                        </Link>
                        <div className="img-border">
                            <img src={imgImport('header', 'scale.png')} alt="" />
                        </div>
                        <Link to="/cabinet/profile">
                            <img src={imgImport('header', 'user.png')} alt="" />  
                        </Link>
                    </div>
                </div>
            </div>
        </header>
            <div className="container">
                <div className="mid-bar">
                    <div className="logo">
                        <Link to="/">
                            <img src={imgImport('header', 'Logo.png')} alt="" />
                        </Link>
                        <div className="official-site">
                            <p>Официальный</p>
                            <p>сайт P.I.T.</p>
                            <p>в Казахстане</p>
                        </div>
                    </div>
                    <nav className="nav">
                        <div className="nav-link">
                            <p style={{cursor: 'pointer'}} onClick={() => navigate('about')}>/ О компании</p>

                        </div>
                        <div className="nav-link">
                            <p>Оптовые продажи</p>
                        </div>
                        <div className="nav-link">
                            <p>Запчасти</p>
                        </div>
                        <div className="nav-link">
                            <p>Акции</p>
                        </div>
                        <div className="nav-link">
                            <p>Контакты</p>
                        </div>
                    </nav>
                    <div className="search-container">
                        <input className="search-input" placeholder="Поиск" type="text" />
                        <img src={imgImport('header', 'lupa.png')} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

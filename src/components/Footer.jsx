import React from 'react'
import '../style/components/footer.css'
import {imgImport} from '../helpers/helper.js';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer>
            <div className="container">
                <div className="footer-wrap">
                    <div className="logo-footer">
                        <img src={imgImport('footer','Logo.png')} alt="" />
                        <p>Полный цикл изготовления, от производства запчастей до финальной сборки и упаковки.</p>
                    </div>
                    <div className="info">
                        <p className="info-title">
                            Информация
                        </p>
                        <a onClick={() => navigate('/about')} className="info-item">
                            О компании
                        </a>
                        <a onClick={() => navigate('/delivery')} className="info-item">
                            Информация о доставке
                        </a>
                        <a className="info-item">
                            Пользовательское соглашение
                        </a>
                    </div>
                    <div className="support">
                        <p className="support-title">
                            Служба поддержки
                        </p>
                        <a className="support-item">
                            Связаться с нами
                        </a>
                        <a className="support-item">
                            Карта сайта
                        </a>
                    </div>
                    <div className="additional">
                        <p className="additional-title">
                            Дополнительно
                        </p>
                        <a onClick={() => navigate('/brand')} className="additional-item">
                            Бренд
                        </a>
                        <a className="additional-item">
                            Подарочные сертификаты
                        </a>
                        <a onClick={() => navigate('/partners')} className="additional-item">
                            Партнёры
                        </a>
                        <a className="additional-item">
                            Товары со скидкой
                        </a>
                    </div>
                    <div className="icons">
                        <p className="icons-title">Соцсети</p>
                        <div className="icons-wrap">
                            <a href="">
                                <img src={imgImport('footer/icons','yt.png')} alt="" />
                            </a>
                            <a href="">
                                <img src={imgImport('footer/icons','inst.svg')} alt="" />
                            </a>
                            <a href="">
                                <img src={imgImport('footer/icons','vk.png')} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                    <hr className="footer-white-line" />
                    <div className="bottom-content">
                        <p className="copyright">© 2021. Все Права Защищены.</p>
                        <p className="a-lux">Разработано в A-Lux</p>
                    </div>
            </div>
        </footer>
    )
}

export default Footer

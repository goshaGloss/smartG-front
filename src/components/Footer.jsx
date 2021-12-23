import React from 'react'
import '../style/components/footer.css'
import {imgImport} from '../helpers/helper.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { callbackAction } from '../store/actions';
const Footer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const callModal = () => setShowModal(true)
    const [err, setErr] = useState(false)
    const [callback, setCallBack] = useState({
        name:'',
        phone:'+7',
        comment:''
    })
    const sendCallback = () =>{
        if(callback.name.length ==0 || callback.phone.length ==0  || callback.comment.length ==0 ){
            console.log(callback.name.length ==0)
            setErr(true)
            return
        }else{
            dispatch(callbackAction(callback)).then(res =>{
                setShowModal(false)
                setShowSuccess(true)
                setTimeout(() => {
                    setShowSuccess(false)
                }, 1500);
            })
        }
    }
    const setCall = (type, val) => {
        var reg = new RegExp('^[0-9]$');
        if(val.length < 2 || reg.test(val) || val.length > 12){
            return
        }else{
            setCallBack({...callback, [type]:val})
        }

        
    }
    console.log(callback)
    return (
        <footer>
            {
                showSuccess &&
                <div className="success-modal">
                    Ваш заявка принята, спасибо!
                </div>
            }
            {
                showModal && 
                    <div className="modal-bg">
                        <div className="modal-comment-inner">
                        <img onClick={() => setShowModal(false)} className='cross-img' src={imgImport('cardDetails', 'cross.png')} alt="" />
                            <h1 style={{fontSize: '30px',color:'black'}}>Оставить отзыв</h1>
                            <input onInput={(e) => setCall('name', e.target.value)}  placeholder='Ваше имя' type="text" className="comment-title-input" />
                            {
                                (!callback.name && err) && <span style={{ color: 'red' }}>Введите ваше имя</span>
                            }
                            <input value={callback.phone} onInput={(e) => setCall('phone', e.target.value)}  placeholder='Ваш номер' type="text" className="comment-rating-input" />
                            {
                                (!callback.phone && err) && <span style={{ color: 'red' }}>Введите номер</span>
                            }
                            <textarea onInput={(e) => setCall('comment',e.target.value)} placeholder='Комметарий' type="text" className="comment" />
                            {
                                (!callback.comment && err) && <span style={{ color: 'red' }}>Введите комментарий</span>
                            }
                            <button style={{ marginTop: '1rem', marginRight:'0' }} onClick={() => sendCallback()} className="make-order">Оставить отзыв</button>
                        </div>
                    </div>
            }
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
                        <a style={{cursor: 'pointer'}} onClick={() => navigate('/about')} className="info-item">
                            О компании
                        </a>
                        <a style={{cursor: 'pointer'}} onClick={() => navigate('/delivery')} className="info-item">
                            Информация о доставке
                        </a>
                        {/* <a className="info-item">
                            Пользовательское соглашение
                        </a> */}
                    </div>
                    <div className="support">
                        <p className="support-title">
                            Служба поддержки
                        </p>
                        <a onClick={() => callModal()} className="support-item">
                            Связаться с нами
                        </a>
                        {/* <a className="support-item">
                            Карта сайта
                        </a> */}
                    </div>
                    <div className="additional">
                        <p className="additional-title">
                            Дополнительно
                        </p>
                        <a onClick={() => navigate('/brand')} className="additional-item">
                            Бренд
                        </a>
                        <a onClick={() => navigate('/certificates')} className="additional-item">
                            Подарочные сертификаты
                        </a>
                        <a onClick={() => navigate('/partners')} className="additional-item">
                            Партнёры
                        </a>
                        {/* <a className="additional-item">
                            Товары со скидкой
                        </a> */}
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

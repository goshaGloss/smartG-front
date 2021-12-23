import React from 'react'
import {imgImport,  _storage} from '../../helpers/helper';
import { useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchProduct} from "../../store/actions";
import BreadCumps from '../../components/BreadCumps'
import Hamburger from '../../components/Hamburger';
import Title from '../../components/Title'
import {Link, useNavigate} from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/basket.css'
const Basket = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [cart,setCart] = useState([])
    const [overall, setOverall] = useState(0)
    let basket = []
    useEffect(() => {
        if(_storage.get('cart')){
            let storage = JSON.parse(_storage.get('cart'))
            storage.map(item =>{
                dispatch(fetchProduct(item.id)).then(res => {
                    let newItem =  {count:item.count, ...res.product}
                    basket.push(newItem)
                    if(basket.length == storage.length){
                        let overallPrice = 0
                        basket.forEach(item =>{
                            overallPrice += item.salePrice ? item.salePrice * item.count : item.price * item.count
                        })
                        setOverall(overallPrice)
                        setCart(basket)
                    }
                })
            })
        }
    }, [])
    const deleteItem = (id) =>{
        let storage = JSON.parse(_storage.get('cart'))
        let basket = cart
        storage = storage.filter(item =>item.id != id)
        basket = basket.filter(item =>item.id != id)
        let overallPrice = 0
        basket.forEach(item =>{
            overallPrice += item.salePrice ? item.salePrice * item.count : item.price * item.count
        })
        setOverall(overallPrice)
        _storage.set('cart',JSON.stringify(storage))
        setCart(basket)
    }
    const changeCount = (type, id) =>{
        let storage = JSON.parse(_storage.get('cart'))
        let basket = cart
        storage.map(item => item.id == id ? (type == '+' ? item.count += 1 : item.count -= 1) : '')
        basket.map(item => item.id == id ? (type == '+' ? item.count += 1 : item.count -= 1) : '')
        let overallPrice = 0
        basket.forEach(item =>{
            overallPrice += item.salePrice ? item.salePrice * item.count : item.price * item.count
        })
        setOverall(overallPrice)
        _storage.set('cart',JSON.stringify(storage))
        setCart(basket)
    }
    return (
        <div>
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
                                    link: "/basket",
                                    name: 'Корзина'
                                },
                            ]
                        }
                    />
            <Title title="Корзина"></Title>
                {
                    cart.length > 0 ?
                    <div className="cart-container">
                        <div className="basket-header">
                            <div>Продукт</div>
                            <div>Цена</div>
                            <div>Кол-во</div>
                            <div>Удалить</div>
                        </div>
                        <div className="basket-content">
                            {
                                cart.map(item => {
                                    return(
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item-inner">
                                                <div className="item-content">
                                                    <div className="item-content-inner">                                                    
                                                        <img src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" />
                                                        <p className="cart-item-title">{item.title}</p>
                                                    </div>
                                                </div>
                                                <div className="item-other-info">
                                                    <div className="basket-price">{item.salePrice ? item.salePrice : item.price}</div>
                                                    <div className="basket-count">
                                                        <div onClick={()=>{changeCount('+',item.id)}} className="basket-increase">
                                                            +
                                                        </div>
                                                        <div>{item.count}</div>
                                                        <div onClick={()=>{item.count > 1 && changeCount('-',item.id)}} className="basket-decrease">
                                                            -
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="basket-delete">
                                                        <img onClick={() => {deleteItem(item.id)}} src={imgImport('basket', 'deleteIcon.svg')} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> : <span>Пусто</span>
                }
                <div className="basket-btns">
                    <div className="basket-btns-inner">
                        <div className="overall-price">
                            Общая цена: {overall} тг.
                        </div>
                        <div className="basket-links">
                            <button onClick={() => cart.length > 0 && navigate('/order', {state: cart})} className="make-order">
                                Оформить заказ

                            </button>
                            <Link to="/catalog">
                                <div className="back-to-shopping">
                                    Назад к каталогу
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrollWrapper(Basket)

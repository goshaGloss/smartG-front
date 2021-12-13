import React from 'react'
import { useState, useEffect } from 'react';
import {imgImport} from '../helpers/helper';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { _storage } from '../helpers/helper';
import {setFavAction, getFavAction,removeFavAction} from "../store/actions";
import { favsSelector } from '../store/selectors';
const Card = (props) => {
    const [isFav, setIsFav] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const rating = []
    const notrated = []
    const [productId, setProductId] = useState({product_id:props.id})
    const [isInCart, setIsInCart] = useState(false)
    for(let i = 1; i < props.rating; i++){
        rating.push(i)
    }
    for(let i = rating.length; i < 5; i++){
        notrated.push(i)
    }
    const addFav = () =>{
        setIsFav(true)
        dispatch(setFavAction(productId)).then((res) => console.log(res))  
    }
    const removeFav = () =>{
        setIsFav(false)
        dispatch(removeFavAction({id:String(productId.product_id)})).then((res) => console.log(res))  
    }
    useEffect(() => {
        // console.log(props)
        if(_storage.get('smartg-token') && _storage.get('cart')){
            JSON.parse(_storage.get('cart')).forEach(item =>{
                (item.id == props.id) && setIsInCart(true)
            })
            dispatch(getFavAction()).then(res => {
                res.favourites.forEach(item => {
                    item.id == props.id && setIsFav(true)
                });
            })
        }

    }, [])
    const addToBasket = () =>{
        let item = {
            id: props.id,
            count: 1
        }
        if(!_storage.get('cart')){
            _storage.set('cart',JSON.stringify([item]))
            setIsInCart(true)
        }else{
            let cart = []
            let jsonCart = JSON.parse(_storage.get('cart'))
            cart = jsonCart
            cart.push(item)
            _storage.set('cart',JSON.stringify(cart))
            setIsInCart(true)
        }
    }
    return (
            <div className="card">
                <div className="card-wrapper">
                    {
                        (props.salePrice || new Date().getMonth() == props.created.split('T')[0].split('-')[1]) && 
                        <div className="modals">
                            {
                                props.salePrice && <div className="sale-modal">Скидка</div>
                            }
                            {
                                new Date().getMonth() == props.created.split('T')[0].split('-')[1] && 
                                <div className="new-modal" style={{marginLeft: props.salePrice ? '0.5rem' : '0'}}>Новинка</div>
                            }
                        </div>
                    }
                    <img className='item-pic' src={'https://smartg.a-lux.dev/storage/'+props.image} alt="" />
                    <div className="rating">
                        {
                            rating.map(item =>{
                                return(
                                    <img src={imgImport('mainPage', 'red-star.png')} alt="" />
                                )
                            })
                        }
                        {
                            notrated.map(item =>{
                                return(
                                    <img src={imgImport('mainPage', 'gray-star.png')} alt="" />
                                )
                            })
                        }
                    </div>
                        <Link to={`/product/${props.id}`} style={{ textDecoration:'none' }}>
                            <p>{props.title}</p>
                        </Link>
                        <div className="cart">
                            <div className="prices">
                                <p style = {{fontWeight:'700',margin:'0'}} className={props.salePrice ? 'old-price' : 'card-price'}>{props.price} ₸</p>
                                {props.salePrice && <p style = {{fontWeight:'700',margin:'0'}} className='card-sale'>{props.salePrice} ₸</p>}
                            </div>
                            <div className="btns">
                                {
                                    isFav
                                    ? <img  onClick={() => removeFav()} style={{cursor: 'pointer',width: '30px',marginRight:'0.5rem'}} src={imgImport('card', 'heart.png')} alt="" />
                                    : <img onClick={() => addFav()} style={{cursor: 'pointer',width: '30px',marginRight:'0.5rem'}} src={imgImport('card', 'heart-outline.png')} alt="" />
                                }
                                {
                                    isInCart ? 
                                    <img style={{cursor: 'pointer'}} onClick={()=>navigate('/basket')} src={imgImport('cardDetails','check.png')} alt="" />
                                    :<img style={{cursor: 'pointer'}} onClick={()=>addToBasket()} src={imgImport('mainPage','cart-btn.png')} alt="" />
                                }
                                {/* <img onClick={()=>addToBasket()} src={isInCart ?imgImport('cardDetails','check.png') : imgImport('mainPage','cart-btn.png')} alt="" /> */}
                            </div>
                        </div>
                        <p style={{color: '#C2BFCD'}}>Модель: {props.article}</p>
                </div>
            </div>
    )
}

export default Card

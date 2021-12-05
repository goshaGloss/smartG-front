import React from 'react'
import {imgImport, _storage} from '../../helpers/helper';
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct, fetchProducts} from "../../store/actions";
import BreadCumps from '../../components/BreadCumps'
import {ScrollWrapper} from '../../components/ScrollWrapper';
import {useParams} from 'react-router-dom'
import Title from '../../components/Title'
import Card from '../../components/Card'
import '../../style/pages/card-details.css'
const CardDetail = () => {
    
    const {
        id
    } = useParams()
    const dispatch = useDispatch()
    const dummyRating = 2
    const [count, setCount] = useState(1)
    const rating = []
    const notrated = []
    for(let i = 0; i < dummyRating; i++){
        rating.push(i)
    }
    for(let i = rating.length; i < 5; i++){
        notrated.push(i)
    }
    const [product,setProduct] = useState({})
    const [similarProducts,setSimilarProducts] = useState([])
    useEffect(() => {
        dispatch(fetchProduct(id)).then(res=>{
            setSimilarProducts(res.Random)
        })
    }, [])
    useEffect(() => {
        dispatch(fetchProduct(id)).then(res=>{
            setProduct(res.Product)
        })
    }, [])
    const setStorage = () =>{
        let item = {
            id: product.id,
            count
        }
        if(!_storage.get('cart')){
            _storage.set('cart',JSON.stringify([item]))
        }else{
            let cart = []
            let jsonCart = JSON.parse(_storage.get('cart'))
            cart = jsonCart
            cart.push(item)
            _storage.set('cart',JSON.stringify(cart))
        }
    }
    return (
        <div>
            <div className="container">
                <Title title={product.title}></Title>
                 <BreadCumps 
                        items={
                            [
                                {
                                    link: "/",
                                    name: 'Главная'
                                },
                                {
                                    link: `product/${product.id}`,
                                    name: product.title
                                },
                            ]
                        }
                    />
                <div className="product-info">
                    <div className="product-photos">
                        <div className="main-photo">
                            <img src={'https://smartg.a-lux.dev/storage/'+product.image} alt="" />
                        </div>
                    </div>
                    <div className="product-info-inner">
                        <p className="product-title">{product.title}</p>
                        <div className="product-row">
                            <div className="rating">
                                <p className="rating-title">Рейтинг: </p>
                                <div className="rating-inner">

                                    {
                                        rating.map(item =>{
                                            return(
                                                <img src={imgImport('cardDetails', 'gold-star.png')} alt="" />
                                            )
                                        })
                                    }
                                    {
                                        notrated.map(item =>{
                                            return(
                                                <img src={imgImport('cardDetails', 'gray-star.png')} alt="" />
                                            )
                                        })
                                    }
                                </div>
                                 <p className="article">Артикул: {product.setNumber}</p>    
                            </div>
                        </div>
                        <div className="price">
                            <div className={product.salePrice ? 'old-price' : 'price'}>{product.price} тг.</div>
                            {
                                product.salePrice && <div className="price">{product.salePrice} тг.</div>
                            }
                        </div>
                        <div className="count">
                            <div className="decrease-count" onClick={()=>{count > 1 &&  setCount(count - 1)}}>-</div>
                            <div className="product-count">{count}</div>
                            <div className="increase-count" onClick={() => setCount(count + 1)}>+</div>
                        </div>
                        
                        <button className="add-cart-btn" onClick={() => setStorage()}>
                            <img style={{marginRight: '20px'}} src={imgImport('header','cart.png')} alt="" /> Добавить в корзину</button>
                        <div style={{width: '570px',height: '4px',marginTop: '50px'}} className="product-line"></div>
                        <div className="characteristics-cont">
                            <p className="char-title">Характеристики</p>
                            <div className="characteristics" dangerouslySetInnerHTML = {{__html: product.characteristics}}></div>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%',height: '4px',marginTop: '60px'}} className="product-line"></div>
                <div className="description-container">
                    <p className="product-description-title">Описание</p>
                    <div className="product-description" dangerouslySetInnerHTML= {{ __html:product.description }}></div>
                </div>
                <div style={{width: '100%',height: '4px',marginTop: '60px'}} className="product-line"></div>
                <div className="reviews">
                    <div className="reviews-title">Отзывы</div>
                    <div className="rating">
                        <p className="rating-title">Рейтинг: </p>
                        <div className="rating-inner">

                            {
                                rating.map(item =>{
                                    return(
                                        <img src={imgImport('cardDetails', 'gold-star.png')} alt="" />
                                    )
                                })
                            }
                            {
                                notrated.map(item =>{
                                    return(
                                        <img src={imgImport('cardDetails', 'gray-star.png')} alt="" />
                                    )
                                })
                            }
                        </div>   
                        <p className="reviews-count">9 Отзывов</p>
                    </div>
                </div>
                <Title title="Похожие Товары"></Title>
                <div className="similar-products">
                    {similarProducts && similarProducts.map((item,index)=>{
                        return(
                            (index <= 3) && 
                               <Card
                                    id={item.id}
                                    key={item.id}
                                    title={item.title}
                                    rating={item.rating}
                                    image={item.image}
                                    price={item.price}
                                    salePrice={item.salePrice ? item.salePrice : ''}
                                    article={item.setNumber}
                                />
                            )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CardDetail

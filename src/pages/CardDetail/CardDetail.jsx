import React from 'react'
import {imgImport, _storage} from '../../helpers/helper';
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct, fetchProducts, latestSeenAction} from "../../store/actions";
import BreadCumps from '../../components/BreadCumps'
import {ScrollWrapper} from '../../components/ScrollWrapper';
import {useParams} from 'react-router-dom'
import Title from '../../components/Title'
import Card from '../../components/Card'
import '../../style/pages/card-details.css'
import { useNavigate } from 'react-router';
import Comment from '../../components/Comment';
import { postCommentAction } from '../../store/actions';
import Hamburger from '../../components/Hamburger';

const CardDetail = () => {
    const {
        id
    } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [rating, setRating] = useState(0)
    const [count, setCount] = useState(1)
    const [rating, setRating] = useState([])
    const [notRated, setNotRated] =useState([])
    const [recommendation, setRecommendation] = useState(0)
    const [product,setProduct] = useState({})
    const [similarProducts,setSimilarProducts] = useState([])
    const [isInCart, setIsInCart] = useState(false)
    const [comment, setComment] = useState({})
    const [showComment, setShowComment] = useState(false)
    const [err, setErr] = useState(false)
    const [newComment, setNewComment] = useState({
        text:'',
        rating:'',
        title:''
    })
    useEffect(() => {
        
        dispatch(fetchProduct(id)).then(res=>{
            setSimilarProducts(res.random)
            let rate = 0
            let rated = []
            let notrated =[]
            if(res.comments.length > 0){
                res.comments.forEach(item => {
                    item.rating > 3 && setRecommendation(recommendation + 1)
                    rate = rate + item.rating
                })
                for(let i = 0; i < Math.round(rate / res.comments.length); i++){
                    rated.push(i)
                }
                for(let i = rated.length; i < 5; i++){
                    notrated.push(i)
                }
                setComment(res.comments)
                setRating(rated)
                setNotRated(notrated)
            }
        })
    }, [])
    console.log(comment)
    useEffect(() => {
        dispatch(fetchProduct(id)).then(res=>{
            // console.log(JSON.parse(_storage.get('cart')))
            if(_storage.get('cart')){
                JSON.parse(_storage.get('cart')).forEach(item =>{
                    (item.id == res.product.id) && setIsInCart(true)
                })
            }

            dispatch(latestSeenAction(res.product))
            setProduct(res.product)
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
        setIsInCart(true)
    }
    const sendComment = () => {
        if(!_storage.get('smartg-token')){
            navigate('/login')
        }
        if(!newComment.text || !newComment.title && !newComment.rating){
            setErr(true)
        }else{
            console.log(product.id)
            dispatch(postCommentAction(newComment,product.id)).then(res => {
                console.log(res)
                setShowComment(false)
            })
        }
    }
    return (
        <div>
                {showComment && 
                    <div className="modal-bg">
                        <div className="modal-comment-inner">
                        <img onClick={() => setShowComment(false)} className='cross-img' src={imgImport('cardDetails', 'cross.png')} alt="" />
                            <h1 style={{fontSize: '30px'}}>Оставить отзыв</h1>
                            <input onInput={(e) => setNewComment({ ...newComment, title: e.target.value })}  placeholder='Оглавление комментария' type="text" className="comment-title-input" />
                            {
                                (!newComment.title && err) && <span style={{ color: 'red' }}>Введите название</span>
                            }
                            <input onInput={(e) => setNewComment({ ...newComment, text: e.target.value })}  placeholder='Описание отзыва' type="text" className="description-input" />
                            {
                                (!newComment.text && err) && <span style={{ color: 'red' }}>Введите комментарий</span>
                            }
                            <input onInput={(e) => e.target.value <= 5 && setNewComment({ ...newComment, rating: e.target.value })} placeholder='Рейтинг' type="number" className="comment-rating-input" />
                            {
                                (!newComment.rating && err) && <span style={{ color: 'red' }}>Введите рейтинг(не больше 5)</span>
                            }
                            <div onClick={() => sendComment()} className="make-order">Оставить отзыв</div>
                        </div>
                    </div>
                }
            <div className="container">
                <Hamburger />
                <Title title={product && product.title}></Title>
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
                                        notRated.map(item =>{
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
                        {
                            isInCart ? 
                                <button onClick={()=>navigate('/basket')} className="remove-cart-btn">
                                    <img style={{marginRight: '10px', width: '20px'}} src={imgImport('cardDetails','check.png')} alt="" />
                                    Уже в корзине
                                </button>
                                :
                                <button className="add-cart-btn" onClick={() => setStorage()}>
                                <img style={{marginRight: '20px'}} src={imgImport('header','cart.png')} alt="" />
                                
                                    Добавить в корзину
                                </button>

                                
                        }
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
                        <div className="rating-container">
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
                                    notRated.map(item =>{
                                        return(
                                            <img src={imgImport('cardDetails', 'gray-star.png')} alt="" />
                                        )
                                    })
                                }
                            </div>   
                            <p className="reviews-count">{comment.length} Отзывов</p>
                        </div>
                        <div onClick={() => setShowComment(!showComment)} className="make-order make-adapt">Оставить отзыв</div>
                    </div>
                        <p>{recommendation} из {comment.length} пользователей рекоммендует этот товар</p>
                        <div className="comments-container">
                            {
                                comment.length > 0 && comment.map(item =>{
                                    return(
                                        <Comment 
                                            desc={item.text}
                                            title={item.title}
                                            rating={item.rating}
                                            approved={item.approved}
                                            user={item.user[0]}
                                            date={item.created_at.split('T')[0]}
                                        />
                                    )
                                })
                            }
                        </div>
                </div>
                <Title title="Недавно просмотрено"></Title>
                <div className="latest-seen-prod">
                    {JSON.parse(_storage.get('latestSeen')) && JSON.parse(_storage.get('latestSeen')).map((item,index)=>{
                        return( 
                               <Card
                                    id={item.id}
                                    key={item.id}
                                    title={item.title}
                                    rating={item.rating}
                                    image={item.image}
                                    price={item.price}
                                    salePrice={item.salePrice ? item.salePrice : ''}
                                    article={item.setNumber}
                                    created={item.created_at}
                                />
                            )
                    })}
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
                                    created={item.created_at}
                                />
                            )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ScrollWrapper(CardDetail)

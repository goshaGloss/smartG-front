import React from 'react'
import {imgImport} from '../helpers/helper';
import { useNavigate, Link } from 'react-router-dom';
const Card = (props) => {
    const navigate = useNavigate()
    const rating = []
    const notrated = []
    for(let i = 1; i < props.rating; i++){
        rating.push(i)
    }
    for(let i = rating.length; i < 5; i++){
        notrated.push(i)
    }
    return (
        <Link to={`/product/${props.id}`} style={{ textDecoration:'none' }}>
            <div className="card">
                <div className="card-wrapper">
                    {
                        props.salePrice && <div className="sale-modal">Скидка</div>
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
                        <p>{props.title}</p>
                        <div className="cart">
                            <div className="prices">
                                <p style = {{fontWeight:'700'}} className={props.salePrice ? 'old-price' : 'card-price'}>{props.price} ₸</p>
                                {props.salePrice && <p style = {{fontWeight:'700',marginLeft:'10px'}} className='card-sale'>{props.salePrice} ₸</p>}
                            </div>
                            <img src={imgImport('mainPage','cart-btn.png')} alt="" />
                        </div>
                        <p style={{color: '#C2BFCD'}}>Модель: {props.article}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card

import React from 'react'
import {imgImport} from '../helpers/helper';

const Card = (props) => {
    const rating = []
    const notrated = []
    for(let i = 1; i < props.rating; i++){
        rating.push(i)
    }
    for(let i = rating.length; i < 5; i++){
        notrated.push(i)
    }
    return (
        <div className="card">
            <div className="card-wrapper">
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
                    <p>{props.title}</p>
                    <div className="cart">
                        <p>{props.price} ₸</p>
                        <img src={imgImport('mainPage','cart-btn.png')} alt="" />
                    </div>
                    <p style={{color: '#C2BFCD'}}>Модель: {props.article}</p>
                </div>
            </div>
        </div>
    )
}

export default Card

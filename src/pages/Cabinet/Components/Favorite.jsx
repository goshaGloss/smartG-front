import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { _storage,imgImport } from '../../../helpers/helper';
import {setFavAction, getFavAction,removeFavAction} from "../../../store/actions";
import Card from '../../../components/Card'
import '../../../style/components/favs.css'
export const Favorite = () => {
    const dispatch = useDispatch();
    const [favs, setFavs] = useState({})
    useEffect(() => {
        dispatch(getFavAction()).then(res => setFavs({...favs,favs:res.favourites}))
    }, [])
    console.log(favs)
    return (
        <div className="favorites">
           <div className="favorites-inner">
                {
                    favs.favs && favs.favs.map(item =>{
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
                    })
                }
           </div>
        </div>
    )
}
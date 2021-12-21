import React from 'react'
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Card from '../../components/Card'
import BreadCumps from '../../components/BreadCumps'
import Hamburger from '../../components/Hamburger';
import Pagination from '../../components/Pagination';
import Title from '../../components/Title'
import { searchAction } from '../../store/actions'
import { useNavigate } from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/comparison.css'
import { useLocation } from 'react-router';
import { _storage } from '../../helpers/helper';
const Comparison = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchItems, setSearchItems] = useState([])
    const [isTyping, setIsTyping] = useState(true)
    const [searchRequest, setSearchRequest] = useState('')
    useEffect(() => {
        const timeoutId = setTimeout(() => {
        if(!isTyping && searchRequest){
            dispatch(searchAction({search:searchRequest})).then(res =>{
                setSearchItems(res.products)
                setSearchRequest('')
                setIsTyping(true)
            })
        }
        
    }, 2500);
    return () => clearTimeout(timeoutId)
    }, [searchRequest])
    const userTyping = (search) =>{
        if(searchItems.length > 0){
            setTimeout(() => {
                setSearchItems([])
            }, 2500);
        }
        setSearchRequest(search)
        setIsTyping(false)
    }
    const setComp = (id) =>{
        console.log(id)
        if(!_storage.get('smartg-comp')){
            let comp = []
            _storage.set('smartg-comp', JSON.stringify(id))
        }
        else{
            let check = false
            let storage = JSON.parse(_storage.get('smartg-comp'))
            for(let i in storage.comparison){
                console.log(i)
                if(storage.comparison[i] == id){
                    check = true
                }
            }

            if(!check && storage.comparison.length < 5){
                let newStorage = [storage, id]
                let parsed = {comparison:newStorage}
                _storage.set('smartg-comp', JSON.stringify(parsed))
            }
        }
    }
    return (
        <div className='comp'>
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
                                link: "/comparison",
                                name: 'Сравнение'
                            },
                        ]
                    }
                />
                <Title title="Сравнение"></Title>
                <h1>Введите название товара</h1>
                <div className="search-comparison">
                    <input onInput={(e) => userTyping(e.target.value)} className='comp-search' type="text" />
                    <div style={{ display: searchItems.length > 0  ? 'block' : 'none'}} className="search-dropdown">
                        {
                            searchItems.length > 0 &&
                            searchItems.map(item => {
                                return(
                                    <div className="search-item">
                                        <div className="photo-and-title">
                                            <img src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" />
                                            <p>{item.title}</p>
                                        </div>
                                        <div className="comp-text">
                                            <p>Цена: {item.salePrice ? item.salePrice : item.price} тг.</p>
                                            <div className="comp-characs">
                                                <p>Характеристики: </p>
                                                <div dangerouslySetInnerHTML={{ __html: item.characteristics }}></div>
                                            </div>
                                        </div>
                                        <button onClick={() => setComp(item.id)} className="add-to-comp">Добавить в сравнение</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="comp-items">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrollWrapper(Comparison)

import React from 'react'
import Title from '../../components/Title'
import BreadCumps from '../../components/BreadCumps'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { discountsPageAction } from '../../store/actions'
import { imgImport } from '../../helpers/helper'
import '../../style/pages/discounts.css'
import Hamburger from '../../components/Hamburger';
import { ScrollWrapper } from '../../components/ScrollWrapper';
import { useNavigate } from 'react-router'
const Discounts = () => {
    const [discounts, setDiscounts] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(discountsPageAction()).then(res => {
            setDiscounts(res.events)
        })
    }, [])
    console.log(discounts)
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
                                link: `discounts`,
                                name: 'Акции'
                            },
                        ]
                    }
                />
                <Title title="Акции" />
                <div className="discounts-container">
                    {   
                        discounts && discounts.map(item => {
                            if(item.description && item.description.includes('%')){

                                return(
                                    <div key={item.id} className="banner" onClick={() => navigate(`catalog/event=${item.id}`)} style={{ backgroundImage: `url(${imgImport('mainPage', 'bg-discount-1.png')})` }}>
                                        <div className="banner-wrap">
                                            <p>{item.title}</p>
                                            <p className='discount'>{item.description}</p>
                                            <img className="toolPic" src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" />
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div key={item.id} className="banner" onClick={() => navigate(`/catalog/event=${item.id}`)} style={{ backgroundImage: `url(${imgImport('mainPage', 'cat-bg.png')})` }}>
                                        <div className="banner-wrap">
                                            <div className="toolpic-cat-cont">

                                                <img className="toolPic-cat" src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" />
                                            </div>
                                            <p>{item.title}</p>
                                        </div>
                                    </div>
                                )
                            }
                        }) 
                    }
                </div>
            </div>
        </div>
    )
}

export default ScrollWrapper(Discounts)

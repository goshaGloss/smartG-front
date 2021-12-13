import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { wholePageAction } from '../../store/actions'
import '../../style/pages/whosales.css'
import BreadCumps from '../../components/BreadCumps'
import Title from '../../components/Title'

const WholeSale = () => {
    const dispatch = useDispatch()
    const [whole, setWhole] = useState({})
    useEffect(() => {
        dispatch(wholePageAction()).then(res => setWhole(res.whosales))
    }, [])
    console.log(whole)
    return (
        <div className='who-sales-cont'>
            <div className="container">
                        <Title title="Оптовые продажи"></Title>
                        <BreadCumps 
                            items={
                                [
                                    {
                                        link: "/",
                                        name: 'Главная'
                                    },
                                    {
                                        link: "/wholesale",
                                        name: 'Оптовые продажи'
                                    },
                                    // {
                                        //     link: "/",
                                        //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                        // }
                                    ]
                                }
                        />
                <div className='who-sales'>
                    <div className="whole-sale-img">
                        <img src={`https://smartg.a-lux.dev/storage/${whole.image}`} alt="" />
                    </div>
                    <div className="whole-sale-text">
                        <p className="whole-sale-title">{ whole.title }</p>
                        <div className="whole-sale-desc" dangerouslySetInnerHTML={{ __html:whole.description }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WholeSale

import React from 'react'
import Title from '../../components/Title'
import BreadCumps from '../../components/BreadCumps'
import DeliveryZone from '../../components/DeliveryZone'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {deliveryPageAction} from '../../store/actions'
import { imgImport } from '../../helpers/helper'
import '../../style/pages/delivery.css'
import Hamburger from '../../components/Hamburger';
import { ScrollWrapper } from '../../components/ScrollWrapper';

const Delivery = () => {
    const [delivery, setDelivery] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(deliveryPageAction()).then(res=>setDelivery(res))
    }, [])
    console.log(delivery)
    return (
        <div>
            {delivery.delieveryZones && 
                <div className="container">
                <Hamburger />
                    <Title title="Информация о доставке"></Title>
                    <BreadCumps 
                        items={
                            [
                                {
                                    link: "/",
                                    name: 'Главная'
                                },
                                {
                                    link: "/delivery",
                                    name: 'Информация о доставке'
                                },
                                // {
                                //     link: "/",
                                //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                // }
                            ]
                        }
                    />
                    <div className="payment-types">
                        <Title title="Способы оплаты:"></Title>
                        <div className="payment-types-inner">
                            {delivery.delieveryZones.map(item =>{
                                return(
                                    <div className="payment-type">
                                        <div className="payment-title">
                                            <img style={{ width:'16px', height: '16px', marginRight: '16px' }} src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" />
                                            <p className="payment-title-inner">{item.title}</p>
                                        </div>
                                        <div className="payment-description" dangerouslySetInnerHTML={{ __html: item.description}}>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <section className='delivery-map'>
                            <div className="delivery-map-title">
                                <Title title="Карта зоны доставки"></Title>
                                <img src={imgImport('delivery', 'map.png')} alt="" />
                            </div>
                        </section>
                        <section className='delivery-zones'>
                            <div className="delivery-zones-title">
                                <p>Сумма заказов:</p>
                                <p>Более 40 000 тг.</p>
                                <p>Менее 40 000 тг.</p>
                            </div>
                            <div className="delivery-zones">
                                {
                                    delivery.paymentMethods.map(item =>{
                                        return(

                                            <DeliveryZone 
                                                title={item.title}
                                                under={item.under}
                                                over={item.upper}

                                            />
                                        )
                                    })
                                }
                            </div>
                            <div className="map">

                                <iframe src="https://yandex.ua/map-widget/v1/?um=constructor%3Aa062f98d07c68cedaa2e4eec1ac9d551aefe96454ce04960d1a05d23728964d1&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>
                            </div>
                        </section>
                    </div>
                </div> 
            }
        </div>
    )
}

export default  ScrollWrapper(Delivery)

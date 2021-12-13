import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { servicePageAction } from '../../store/actions'
import BreadCumps from '../../components/BreadCumps'
import Title from '../../components/Title'
const Service = () => {
    const dispatch = useDispatch()
    const [service, setService] = useState([])
    useEffect(() => {
        dispatch(servicePageAction()).then(res => setService(res.address))
    }, [])
    console.log(service)
    return (
        <div className='service-container'>
            {
                service &&
                    <div className="container">
                        <Title style={{ margin: '0'}} title="Сервис"></Title>
                        <BreadCumps 
                            items={
                                [
                                    {
                                        link: "/",
                                        name: 'Главная'
                                    },
                                    {
                                        link: "/service",
                                        name: 'Сервис'
                                    },
                                    // {
                                    //     link: "/",
                                    //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                    // }
                                ]
                            }
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap' }} className="service-page-items">
                            {service.map(item =>{
                                return(
                                    <div style ={{ width: '33%' }} className="service-page-item">
                                        <p className="service-page-title">{item.title}</p>
                                        <p className='service-page-address'>{item.address}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <iframe src="https://yandex.ua/map-widget/v1/?um=constructor%3Aa062f98d07c68cedaa2e4eec1ac9d551aefe96454ce04960d1a05d23728964d1&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>
                    </div>
            }
        </div>
    )
}

export default Service
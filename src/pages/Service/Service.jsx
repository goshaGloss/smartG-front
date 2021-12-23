import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { servicePageAction } from '../../store/actions'
import BreadCumps from '../../components/BreadCumps'
import Title from '../../components/Title'
import Hamburger from '../../components/Hamburger';
import { ScrollWrapper } from '../../components/ScrollWrapper';
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import '../../style/pages/service.css'

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
                        <Hamburger />
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
                        <div style={{ position: 'relative', height: '50vh' }} className="map">
                            <YMaps style={{width: '90%', height: '100%'}}>
                                <Map style={{left: 0,top: 0,width: '100%',position:'absolute',height: '100%'}} defaultState={{ center: [43.317931, 76.957602], zoom: 10 }} >
                                    {service.map(item => {
                                        return(
                                            <Placemark 
                                                key={item.id}
                                                geometry={item.coordinate.split(',')} 
                                                options={{iconColor: '#FF0000'}}
                                            />
                                        )
                                    })}
                                </Map>
                            </YMaps>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ScrollWrapper(Service)
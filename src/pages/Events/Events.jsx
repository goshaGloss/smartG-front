import React from 'react'
import Title from '../../components/Title'
import BreadCumps from '../../components/BreadCumps'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { eventPageAction } from '../../store/actions'
import '../../style/pages/privacy.css'
import Hamburger from '../../components/Hamburger';
import { ScrollWrapper } from '../../components/ScrollWrapper';

const Events = () => {
    const dispatch = useDispatch()
    const [events, setEvents] = useState()
    useEffect(() => {
        dispatch(eventPageAction()).then(res => setPrivacy(res.events))

    }, [])
    return (
        <div>
            <div className="container">
            <Hamburger />
                <Title title="Сертификаты"></Title>
                <BreadCumps 
                    items={
                        [
                            {
                                link: "/",
                                name: 'Главная'
                            },
                            {
                                link: "/events",
                                name: 'События'
                            },
                            // {
                            //     link: "/",
                            //     name: checkers['category']? checkers['category'].name : 'Catalog'
                            // }
                        ]
                    }
                />
                <div className="all-events">    
                    <div className="banner">
                        <div className="banner-wrap">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrollWrapper(Events)
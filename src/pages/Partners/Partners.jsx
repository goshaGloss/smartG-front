import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { partnersPageAction } from '../../store/actions'
import '../../style/pages/whosales.css'
import BreadCumps from '../../components/BreadCumps'
import Title from '../../components/Title'
import '../../style/pages/partners.css'
import Hamburger from '../../components/Hamburger';
const Partners = () => {
    const dispatch = useDispatch()
    const [partners, setPartners] = useState({})
    useEffect(() => {
        dispatch(partnersPageAction()).then(res => setPartners(res))
    }, [])
    console.log(partners)
    return (
        <div className='partners-page'>
            <div className="container">
                <Hamburger />
                <Title title="Партнёры"></Title>
                <BreadCumps 
                    items={
                        [
                            {
                                link: "/",
                                name: 'Главная'
                            },
                            {
                                link: "/partners",
                                name: 'Партнёры'
                            },
                            // {
                            //     link: "/",
                            //     name: checkers['category']? checkers['category'].name : 'Catalog'
                            // }
                        ]
                    }
                />
                <div className="partners-page-container">
                    <div className="partners-text">
                        <p className="partners-title">{partners.about && partners.about.title}</p>
                        <div className="partners-desc" dangerouslySetInnerHTML={{ __html:partners.about &&  partners.about.description }}></div>
                    </div>
                    <div className="partners-items">
                        {partners.partners && partners.partners.map(item => {
                            return(
                                <div className="partner-item">
                                    <div className="partner-item-inner">
                                        <img src={`https://smartg.a-lux.dev/storage/${item.logo}`}  alt="" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Partners
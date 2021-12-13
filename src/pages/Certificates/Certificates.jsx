import React from 'react'
import Title from '../../components/Title'
import BreadCumps from '../../components/BreadCumps'
import DeliveryZone from '../../components/DeliveryZone'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {deliveryPageAction} from '../../store/actions'
import { imgImport } from '../../helpers/helper'

const Certificates = () => {
    const dispatch = useDispatch()
    const [sertificate, setSertificates] = useState(null)
    // useEffect(() => {
    //     dispatch()
    //     return () => {
    //         cleanup
    //     }
    // }, [input])
    return (
        <div>
            <div className="container">
                <Title title="Сертификаты"></Title>
                <BreadCumps 
                    items={
                        [
                            {
                                link: "/",
                                name: 'Главная'
                            },
                            {
                                link: "/certificates",
                                name: 'Сертификаты'
                            },
                            // {
                            //     link: "/",
                            //     name: checkers['category']? checkers['category'].name : 'Catalog'
                            // }
                        ]
                    }
                />
                <div className="certificates-container">
                    
                </div>
            </div>
        </div>
    )
}

export default Certificates

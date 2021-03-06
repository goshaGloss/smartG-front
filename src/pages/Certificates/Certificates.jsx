import React from 'react'
import Title from '../../components/Title'
import BreadCumps from '../../components/BreadCumps'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { certificatesPageAction } from '../../store/actions'
import '../../style/pages/certificates.css'
import Hamburger from '../../components/Hamburger';
import { ScrollWrapper } from '../../components/ScrollWrapper';

const Certificates = () => {
    const dispatch = useDispatch()
    const [certificate, setCertificates] = useState(null)
    useEffect(() => {
        dispatch(certificatesPageAction()).then(res => {
            setCertificates(res.certificates)
        })
    }, [])
    if(certificate){

        console.log(JSON.parse(certificate[0].document)[0].download_link)
    }
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
                    {certificate && certificate.map(item =>{
                        return(
                            <img className='certificate-item' onClick={() => window.location.replace(`https://smartg.a-lux.dev/storage/${JSON.parse(item.document)[0].download_link}`)} src={`https://smartg.a-lux.dev/storage/${item.image}`}  alt="" />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ScrollWrapper(Certificates)

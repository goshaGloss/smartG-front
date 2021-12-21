import React from 'react'
import Title from '../../components/Title'
import BreadCumps from '../../components/BreadCumps'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { privacyPageAction } from '../../store/actions'
import '../../style/pages/privacy.css'
import Hamburger from '../../components/Hamburger';
import { ScrollWrapper } from '../../components/ScrollWrapper';

const Privacy = () => {
    const dispatch = useDispatch()
    const [privacy, setPrivacy] = useState()
    useEffect(() => {
        dispatch(privacyPageAction()).then(res => setPrivacy(res.private))

    }, [])
    console.log(privacy)
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
                                link: "/policy",
                                name: 'Политика конфиденциальности'
                            },
                            // {
                            //     link: "/",
                            //     name: checkers['category']? checkers['category'].name : 'Catalog'
                            // }
                        ]
                    }
                />
                <div className="privacy-policy">
                    <h1>{privacy.title}</h1>
                    <div className="privacy-desc" dangerouslySetInnerHTML={{ __html: privacy.description }}></div>
                </div>
            </div>
        </div>
    )
}

export default ScrollWrapper(Privacy)

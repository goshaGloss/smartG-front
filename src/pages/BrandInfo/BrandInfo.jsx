import React from 'react'
import { useState, useEffect } from 'react'
import {imgImport} from '../../helpers/helper';
import BreadCumps from '../../components/BreadCumps';
import Title from '../../components/Title'
import { useDispatch } from 'react-redux';
import { brandPageAction } from '../../store/actions.js';
import '../../style/pages/brand.css'
const BrandInfo = () => {
    const dispatch = useDispatch()
    const [content, setContent] = useState({}) 
    useEffect(() => {
        dispatch(brandPageAction()).then(res => {
            setContent(res)
        })
    }, [])
    console.log(content)
    return (
        <div>
                {content.banner && 
                
                <div className="container">
                    <Title title="Информация о бренде"></Title>
                    <BreadCumps 
                            items={
                                [
                                    {
                                        link: "/",
                                        name: 'Главная'
                                    },
                                    {
                                        link: "/brand",
                                        name: 'Информация о бренде'
                                    },
                                    // {
                                    //     link: "/",
                                    //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                    // }
                                ]
                            }
                        />
                <div className="banner-about" style={{ backgroundImage: `url(https://smartg.a-lux.dev/storage/${content.banner.image}` }}>
                    <div className="about-banner-left">
                        <div className="about-banner-left-wrap">
                            <p className="about-banner-title">{content.banner.title}</p>
                            <div className="about-line" ></div>
                            <p className="about-left-desc" dangerouslySetInnerHTML={{ __html: content.banner.description }}></p>
                        </div>
                    </div>
                    <div className="about-banner-right">
                        <div className="about-mini-banner">
                                <p className="about-right-desc" dangerouslySetInnerHTML={{ __html: content.banner.description2 }}></p>

                        </div>
                    </div>
                </div>
                        <section className="about-section">
                    <div style={{ marginBottom: '130px' }} className="about-section-item">
                        {content.about.map((item,index) => {
                            if((index+1) % 2 !=0){
                                return(
                                    <div className="quality">
                                        <div className="quality-wrap">
                                            <img style={{ width:'50%' }} src={`https://smartg.a-lux.dev/storage/${item.image}`} alt="" />
                                            <div className="quality-text" style={{marginLeft: '60px'}}>
                                                <p className="quality-title">
                                                    {item.title}
                                                </p>
                                                <div dangerouslySetInnerHTML={{ __html: item.description}} className="quality-desc"></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div className="quality-item">
                                        <div className="quality-wrap">
                                            <div className="quality-text" style={{marginRight: '60px'}}>
                                                <p className="quality-title">
                                                    {item.title}
                                                </p>
                                                <div dangerouslySetInnerHTML={{ __html: item.description}} className="quality-desc"></div>
                                            </div>
                                            <img style={{ width:'50%' }} src={`https://smartg.a-lux.dev/storage/${item.image}`} alt="" />
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </section> 
                </div>
                }
        </div>
    )
}

export default BrandInfo

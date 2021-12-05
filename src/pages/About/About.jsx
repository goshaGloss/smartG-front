import React from 'react'
import {imgImport} from '../../helpers/helper';
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/actions";
import Card from '../../components/Card'
import BreadCumps from '../../components/BreadCumps'
import Hamburger from '../../components/Hamburger';
import Pagination from '../../components/Pagination';
import Title from '../../components/Title'
import {aboutPageAction} from "../../store/actions";
import { aboutPageSelector} from "../../store/selectors";
import {Link, useNavigate} from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/about.css'
const About = () => {
    const contents = useSelector(aboutPageSelector);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(aboutPageAction())
    
     },[]);
    return (
        <div className="about-us-page">
            <div className="container">
                <Title title="О компании"></Title>
                <BreadCumps 
                        items={
                            [
                                {
                                    link: "/",
                                    name: 'Главная'
                                },
                                {
                                    link: "/about",
                                    name: 'О компании'
                                },
                                // {
                                //     link: "/",
                                //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                // }
                            ]
                        }
                    />
                <div className="banner-about" style={{ backgroundImage: `url(https://smartg.a-lux.dev/storage/${contents.contents && contents.contents.banner.image}` }}>
                    <div className="about-banner-left">
                        <div className="about-banner-left-wrap">
                            <p className="about-banner-title">{contents.contents && contents.contents.banner.title}</p>
                            <div className="about-line" ></div>
                            <p className="about-left-desc">{contents.contents && contents.contents.banner.description}</p>
                        </div>
                    </div>
                    <div className="about-banner-right">
                        <div className="about-mini-banner">
                                <p className="about-right-desc">{contents.contents && contents.contents.banner.description2}</p>

                        </div>
                    </div>
                </div>
                <section className="about-section">
                    <div className="about-section-item">
                        {contents.contents && contents.contents.description.map((item,index) => {
                            if((index+1) % 2 !=0){
                                return(
                                    <div className="quality">
                                        <div className="quality-wrap">
                                            <img src={`https://smartg.a-lux.dev/storage/${item.image}`} alt="" />
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
                                            <img src={`https://smartg.a-lux.dev/storage/${item.image}`} alt="" />
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </section>
                        <div className="quality q-ab">
                            <div className="left-quality left-q-about" style={{ backgroundImage: `url(${imgImport('mainPage', 'second-banner.png')})` }}>
                                <div className="left-q-text">
                                    <p className="left-q-title">{contents.contents && contents.contents.quality.title}</p>
                                    <p className="left-q-desc" dangerouslySetInnerHTML={{ __html: contents.contents && contents.contents.quality.description}}></p>
                                </div>
                                <img className='quality-image-about' src={contents.contents && 'https://smartg.a-lux.dev/storage/'+contents.contents.quality.image} alt="" />
                            </div>
                            <div className="right-quality">
                                <div className="right-quality-wrap">
                                    {contents.contents && contents.contents.advantages.map((item,index) =>{
                                        return(
                                            <div key={index} style={{marginRight: '2rem'}} className={'mini-adv'+ ' ' +`mini-adv${index}`}>
                                            
                                                <img className="mini-adv-pic" src={'https://smartg.a-lux.dev/storage/' + item.image} alt="" />
                                                <div className="mini-adv-text">
                                                    <p className="min-adv-title">
                                                        {item.title}
                                                    </p>
                                                    <div dangerouslySetInnerHTML={{ __html: item.description}} className="min-adv-desc">

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    <div className="description-row">
                        {contents.contents && contents.contents.description2.map(item=>{
                            return(
                                <div className="description-row-item">
                                    <div className="description-row-wrap">
                                        <img src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" />
                                        <p className="desc-row-title">{item.title}</p>
                                        <div dangerouslySetInnerHTML={{ __html: item.description}} className="desc-row-desc"></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                        <div className="new-items">
                            <Title title='Новые Товары'></Title>
                                    <div className="new-items-wrapper">
                                        {contents.contents && contents.contents.newProducts.map(item =>{
                                            return(
                                                <Card
                                                    id={item.id}
                                                    key={item.id}
                                                    title={item.title}
                                                    rating={item.rating}
                                                    image={item.image}
                                                    price={item.price}
                                                    salePrice={item.salePrice ? item.salePrice : ''}
                                                    article={item.setNumber}
                                                />
                                            )
                                        })}
                                </div>
                        </div>
            </div>
        </div>
    )
}

export default About

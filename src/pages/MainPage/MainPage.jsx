import React from 'react'
import {imgImport} from '../../helpers/helper';
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {mainPageAction} from "../../store/actions";
import Card from '../../components/Card'
import Hamburger from '../../components/Hamburger';
import Title from '../../components/Title'
import { mainPageSelector} from "../../store/selectors";
import {Link,useNavigate} from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/main-page.css'
const MainPage = () => {
    const dispatch = useDispatch();
    const contents = useSelector(mainPageSelector);
    const [index, setIndex] = React.useState(0);
    const delay = 5000;
    const timeoutRef = React.useRef(null);
    const navigate = useNavigate()
    const showSubcats = (id) =>{
        let detection = window.innerWidth > 767 ? `.subcatalog${id}` : `.subcatalog-mob${id}`
        if(document.querySelector(detection).style.display == 'block'){
            document.querySelector(detection).style.display = 'none'
            return
        }
        document.querySelector(detection).style.display = 'block'
    }
    function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
    useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
        contents.contents && prevIndex >= contents.contents.banners.length - 1 ? 0 : prevIndex + 1

        ),
      delay
    );
    return () => {
        resetTimeout();
    };
  }, [index]);
    useEffect(() => {
        if(!contents.contents || !contents.contents.categories){

            dispatch(mainPageAction())
        }
     },[]);
    return (
        <div>
            <div className="container">
                <Hamburger></Hamburger>
                <div className="hero">
                    <div className="sidebar">
                        <div className="catalog">
                            <div className="catalog-title">
                                <img src={imgImport('mainPage', 'three-lines.svg')} alt="" />
                                <Link to="/catalog" style={{ color:'white', textDecoration:'none' }}>
                                    <p>Каталог товаров</p>
                                </Link>
                            </div>
                                {contents.contents && contents.contents.categories.map(item => {
                                    return(
                                            <div key={item.id} className="category">
                                                <div className="cat-title-cont">
                                                <img className="cat-icon" src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" />
                                                    <p className="cat-title" onClick={() => navigate(`catalog/${item.id}`)}>{item.title}</p>
                                                    <img
                                                        onClick={() => item.subcategories.length > 0 && showSubcats(item.id) } 
                                                        className="cat-arrow"
                                                        src={imgImport('mainPage', 'arrow-right.png')} alt="" 
                                                    />
                                                </div>
                                            {item.subcategories.length > 0 && item.subcategories.map(subitem =>{
                                                return(
                                                        <div key={subitem.id} className={`subcatalog-mob${subitem.id} subcatalog-mob`}>
                                                                
                        
                                                                    <div onClick={() => navigate(`catalog/sub-cat=${item.id}`)} className="subcat">
                                                                        {subitem.title}
                                                                    </div>
                                                                
                                                        
                                                        </div>
                                                    )
                                                })
                                            }

                                            </div>
                                        )
                                    
                                    })
                                }
                        </div>

                    </div>
                        <div className="slideshow">
                        {contents.contents && contents.contents.categories.map(item=>{
                        if(item.subcategories.length > 0){
                            return(
                                    <div key={item.id} className={`subcatalog${item.id} subcatalog`}>
                                        {item.subcategories && item.subcategories.map(subitem =>{
                                            return(
    
                                                <div onClick={() => navigate(`catalog/sub-cat=${item.id}`)} className="subcat">
                                                    {subitem.title}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                        }
                    })}
                            <div
                                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }} 
                                className="slideshowSlider">

                                {contents.contents && contents.contents.banners.map(item => {
                                    return(
                                        <div className="slide" key={item.id} style={{ backgroundImage: `url(https://smartg.a-lux.dev/storage/${item.image})` }}>
                                            <div className="slide-title">
                                                <p>{item.title}</p>
                                                <button className="know-more">Узнать больше</button>
                                                <div className="slideshowDots">
                                                    {contents.contents && contents.contents.banners.map(item => {
                                                        return(
                                                            <div 
                                                            key={item.id}
                                                            onClick={() => {setIndex(item.id-1);}}
                                                            className={`slideshowDot ${index ==  (item.id-1) ? "active" : ""}`} key={item.id}></div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {contents.contents && 
                            <div className="banners">
                                <div className="banner" style={{ backgroundImage: `url(${imgImport('mainPage', 'bg-discount-1.png')})` }}>
                                    <div className="banner-wrap">

                                        <p>{contents.contents.events[0].title}</p>
                                        <p className='discount'>{contents.contents.events[0].description}</p>
                                        <img className="toolPic" src={'https://smartg.a-lux.dev/storage/'+contents.contents.events[0].image} alt="" />
                                    </div>
                                </div>
                                    <div className="banner" style={{ backgroundImage: `url(${imgImport('mainPage', 'cat-bg.png')})` }}>
                                        <div className="banner-wrap">
                                            <div className="toolpic-cat-cont">

                                                <img className="toolPic-cat" src={'https://smartg.a-lux.dev/storage/'+contents.contents.events[1].image} alt="" />
                                            </div>
                                            <p style={{marginTop: '2rem'}}>{contents.contents.events[0].title}</p>
                                        </div>
                                </div>
                                <div className="banner" style={{ backgroundImage: `url(${imgImport('mainPage', 'bg-discount-2.png')})` }}>
                                    <div className="banner-wrap">

                                        <p>{contents.contents.events[2].title}</p>
                                        <p className='discount'>{contents.contents.events[2].description}</p>
                                        <img className="toolPic" src={'https://smartg.a-lux.dev/storage/'+contents.contents.events[2].image} alt="" />
                                    </div>
                                </div>
                            </div>
                            }
                    </div>
                </div>
                            <div className="advantages">
                                {contents.contents && contents.contents.advantages.map(item =>{
                                    return(
                                        <div key={item.id} className="advantage">
                                            <div className="advantage-wrap">
                                                <div className="advantage-content">
                                                    <div className="adv-first-row">
                                                        <img src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" className="advantage-icon" />
                                                        <p className="id">0{item.id}</p>
                                                    </div>
                                                    <p className="advantage-title">{item.title}</p>
                                                    <p className="advantage-desc">{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="about-us">
                                <div className="left-half">
                                    <div className="left-half-wrap">
                                            <p className="left-half-title">
                                                О компании <span>/</span>
                                            </p>
                                        <div className="left-desc" dangerouslySetInnerHTML={{ __html: contents.contents && contents.contents.about.description}}>

                                        </div>
                                    </div>
                                </div>
                                <div className="about-us-mid">
                                    <div className="red-about">
                                        <p>{contents.contents && contents.contents.about.description2}</p>
                                    </div>
                                    <div className="red-about-description">
                                        <p>{contents.contents && contents.contents.about.description3}</p>
                                        <img src={imgImport('mainPage', 'pulemet2.png')} alt="" />
                                    </div>
                                </div>
                                <div className="about-us-pic" style={{backgroundImage: `url(${contents.contents && 'https://smartg.a-lux.dev/storage/'+contents.contents.about.image2})`}}>

                                </div>
                            </div>
                            <div className="popular-items">
                                <Title title='dsdsa'/>
                                <div className="popular-wrapper">
                                    {contents.contents && contents.contents.popularProducts.map(item =>{
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
                                                created={item.created_at}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        <div className="quality">
                            <div className="left-quality" style={{ backgroundImage: `url(${imgImport('mainPage', 'second-banner.png')})` }}>
                                <div className="left-q-text">
                                    <p className="left-q-title">{contents.contents && contents.contents.quality.title}</p>
                                    <p className="left-q-desc">{contents.contents && contents.contents.quality.description}</p>
                                </div>
                                <img className='quality-image' src={contents.contents && 'https://smartg.a-lux.dev/storage/'+contents.contents.quality.image} alt="" />
                            </div>
                            <div className="right-quality">
                                <div className="right-quality-wrap">
                                    {contents.contents && contents.contents.miniAdvantages.map((item,index) =>{
                                        return(
                                            <div key={index} style={{marginRight: '2rem'}} className={'mini-adv'+ ' ' +`mini-adv${index}`}>
                                            
                                                <img className="mini-adv-pic" src={'https://smartg.a-lux.dev/storage/' + item.image} alt="" />
                                                <div className="mini-adv-text">
                                                    <p className="min-adv-title">
                                                        {item.title}
                                                    </p>
                                                    <p className="min-adv-desc">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
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
                                                    created={item.created_at}
                                                />
                                            )
                                        })}
                                    </div>
                        </div>
            </div>
        </div>
    )
}

export default ScrollWrapper(MainPage);

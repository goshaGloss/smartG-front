import React from 'react'
import {imgImport} from '../../helpers/helper';
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {eventsAction, fetchProducts} from "../../store/actions";
import Card from '../../components/Card'
import BreadCumps from '../../components/BreadCumps'
import Hamburger from '../../components/Hamburger';
import Pagination from '../../components/Pagination';
import Title from '../../components/Title'
import { filterAction } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/catalog.css'
import { useLocation } from 'react-router';
const Catalog = () => {
    const location = useLocation()
    const [currentCat, setCurrentCat] = useState({})
    const [showDropdown, setShowDropdown] = useState(false)
    const [showCats, setShowCats] = useState(false)
    const [filter, setFilter] = useState({
        category_id:'',
        subcategory_id:'',
        event_id:'',
        increase:'',
        decrease:'',
        available:'',
        new:'',
        discount:'',
        popularity:''
    })
    const [chosenFilter, setChosenFilter] = useState('Фильтр не выбран')
    const [catalog,setCatalog] = useState({});
    const [cats, setCats] = useState({})
    const [checkers, setCheckers] = useState({
        category:'',
        subcategory:'',
        event:''
    });
    const [paginationDetails, setPaginationDetails] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState({
        all: false,
        discounts: false,
        available: false
    })
    useEffect(() => {
        dispatch(fetchProducts()).then(res => setCats({cats: res[0]}))
    }, [])
    useEffect(() => {
        var reg = new RegExp('^[0-9]$');
        let test = reg.test(window.location.pathname.substr(-1))
        if(location.state && location.state.length > 0){
            // console.log('ll', location.state)
            const formatter = {data:location.state}
            setCatalog({...catalog, products: formatter})
            setPaginationDetails(location.state);
            setCheckers({
                ...checkers,
                'category': '',
                'subcategory': '',
                'event': ''
            })
        }
        if(location.pathname.includes('event') && test){
            filterAll('event_id',location.pathname.substr(-1))
        }
        if(!location.pathname.includes('sub-cat') && !location.pathname.includes('event') && test){
            // console.log(location.pathname.substr(-1))
            filterAll('category_id',location.pathname.substr(-1))
        }if(location.pathname.includes('sub-cat') && test){
            filterAll('subcategory_id',location.pathname.substr(-1))
        }
        if(!reg.test(location.pathname.substr(-1)) && !test){
            dispatch(fetchProducts()).then(res => {
                setCatalog({products: res[1]})
                setPaginationDetails(res[1]);
            })
            // filterAll()
        }
        // if(reg.test(location.pathname.substr(-1) && location.pathname.includes)
    },[]);
    const onPaginate = ({ currentPage }) => {
        // console.log(checkers)
        if(currentPage <= 0 || !currentPage) return;
        navigate(currentPage);
        var reg = new RegExp('^[0-9]$');
        let test = reg.test(location.pathname.substr(-1))
        if(location.state && location.state.length > 0){
            const formatter = {data:location.state}
            setCatalog({...catalog, products: formatter})
            setPaginationDetails(location.state);
            return
        }
        if(location.pathname.includes('event') && test){
            filterAll('event_id',location.pathname.substr(-1),currentPage)
        }
        if(!location.pathname.includes('sub-cat') && !location.pathname.includes('event') && test){
            filterAll('category_id',location.pathname.substr(-1),currentPage)
        }
        if(location.pathname.includes('sub-cat') && test){
            filterAll('subcategory_id',location.pathname.substr(-1),currentPage)
        }
        if(!test){
            filterAll(null,null,currentPage)
        }
    }
    const filterAll = (type,id,page,red,filterText) =>{
        
        if(filterText){
            setShowDropdown(!showDropdown)
            setChosenFilter(filterText)
        }
        if(red){
            let prevActive = active
            for(let i in active){
                if(i !== red){
                    prevActive[i] = false
                }
            }
            setActive({...active, ...prevActive , [red]:true})
        }
        if(!type && !id){
            dispatch(fetchProducts(page)).then(res => {
                setCatalog({products: res[1]})
                setPaginationDetails(res[1]);
                navigate('/catalog')
                setFilter({...filter,category_id:'',subcategory_id:'',event_id:'',})
            })
            return
        }
        let newItem = filter
        if(type.includes('id')){
            // console.log(filter)
            for(let i in filter){
                if(i.includes('id') && i == type){
                    newItem[i] = id
                }if(i.includes('id') && i != type){
                    newItem[i] = ''
                }
            }
        }else if(!type.includes('id')){
            for(let i in filter){
                if(!i.includes('id') && i != type){
                    newItem[i] = ''
                }
                if(!i.includes('id') && i == type){
                    newItem[i] = 1
                }
            }
        }
        setFilter({...filter, ...newItem})
        dispatch(filterAction(filter,page)).then(res => {
            setCatalog(res)
            setPaginationDetails(res.products)
            
        })
    }
    const showSubcats = (id) =>{
        let detection = window.innerWidth > 767 ? `.subcatalog${id}` : `.subcatalog-mob${id}` 
        if(document.querySelector(detection).style.display == 'block'){
            document.querySelector(detection).style.display = 'none'
        }else{
            document.querySelector(detection).style.display = 'block'
        }
        if(window.innerWidth < 767){
            if(document.querySelector('.cat-arrow').style.transform == 'rotate(90deg)'){
                document.querySelector('.cat-arrow').style.transform = 'rotate(0deg)'
                return
            }else{
                document.querySelector('.cat-arrow').style.transform = 'rotate(90deg)'
            }
        }
    }   
            // console.log(cats)
            return (
            <div className="catalog-page">
            <div className="container">
                <Hamburger />
                <Title title="Каталог товаров"></Title>
                <div className="title-filters">
                    <div className="filter-dropdown-cont">
                        <BreadCumps 
                            items={
                                [
                                    {
                                        link: "/",
                                        name: 'Главная'
                                    },
                                    {
                                        link: "/catalog",
                                        name: 'Каталог'
                                    },
                                ]
                            }
                        />
                        <div className="filter-dropdown">
                            <div onClick={() => setShowDropdown(!showDropdown)} className="filter-dropdown-btn">{chosenFilter} <img src={imgImport('catalog', 'triangle.png')} alt="" /></div>
                            {
                                showDropdown &&
                                <ul className='dropdown-filters'>
                                    <li onClick={() => filterAll('popularity',null,null,null,'По популярности')}>По популярности</li>
                                    <li onClick={() => filterAll('new',null,null,null,'По новизне')}>По новизне</li>
                                    <li onClick={() => filterAll('increase',null,null,null,'По повышению цен')}>По повышению цен</li>
                                    <li onClick={() => filterAll('decrease',null,null,null,'По понижению цен')}>По понижению цен</li>
                                </ul>
                            }
                        </div>
                    </div>
                        <div className="catalog-filters">
                            <div onClick={() => filterAll(null,null,1,'all')} className={'all-filter' + ' ' + (active.all && 'filters-active')}>Все</div>
                            <div onClick={() => filterAll('available',null,1,'discounts')} className={'discounts-filter' + ' ' + (active.discounts && 'filters-active')}>Акции</div>
                            <div onClick={() => filterAll('discount',null,1,'available')} className={'available-filter' + ' ' +(active.available && 'filters-active')}>В наличии</div>
                        </div>
                </div>
      
                    {
                        (cats.cats || catalog.products) && 
                        <div className="catalog-inner">
                        <div className="catalog-filter">
                        <div className="sidebar">
                        <div className="catalog">
                        {
                            window.innerWidth > 767 ?
                            <div className="catalog-title">
                                <img src={imgImport('mainPage', 'three-lines.svg')} alt="" />
                                <p>Каталог товаров</p>
                            </div>
                            :
                            <div className="catalog-title catalog-incatalog">
                                <div className="catalog-conatiner-first">
                                    <img src={imgImport('mainPage', 'three-lines.svg')} alt="" />
                                    <p>Каталог товаров</p>
                                </div>
                                <img 
                                    className='arrow-down-catalog' 
                                    style={{ cursor: 'pointer', transform: showCats ? 'rotate(180deg)' : '', margin: '0 1.5rem 0 0' }} 
                                    src={imgImport('mainPage', 'arrow-down.png')} 
                                    alt="" 
                                    onClick={() => setShowCats(!showCats)}
                                />
                            </div>
                            
                        }
                                {(cats.cats && cats.cats.length > 0) &&cats.cats.map(item => {
                                    return(
                                            <div style={{ display: showCats || window.innerWidth > 767 ? 'flex' : 'none' }} key={item.id} className="category">
                                                <div className="cat-title-cont">
                                                <img className="cat-icon" src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" />
                                                    <p style={{ color: filter.category_id == item.id && 'red' }} onClick={() => filterAll('category_id',item.id)} className="cat-title">{item.title}</p>
                                                    <img
                                                        onClick={() => item.subcategories.length > 0 && showSubcats(item.id) } 
                                                        className="cat-arrow"
                                                        src={imgImport('mainPage', 'arrow-right.png')} alt="" 
                                                    />
                                                </div>
                                            {item.subcategories.length > 0 && item.subcategories.map(subitem =>{
                                                return(
                                                        <div key={subitem.id} className={`subcatalog-mob${subitem.id} subcatalog-mob`}>
                                                                
                        
                                                                    <div style={{ color: filter.subcategory_id == subitem.id && 'red' }}  onClick={() => filterAll('subcategory_id',subitem.id)} className="subcat">
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
                            </div>
                    <div className="items">
                        <div className="items-inner">
                        {cats.cats && cats.cats.map(item=>{
                            if(item.subcategories.length > 0){
                                return(
                                        <div key={item.id} className={`subcatalog${item.id} subcatalog`}>
                                            {item.subcategories && item.subcategories.map(subitem =>{
                                                return(
        
                                                    <div style={{ color: filter.subcategory_id == subitem.id && 'red' }} onClick={() => filterAll('subcategory_id',subitem.id)} className="subcat">
                                                        {subitem.title}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                            }
                        })}
                            {catalog.products && catalog.products.data.length > 0 ?
                                catalog.products.data.map(item =>{
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
                        }): <span>Товар отсутствует</span>
                    }
                        </div>
                    </div>
                        </div>
                    }
                        <div className="catalog_pagination">
                            <div className="catalog_pagination_inner">
                                
                                {
                                
                                paginationDetails && paginationDetails.last_page > 1?
                                    <>
                                        {paginationDetails.total <= 9 ? null :
                                            <img src={imgImport('pagination', 'arrow-left.png')} /> }
                                        <Pagination
                                            totalRecords={paginationDetails.total}
                                            pageLimit={10}
                                            pageNeighbours={1}
                                            onPageChanged={onPaginate}
                                            currentPage={paginationDetails.current_page}
                                        />
                                        {paginationDetails.total <= 9 ? null :
                                            <img src={imgImport('pagination', 'arrow-right.png')} />}
                                    </>
                                : ''
                            }
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ScrollWrapper(Catalog);

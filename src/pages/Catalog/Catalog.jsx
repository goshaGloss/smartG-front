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
import {filterByCat, filterBySubCat} from "../../store/actions";
import { mainPageSelector} from "../../store/selectors";
import {Link, useNavigate} from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import '../../style/pages/catalog.css'
const Catalog = () => {
    const [catalog,setCatalog] = useState([]);
    const [filtered,setFiltered] = useState([]);
    const [checkers, setCheckers] = useState({'category': ""});
    const [paginationDetails, setPaginationDetails] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        var reg = new RegExp('^[0-9]$');
        if(reg.test(window.location.pathname.substr(-1))){
            dispatch(fetchProducts()).then(res => {
                setCatalog(res)
                setPaginationDetails(res);
                if(!window.location.pathname.includes('sub-cat')){
                    dispatch(filterByCat(window.location.pathname.substr(-1))).then(res => {
                        setFiltered(res)
                    })
                }else{
                    dispatch(filterBySubCat(window.location.pathname.substr(-1))).then(res => {
                        setFiltered(res)
                    })
                }
                if(catalog[0]){
                    
                    setCheckers({
                        ...checkers,
                        'category': catalog[0].window.location.pathname.substr(-1)
        
                    })
                }
            })
        }else{
                dispatch(fetchProducts()).then(res => {
                setCatalog(res)
                setPaginationDetails(res);
            })
        }
        
    },[]);
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
        const onPaginate = ({ currentPage }) => {
        if(currentPage <= 0 || !currentPage) return;
        navigate(currentPage);
         dispatch(fetchProducts(currentPage)).then(res => {
            setCatalog(res);
            setPaginationDetails({...res});
        })
    }
    const filterByCategory = (id) =>{
        let category = catalog[0].filter(item => item.id == id ? item.id : '')
        setCheckers({
            ...checkers,
            'category': category[0].id
            
        })
        
        dispatch(filterByCat(id)).then(res => {
            setFiltered(res)
        })
    }
    const filterBySubCategory = (id) =>{
        let category = catalog[0].filter(item => item.id == id ? item.id : '')
        setCheckers({
            ...checkers,
            'category': category[0].id
            
        })
        
        dispatch(filterBySubCat(id)).then(res => {
            setFiltered(res)
        })
    }
    return (
        <div className="catalog-page">
            <Title title="Каталог товаров"></Title>
                <div className="container">
                    <BreadCumps 
                        items={
                            [
                                {
                                    link: "/",
                                    name: 'Главная'
                                },
                                {
                                    link: "/",
                                    name: 'Каталог'
                                },
                                // {
                                //     link: "/",
                                //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                // }
                            ]
                        }
                    />
                    {
                        (catalog[0] || catalog[1]) && 
                        <div className="catalog-inner">
                            <div className="catalog-filter">
                        <div className="sidebar">
                        <div className="catalog">
                            <div className="catalog-title">
                                <img src={imgImport('mainPage', 'three-lines.svg')} alt="" />
                                <p>Каталог товаров</p>
                            </div>
                                {catalog[0] && catalog[0].map(item => {
                                    return(
                                            <div key={item.id} className="category">
                                                <div className="cat-title-cont">
                                                <img className="cat-icon" src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" />
                                                    <p onClick={() => filterByCategory(item.id)} className="cat-title">{item.title}</p>
                                                    <img
                                                        onClick={() => item.subcategories && showSubcats(item.id) } 
                                                        className="cat-arrow"
                                                        src={imgImport('mainPage', 'arrow-right.png')} alt="" 
                                                    />
                                                </div>
                                            {item.subcategories.length > 0 && item.subcategories.map(subitem =>{
                                                return(
                                                        <div key={subitem.id} className={`subcatalog-mob${subitem.id} subcatalog-mob`}>
                                                                
                        
                                                                    <div onClick={() => filterBySubCategory(item.id)} className="subcat">
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
                        {catalog[0] && catalog[0].map(item=>{
                            if(item.subcategories.length > 0){
                                return(
                                        <div key={item.id} className={`subcatalog${item.id} subcatalog`}>
                                            {item.subcategories && item.subcategories.map(subitem =>{
                                                return(
        
                                                    <div onClick={() => filterBySubCategory(item.id)} className="subcat">
                                                        {subitem.title}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                            }
                        })}
                            {filtered.length == 0 ? catalog[1].data.map(item =>{
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
                        }) :
                        filtered.map(item => {
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
                        })
                    }
                        </div>
                    </div>
                        </div>
                    }
                                                                <div className="catalog_pagination">
                                                <div className="catalog_pagination_inner">
                                                 
                                                    {
                                                    
                                                    paginationDetails ?
                                                        <>
                                                            {paginationDetails[1].total <= 9 ? null :
                                                               <img src={imgImport('pagination', 'arrow-left.png')} /> }
                                                            <Pagination
                                                                totalRecords={paginationDetails[1].total}
                                                                pageLimit={10}
                                                                pageNeighbours={1}
                                                                onPageChanged={onPaginate}
                                                                currentPage={paginationDetails[1].current_page}
                                                            />
                                                            {paginationDetails[1].total <= 9 ? null :
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

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
import { useLocation } from 'react-router';
const Catalog = () => {
    const location = useLocation()
    const [catalog,setCatalog] = useState({
    });
    const [cats, setCats] = useState({})
    const [filtered,setFiltered] = useState([]);
    const [checkers, setCheckers] = useState({'category': ""});
    const [paginationDetails, setPaginationDetails] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSub, setShowSub] = useState(false)
    const [currPage, setCurrPage] = useState(1)
    const [show, setShow] = useState(false)
    useEffect(() => {
        dispatch(fetchProducts()).then(res => setCats({cats: res[0]}))
    }, [])
    useEffect(() => {
        var reg = new RegExp('^[0-9]$');
        let test = reg.test(location.pathname.substr(-1))
                if(!location.pathname.includes('sub-cat') && test){
                    dispatch(filterByCat(location.pathname.substr(-1))).then(res => {
                        console.log(res)
                        setCatalog({...catalog, products: res})
                        setPaginationDetails(res);
                    })
                }else if(location.pathname.includes('sub-cat') && test){
                    dispatch(filterBySubCat(location.pathname.substr(-1))).then(res => {
                        setCatalog({...catalog, products: res})
                        setPaginationDetails(res);
                    })
                }
                    !location.pathname.includes('sub-cat') ?setCheckers({
                        ...checkers,
                        'category': location.pathname.substr(-1)
        
                    })
                    :
                    setCheckers({
                        ...checkers,
                        'subcategory': location.pathname.substr(-1)
        
                    })
                    console.log(checkers)
     
            if(!reg.test(location.pathname.substr(-1)) && !test){
                dispatch(fetchProducts()).then(res => {
                setCatalog({products: res[1]})
                setPaginationDetails(res[1]);
            })
        }
        // if(reg.test(location.pathname.substr(-1) && location.pathname.includes)
    },[]);
        const onPaginate = ({ currentPage }) => {
        if(currentPage <= 0 || !currentPage) return;
        navigate(currentPage);
        setCurrPage(currentPage)
        var reg = new RegExp('^[0-9]$');
        let test = reg.test(location.pathname.substr(-1))
        if(!location.pathname.includes('sub-cat') && test){
            filterByCategory(location.pathname.substr(-1),currentPage)
        }
        if(location.pathname.includes('sub-cat') && test){
            filterBySubCategory(location.pathname.substr(-1),currentPage)
        }
        if(!test){
            dispatch(fetchProducts(currentPage)).then(res => {
               setCatalog({products:res[1],cats:res[0]});
               setPaginationDetails(res[1]);
           })
        }
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
        const filterByCategory = (id,page) =>{
            let category = cats.cats.filter(item => item.id == id ? item.id : '')
            
            setCheckers({
                ...checkers,
                'category': window.location.pathname.substr(-1)
            })
            
            dispatch(filterByCat(id, page ? page : 1)).then(res => {
                setCatalog({...catalog, products: res})
                setPaginationDetails(res);
            })
    }
    const filterBySubCategory = (id,page) =>{
        
        // let category = cats.cats.filter(item => item.id == id ? item.id : '')
        setCheckers({
            ...checkers,
            'subcategory': window.location.pathname.substr(-1)

        })
        
        dispatch(filterBySubCat(window.location.pathname.substr(-1),page ? page : 1)).then(res => {
            setCatalog({...catalog, products: res})
            setPaginationDetails(res);
        })
    }
    return (
        <div className="catalog-page">
            <div className="container">
                    <Title title="Каталог товаров"></Title>
      
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
                        (cats.cats || catalog.products) && 
                        <div className="catalog-inner">
                        <div className="catalog-filter">
                        <div className="sidebar">
                        <div className="catalog">
                            <div className="catalog-title">
                                <img src={imgImport('mainPage', 'three-lines.svg')} alt="" />
                                <p>Каталог товаров</p>
                            </div>
                                {(cats.cats && cats.cats.length > 0) &&cats.cats.map(item => {
                                    return(
                                            <div key={item.id} className="category">
                                                <div className="cat-title-cont">
                                                <img className="cat-icon" src={'https://smartg.a-lux.dev/storage/'+item.image} alt="" />
                                                    <p onClick={() => filterByCategory(item.id)} className="cat-title">{item.title}</p>
                                                    <img
                                                        onClick={() => item.subcategories.length > 0 && showSubcats(item.id) } 
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
                                <div className="filter-dropdown">
                                    <div onClick={() => setShow(!show)} className="filter-dropdown-btn">
                                        <div className="filter-title-cont">
                                            <img style={{ marginRight:'16px' }} src={imgImport('catalog', 'accordeon.png')} alt="" />
                                            <p style={{ margin:'0' }}>Фильтр</p>
                                        </div>
                                        <img src={imgImport('catalog', 'arrow-down.png')} alt="" />
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
        
                                                    <div onClick={() => filterBySubCategory(item.id)} className="subcat">
                                                        {subitem.title}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                            }
                        })}
                            {catalog.products && catalog.products.data.length > 0 &&
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
                        })
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

import React from 'react'
import { useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import BreadCumps from '../../components/BreadCumps'
import Hamburger from '../../components/Hamburger';
import {Link, useNavigate, useLocation, Outlet,Routes,Route} from "react-router-dom";
import {ScrollWrapper} from '../../components/ScrollWrapper';
import {_storage} from "../../helpers/helper";
import '../../style/pages/cabinet.css'
    // const { path} = useRouteMatch();
    // console.log(path)
    // const [nav,setNav] = useState([
        //     {
            //         link: `${path}/profile`,
            //         title: `Профиль`
            //     },
            // ]);
    const Cabinet = (routes) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.isAuthed);
    const location = useLocation();
    console.log(routes)
    const [nav,setNav] = useState([
        {
            link: `profile`,
            title: `Данные пользователя`
        },
        {
            link: `favorite`,
            title: `Избранное`
        },
        {
            title: `История заказов`,
            link :`history`
        },
        {
            title: `Выйти`,
            link :`logout`
        }
    ]);      
    useEffect(() => {
        if(!_storage.get('smartg-token')) navigate('/login')
    },[]) 
    const curLink = useMemo(() => {
        const filtered = nav.filter((obj,index) => obj.link === location.pathname);
        return filtered.length > 0 ? filtered[0] : {};
    },[location]);
    return (
        <div>
            <div className="container">
                <Hamburger />
                    <BreadCumps 
                            items={
                                [
                                    {
                                        link: "/",
                                        name: 'Главная'
                                    },
                                    {
                                        link: "/cabinet/profile",
                                        name: 'Личный кабинет'
                                    },
                                    // {
                                    //     link: "/",
                                    //     name: checkers['category']? checkers['category'].name : 'Catalog'
                                    // }
                                ]
                            }
                        />
                <div className="cabinet" style={{ marginBottom: '3rem' }}>
                        <div className="cabinet_menu">
                        <ul>
                            {
                                nav.map((obj, i) => (
                                    <li key={i} className={curLink.link == obj.link ? "activeLink" : ""}>
                                        <Link to={obj.link}>
                                            {obj.title}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <Routes>
                            {routes.routes.map((route, i) => (
                                <Route key={i} {...route} />
                            ))}
                        </Routes>
                    <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cabinet

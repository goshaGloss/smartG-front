import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
import BreadCumps from '../../components/BreadCumps'
import Title from '../../components/Title'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../style/pages/order.css'
import Dropdown from '../../components/Dropdown'
import {getUserAction, fetchProduct, postOrderAction} from "../../store/actions";
import { _storage } from '../../helpers/helper';
import Hamburger from '../../components/Hamburger';
import { ScrollWrapper } from '../../components/ScrollWrapper';

const Order = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [curDate,setCurDate] = useState(new Date());
    const [isReceiver, setIsReceiver] = useState(false);
    const [card, setCard] = useState(1)
    const [overallPrice, setOverallPrice] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)
    const [chosen,setChosen] = useState({
        address:'Алматы' ,
        delivery_status: 1,
        delivery_date: curDate.toJSON().slice(0, 10),
        delivery_time:'В течении рабочего дня',
        payment_type: card,
        phone: "",
        email:  "",
        name: "",
        comment:''
    });
    const [basket, setBasket] = useState([])
    const [err, setErr] = useState(false)
    useEffect(() => {
        console.log(chosen.date)
        if(!_storage.get('smartg-token')) navigate('/login')
        if(_storage.get('cart')){
            const basketParsed = JSON.parse(_storage.get('cart'))
            let fullBasket = []
            basketParsed.forEach(item => {
                dispatch(fetchProduct(item.id)).then(res =>{
                    console.log(res)
                    let newItem ={ count: item.count, ...res.product  }
                    fullBasket.push(newItem)
                    if(fullBasket.length == basketParsed.length){
                        let overall = 0
                        fullBasket.forEach(item =>{
                            overall+= (item.count * (item.salePrice != null ? item.salePrice  : item.price))
                        })
                        setOverallPrice(overall)
                        setBasket(fullBasket)
                    }
                })
            })
        }
    }, [])
    useEffect(() => {
        console.log(basket.length)
        if(basket.length != 0){
            let overall = 0
            basket.forEach(item =>{
                overall+= item.count * (item.salePrice != null ? item.salePrice  : item.price)
            })
            setOverallPrice(overall)
        }
    }, [])
    const changeCard = (arg) => {
        setCard(arg)
    }
    const getUser = () => {
        if(isReceiver){
            setIsReceiver(false)
            setChosen({...chosen,name:'', email: '', phone: ''})
            return
        }else{
            dispatch(getUserAction()).then(res =>{
                setChosen({...chosen,name:res.user.name, email: res.user.email, phone: res.user.phone_number})
                console.log(res)
                setIsReceiver(true)
            })
        }
    }
    const onChangeChosen = (e,val, isReceiver = false) => {
        // console.log(e,val)
        setChosen({
            ...chosen,
            [e]: val
        })
        console.log(isReceiver)
    }
    // useEffect(() => {
        //     if(_storage.get('cart')){
            //         let storage = JSON.parse(_storage.get('cart'))
            //         console.log(storage)
            //         storage.map(item =>{
                //             dispatch(fetchProduct(item.id)).then(res => {
                    //                 let newItem =  {count:item.count, ...res.product}
                    //                 basket.push(newItem)
                    //                 if(basket.length == storage.length){
                        //                     let overallPrice = 0
                        //                     basket.forEach(item =>{
                            //                         overallPrice += item.salePrice ? item.salePrice * item.count : item.price * item.count
                            //                     })
                            //                     setOverall(overallPrice)
                            //                     setCart(basket)
                            //                 }
                            //             })
                            //         })
                            //     }
                            // }, [])
                            const sendOrder = ()=>{
                                if(!chosen.name || !chosen.email || !chosen.phone){
                                    setErr(true)
                                    setTimeout(() => {
                                        setErr(false)
                                    }, 1500);
                                }else{
                                    const products = []
                                    const additionalFields = {}
                                    basket.forEach(item => {
                products.push({quantity: item.count, id: item.id})
            })
            
            dispatch(postOrderAction({...chosen, products: products, total_price: overallPrice})).then(res => {
                setShowSuccess(true)
                setTimeout(() => {
                    _storage.remove('cart')
                    setShowSuccess(false)
                    navigate('/')
                }, 1500)
                
            })
        }
    }
    
    return (
        <div>
            <div className="container">
                <Hamburger />
                {
                    showSuccess &&
                    <div className="success-modal">
                        Ваш заказ принят!
                    </div>
                }
                {
                    err && 
                    <div className="err-modal">
                        Введите ваши данные!
                    </div>
                }
                <BreadCumps 
                    items={
                        [
                            {
                                link: "/",
                                name: 'Главная'
                            },
                            {
                                link: `order`,
                                name: 'Оформление заказа'
                            },
                        ]
                    }
                />
                <Title title="Оформление заказа" style={{textAlign: 'center'}}></Title>
                <div className="order-inner">
                    <div className="order-info">
                        <form>
                            <div>
                            {/* <p className='order-field-title'>Адрес и время</p> */}
                                <div>
                                    <p>
                                        <label>Адрес доставки:</label>
                                        <input value={chosen.address} onChange={(e) => onChangeChosen("city",e.target.value)} type="text" />
                                    </p>
                                        <label>Выберите дату:</label>
                                        <DatePicker selected={curDate} onChange={(myDate) => {
                                            setCurDate(myDate);
                                            onChangeChosen("delivery_date", myDate.toJSON().slice(0, 10))
                                        }} />
                                        <Dropdown chosen={chosen} keyIndex="time" setChosen={setChosen} defaultTitle="В течении рабочего дня" list={
                                            [
                                                `В течении рабочего дня`,
                                                `После рабочего дня`
                                            ]
                                        }/>
                                    {/* <p> */}
                                        <div>
                                        <p className='order-field-title'>Условия доставки</p>  
                                            <div className="select-container">
                                                <p>
                                                    <input checked={chosen.delivery_status ==  1 ? 1 : 0} className='radio'  type="radio" onChange={(e) => onChangeChosen("delivery_status",1)}/>
                                                    <span className="radio_control"/>
                                                    <label htmlFor="deliver">Курьером</label>
                                                </p>
                                                <p>
                                                    <input checked={chosen.delivery_status == 1 ? 0 : 1} className='radio' type="radio" onChange={(e) => onChangeChosen("delivery_status",0)}/>
                                                    <span className="radio_control"/>
                                                    <label htmlFor="byOwn">Самовывоз</label>
                                                </p>
                                            </div>
                                        </div>
                                    {/* </p> */}
                                    {isReceiver ? 
                                        <div className='your-info'>
                                        <p className='order-field-title'>Ваша информация</p>
                                        <div onClick={(e) => getUser()} className="imreciever">
                                            <span>Я получатель</span>
                                            <input checked={isReceiver} className='radio-receive' type="radio" onClick={(e) => getUser()}/>
                                        </div>
                                        <p>
                                            <input onChange={(e) => onChangeChosen("name",e.target.value)} value={chosen.name} type="text" className="name" placeholder='Ваше имя'/>
                                        </p>
                                        <p>
                                            <input onChange={(e) => onChangeChosen("phone",e.target.value)} value={chosen.phone} type="text" placeholder='Ваш номер' className="phone" />
                                        </p>
                                        <p>
                                            <input onChange={(e) => onChangeChosen("email",e.target.value)} value={chosen.email} type="text" className="email" placeholder='Ваш email' />
                                        </p>
                                        <textarea onChange={(e) => onChangeChosen("comment",e.target.value)} placeholder='Введите ваш комментарий'  className='comment' name="" id="" cols="30" rows="10"></textarea>

                                        </div>
                                        :
                                        <div className='your-info'>
                                        <p className='order-field-title'>Введите вашу информацию</p>
                                        <div onClick={(e) => getUser()} className="imreciever">
                                            <span checked={isReceiver} >Я получатель</span>
                                            <input className='radio-receive' type="radio"/>
                                        </div>
                                        <p>
                                            <input onChange={(e) => onChangeChosen("name",e.target.value)} value={chosen.name} type="text" className="name" placeholder='Ваше имя'/>
                                        </p>
                                        <p>
                                            <input onChange={(e) => onChangeChosen("phone",e.target.value)} value={chosen.phone} type="text" className="phone" placeholder='Ваш номер'/>
                                        </p>
                                        <p>
                                            <input onChange={(e) => onChangeChosen("email",e.target.value)} value={chosen.email} type="text" className="email" placeholder='Ваш email'/>
                                        </p>
                                        <textarea placeholder='Введите ваш комментарий' className='comment' name="" id="" cols="30" rows="10"></textarea>

                                        </div>
                                    }
                                    <div>
                                        <p className='order-field-title'>Способ Оплаты</p>
                                        <div className="select-container">
                                            <p>
                                                <input checked={card} className='radio'  type="radio" onChange={(e) => changeCard(1)} />
                                                <span className="radio_control"/>
                                                <label htmlFor="deliver">Оплата картой</label>
                                            </p>
                                            <p>
                                                <input checked={card == 0 ? 1 : 0} className='radio' type="radio" onChange={(e) => changeCard(0)}/>
                                                <span className="radio_control"/>
                                                <label htmlFor="byOwn">Наличными</label>
                                            </p>
                                        </div>
                                    </div>
                                    <button type="button" margin="1.4rem 0" onClick={() => sendOrder()} className='make-order'>Подтвердить заказ</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="order-items">
                        <h1 style={{ fontSize: '1.6rem', margin: '0',marginBottom: '0.5rem' }}>Ваш заказ</h1>
                        <div className="order-items-inner">
                            {basket && basket.map(item =>{
                                return(
                                    <div key={item.id} className='basket-item-list' style={{height: '100px'}}>
                                        <img style={{ width:'80px',objectFit: 'cover' }} src={`https://smartg.a-lux.dev/storage/${item.image}`} alt="" />
                                        <div className='basket-info'>
                                            <span className="title">{item.title}</span>
                                            <div className='count-price'>
                                                <span className="count-basket">
                                                    {item.count} шт.
                                                </span>
                                                <span className="basket-price">
                                                    {item.salePrice ? item.salePrice  : item.price} тг.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="basket-sum">
                                <p>Сумма</p>
                                <p>{overallPrice} тг.</p>
                            </div>
                            <div className="basket-delivery">
                                <p>Доставка</p>
                                <p>{chosen.deliver_status == 1 ? 1000 : 0} тг.</p>
                            </div>
                            <div className="basket-overall">
                                <p>Общая сумма</p>
                                <p>{chosen.delivery_status == 1 ? overallPrice + 1000 : overallPrice} тг.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrollWrapper(Order)

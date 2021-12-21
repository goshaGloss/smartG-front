import React from "react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getOrdersAction } from "../../../store/actions"
import '../../../style/pages/history.css'
export const History = () => {
    const dispatch = useDispatch()
    const [history, setHistory] = useState()
    useEffect(() => {
        dispatch(getOrdersAction()).then(res => setHistory(res.carts))
    }, [])
    // const orderHistory = useSelector(orderHistorySelector);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(orderHistoryAction()).then(res => {
    //         // console.log(res);
    //     })
    // },[])
    

    return(
        <div className="history">
            <div className="history-inner">
                <p className="id-title">Id заказа</p>
                <p className="history-items-title">Заказ</p>
                <p className="history-info-title">Информация о заказе</p>
            </div>
            <div className="history-items">
                {
                    (history && history.length > 0) && history.map(item => {
                        return(
                            <div className="history-item">
                                <div className="history-id">
                                    <p>{item.id}</p>
                                </div>
                                <div className="history-order-items">
                                    {item.orders.map(order =>{
                                        return(
                                            <div className="history-order-item">
                                                {
                                                    order.products.map(product =>{
                                                        return(
                                                        <div className="history-item-inner">

                                                            <img style={{ width:'70px', height: '70px' }} src={`https://smartg.a-lux.dev/storage/${product.image}`} alt="" />
                                                            <div className="history-item-info">
                                                                <p style={{ margin:'0' }}>{product.title}</p>
                                                                <div className="count-and-price">
                                                                    <p>Кол-во: {order.quantity} шт.</p>
                                                                    <p>Цена: {product.salePrice ? product.salePrice : product.price} тг.</p>
                                                                </div>
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
                                <div className="history-info">
                                    <p>Адрес: {item.address}</p>
                                    <p>Время доставки: {item.delivery_time}</p>
                                    <p>Доставка: {item.delivery_status == 1 ? 'Курьером' : 'Самовывоз' }</p>
                                    <p>Тип оплаты: {item.payment_type == 1 ? 'Картой' : 'Наличными' }</p>
                                    <p>Общая цена заказа: {item.total_price}</p>
                                    <p>Статус: {item.status}</p>
                                    <p>Дата заказа: {item.created_at.split('T')[0]}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
// /* eslint-disable react/jsx-pascal-case */
// import { InputText } from "../../../components/styled/card"
// import { Custom_Basket } from '../../../components/global/Components';
// import * as Component from '../../../components/styled/card'
// import {useDispatch, useSelector} from "react-redux";
// import {orderHistorySelector} from "../../../store/selectors";
// import {useEffect} from "react";
// import {orderHistoryAction} from "../../../store/actions";
// import {_storage} from "../../../helpers/helper";
// const lang = _storage.get('current_lang') ? _storage.get('current_lang') : 'ru'
// let pageContent = {}
// if(lang =='kz'){
//     pageContent = {
//         order:'Тапсырыс',
//         count:'Саны',
//         date:'күні',
//         status:'Күй',
//         sum:'Сомасы',
//         empty: 'Бос',
//     }
// }
// if(lang =='ru'){
//     pageContent = {
//         order:'Заказ',
//         count:'Количество',
//         date:'Дата',
//         status:'Статус',
//         sum:'Сумма',
//         empty: 'Пусто',
//     }
// }
// if(lang =='en'){
//     pageContent = {
//         order:'Order',
//         count:'Count',
//         date:'Date',
//         status:'Status',
//         sum:'Summary',
//         empty: 'Empty',
//     }
// }
export const History = () => {
    // const orderHistory = useSelector(orderHistorySelector);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(orderHistoryAction()).then(res => {
    //         // console.log(res);
    //     })
    // },[])
    return(
        <div className="history">
                lolhistory
        </div>
    )
}
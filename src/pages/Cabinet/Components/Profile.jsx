import React from 'react'
import { useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserAction,avatarAction, updateUserAction} from "../../../store/actions";
import {useNavigate} from "react-router-dom";
import {imgImport, _storage} from "../../../helpers/helper";
import '../../../style/components/profile.css';
import { unstable_renderSubtreeIntoContainer } from 'react-dom/cjs/react-dom.development';

export const Profile = () => {
    const [userData,setUserData] = useState();
    const [image, setImg] = useState()
    const [showSuccess, setShowsuccess] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.isAuthed);
    const [passErr, setPassErr] = useState(false)
    useEffect(() => {
        if(!_storage.get('smartg-token')) navigate('/login')
        
        if(_storage.get('smartg-token')) dispatch(getUserAction()).then(res => setUserData(res.user));
    },[]);
    const changeAvatar = (img) => {
        let imageData = new FormData()
        imageData.append('file', image, image.name)
        dispatch(avatarAction({avatar:imageData})).then(res => console.log('e',res))
    }
    const updateUser = () =>{
        const userChanged = {
            name: userData.name,
            phone_number: userData.phone_number,
            address: userData.address,
        }
        if(userData.password && (userData.password.length != 0 || userData.password.length > 8 || userData.password == userData.password_confirmation)){     
            userChanged['password'] = userData.password
            userChanged['password_confirmation'] = userData.password_confirmation
        }
        console.log(userChanged)
            dispatch(updateUserAction(userChanged)).then(res => {
                setShowsuccess(true)
                setTimeout(() => {
                    setShowsuccess(false)
                }, 1500);
            })
        
    }
    console.log(userData)
    return(
        <div className="cabinet_profile">
            {
                showSuccess &&
                <div className="success-modal">
                    Ваш профиль успешно обновлён!
                </div>
            }
                <div className="profile-info">
                    <div className="avatar">
                        <img style={{width:'128px',borderRadius: '50%'}} src={userData && 'https://smartg.a-lux.dev/storage/'+userData.avatar} alt="" />
                        <label style={{position:'absolute'}} className='file-upload'>
                            <img style={{width: '20px'}} src={imgImport('cabinet', 'camera.png')} alt="" />
                            <input type="file" onClick={(event) => setImg(event.target.files[0])} className="change-avatar" />
                        </label>
                        <button className='send-ava' onClick={() => changeAvatar()}>Отправить</button>
                    </div>
                        {
                            userData && 
                            <div className="profile-info-inner">
                                <p>
                                    <span>Ваше имя</span>
                                    <input type="text" autoComplete="off" value={userData.name} onInput={(e)=> /[0-9]/.test(e.target.value) ? e.target.value = '' : setUserData({...userData,name:e.target.value}) }/>
                                </p>
                                <p>
                                    <span>Ваш номер телефона</span>
                                    <input type="text" autoComplete="off" value={userData.phone_number} onInput={
                                        (e)=> /[A-Za-z]/.test(e.target.value) || 
                                        e.target.value.length > 12 ?
                                        e.target.value = '' : 
                                        setUserData({...userData,phone_number:e.target.value.replace(e.target.value.substr(0,2), '+7')})} 
                                    />
                                </p>
                                <p>
                                    <span>Ваша почта</span>
                                    <input type="text" value={userData.email} autoComplete="off" onInput={(e) => setUserData({...userData,email:e.target.value})}/>
                                </p>
                                <p>
                                    <span>Ваш адрес</span>
                                    <input type="text" value={userData.address} autoComplete="off" onInput={(e) => setUserData({...userData,address:e.target.value})}/>
                                </p>
                                <p>
                                    <span>Ваш пароль</span>
                                    <input type="password" placeholder='*********' autoComplete="off" onInput={(e) => setUserData({...userData,password:e.target.value})}/>
                                    { passErr && <span style={{color: 'red'}}>Введён некорректный пароль!</span> }
                                </p>
                                <p>
                                    <span>Подтверждение пароля</span>
                                    <input type="password" placeholder='*********' autoComplete="off" onInput={(e) => setUserData({...userData,password_confirmation:e.target.value})}/>
                                    { passErr && <span style={{color: 'red'}}>Введён некорректный пароль!</span> }
                                </p>
                                <button onClick={() => updateUser()}style={{margin: '0 auto'}} className='make-order'>Сохранить</button>
                            </div>
                        }
                </div>
        </div>
    )
}
import React from 'react'
import { useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserAction,avatarAction, updateUserAction} from "../../../store/actions";
import {useNavigate} from "react-router-dom";
import {imgImport, _storage} from "../../../helpers/helper";
import '../../../style/components/profile.css';

export const Profile = () => {
    const [userData,setUserData] = useState();
    const [image, setImg] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.isAuthed);
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
        
        dispatch(updateUserAction()).then(res => console.log(res))
    }
    return(
        <div className="cabinet_profile">
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
                                    <input type="text" value={userData.name} onInput={(e)=> /[0-9]/.test(e.target.value) ? e.target.value = '' : setUserData({...userData,name:e.target.value}) }/>
                                </p>
                                <p>
                                    <input type="text" value={userData.phone_number} onInput={(e)=> /[A-Za-z]/.test(e.target.value) || e.target.value.length > 11 ? e.target.value = '' :  setUserData({...userData,phone_number:e.target.value})} />
                                </p>
                                <p>
                                    <input type="text" value={userData.email} onInput={(e) => setUserData({...userData,email:e.target.value})}/>
                                </p>
                                <p>
                                    <input type="text" value={userData.address} onInput={(e) => setUserData({...userData,address:e.target.value})}/>
                                </p>
                                <button onClick={() => updateUser()}style={{margin: '0 auto'}} className='make-order'>Сохранить</button>
                            </div>
                        }
                </div>
        </div>
    )
}
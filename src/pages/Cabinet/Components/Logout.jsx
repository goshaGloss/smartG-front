import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {logoutUserAction} from '../../../store/actions'
export const Logout = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUserAction()).then(res => navigate('/login'));
    },[])
    return (
        <>
        </>
    )
}
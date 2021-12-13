import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserAction } from '../store/actions'
import '../style/components/comment.css'
import { imgImport } from '../helpers/helper'
const Comment = (props) => {
    const [user, setUser] = useState({})
    const [rating, setRating] = useState([])
    const [notRated, setNotRated] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserAction(props.user)).then(res => {
            setUser(res.user)
            let rate = 0
            let rated = []
            let notrated = []
            for(let i = 0; i < props.rating; i++){
                rated.push(i)
            }
            for(let i = rated.length; i < 5; i++){
                notrated.push(i)
            }
            setRating(rated)
            setNotRated(notrated)
        })
    }, [])
    
    if(props.approved == 1){
        return (
            <div>
                <div className='comment-inner'>  
                    <div className="comment-avatar">
                        <img 
                            style={{ width: '100px', objectFit: 'contain', borderRadius: '50%' }} 
                            src={`https://smartg.a-lux.dev/storage/${user.avatar}`} 
                            alt="" 
                        />
                        <p className="comment-name">{user.name}</p>
                    </div>
                    <div className="comment-text">
                        <div className="comment-rating">
                            <div className="rating-comm-inner">
                                {
                                    rating.map(item =>{
                                        return(
                                            <img src={imgImport('cardDetails', 'gold-star.png')} alt="" />
                                        )
                                    })
                                }
                                {
                                    notRated.map(item =>{
                                        return(
                                            <img src={imgImport('cardDetails', 'gray-star.png')} alt="" />
                                        )
                                    })
                                }
                            </div>
                            <p>{props.date}</p>
                        </div>
                        <p className="comment-title">{props.title}</p>
                        <p className='comment-desc'>{props.desc}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment

import React from 'react'
import { useEffect, useState } from 'react'
import '../style/components/deliveryzone.css'
const DeliveryZone = (props) => {
    const [isClicked, setIsClicked] = useState(false)
    return (
        <div className="delivery-zone">
            <div className="select-cont">
                <div onClick={() => !isClicked ? setIsClicked(true) : setIsClicked(false)} className="select">
                    {isClicked && <div className='active-select'></div>}
                </div>
            </div>
            <p className="delivery-zone-title">{props.title}</p>
            <p className="delivery-zone-over">{props.under}</p>
            <p className="delivery-zone-over">{props.over}</p>
        </div>
    )
}

export default DeliveryZone

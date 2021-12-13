import { useState } from 'react'
import { imgImport } from '../helpers/helper'
import React from 'react'
import '../style/components/dropdown.css'
const Dropdown = ({list,keyIndex="address",defaultTitle,chosen={},setChosen = () => {}}) => {
    console.log(list)
    const [maxHeight,setHeight] = useState(0);
    const [border, setBorder] = useState('none')
    const openDropDown = () => {
        if(maxHeight === 0) {
            setHeight("10000px")
            setBorder("1px solid #D5D5D5")
        }
        else {
            setHeight(0)
            setBorder('none')
        } 
    }
    const choseAr = (res) => {

        setChosen({...chosen,[keyIndex]: res});
        setHeight(0);
        setBorder('none')
    }
    return (
        <div>
            <div className="dropdown_current" onClick={openDropDown}>
            <span>{chosen.time ? chosen.time : defaultTitle}</span>
            <img src={imgImport('default_text', 'arrow_bottom.svg')} alt="" />
        </div><div style={{maxHeight, border}} className="dropdown_list">
                {list && list.map((res, i) => (
                    <div key={i} onClick={() => choseAr(res)}>
                        <span>{res}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dropdown


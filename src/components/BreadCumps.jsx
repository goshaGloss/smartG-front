import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {imgImport} from '../helpers/helper';
import '../style/components/breadcumps.css'
const BreadCumps = (props) => {
    const {
        items
    } = props;
    return (
        <div className="breadcumps">
            {items.map((obj, index) => (
                <div className="breadcumps_inner" key={index}>
                    <Link to={obj.link}>
                        <span style={{ color: index+1 == items.length && 'red' }}>{ obj.name }</span>
                        {(index + 1) !== items.length ? <span style={{ marginLeft: '1rem', color:'red'}}>/</span>: ""}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default BreadCumps

import React from 'react'

const Title = (props) => {

    return (
        <div>
            <h1 style={{marginTop : '4.5rem',marginBottom:'2rem',fontSize:'32px',fontWeight:'700'}}>{props.title}</h1>
        </div>
    )
}

export default Title

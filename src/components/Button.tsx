import React from 'react'
import './Button.css'

interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
    return (
        <button onClick={props.onClick} className='base-button'>Login</button>
    )
}

export default Button

import { InputHTMLAttributes, ReactNode } from 'react';
import './Styles.scss'

type InputProps = {
    children?: ReactNode
}

export function GlobalSearch(props:InputProps){
    return (
        <div className="bar">
           {props.children}
        </div>
    );
}
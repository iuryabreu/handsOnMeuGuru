import { InputHTMLAttributes } from 'react';
import './Styles.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props:InputProps){
    return(<input {...props} />);
}
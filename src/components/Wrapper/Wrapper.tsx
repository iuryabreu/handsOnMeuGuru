import { CSSProperties } from '@emotion/serialize';
import { ReactNode } from 'react'
import './Styles.scss'

type WrapperProps = {
    children: ReactNode;
    style?: CSSProperties;
}

export function Wrapper({children}:WrapperProps){
    return(
    <div>
        {children}
    </div>
    );
} 
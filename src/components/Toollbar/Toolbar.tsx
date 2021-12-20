import { ReactNode } from 'react';
import './Styles.scss'

type ToolbarPRops = {
    children: ReactNode;
}

export function Toolbar({children}: ToolbarPRops){
    return(
        <aside>
            {children}
        </aside>
    );
}
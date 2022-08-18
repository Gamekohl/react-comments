import React, { FunctionComponent, HTMLProps, ReactNode } from 'react'

type IconButtonProps = {
    Icon: any;
    isActive?: boolean;
    color?: string;
    children?: ReactNode;
}

const IconButton: FunctionComponent<IconButtonProps & Omit<HTMLProps<HTMLButtonElement>, 'type'>> = ({ Icon, isActive, color, children, ...props }) => {
    return (
        <>
            <button className={`btn icon-btn ${isActive ? 'icon-btn-active' : ''} ${color || ''}`} {...props}>
                <span className={`${children != null ? 'mr-1' : ''}`}><Icon /></span>
                {children}
            </button>
        </>
    )
}

export default IconButton
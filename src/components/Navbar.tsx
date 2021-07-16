import React from "react";

const Navbar: React.FunctionComponent<{
    items: string[];
    onClick?: (item: string) => void
}> = ({items, onClick}) => {

    return (
        <ul>
        {items.map((item, index) => (<li onClick={() => onClick?.(item)} key={index}>{item}</li>))}
        </ul>
    )
}

export default Navbar;
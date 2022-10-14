import React from "react";
import style from "styled-components";


const UIContainer = ({ children }) => {
    return(
        <UIcontainer>
         {children}
        </UIcontainer>
    )
}

export default UIContainer;

const UIcontainer = style.div`
    max-width: 800px;
    background-color: rgba(163, 1, 180, 0.2);

    
`;
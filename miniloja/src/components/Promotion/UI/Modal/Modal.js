import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const portalRoot = document.getElementById('portal-root');

const UIModal =  ({children, isOpen, onClickClose}) => {

    if(!isOpen){
        return null;
    }
    return ReactDOM.createPortal(
        <UiModalOverlay>
            <UiModal>
                <UiModalCloseButton type="button"  onClick={onClickClose}>X</UiModalCloseButton>
                {children}
            </UiModal>
        </UiModalOverlay>,
        portalRoot,
    );
}

export default UIModal;

const UiModal = styled.div`
    background-color: #fff;
    border-radius: 4px;
    max-width:  800px;
    margin: 80px auto 0 auto;
    padding: 15px;

`;

const UiModalOverlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.5);
`;

const UiModalCloseButton = styled.div`
    float: right;
    background: unset;
    border: none;
`;


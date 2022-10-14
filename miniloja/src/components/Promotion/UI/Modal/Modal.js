import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark  } from '@fortawesome/free-solid-svg-icons';


const portalRoot = document.getElementById('portal-root');

const UIModal =  ({children, isOpen, onClickClose}) => {

    if(!isOpen){
        return null;
    }
    return ReactDOM.createPortal(
        <UiModalOverlay>
            <UiModal>
                <UiModalCloseButton type="button"  onClick={onClickClose}> <FontAwesomeIcon icon={faXmark } /> </UiModalCloseButton>
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
    min-width:  800px;
    max-height: 85%;
    padding: 15px;
    margin-top: 5vh;
    margin-bottom: 5vh;
    overflow: auto;

`;

const UiModalOverlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

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
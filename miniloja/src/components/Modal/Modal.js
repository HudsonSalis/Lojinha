import React, { useEffect, useRef, useState } from "react";
import UIModal from "../Promotion/UI/Modal/Modal"
import useApi from "../utils/UseApi";
import PromotionModalCommentsTree from "./CommentsTree/CommentsTree";
//import styled from "styled-components";

const PromotionModal = ({promotionId , onClickClose}) => {
    const mountRef = useRef(null);

    const [comment, setComment] = useState();


    const [load, loadInfo] = useApi({
    
        url: '/comments',
        params: {
            promotionId,
            _expand: 'user'
        }
    });

    const [sendComment, sendCommentInfo] = useApi({
        url: '/comments',
        method: 'POST'
    });

    useEffect(() => {
            
        load({
            debounced: mountRef.current
        });
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function onSubmit(ev){
        ev.preventDefault();
        try{
            await sendComment({
                data: {
                    userId: 1,
                    promotionId,
                    comment
                }
            });
            setComment('');
          
        } catch(e){

            }
      
    }


    return (
        <UIModal isOpen onClickClose={onClickClose}>
            <form onSubmit={onSubmit}>
                <textarea 
                    placeholder="Comentar..." 
                    onChange={(ev) => setComment(ev.target.value)} 
                    value={comment}
                />
                <button type="submit">Enviar</button>
            </form>
            
            <PromotionModalCommentsTree comments={loadInfo.data} />
        </UIModal>
    );
}

export default PromotionModal;
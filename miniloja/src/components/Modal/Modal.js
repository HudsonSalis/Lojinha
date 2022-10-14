import React, { useEffect, useRef, useState } from "react";
import UIModal from "../Promotion/UI/Modal/Modal"
import useApi from "../utils/UseApi";
import PromotionModalCommentsTree from "./CommentsTree/CommentsTree";
import styled from "styled-components";

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
            load({
                quietly: true,
                debounced: mountRef.current
            });
          
        } catch(e){

            }
    }
    async function sendAnswer(text, parentId){
        await sendComment({
            data: {
                userId: 1,
                promotionId,
                comment: text,
                parentId
            }
        });
        load({
            debounced: mountRef.current
        });
    }
    return (
        <UIModal isOpen onClickClose={onClickClose}>
          
            <Form onSubmit={onSubmit}>
                <Textarea 
                    placeholder="Comentar..." 
                    onChange={(ev) => setComment(ev.target.value)} 
                    value={comment}
                />
                <Button type="submit" disabled={sendCommentInfo.loading}>
                    {sendCommentInfo.loading ? 'Enviando' : 'Enviar'}
                </Button>
            </Form>
            
            <PromotionModalCommentsTree comments={loadInfo.data} sendComment={sendAnswer} />
        </UIModal>
    );
}

export default PromotionModal;


const Form = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: center;
    algn-items: center;
    margin-top: 10px;
    margin-bottom: 30px;
    min-height: 50px;
`;
const Button = styled.button`
    width: 100px;
    height: 35px;
    background-color: rgba(0,150,0,.8);
    color: white;
    border: none;
    padding: 5px;
    border-radius: 4px;
    margin-left: 15px;

    &:hover{
        background-color:  rgba(0,150,0,.5 );
        cursor: pointer;
    }
}
`;

const Textarea = styled.textarea`
    width: 200px;
    border: none;
    border-bottom: 1px solid black;
    resize: none;
    outline: 0;
    font-size: 15px;
    overflow: auto;
    height: 25px;

`;

import React, { useState, useMemo } from "react";
import styled from "styled-components";

function getTree(list){
    if(!list){
        return [];
    }

    const roots = [];
    const childrenByParentId = {};
    list.forEach((item) => {
        if(!item.parentId){
            roots.push(item);
            return;
        }

        if(!childrenByParentId[item.parentId]){
            childrenByParentId[item.parentId] = [];
        }

        childrenByParentId[item.parentId].push(item);
    });

        function buildNodes(nodes){
            if(!nodes){
                return null;
            }
            return nodes.map((node) => ({
                ...node,
                children: buildNodes(childrenByParentId[node.id])
            }));
        };
        return buildNodes(roots)
};

const PromotionModalCommentsTree = ({comments, sendComment}) => {

    const tree = useMemo(() => getTree(comments), [comments] ) ;
    const [comment, setComment] = useState('');
    const [activeCommentBox, setActiveCommentBox] = useState(null);

    if(!comments){
        return <div>Carregando...</div>
    }

    function renderItem(item){
        return (
            <LiComments key={item.user.id}>
                    <img src={item.user.avatarUrl} alt={`Foto de ${item.user.name}`} />
                    <div className="usuario-dados">
                        <div className="usuario-info">
                            <span>{item.user.name}</span>
                            <div className="comentario">
                                {item.comment}
                            </div>
                            <button 
                                type="button" 
                                className="button-responder"
                                onClick={() => {
                                    setComment('');
                                    setActiveCommentBox(activeCommentBox === item.id ? null : item.id );
                                }}  
                            >Responder</button>
                        </div>
                       
                       {activeCommentBox === item.id && (
                           <div className="box-comentarios">
                                <textarea  value={comment} onChange={(ev) => setComment(ev.target.value) }  />
                                <button 
                                    type="button" 
                                    className="button-enviarResposta"
                                    onClick={() => {
                                        sendComment(comment, item.id);
                                        setComment('');
                                        setActiveCommentBox(null);
                                    }}
                                    
                                    >Enviar</button>
                           </div>
                       )}

                    {item.children && renderList(item.children)}
                    </div>        
                </LiComments>
        )
    }

    function renderList(list){
        return(
            <ul>
                {list.map(renderItem)}
            </ul>
        )
    }

    return renderList(tree)

}

PromotionModalCommentsTree.defaultProps = {
    sendComment: () => {}
}

export default PromotionModalCommentsTree;

const LiComments = styled.li`
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

    img{
        max-width: 60px;
        max-height: 60px;
        border-radius: 100%
    }
    .usuario-dados{
        display: flex;
        flex-direction: column;

        .usuario-info{
            height: 70px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .comentario{
            margin-left: 12px;

        }
        span{
            margin-left: 12px;
            color: blue;
            font-weight: bold;
        }
        .button-responder{
            background-color: transparent;
            color: blue;
            border: 0;
            cursor: pointer;
            margin-left: 8px;
            width: 100%;
            text-align: start;
        }

        .box-comentarios{
            display: flex;
            margin-top: 15px;

            .button-enviarResposta{
                color: green;
                border: none;
                border-radius: 5px;
                background-color: rgba(0,200,0,0.8);
                margin-left: 15px;
                cursor: pointer;

                &:hover{
                    background-color: rgba(0,150,0,.5);
                }
            }
        }
    }
`;

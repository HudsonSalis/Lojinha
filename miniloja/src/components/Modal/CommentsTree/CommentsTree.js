import React from "react";
import styled from "styled-components";


const PromotionModalCommentsTree = ({comments}) => {

    if(!comments){
        return <div>Carregando...</div>
    }

    return (

        <ul>
            {comments.map((item) => (
                <LiComments key={item.user.id}>
                    <img src={item.user.avatarUrl} alt={`Foto de ${item.user.name}`} />
                    <div className="usuario-dados">
                    <span>{item.user.name}</span>
                    <p>
                        {item.comment}
                    </p>
                    </div>
            
                </LiComments>
            ))}
        </ul>
    )

}

export default PromotionModalCommentsTree;

const LiComments = styled.li`
    display: flex;
    flex-direction: row;
    img{
        max-width: 80px;
        max-height: 80px;
    }
    .usuario-dados{
        display: flex;
        flex-direction: column;
        p{
            margin-top: 40px;
            margin-left: 12px;
        }
        span{
            margin-left: 12px;
            color: blue;
            font-weight: bold;
        }
    }
`;
import React from "react";



const PromotionModalCommentsTree = ({comments}) => {

    if(!comments){
        return <div>Carregando...</div>
    }

    if(comments === " "){
        return <div>Sem nada</div>
    }


    return (

        <ul>
            {comments.map((item) => (
                <li>
                    <img src={item.user.avatarUrl} alt={`Foto de ${item.user.name}`} />
                    <span>{item.user.name}</span>
                    <p>
                        {item.comment}
                    </p>
                </li>
            ))}
        </ul>
    )

}

export default PromotionModalCommentsTree;
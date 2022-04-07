import React, { useState } from "react";
import PromotionCard from "../Card/Card";
import PromotionModal from "../../Modal/Modal";

//import style from "styled-components";

const PromotionList = ({loading, error, promotions}) => {

    const [promotionId,  setPromotionId] = useState(null);

    if(error){
        return <div>Algo deu errado!!!</div>
    }

    if(loading || promotions == null){
        return <div> Carregando...</div>
        
    }
    if(promotions.length === 0){
        return <div> Nenhum resultado encontrado</div>;
    }


    return(
        <div>
            {promotions.map((promotion) => (
                <PromotionCard 
                    promotion={promotion} 
                    onClickComments={() => setPromotionId(promotion.id)} 
                />

                
            ))}
            {
                promotionId &&(
                    <PromotionModal 
                        promotionId={promotionId} 
                        onClickClose={() => setPromotionId(null)} 
                    />
                )
            }
           
        
        </div>
    )
        


}

export default PromotionList;   

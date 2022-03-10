import React from "react";
import PromotionCard from "../Card/Card";
//import style from "styled-components";

const PromotionList = ({loading, promotion}) => {

  
    if(loading){
        return(
            <div> Carregando...</div>
        )
    }
    return(
        <div>
            {promotion.map((promotion) => (
                <PromotionCard promotion={promotion} />
            ))}
        </div>
    )
        


}

export default PromotionList;   

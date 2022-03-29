import React from "react";
import PromotionCard from "../Card/Card";
//import style from "styled-components";

const PromotionList = ({loading, promotions}) => {


    if(loading || promotions === null){
        return(
            <div> Carregando...</div>
        )
    }
    if(promotions.length === 0){
        return <div> Nenhum resultado encontrado</div>;
    }


    return(
        <div>
            {promotions.map((promotion) => (
                <PromotionCard promotion={promotion} />

                
            ))}
        </div>
    )
        


}

export default PromotionList;   

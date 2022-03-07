import React from "react";
import PromotionCard from "../../../components/Promotion/Card/Card"

const promotion =  
{
"id": 1,
"title": "Tenis StarWars",
"price": 1200,
"imgURL": "https://t-static.dafiti.com.br/WtGHm3zjSHgeT9e794Ldmrtx2DI=/fit-in/430x623/static.dafiti.com.br/p/rebento-t%c3%aanis-sneaker-leve-masculino-conforto-preto-8925-3237736-2-zoom.jpg",
"comments": [
  {
    "id": 1,
    "comment": "Ultra confortável"
  }
]  
}




const PagesPromotionSearch = () => {
    return(
        <PromotionCard promotion={promotion} />
    )
}


export default PagesPromotionSearch;
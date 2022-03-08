import React, { useEffect, useState } from "react";
import PromotionCard from "../../../components/Promotion/Card/Card";
import axios from 'axios';


const PagesPromotionSearch = () => {

  const [promotions, setPromotions] = useState([]);


  useEffect(()=> {
    axios.get("http://localhost:3000/promotions?_embed=comments")
    .then((response) => {
      setPromotions(response.data);
    }) 
  },[])
  
    return(
      <div>
          {promotions.map((promotion) => (
            <PromotionCard promotion={promotion} />
          ))}
      </div>
    )
}


export default PagesPromotionSearch;
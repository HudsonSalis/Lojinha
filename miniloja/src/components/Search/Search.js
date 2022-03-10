import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "styled-components";
import PromotionList from "../Promotion/List/List";
import { Link } from "react-router-dom";

const PromotionSearch = () => {


    const [promotions, setPromotions] = useState([]);
    const [search, setSearch] = useState('');

  useEffect(()=> {

    const params = {};

    if(search) {
        params.title_like = search;
    }

    axios.get('http://localhost:3000/promotions?_embed=comments', {params})
    .then((response) => {
      setPromotions(response.data);
    });
  },[search]);

    return(
        <Container>
            <Header>
                <h1> Promo Show</h1>
                <Link to="/create">Nova Promoção</Link>
   
            </Header>

            <Input 
                placeholder="Buscar" 
                type="search"
                value={search}
                onChange={(ev) => setSearch(ev.target.value)}
                
                >
                
            </Input>
         
            <PromotionList promotion={promotions} loading={!promotions.length} />
        </Container>

    )
}

export default PromotionSearch;

const Container = style.section`
  margin-top: 8vh;
`;

const Header = style.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1{
        text-transform: uppercase;
        color: #888
    }
`;

const Input = style.input`
    display: flex;
    height: 40px;
    border: 1px solid black;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 0 10px;
    font-size: 16px;
    width: 100%;
`;
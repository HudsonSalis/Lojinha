import React, { useState, useEffect, useRef } from "react";
import useApi from "../utils/UseApi";
import style from "styled-components";
import PromotionList from "../Promotion/List/List";
import { Link } from "react-router-dom";
import UIInfiniteScroll from "../Promotion/UI/IfiniteScroll/InfiniteScroll";

const baseParams = {
   
        _embed: 'comments',
        _order: 'desc',
        _sort: 'id',
        _limit: 2
}

const PromotionSearch = () => {
    
    const mountRef = useRef(null);

    const [search, setSearch] = useState('');

    const [page, setPage] = useState(1);

    const [load, loadInfo] = useApi({
        debounceDelay: 1000,
        url: '/promotions',
        method: 'get',
    });

  useEffect(()=> {
    
    load({
         params: {
            ...baseParams,
            _page: 1,
           title_like: search || undefined
        }
    });
    if(!mountRef.current){
        mountRef.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search]);

  function fetchMore(){

    const newPage = page + 1;

    load({
        isFetchMore: true,
        params: {
            ...baseParams,
            _page: newPage,
           title_like: search || undefined
        },  
        updateRequestInfo : (newRequestInfo, prevRequestInfo) => ({
            ...newRequestInfo,
            data: [
                ...prevRequestInfo.data,
                ...newRequestInfo.data
            ]
        })

    });
    setPage(newPage);
  }

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
         
            <PromotionList 
                promotions={loadInfo.data} 
                loading={loadInfo.length} 
                error={loadInfo.erro} 
            />
            {loadInfo.data && !loadInfo.loading && (
                <UIInfiniteScroll  fetchMore={fetchMore}/>

            )}

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
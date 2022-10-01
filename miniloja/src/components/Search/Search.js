import React, { useState, useEffect, useRef } from "react";
import useApi from "../utils/UseApi";
import style from "styled-components";
import PromotionList from "../Promotion/List/List";
//import { Link } from "react-router-dom";
import UIInfiniteScroll from "../Promotion/UI/IfiniteScroll/InfiniteScroll";
import iconePesquisa from "../../assets/Imagens/icone-Pesquisa.png";

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
        <Main>
            <Section>    
                <div className="header">
                    <div className="titulo-Header">
                        <h1> Mini Loja</h1>
                    </div>
                </div>
             
                {/* <div>
                    <Link to="/create">Nova Promoção</Link>
                </div> */}
                

                <div className="search-bar">
                    <Input 
                        placeholder="Buscar" 
                        type="search"
                        value={search}
                        onChange={(ev) => setSearch(ev.target.value)}
                        >    
                        
                    </Input>
                    <img src={iconePesquisa}  className="icone-pesquisa" alt="icone de pesquisa" width="30" heigth="30" />  

                </div>
                 
            
                <PromotionList 
                    promotions={loadInfo.data} 
                    loading={loadInfo.length} 
                    error={loadInfo.erro} 
                />
                {loadInfo.data && !loadInfo.loading && (
                    <UIInfiniteScroll  fetchMore={fetchMore}/>

                )}
            </Section>

        </Main>

    )
}

export default PromotionSearch;

const Main = style.main`

`;

const Section = style.section`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    .header{
        display: flex;
        justify-content:center;
        align-items: center;
        width: 100%;
        height: 15vh;
       
        background-color: rgba(0,0,0,0.80);
        color: white;        
    }
   .titulo-Header{
   }

   .search-bar{
        display: flex;
        flex-direction:row;
        align-items:center;
        width: 200px;
        position:relative;

        .icone-pesquisa{
            right: 0;
            position:absolute;
            margin-top: 8px;
            margin-right: 8px;
            cursor: pointer;
        }
   }
`;


const Input = style.input`
    display: flex;
    height: 40px;
    border: 1px solid black;
    border-radius: 4px;
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 0 10px;
    font-size: 16px;
    width:  100%;
`;
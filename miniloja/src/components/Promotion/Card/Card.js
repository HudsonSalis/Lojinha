import React from "react";
import style from "styled-components";
import { Link } from "react-router-dom";

const PromotionCard = ( {promotion, onClickComments} )  => {
    return(
        <Layout> 
            <Item>
                <div>
                    <img alt="Tenis" src={promotion.imgURL}  width="100" height="100"/>
                </div>
            
                <Info key={promotion.id}>
                    <h1>{promotion.title}</h1>
                    <span>R$ {promotion.price}</span>
                    <footer>
                        <div className="comentario">
                            { promotion.comments.length > 0 && (<div>{promotion.comments[0].comment}</div>)}
                        </div>
                        <button className="comentarios-irParaOsite" onClick={onClickComments}>
                            {promotion.comments.length} {" "}
                            {promotion.comments.length > 1 ? 'Comentários' : 'Comentário'}
                       
                        </button>
                        <Link className="editar" to={`edit/${promotion.id}`}>Editar </Link>
                        
                    </footer>
                </Info>

            </Item>
        </Layout>
    )
}

export default PromotionCard;

const Layout = style.div`
   
    align-items: center;
    font-family: 'Roboto', sans-serif;
`;

const Item = style.div`
    display: flex;
    width: 400px;

    min-height: 200px;
    margin-bottom: 15px;
    border: 2px solid black;
    border-radius: 8px;
    align-items: flex-start;

    img{
        align-self: center;

        margin-left: 10px;
    }
`;

const Info = style.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 15px;
    background-color: white;  
    align-items: flex-start;
    width: 100%;
    

    h1{
        font-size: 20px;
    }
    span{
        font-weight: bold;
        color: blue;
        padding: 6px 0;
    }

    footer{
        display: flex;
        align-items: center;
        width: 100%;

        .comentario{
            color: rgba(0,35,150);
        }

        .comentarios-irParaOsite{
            display:flex;
            margin-left: auto;
            margin-right: 15px;
            align-items: center;
            margin-bottom: 10px;

            border:none;
            padding: 5px;
            background-color: rgba(0,0,140,0.2);
            color: blue;
            cursor: pointer;
            border-radius: 4px;

        }

        .editar{
            color: rgba(0,0,140,0.7);
            text-decoration: none;
            text-transform: uppercase;
            margin-right: 10px;
            margin-bottom: 5px; 
        }


    }
    
`;

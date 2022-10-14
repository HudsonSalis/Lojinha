import React from "react";
import style from "styled-components";
import { Link } from "react-router-dom";

const PromotionCard = ( {promotion, onClickComments} )  => {
    return(
        <Layout> 
            <Item>
                <div className="item-imagem">
                    <img alt="Tenis" src={promotion.imgURL}  width="100" height="100"/>
                </div>
            
                <Info key={promotion.id}>
                    <h1>{promotion.title}</h1>
                    <span>R$ {promotion.price}</span>
                    <footer>
                        <div className="comentario">
                            {promotion.comentario}
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
    min-width: 400px;

    background-color: rgba(163, 1, 180, 0.2);

    min-height: 200px;
    margin-bottom: 15px;
    border-radius: 8px;

    .item-imagem{
        align-self: center;
        margin-left: 10px;
        width: 200px;
        height: 115px;
        border-radius: 50%;
        border: 1px solid  rgba(163, 0, 180, 0.8)


    }
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;

    }
`;

const Info = style.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-left: 30px;
    align-items: flex-start;
    width: 100%;
    

    h1{
        font-size: 25px;
    }
    span{
        font-weight: bold;
        color: rgba(163, 0, 180, 0.8);
        padding: 20px 0;
        font-size: 22px;

    }

    footer{
        display: flex;
        align-items: center;
        width: 350px;

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
            background-color: rgba(205, 207, 7, 0.7);
            color: yellow;
            cursor: pointer;
            border-radius: 4px;

        }

        .editar{
            color: rgba(180,0,10,0.9);
            text-decoration: none;
            font-weight: bold;
            margin-right: 10px;
            margin-bottom: 5px; 
            :&{
                
            }
        }


    }
    
`;

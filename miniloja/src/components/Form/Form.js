import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useApi from "../utils/UseApi";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";


const initialValues = {
    title: '',
    imgURL: '',
    price: 0
};

const PromotionForm = ({id}) => {

    const mountRef = useRef(null);

    const [values, setValues] = useState(initialValues);    
    const navigate = useNavigate();

    const [load] = useApi({
        url: `/promotions/${id}`,
        method: 'get',
        onCompleted: (response) => {
            setValues(response.data);
            console.log(response.data)
        }
    })

    const [save] = useApi({
        url: id ? `/promotions/${id}` : '/promotions',
        method: id ? 'put' : 'post',
        onCompleted: (response) => {
            if(!response.error){
                navigate('/');
            }
        }
    })
    useEffect(() => {
        if(id){
            load({
                debounced: mountRef.current
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    function onChange(ev) {
        const {name, value} = ev.target; 
        setValues( {...values, [name]: value}  )
    }

    function onSubmit(ev){
        ev.preventDefault();
        save({
            data: values
        });
    }


    return(
        <Section>
            <div className="form-edit"> 
                <h1>Editando...</h1>
                <h2>Novo Item</h2>

                <form onSubmit={onSubmit}  className="form-doform">
                    <FormGroup>
                        <LabelForm>Título</LabelForm>
                        <input id="title" onChange={onChange} type="text" name="title" value={values.title} />
                    </FormGroup>

                    <FormGroup>
                        <LabelForm htmlFor="imgUrl">Imagem (Link)</LabelForm>
                        <input id="imgURL" onChange={onChange} type="text" name="imgURL"  value={values.imgURL}/>
                    </FormGroup>

                    <FormGroup>
                        <LabelForm>Preço</LabelForm>
                        <input id="price" onChange={onChange} type="number" name="price"  value={values.price}/>
                    </FormGroup>

                    <FormGroup>
                        <LabelForm>Comentário</LabelForm>
                        <input id="comment" onChange={onChange} type="text" name="comentario"  value={values.comentario}/>
                    </FormGroup>

                    <button className="button-form-submit" type="submit">Salvar novo Item</button>

                    <Link className="voltar-home" to={'/'}>Voltar - Home</Link>

                
                </form>
            </div>

        </Section>
    )
}


export default PromotionForm;

const Section = styled.section`

    display: flex;
    align-items:center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    backgrond-color: red;


    .form-edit{

        width: 700px;
        height: 600px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(163, 1, 180, 0.2);
        border-radius: 50%;
        //background-color: rgba(163, 1, 180, 0.2);

        h2{
            margin-bottom: 50px;
        }

        .button-form-submit{
            padding: 5px;
            color: white;
            border: none;
            cursor: pointer;
            width: 200px;
            background-color: rgba(0,150,10,0.8);
            transition: 1s;


            &:hover{
                transform: scale(1.2);
                transition: 1s;
                color: yellow;
            }
        }

        .voltar-home{
            position: absolute;
            left: 0;
            margin-left: 50px;
            color: red;
            text-decoration: none;
            font-weight: bold;
        }

        .form-doform{



        }
    }

`;

const LabelForm = styled.label`
    margin-bottom: 7px;
    font-size: 18px;
    font-weight: 500;
    color: rgba(163, 1, 180, 0.8);
`;

const FormGroup = styled.div`
    display:flex;
    flex-direction: column;
    margin-bottom: 20px;
  

    input{
        border: 1px solid rgba(0,0,0,0.2);
        //border-radius: 8px;
        background-color: white;
        height: 25px;
        width: 200px;
    }
`;


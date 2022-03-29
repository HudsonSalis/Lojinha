import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import useApi from "../utils/UseApi";
import {useNavigate} from 'react-router-dom'

const initialValues =
{
    title: '',
    imgURL: '',
    price: 0
};

const PromotionForm = ({id}) => {

    const [values, setValues] = useState(initialValues);    
    const navigate = useNavigate();
    const [load, loadInfo] = useApi({
        url: `http://localhost:3000/promotions/${id}`,
        method: 'get',
        onCompleted: (response) => {
            setValues(response.data);
        }
    })


    useEffect(() => {
      
        if(id){
            load();
        }

    }, [id]);


    function onChange(ev) {
        const {name, value} = ev.target; 
        setValues( {...values, [name]: value}  )
    }

    function onSubmit(ev){
        ev.preventDefault();

        const method = id ? 'put' : 'post';
        const url = id 
        ? `http://localhost:3000/promotions/${id}`
        : 'http://localhost:3000/promotions'

        axios[method](url, values)
        .then((response) => {
            navigate('/');
        });
    }


    return(
        <div>
            <h1>Promotion Show</h1>
            <h2>Nova Promoção</h2>

            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <LabelForm>Título</LabelForm>
                    <input onChange={onChange} name="title" value={values.title} />
                </FormGroup>
                <FormGroup>
                    <LabelForm>Imagem (Link)</LabelForm>
                    <input onChange={onChange} name="imgURL"  value={values.imgURL}/>
                </FormGroup>
                <FormGroup>
                    <LabelForm>Preço</LabelForm>
                    <input onChange={onChange} type="number" name="price"  value={values.price}/>
                </FormGroup>

                <button  type="submit">Salvar</button>
              
            </Form>


        </div>
    )
}


export default PromotionForm;

const LabelForm = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
    color: #555;
`;

const FormGroup = styled.form`
    display:flex;
    flex-direction: column;
    margin-bottom: 20px;

    input{
        border: 1px solid #AAAAAA;
        border-radius: 8px;
        background-color: white;
        height: 25px;
    }
`;

const Form = styled.form`
    padding-bottom: 20px;
`;
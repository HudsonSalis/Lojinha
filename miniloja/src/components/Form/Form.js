import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useApi from "../utils/UseApi";
import {useNavigate} from 'react-router-dom';

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
        <div>
            <h1>Promotion Show</h1>
            <h2>Nova Promoção</h2>

            <form onSubmit={onSubmit}>
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

                <button type="submit">Salvar</button>
              
            </form>


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

const FormGroup = styled.div`
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


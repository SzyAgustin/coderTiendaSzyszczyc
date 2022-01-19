import React from 'react'
import {Field, ErrorMessage} from 'formik';
import TextError from './TextError';
import styled from 'styled-components';

interface InputProps {
    label: string,
    name: string,
    [x:string]: any
} 

const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    min-height: 75px;
`

const StyledField = styled(Field)<InputProps>`
    padding: 8px 12px;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    width: 70%;
    font-size: 15px;
    transition: 0.2s;
    color: #444444;

    &:focus-visible {
        outline: none;
        border-color: #777777;
    }
`

const StyledLabel = styled.label`
    color: #444444;
    margin-bottom: 2px;
    font-size: 12px;
`

const Input = ({label, name, ...rest}: InputProps) => {
    return (
        <InputDiv>
            <StyledLabel htmlFor={name}>{label}</StyledLabel>
            <StyledField id={name} name={name} {...rest}></StyledField>
            <ErrorMessage name={name}>
                {error => <TextError>{error}</TextError>}
            </ErrorMessage>
        </InputDiv>
    )
}

export default Input

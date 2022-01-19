import { ErrorMessage, Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import TextError from './TextError';

interface Option {
  key: string;
  value: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: Option[];
  [x: string]: any;
}

const StyledLabel = styled.label`
  color: #444444;
  margin-bottom: 2px;
  font-size: 12px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  min-height: 65px;
`;

const StyledField = styled.select`
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
`;

interface FieldAttributes {
    field: any,
    form: any
}

const Select = ({ label, name, options, ...rest }: SelectProps) => {
  return (
    <InputDiv>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <Field name={name}>
        {({field, form}: FieldAttributes) => (
          <StyledField name={name} id={name} {...rest} {...field} >
            {options.map((option: Option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.key}
                </option>
              );
            })}
          </StyledField>
        )}
      </Field>
      <ErrorMessage name={name}>
        {(error) => <TextError>{error}</TextError>}
      </ErrorMessage>
    </InputDiv>
  );
};

export default Select;

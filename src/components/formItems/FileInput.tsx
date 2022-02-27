import { ErrorMessage } from 'formik';
import React from 'react';
import styled from 'styled-components';
import TextError from './TextError';

interface FileInputProps {
  label: string;
  name: string;
  handleSelection: any;
  selected?: string;
  formik: any;
}

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  min-height: 75px;
`;

const StyledLabel = styled.label`
  /* display: block; */
  background-color: #1a3394;
  height: 40px;
  width: 150px;
  color: #fff;
  margin-bottom: 2px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;

  &:hover {
      background-color: #213fb6;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const SelectedSpan = styled.span`
    font-size: 12px;
`

const FileInput = ({ label, name, selected, formik, handleSelection}: FileInputProps) => {
  return (
    <InputDiv>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <HiddenInput id={name} name={name} type='file' onChange={(e) => handleSelection(e, formik)} />
      {selected ? <SelectedSpan>Image selected: {selected}</SelectedSpan> : <TextError>Required</TextError>}
    </InputDiv>
  );
};

export default FileInput;

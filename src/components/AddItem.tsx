import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { addItem, ILocalItem } from '../services/ItemService';
import * as Yup from 'yup';
import Input from './formItems/Input';
import Button from './Button';
import Select from './formItems/Select';
import { useNavigate } from 'react-router-dom';
import ResultMessage from './ResultMessage';

const TitleContainer = styled.div`
  height: 60px;
  border-bottom: 1px solid #c9c9c9;
  margin-bottom: 20px;
  font-size: 30px;
  color: #444444;
`;

const AddItemContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: white;
  min-height: 50vh;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.2);
`;

const AddItem = () => {
  const initialValues: ILocalItem = {
    category: '',
    description: '',
    pictureUrl: '',
    price: 0,
    stock: 0,
    title: '',
  };
  const [success, setSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const navigate = useNavigate();

  const timeoutRedirect = () => {
    setTimeout(function () {
      navigate('/');
    }, 3000);
  };

  const onSubmit = (item: ILocalItem) => {
    setInProgress(true);
    addItem(item).then(async (res) => {
      setSuccess(true);
      setShowMessage(true);
    })
    .catch((err) => {
      setSuccess(false);
      setShowMessage(true);
    })
    .finally(() => {
      timeoutRedirect();
    });;
  };

  const validationSchema = Yup.object({
    category: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    pictureUrl: Yup.string().required('Required'),
    price: Yup.number().integer().min(1, 'Specify a price').required('Required'),
    stock: Yup.number().integer().min(1, 'Specify a stock amount').required('Required'),
    title: Yup.string().required('Required'),
  });

  interface Option {
    key: string;
    value: string;
  }

  const categories: Option[] = [
    { key: 'Select an Option', value: '' },
    {
      key: 'Vehiculo',
      value: 'Vehiculo',
    },
    {
      key: 'Electronica',
      value: 'Electronica',
    },
    { key: 'Libro', value: 'Libro' },
  ];

  return (
    <AddItemContainer>
      <ResultMessage message='El item se ha agregado con exito.' visible={showMessage} success={success} withRedirect={true} />
      <TitleContainer>Add new item</TitleContainer>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form style={{ paddingLeft: 10 }}>
            <Input name='title' label='Title' />
            <Input name='description' label='Description' />
            <Input name='pictureUrl' label='Picture URL' />
            <Select name='category' label='Category' options={categories} />
            <Input name='price' type='number' label='Price' />
            <Input name='stock' type='number' label='Initial Stock' />
            <Button type='submit' width='300px' disabled={inProgress} primary>
              {inProgress ? 'Adding item...' : 'Add Item'}
            </Button>
          </Form>
        )}
      </Formik>
    </AddItemContainer>
  );
};

export default AddItem;

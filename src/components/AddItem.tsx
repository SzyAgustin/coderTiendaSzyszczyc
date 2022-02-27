import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, FormikProps } from 'formik';
import { addItem, ILocalItem } from '../services/ItemService';
import * as Yup from 'yup';
import Input from './formItems/Input';
import Button from './Button';
import Select from './formItems/Select';
import { useNavigate } from 'react-router-dom';
import ResultMessage from './ResultMessage';
import { storage } from '../services/Firebase';
import { ref, uploadBytes } from 'firebase/storage';
import FileInput from './formItems/FileInput';

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
  let fileToUpdate: File | null = null;

  const timeoutRedirect = () => {
    setTimeout(function () {
      navigate('/');
    }, 3000);
  };

  function createGuid() {
    function _p8(s: any) {
      var p = (Math.random().toString(16) + '000000000').substr(2, 8);
      return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
    }
    return _p8(null) + _p8(true) + _p8(true) + _p8(null);
  }

  const uploadFile = async (name: string) => {
    const fileRef = ref(storage, `images/${name}`);
    await uploadBytes(fileRef, fileToUpdate!);
  };

  const onSubmit = (item: ILocalItem) => {
    if (!fileToUpdate) return;
    setInProgress(true);
    item.pictureUrl =
      createGuid() + '.' + item.pictureUrl.split('.').reverse()[0];
    uploadFile(item.pictureUrl).then((res) => {
      addItem(item)
        .then(async (res) => {
          setSuccess(true);
          setShowMessage(true);
        })
        .catch((err) => {
          setSuccess(false);
          setShowMessage(true);
        })
        .finally(() => {
          timeoutRedirect();
        });
    });
  };

  const validationSchema = Yup.object({
    category: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    pictureUrl: Yup.string().required('Required'),
    price: Yup.number()
      .integer()
      .min(1, 'Specify a price')
      .required('Required'),
    stock: Yup.number()
      .integer()
      .min(1, 'Specify a stock amount')
      .required('Required'),
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

  const handleFileChange = (e: any, formik: FormikProps<ILocalItem>) => {
    fileToUpdate = e.target.files ? e.target.files[0] : null;
    formik.setFieldValue(
      'pictureUrl',
      e.target.files ? e.target.files[0].name : ''
    );
  };

  return (
    <AddItemContainer>
      <ResultMessage
        message='El item se ha agregado con exito.'
        visible={showMessage}
        success={success}
        withRedirect={true}
      />
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
            <FileInput
              label='Pick an Image'
              name='pictureUrl'
              handleSelection={handleFileChange}
              formik={formik}
              selected={formik.values.pictureUrl}
            />
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

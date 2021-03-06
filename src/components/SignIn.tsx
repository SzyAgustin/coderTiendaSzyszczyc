import React, { useContext } from 'react';
import styled from 'styled-components';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { authentication } from './../services/Firebase';
import Button from './Button';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'

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

const ButtonsDiv = styled.div`
  width: 100%;
  min-height: 26vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  height: 60px;
  border-bottom: 1px solid #c9c9c9;
  margin-bottom: 20px;
  font-size: 30px;
  color: #444444;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser} = useContext(UserContext);
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(authentication, provider)
      .then((res) => {
        setUser({
          displayName: res.user.displayName,
          email: res.user.email,
          uid: res.user.uid,
        })
        localStorage.setItem('ecommerce-user', `${res.user.displayName};${res.user.email};${res.user.uid}`)
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AddItemContainer>
      <TitleContainer>Sign In</TitleContainer>
      <ButtonsDiv>
        <Button width='300px' onClick={signInWithGoogle} primary>
          Sign in with Google
        </Button>
      </ButtonsDiv>
    </AddItemContainer>
  );
};

export default SignIn;

import styled from 'styled-components';


export const LoginContainer = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #212529;
  padding: 0;
`;

export const LoginCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 370px;
  height: 600px;
  background-color: #2c3034;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  overflow: hidden;
`;

export const LeftLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  object-fit: cover;
`;

export const RightLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  background-color: #2c3034;
  border-radius: 0 10px 10px 0;
`;

export const TextLogIn = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  
`;

export const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 400;
  color: #fff;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 16rem;
  height: 40px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-bottom:2px solid #6C63FF;
    
  }
  /* @media only screen and (max-width: 600px) {
    width: 100%;
  } */
`;

export const Button = styled.button`
  width: 80%;
  height: 40px;
  border: 0 solid #000;
  border-radius: 5px;
  background-color: #0d6efd;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #0b5ed7 ;
    transition: all 0.3s ease-in-out;
  }
  &:active {
    background-color: #000;
    color: #fff;
  }
`;

export const SwithBtn = styled.h4`
  font-size: 0.8rem;
  font-weight: 400;
  color: #3887e9;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    color: #6C63FF;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
  }
`;
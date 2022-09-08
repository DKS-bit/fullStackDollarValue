import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from '../PageContainer/Register.style';
import Header from '../components/Header/Header';
import FormRegister from '../components/Form/Form';




export const RegisterClientPage = () => {
    return (
        <Container>
            <Header location='/register'></Header>
            <FormRegister></FormRegister>
        </Container>
    );
}


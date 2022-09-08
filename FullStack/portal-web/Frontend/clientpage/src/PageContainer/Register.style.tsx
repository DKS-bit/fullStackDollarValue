import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: 20px 140px;

    @media only screen and (max-width: 800px){
        padding: 0;
    }
    
`;


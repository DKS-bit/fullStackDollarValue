import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    width: 100vw;
    height: 100vh;
    padding: 20px 140px;
    .table-responsive{
        width: 100%;
    }
    @media only screen and (max-width: 800px){
        padding: 0;
    }
`;
export const CardComponentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    padding: 5rem 2px;
    width: 100%;

`;



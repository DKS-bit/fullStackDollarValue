import styled from 'styled-components';

export const SearchHeader = styled.th`
    span.input-group-text{
        background-color: transparent;
        border: 0;
    }
    input.form-control:focus{
        background-color: transparent;
        color: white;
        border-color: black;
        box-shadow: 0 0 0 0;
    }
    
    input{
        border: 0;
        border-radius: 1rem;
        background: none;
        padding: 1rem;
        font-size: 1rem;
        width: 40rem;
        color: #f5f5f5;
        transition: border 150ms cubic-bezier(0.4,0,0.2,1);
        outline: 0;
    }
`;
export const Image = styled.img`
    width: 1rem;
    height: 1rem;
`;







import styled from 'styled-components';

export const Container = styled.div`

 width: 100%;

 padding:20px;
 background: #2c3034;
 transition: all 300ms;
 color:white;
 border:3px solid #2c3034;
 display:flex;
 justify-content:flex-start;
 align-items:flex-start;
 flex-direction:column;

 h1{
font-size:40px;
}
 h2{
font-weight:400;
font-size: 17px;
}
@media only screen and (max-width: 800px){
        h1{
            font-size: 22px;
        }
        h2{
            font-size: 12px;
        }
    }

`






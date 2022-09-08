import styled from 'styled-components'

export const Container = styled.div`
    align-self: center;
    justify-self: center;
a{
    padding:  0.5rem 1rem;
    color: #ffffff;
    display: block;
}
li{
    display: inline-block;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    border-top: 1px solid #2c3034;
    border-bottom: 1px solid #2c3034;
    border-right:1px solid #2c3034;
    

}
li:nth-child(1){
    border-left: 1px solid #2c3034;
}
li:last-of-type{
    border-right: 1px solid #2c3034;
}
li:hover{
  text-shadow: 0px 0px 3px #4e3939;
  color: #fff;
  background-color: #323539;

  transition: transform 0.3s ease-in-out;
}
li.selected{
  background-color: #2c3034;
  color: #fff;
}
ul{
    padding: 0;
}
@media only screen and (max-width: 800px){
        a{
            padding:  0.3rem 0.8rem;
        }
    }
`
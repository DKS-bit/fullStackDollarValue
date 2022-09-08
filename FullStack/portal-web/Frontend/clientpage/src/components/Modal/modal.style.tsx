import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: inherit;
  
  outline: 0;
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`;

export const StyledModal = styled.div`
  z-index: 100;
  background: #000000ce;
  position: relative;
  margin: auto;
  width: 20rem;
  height: 35rem;
  border-radius: 8px;
`;

export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
  background-color: black;
`;

export const HeaderText = styled.div`
  align-self: center;
  color: white;
  background-color: transparent;

`;

export const CloseButton = styled.button`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  color: white;
  :hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`

  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  
  height: 100%;
  display: flex;
  align-items: flex-end;

`;


export const TextName = styled.h2`
    color: white;

`;
export const DataContainer = styled.div`

`;
export const TextRG = styled.p`
    color: white;

`;
export const TextDataNascimento = styled.p`
    color: white;
`;
export const ContentWrapper = styled.div`
    padding: 10px;
    position:absolute;
    bottom: 0;
    
`;
export const Image = styled.div`
  background:linear-gradient(180deg, transparent, #222121), url("https://img.freepik.com/fotos-gratis/retrato-de-homem-jovem-hippie-barbudo-olhando-para-a-camera-e-tomando-uma-selfie-contra-amarelo_58466-11455.jpg?w=2000") no-repeat center center / cover;
  width: 100%;
  height: 30rem;
`;




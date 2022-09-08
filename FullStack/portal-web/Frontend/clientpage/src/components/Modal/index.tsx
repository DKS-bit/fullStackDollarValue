import React, { FunctionComponent, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
  Wrapper,
  Header,
  StyledModal,
  HeaderText,
  CloseButton,
  Content,
  Backdrop,
  TextName,
  DataContainer,
  TextRG,
  TextDataNascimento,
  ContentWrapper,
  Image
} from './modal.style';

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  headerText: string;
  clientName: string;
  clientRg: string;
  clientDtOfBirth: string;
  base64Image: string;
}

export const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  clientName,
  clientRg,
  headerText,
  clientDtOfBirth,
  base64Image
}) => {
  const divStyle = {

    background: `linear-gradient(180deg, transparent, #222121), url("${base64Image}") no-repeat center center / cover`,
    width: '100%',
    height: "30rem"
  };

  const modal = (


    <React.Fragment>
      <Backdrop />
      <Wrapper>
        <StyledModal>
          <Header>
            <HeaderText>{headerText}</HeaderText>
            <CloseButton onClick={hide}>X</CloseButton>
          </Header>
          <Content>
            <div style={divStyle}>
              <ContentWrapper>
                <TextName>{clientName}</TextName>
                <DataContainer>
                  <TextRG>RG: {clientRg}</TextRG>
                  <TextDataNascimento>Data de nascimento: {clientDtOfBirth}</TextDataNascimento>
                </DataContainer>
              </ContentWrapper>
            </div>
          </Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
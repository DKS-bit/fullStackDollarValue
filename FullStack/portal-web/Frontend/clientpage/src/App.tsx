import React, { Component, FunctionComponent, useState } from 'react';
import { render } from 'react-dom';
import { Modal } from './components/Modal';
import { useModal } from './components/Modal/useModal';
import GlobalStyle from './globalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ModalPage } from './pages/ModalPage';
import { TableLogPage } from './pages/TableLogPage';
import Header from './components/Header/Header';
import { TableClientPage } from './pages/TableClientPage';
import { DollarExchangePage } from './pages/DollarExchangePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterClientPage } from './pages/RegisterClientPage';

function App() {
  const { isShown, toggle } = useModal();

  const content = <React.Fragment>Hey, I'm a modal.</React.Fragment>;

  return (
    <React.Fragment>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='dollar' element={<DollarExchangePage />} />
          <Route path='table' element={<TableLogPage />} />
          <Route path='clients' element={< TableClientPage />} />
          <Route path='login' element={< LoginPage />} />
          <Route path='register' element={< RegisterClientPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

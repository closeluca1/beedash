import React, { useState, createContext, ReactNode, useContext } from 'react';

interface HeaderProvideProps {
  children: ReactNode | any;
};

export interface ServiceHeaderProps {
  setModalVisible: any;
  modalVisible: boolean;
  handleModal: () => void;
}

export const HeaderContext = createContext({} as ServiceHeaderProps);

export const HeaderService: React.FunctionComponent<HeaderProvideProps> = (props) => {
  const { children } = props;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function handleModal() {
    if (!modalVisible) {
      setModalVisible(true);
    } else if (modalVisible) {
      setModalVisible(false);
    }
  }

  return (
    <HeaderContext.Provider value={{ modalVisible, setModalVisible, handleModal }}>
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeaderService() {
  return useContext(HeaderContext);
}
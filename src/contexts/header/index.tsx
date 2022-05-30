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

  const [verifyModal, setVerifyModal] = useState<boolean>();

  function handleModal() {
    if (!modalVisible) {
      setModalVisible(true);
    }
  }


  // window.onclick = function (event) {
  //   if (document.body && event.target){
  //     console.log('ok')
  //     // setModalVisible(false);
  //   }else {
  //     console.log('none')
  //   }
  // }

  return (
    <HeaderContext.Provider value={{ modalVisible, setModalVisible, handleModal }}>
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeaderService() {
  return useContext(HeaderContext);
}
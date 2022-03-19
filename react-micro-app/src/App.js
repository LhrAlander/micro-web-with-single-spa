import logo from './logo.svg';
import './App.css';
import {
  Button
} from 'antd';
import ParcelModal from "./Modal";
import React, {useContext, useState} from "react";

export const SingleSpaCtx = React.createContext({});

function App(props) {

  const [visible, setVisible] = useState(false);
  const handleBtnClick = () => {
    setVisible(true)
  }

  const {singleSpa, globalParcels} = props;

  return (
    <SingleSpaCtx.Provider value={{singleSpa, globalParcels}}>
      <div className="App">
        <Button onClick={handleBtnClick}>open</Button>
        <ParcelModal visible={visible} onOk={() => {
          console.log('ok')
          setVisible(false)
        }} onCancel={() => {
          setVisible(false)
          console.log('cancel')
        }}/>
      </div>
    </SingleSpaCtx.Provider>
  );
}

export default App;

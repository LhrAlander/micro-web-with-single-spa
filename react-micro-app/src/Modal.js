import React, {useContext, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import {Modal} from "antd";
import {SingleSpaCtx} from "./App";

let parcel = null;
let renderResult = null;
let isFirstMount = true;

export default function ParcelModal(props) {
  const ctx = useContext(SingleSpaCtx);
  const {singleSpa, globalParcels } = ctx;
  const domRef = useRef();

  useEffect(() => {
    if (parcel || !singleSpa) {
      return () => {
      };
    }

    parcel = singleSpa.mountRootParcel({
      name: 'parcel modal',
        mount() {return Promise.resolve()}, update() {
        function realMount() {
          ReactDOM.render(<ParcelModal
            visible={true}
            onOk={() => {
              console.log('on parcel ok')
              parcel.unmount();
            }}
            onCancel={() => {
              console.log('on parcel cancel')
              parcel.unmount();
            }}
          />, document.querySelector('#parcel-sub-app'));
        }
        realMount();
        return Promise.resolve();
      }, unmount() {
        ReactDOM.unmountComponentAtNode(document.querySelector('#parcel-sub-app'))
        return Promise.resolve();
      }
    }, {
      domElement: document.body
    });

    globalParcels.set('parcel modal', parcel);
  }, []);

  return (<div className="parcel-modal-only-container">
      <Modal wrapClassName="parcel-modal-only-name"  {...props}>Hello</Modal>
    </div>)
}
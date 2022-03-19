import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {registerApplication, start} from 'single-spa';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const globalParcels = new Map();

function loadScript(url, lifecycle) {
  const script = document.createElement('script');
  script.src = url;
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  script.onload = () => {
    setTimeout(() => resolve(lifecycle));
  };
  script.onerror = reject;
  document.body.appendChild(script);
  return promise;
}

function App() {
  useEffect(() => {
    console.log('main app started');
    registerApplication({
      name: 'react app',
      app: () => {
        return loadScript('http://localhost:3000/static/js/bundle.js', {
          mount(props) {
            console.log('hello there is react mount', props);
            Promise.resolve().then(() => {
              window.renderReacMicroApp(props);
            });
            return Promise.resolve();
          },
          unmount() {
            console.log('hello there is react unmount');
            return Promise.resolve();
          },
          unload() {
            console.log('hello there is react unload');
            return Promise.resolve();
          },
        })
      },
      activeWhen: location => location.href.includes('react'),
      customProps: {
        globalParcels
      },
    });


    registerApplication({
      name: 'vue app',
      app: () => {
        return loadScript('http://localhost:8080/js/chunk-vendors.js', {
          mount(props) {
            console.log('hello there is react mount', props);
            Promise.resolve().then(() => {
              window.renderVueApp(props);
            });
            return Promise.resolve();
          },
          unmount() {
            console.log('hello there is vue unmount');
            return Promise.resolve();
          },
          unload() {
            console.log('hello there is vue unload');
            return Promise.resolve();
          },
        }).then(res => {
          return loadScript('http://localhost:8080/js/app.js', res);
        })
      },
      activeWhen: location => location.href.includes('vue'),
      customProps: {
        globalParcels
      },
    });

    start();
  }, []);

  return (
    <div>
      <button><Link to="/react">react</Link></button>
      <button><Link to="/vue">vue</Link></button>
    </div>
  )
}

function Micro() {
  return null;
}

ReactDOM.render((
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="/react" element={<Micro />} />
        <Route path="/vue" element={<Micro />} />
      </Route>
    </Routes>
  </BrowserRouter>
), document.querySelector('#main-app'));

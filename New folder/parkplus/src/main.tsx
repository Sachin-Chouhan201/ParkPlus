import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);



// git init
// git add .
// git commit -m "Done in local storage and test case are setuped 
// git branch -M Local_storage
// git remote add origin https://github.com/Sachin-201/parkplus.git
// git push -u origin Local_storage
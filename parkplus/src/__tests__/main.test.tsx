import React from 'react';
import { render } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // for expect(...).toBeInTheDocument()
import { RecoilRoot } from 'recoil';
import App from '../App';
import '@testing-library/jest-dom'; // Remove '/extend-expect' as it's not needed anymore


test('renders the application without crashing', () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  render(
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>,
    { container: root }
  );

  // Assertions
  expect(root).toBeInTheDocument();
  expect(document.getElementById('root')).toBeInTheDocument();
});

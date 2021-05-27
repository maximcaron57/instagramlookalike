import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('When rendering App', () => {
  it('Should render', () => {
    render(<App />);
  });
});

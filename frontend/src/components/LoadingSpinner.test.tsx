import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('When rendering LoadingSpinner', () => {
  it('Should render', () => {
    render(<LoadingSpinner />);
  });
});

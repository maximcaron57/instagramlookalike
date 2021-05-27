import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import SnackbarMessage from './SnackbarMessage';

describe('When rendering SnackbarMessage', () => {
  it('Should show a valid material snackbar when valid props are passed', () => {
    const description = 'This is a critical error!';

    const wrapper = mount(
      <SnackbarMessage severity="error" description={description} />
    );

    expect(wrapper.contains(description)).toBeTruthy();
  });

  it('Should render', () => {
    render(
      <SnackbarMessage
        severity="error"
        description="This is a critical error!"
      />
    );
  });
});

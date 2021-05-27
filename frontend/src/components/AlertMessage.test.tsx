import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import AlertMessage from './AlertMessage';

describe('When rendering AlertMessage', () => {
  it('Should show a valid material card when valid props are passed', () => {
    const title = 'Error 999';
    const description = 'This is a critical error!';

    const wrapper = mount(
      <AlertMessage severity="error" title={title} description={description} />
    );

    expect(wrapper.contains(description)).toBeTruthy();
    expect(wrapper.contains(title)).toBeTruthy();
  });

  it('Should render', () => {
    render(
      <AlertMessage
        severity="error"
        title="Error 999"
        description="This is a critical error!"
      />
    );
  });
});

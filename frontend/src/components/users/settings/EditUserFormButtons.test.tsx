import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { EditUserFormButtons } from './EditUserFormButtons';

const sendButton = (
  <Button disabled variant="contained" color="primary" type="submit">
    Send
  </Button>
);

const deleteAccountButton = (
  <Button variant="outlined" color="primary" onClick={() => null}>
    Delete your account
  </Button>
);

describe('When rendering EditUserFormButtons', () => {
  it('Should render delete account Button with passed delete prop', () => {
    const wrapper = shallow(
      <EditUserFormButtons disableSend delete={() => null} />
    );
    expect(wrapper.find(deleteAccountButton)).toBeTruthy();
  });

  it('Should render send Button with passed disabled prop', () => {
    const wrapper = shallow(
      <EditUserFormButtons disableSend delete={() => null} />
    );

    expect(wrapper.find(sendButton)).toBeTruthy();
  });

  it('Should render', () => {
    render(<EditUserFormButtons disableSend delete={() => null} />);
  });
});

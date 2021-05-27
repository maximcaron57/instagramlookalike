import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { Menu } from './Menu';

const menuProps = {
  username: 'username',
  anchorRef: { current: { offsetWidth: 100 } },
  open: true,
  close: jest.fn(),
  handleListKeyDown: jest.fn(),
};

describe('When rendering Menu', () => {
  it('Should show contains a link to logout section', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Menu {...menuProps} />
      </BrowserRouter>
    );

    expect(wrapper.contains('Logout')).toBeTruthy();
  });

  it('Should show contains a link to settings section', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Menu {...menuProps} />
      </BrowserRouter>
    );

    expect(wrapper.contains('Settings')).toBeTruthy();
  });

  it('Should show contains a link to profile section', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Menu {...menuProps} />
      </BrowserRouter>
    );

    expect(wrapper.contains('Profile')).toBeTruthy();
  });

  it('Should render', () => {
    render(
      <BrowserRouter>
        <Menu {...menuProps} />
      </BrowserRouter>
    );
  });
});

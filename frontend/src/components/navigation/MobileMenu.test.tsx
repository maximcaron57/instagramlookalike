import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { MobileMenu } from './MobileMenu';

const props = {
  username: 'username',
  anchor: 'bottom',
  open: true,
  close: jest.fn(),
};

describe('When rendering MobileMenu', () => {
  it('Should show contains a link to logout section', () => {
    const wrapper = mount(
      <BrowserRouter>
        <MobileMenu {...props} />
      </BrowserRouter>
    );

    expect(wrapper.contains('Logout')).toBeTruthy();
  });

  it('Should show contains a link to settings section', () => {
    const wrapper = mount(
      <BrowserRouter>
        <MobileMenu {...props} />
      </BrowserRouter>
    );

    expect(wrapper.contains('Settings')).toBeTruthy();
  });

  it('Should show contains a link to profile section', () => {
    const wrapper = mount(
      <BrowserRouter>
        <MobileMenu {...props} />
      </BrowserRouter>
    );

    expect(wrapper.contains('Profile')).toBeTruthy();
  });

  it('Should render', () => {
    render(
      <BrowserRouter>
        <MobileMenu {...props} />
      </BrowserRouter>
    );
  });
});

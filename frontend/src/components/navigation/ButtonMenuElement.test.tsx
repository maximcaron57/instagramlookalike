import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import SettingsIcon from '@material-ui/icons/Settings';
import { ButtonMenuElement } from './ButtonMenuElement';
import { MenuElement } from './MenuElement';

const buttonMenuElementProps = {
  href: 'link',
  text: 'Test',
  icon: <SettingsIcon />,
};

describe('When rendering ButtonMenuElement', () => {
  it('Should render MenuElement with the right props', () => {
    const wrapper = mount(
      <BrowserRouter>
        <ButtonMenuElement {...buttonMenuElementProps} />
      </BrowserRouter>
    );

    expect(
      wrapper.containsMatchingElement(
        <MenuElement
          text={buttonMenuElementProps.text}
          icon={buttonMenuElementProps.icon}
        />
      )
    ).toBeTruthy();
  });

  it('Should render', () => {
    render(
      <BrowserRouter>
        <ButtonMenuElement {...buttonMenuElementProps} />
      </BrowserRouter>
    );
  });
});

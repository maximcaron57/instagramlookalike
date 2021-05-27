import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { Box } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { MenuElement } from './MenuElement';

const menuElementProps = {
  text: 'Test',
  icon: <SettingsIcon />,
};

describe('When rendering MenuElement', () => {
  it('Should show text and icon is absent when no icon is given', () => {
    const wrapper = mount(<MenuElement text={menuElementProps.text} />);

    expect(wrapper.contains(menuElementProps.text)).toBeTruthy();
  });

  it('Should show icon and text', () => {
    const wrapper = mount(<MenuElement {...menuElementProps} />);

    expect(
      wrapper.contains(
        <Box mr={1} display="flex">
          {menuElementProps.icon}
        </Box>
      )
    ).toBeTruthy();

    expect(wrapper.contains(menuElementProps.text)).toBeTruthy();
  });

  it('Should render', () => {
    render(<MenuElement {...menuElementProps} />);
  });
});

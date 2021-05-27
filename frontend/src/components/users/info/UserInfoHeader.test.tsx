import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Box from '@material-ui/core/Box';
import { UserFactory } from 'factories/UserFactory';
import { UserInfoHeader } from './UserInfoHeader';

const user = UserFactory.make();

describe('When rendering UserInfoHeader', () => {
  it('Should render Box', () => {
    render(<Box />);
  });

  it('Should render passed username', () => {
    const wrapper = mount(<UserInfoHeader username={user.username} />);

    expect(wrapper.find('#UserInfoHeaderUsername').hostNodes().text()).toBe(
      user.username
    );
  });
});

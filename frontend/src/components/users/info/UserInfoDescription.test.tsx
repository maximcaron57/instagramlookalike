import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Box from '@material-ui/core/Box';
import { UserFactory } from 'factories/UserFactory';
import { UserInfoDescription } from './UserInfoDescription';

const user = UserFactory.make();

describe('When rendering UserInfoDescription', () => {
  it('Should render Box', () => {
    render(<Box />);
  });

  it('Should render passed fullname', () => {
    const wrapper = mount(
      <UserInfoDescription
        fullname={user.firstName}
        description={user.description}
      />
    );

    expect(wrapper.find('#UserInfoDescriptionFullName').text()).toBe(
      user.firstName
    );
  });

  it('Should render passed description', () => {
    const wrapper = mount(
      <UserInfoDescription
        fullname={user.firstName}
        description={user.description}
      />
    );

    expect(wrapper.find('#UserInfoDescriptionDescription').text()).toBe(
      user.description
    );
  });
});

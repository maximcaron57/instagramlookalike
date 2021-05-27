import React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { mount } from 'enzyme';
import { UserFactory } from 'factories/UserFactory';
import { UserAvatar } from './UserAvatar';

const user = UserFactory.make();

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(1),
    height: theme.spacing(1),
  },
}));

const UserAvatarWrapper = () => {
  const classes = useStyles();
  return <UserAvatar username={user.username} size={classes.small} />;
};

describe('When rendering UserAvatar', () => {
  it('Should show avatar image when image src prop is passed', () => {
    const wrapper = mount(
      <UserAvatar username={user.username} src={user.avatarReference} />
    );

    expect(wrapper.find('.MuiAvatar-img')).toHaveLength(1);
    expect(wrapper.find('.MuiAvatar-img').prop('src')).toBe(
      user.avatarReference
    );
  });

  it('Should show username first letter when image src prop is absent', () => {
    const username = 'Test';

    const wrapper = mount(<UserAvatar username={username} />);

    expect(wrapper.find('.MuiAvatar-root').text()).toBe('T');
  });

  it('Should render Avatar with the given size', () => {
    const wrapper = mount(<UserAvatarWrapper />);

    expect(wrapper.find('.MuiAvatar-root').hasClass('makeStyles-small-3')).toBe(
      true
    );
  });

  it('Should render Avatar with the default size if no size given', () => {
    const wrapper = mount(
      <UserAvatar username={user.username} src={user.avatarReference} />
    );

    expect(
      wrapper.find('.MuiAvatar-root').hasClass('makeStyles-defaultSize-1')
    ).toBe(true);
  });

  it('Should render Avatar', () => {
    render(<Avatar />);
  });
});

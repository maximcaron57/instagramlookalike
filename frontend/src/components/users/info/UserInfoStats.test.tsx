import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Box from '@material-ui/core/Box';
import { UserInfoStats } from './UserInfoStats';

const stats = {
  totalPost: 45,
};

describe('When rendering UserInfoStats', () => {
  const wrapper = mount(<UserInfoStats stats={stats} />);

  it('Should render Box', () => {
    render(<Box />);
  });

  it('Should render posts stat', () => {
    expect(wrapper.find('#userInfoStatsPosts').first().text()).toBe('45 posts');
  });
});

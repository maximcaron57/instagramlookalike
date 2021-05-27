import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import Box from '@material-ui/core/Box';
import { UserInfoStatsMobile } from './UserInfoStatsMobile';

const totalPost = 45;

describe('When rendering UserInfoStatsMobile', () => {
  const wrapper = mount(<UserInfoStatsMobile totalPost={totalPost} />);

  it('Should render Box', () => {
    render(<Box />);
  });

  it('Should render posts stat', () => {
    expect(wrapper.find('#userInfoStatsPosts').hostNodes().text()).toBe(
      `${totalPost}posts`
    );
  });
});

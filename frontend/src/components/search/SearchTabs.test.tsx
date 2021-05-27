import React from 'react';
import { mount } from 'enzyme';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import { SearchTabs } from './SearchTabs';

const showTab = jest.fn();

const layout = mount(<SearchTabs showTab={showTab} />);

it('Should render 3 tabs with an image representing each', () => {
  expect(layout.find(Tabs)).toHaveLength(1);
  expect(layout.find(Tab)).toHaveLength(3);
  expect(layout.find(PersonIcon)).toHaveLength(1);
  expect(layout.find(DescriptionIcon)).toHaveLength(1);
  expect(layout.contains('Top #')).toBeTruthy();
});

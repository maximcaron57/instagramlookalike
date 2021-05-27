import React from 'react';
import { mount } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import TagsSection from './TagsSection';

const post = PostFactory.make();

describe('When rendering HastagsCardSection', () => {
  it('Should show a valid CardActions tag with buttons when valid params are passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<TagsSection tags={post.usertags} type="usertags" />)
    );
    post.usertags.forEach((usertag) => {
      expect(wrapper.contains(usertag)).toBeTruthy();
    });
  });

  it('Should show noting when an empty array is passed', () => {
    const wrapper = mount(wrapInMemoryRouter(<TagsSection tags={[]} />));
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});

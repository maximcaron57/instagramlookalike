import React from 'react';
import { mount, render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostImage from './PostImage';

const post = PostFactory.make();

describe('When rendering PostImage', () => {
  it('Should show a valid image, assuming the link works', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<PostImage reference={post.reference} />)
    );

    expect(wrapper.find('.MuiCardMedia-root')).toHaveLength(1);
  });

  it('Should show nothing when undefined props are passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<PostImage reference={undefined} />)
    );
    expect(wrapper.find('.MuiCardMedia-root')).toEqual({});
  });

  it('Should render PostImage', () => {
    render(<PostImage reference={undefined} />);
  });
});

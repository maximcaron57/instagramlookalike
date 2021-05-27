import React from 'react';
import { mount, render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostCard from './PostCard';

const post = PostFactory.make();

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  const randomElement =
    '<Box><Box><Box id="content">{element}</div><div id="target" data-target-tag-name={target.tagName}></Box></Box></Box>';

  return {
    ...original,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createPortal: (node: any) => randomElement,
  };
});

describe('When rendering PostCard', () => {
  it('Should show a valid material card when valid props are passed', () => {
    const wrapper = mount(wrapInMemoryRouter(<PostCard post={post} />));
    expect(wrapper.contains(post.description!)).toBeTruthy();
    expect(wrapper.contains(post.user)).toBeTruthy();
  });

  it('Should show 404 and not an empty card when undefined props are passed', () => {
    const wrapper = mount(wrapInMemoryRouter(<PostCard post={undefined} />));

    expect(wrapper.contains(post.description!)).toBeFalsy();
    expect(wrapper.contains(post.user)).toBeFalsy();
  });

  it('Should render PostCard', () => {
    render(wrapInMemoryRouter(<PostCard post={post} />));
  });
});

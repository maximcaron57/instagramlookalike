import React from 'react';
import { render } from '@testing-library/react';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';
import FeedView from './FeedView';

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

describe('When rendering FeedView', () => {
  it('Should render', () => {
    render(wrapInMemoryRouter(<FeedView />));
  });
});

import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import { wrapInMemoryRouter } from '../util/wrapInMemoryRouter';
import MainLayout from './MainLayout';

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

describe('When rendering MainLayout', () => {
  it('Should render', () => {
    render(
      wrapInMemoryRouter(
        <MainLayout>
          <></>
        </MainLayout>
      )
    );
  });

  it('Should display children component', () => {
    const componentText = 'componentText';

    const wrapper = render(
      wrapInMemoryRouter(
        <MainLayout>
          <p>{componentText}</p>
        </MainLayout>
      )
    );

    expect(wrapper.text()).to.contain(componentText);
  });
});

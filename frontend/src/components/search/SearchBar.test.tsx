import React from 'react';
import { render, shallow } from 'enzyme';
import { expect } from 'chai';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchBar } from './SearchBar';

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

describe('When rendering SearchBar', () => {
  it('Should render', () => {
    render(wrapInMemoryRouter(<SearchBar inSearchView={false} />));
  });

  let bar: any;
  beforeEach(() => {
    bar = shallow(<SearchBar inSearchView={false} />);
  });

  it('Should contain Search Bar place holder', () => {
    expect(bar.contains('Search'));
  });

  it('Should contain an Autocomplete', () => {
    expect(bar.find(Autocomplete)).lengthOf(1);
  });
});

import React from 'react';
import LandingPage from './LandingPage';
import { shallow } from 'enzyme';

const openHomePageMock = jest.fn();

describe('Buttons', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <LandingPage
        openHomePage={openHomePageMock}
      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should open home page when button is clicked', () => {
    wrapper.find('button').simulate('click', { preventDefault: () => { } });
    expect(openHomePageMock).toBeCalled();
  });
});
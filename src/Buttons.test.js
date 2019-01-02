import React from 'react';
import Buttons from './Buttons';
import { shallow } from 'enzyme';

const parkUrl = 'deva';
const visitedParks = ['deva', 'grsm'];
const bucketListParks = ['yell'];
const updateParkCodesMock = jest.fn();
const iconType = 'fas fa-hiking';
const storageKey = 'visitedParks';
const newParkCodes = ['deva', 'grsm', 'yell'];

describe('Buttons', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Buttons
        iconType={iconType}
        storageKey={storageKey}
        parkUrl={parkUrl}
        visitedParks={visitedParks}
        bucketListParks={bucketListParks}
        updateParkCodes={updateParkCodesMock}
      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({ parkUrl: 'deva', storageKey: 'visitedParks' });
  });

  it('should save updated visited or bucket list to Apps state', () => {
    wrapper.find('span').simulate('click');
    expect(updateParkCodesMock).toBeCalled();
  });

  it('should save updated visited or bucket list to local storage', () => {
    wrapper.instance().saveToLocalStorage(newParkCodes);
    expect(JSON.parse(localStorage.visitedParks).length).toEqual(3);
  });

  it('should update park codes when a park is added to the visited or bucket list', () => {
    wrapper.find('.fa-hiking').simulate('click');
    expect(updateParkCodesMock).toBeCalled();
  });
});
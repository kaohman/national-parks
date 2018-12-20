import React from 'react';
import UsState from './UsState';
import { shallow } from 'enzyme';

let name = "North Carolina";
let selectedState = {
  abbreviation: "NC",
  latitude: 35.630066,
  longitude: -79.806419,
  capitalCity: "Raleigh",
  dateEstablished: "Nov 21, 1789",
  Population: 10273419,
  stateFlower: "American Dogwood",
  totalAreaMi2: 53819,
  totalLandAreaMi2: 48618,
  totalWaterAreaMi2: 5201,
  nationalParks: ["Great Smoky Mountains"]
};

describe('UsState', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <UsState 
        name={name}
        selectedState={selectedState}
      />
    );
  });
  
  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
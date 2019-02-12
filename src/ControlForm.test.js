import React from 'react';
import ControlForm from './ControlForm';
import { shallow } from 'enzyme';

const setMapToStateMock = jest.fn();
const stateName = 'default';
const usStates = {
  Alabama: {
    abbreviation: "AL",
    latitude: 32.806671,
    longitude: -86.79113,
    capitalCity: "Montgomery",
    dateEstablished: "Dec 14, 1819",
    Population: 4874747,
    stateFlower: "Camellia",
    totalAreaMi2: 52420,
    totalLandAreaMi2: 50645,
    totalWaterAreaMi2: 1775,
    nationalParks: [ ]
  },
  Alaska: {
    abbreviation: "AK",
    latitude: 61.370716,
    longitude: -152.404419,
    capitalCity: "Juneau",
    dateEstablished: "Jan 3, 1959",
    Population: 739795,
    stateFlower: "Forget Me Not",
    totalAreaMi2: 665384,
    totalLandAreaMi2: 570641,
    totalWaterAreaMi2: 94743,
    nationalParks: [
      "Denali",
      "Gates of the Arctic",
      "Glacier Bay",
      "Katmai",
      "Kenai Fjords",
      "Kobuk Valley",
      "Lake Clark",
      "Wrangell - St. Elias"
    ]
  },
  Arizona: {
    abbreviation: "AZ",
    latitude: 33.729759,
    longitude: -111.431221,
    capitalCity: "Phoenix",
    dateEstablished: "Feb 14, 1912",
    Population: 7016270,
    stateFlower: "Saguaro Cactus Blossom",
    totalAreaMi2: 113990,
    totalLandAreaMi2: 113594,
    totalWaterAreaMi2: 396,
    nationalParks: [
      "Grand Canyon",
      "Petrified Forest",
      "Saguaro"
    ]
  },
  Arkansas: {
    abbreviation: "AR",
    latitude: 34.969704,
    longitude: -92.373123,
    capitalCity: "Little Rock",
    dateEstablished: "Jun 15, 1836",
    Population: 3004279,
    stateFlower: "Apple Blossom",
    totalAreaMi2: 53179,
    totalLandAreaMi2: 52035,
    totalWaterAreaMi2: 1143,
    nationalParks: [
      "Hot Springs"
    ]
  },
  California: {
    abbreviation: "CA",
    latitude: 36.116203,
    longitude: -119.681564,
    capitalCity: "Sacramento",
    dateEstablished: "Sep 9, 1850",
    Population: 39536653,
    stateFlower: "California Poppy",
    totalAreaMi2: 163695,
    totalLandAreaMi2: 155779,
    totalWaterAreaMi2: 7916,
    nationalParks: [
      "Channel Islands",
      "Death Valley",
      "Joshua Tree",
      "Kings Canyon",
      "Lassen Volcanic",
      "Pinnacles",
      "Redwood",
      "Sequoia",
      "Yosemite"
    ]
  }
}

describe('FilterControls', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FilterControls
        usStates={usStates}
        stateName={stateName}
        setMapToState={setMapToStateMock}
      />
    );
  });
  
  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the proper default state', () => {
    expect(wrapper.state()).toEqual( { stateName: 'default', selectedState: {} } );
  });

  it('should update state when getState is called', () => {
    expect(wrapper.state()).toEqual( { stateName: 'default', selectedState: {} } );
    wrapper.find('#select-menu').simulate('change', { target: { value: 'California' }});
    expect(wrapper.state()).toEqual({
      stateName: 'California',
      selectedState: {
        abbreviation: "CA",
        latitude: 36.116203,
        longitude: -119.681564,
        capitalCity: "Sacramento",
        dateEstablished: "Sep 9, 1850",
        Population: 39536653,
        stateFlower: "California Poppy",
        totalAreaMi2: 163695,
        totalLandAreaMi2: 155779,
        totalWaterAreaMi2: 7916,
        nationalParks: [
          "Channel Islands",
          "Death Valley",
          "Joshua Tree",
          "Kings Canyon",
          "Lassen Volcanic",
          "Pinnacles",
          "Redwood",
          "Sequoia",
          "Yosemite"
        ]
      }
    });
  });
});
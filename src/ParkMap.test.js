import React from 'react';
import ParkMap from './ParkMap';
import { shallow } from 'enzyme';

const parks = [
  {
    parkName: "Death Valley",
    state: [
    "California",
    "Nevada"
    ],
    dateEstablished: "October 31, 1994",
    latitude: "36.24°N",
    longitude: "116.82°W",
    annualVisitors: 1294827,
    petsWelcome: true,
    editorsChoice: "Badwater Basin Salt Flats",
    websiteUrl: "https://www.nps.gov/deva/index.htm",
    urlCode: "deva",
    image: "assets/death-valley.jpg",
    sizeAcres: 337306314,
    description: "The Badlands are a collection of buttes, pinnacles, spires, and mixed-grass prairies. The White River Badlands contain the largest assemblage of known late Eocene and Oligocene mammal fossils. The wildlife includes bison, bighorn sheep, black-footed ferrets, and prairie dogs."
  },
  {
    parkName: "Great Smoky Mountains",
    state: [
    "Tennessee",
    "North Carolina"
    ],
    dateEstablished: "June 15, 1934",
    latitude: "35.68°N",
    longitude: "83.53°W",
    annualVisitors: 11338893,
    petsWelcome: true,
    editorsChoice: "Appalachian Trail",
    websiteUrl: "https://www.nps.gov/grsm/index.htm",
    urlCode: "grsm",
    image: "assets/great-smoky-mtns.jpeg",
    sizeAcres: 52242688,
    description: "The Great Smoky Mountains, part of the Appalachian Mountains, span a wide range of elevations, making them home to over 400 vertebrate species, 100 tree species, and 5000 plant species. Hiking is the park's main attraction, with over 800 miles (1,300 km) of trails, including 70 miles (110 km) of the Appalachian Trail. Other activities include fishing, horseback riding, and touring nearly 80 historic structures."
  },
  {
    parkName: "Yellowstone",
    state: [
    "Wyoming",
    "Montana",
    "Idaho"
    ],
    dateEstablished: "March 1, 1872",
    latitude: "44.60°N",
    longitude: "110.50°W",
    annualVisitors: 4116524,
    petsWelcome: true,
    editorsChoice: "Uncle Tom's Trail",
    websiteUrl: "https://www.nps.gov/yell/index.htm",
    urlCode: "yell",
    image: "assets/yellowstone.jpg",
    sizeAcres: 221979071,
    description: "Situated on the Yellowstone Caldera, the park has an expansive network of geothermal areas including boiling mud pots, vividly colored hot springs such as Grand Prismatic Spring, and regularly erupting geysers, the best-known being Old Faithful. The yellow-hued Grand Canyon of the Yellowstone River contains several high waterfalls, and four mountain ranges traverse the park. More than 60 mammal species including gray wolves, grizzly bears, black bears, lynxes, bison, and elk, make this park one of the best wildlife viewing spots in the country."
  }
]
const visitedParks = ['deva', 'grsm'];
const bucketListParks = ['yell'];
const updateParkCodesMock = jest.fn();
const stateName = 'default';
const stateCoord = [];


describe('ParkMap', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ParkMap
        parks={parks}
        stateName={stateName}
        stateCoord={stateCoord}
        visitedParks={visitedParks}
        bucketListParks={bucketListParks}
        updateParkCodes={updateParkCodesMock}
      />
    );
  });
  
  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the proper default state', () => {
    expect(wrapper.state()).toEqual({ selectedPark: null, zoom: 4, uniqueStateZoom: { Alaska: 4, California: 5, Michigan: 5 }, position: [37.0902, - 95.7129] } );
  });

  it('should update state when getPark is called', () => {
    expect(wrapper.state('selectedPark')).toEqual(null);
    wrapper.find('#deva').simulate('click', { target: { options: {id: "deva"} }});
    expect(wrapper.state('selectedPark')).toEqual(parks[0]);
  });
});
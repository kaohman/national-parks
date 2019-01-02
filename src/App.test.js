import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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
    nationalParks: []
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
const visitedParkCodes = ['deva', 'grsm'];
const bucketListParkCodes = ['deva'];
const randomImageClass = 'landing-background2';
const homePage = 'home';
const newParkCodes = ['deva', 'grsm', 'yell'];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />
    );

    wrapper.setState({
      parks: parks,
      usStates: usStates,
      pageStatus: homePage,
      visitedParkCodes: visitedParkCodes,
      bucketListParkCodes: bucketListParkCodes,
      randomImageClass: randomImageClass
    });
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the proper default state', () => {
    expect(wrapper.state()).toEqual({
      parks: parks,
      usStates: usStates,
      currentParksToShow: [],
      pageStatus: homePage,
      bucketListParkCodes: bucketListParkCodes,
      currentUsStateCoord: [],
      currentUsStateName: 'default',
      randomImageClass: randomImageClass,
      visitedParkCodes: visitedParkCodes
    });
  });

  it('should be able to show all parks', () => {
    wrapper.find('#show-all-button').simulate('click');
    expect(wrapper.state('currentUsStateName')).toEqual('default');
    expect(wrapper.state('currentUsStateCoord')).toEqual([]);
    expect(wrapper.state('currentParksToShow')).toEqual(parks);
  });

  it('should be able to show only visited parks', () => {
    wrapper.find('#show-visited-button').simulate('click', { preventDefault: () => { } });
    expect(wrapper.state('currentUsStateName')).toEqual('default');
    expect(wrapper.state('currentUsStateCoord')).toEqual([]);
    expect(wrapper.state('currentParksToShow')).toEqual([{
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
    }]);
  });

  it('should be able to show only bucket list parks', () => {
    wrapper.find('#show-bucket-button').simulate('click', { preventDefault: () => { } });
    expect(wrapper.state('currentUsStateName')).toEqual('default');
    expect(wrapper.state('currentUsStateCoord')).toEqual([]);
    expect(wrapper.state('currentParksToShow')).toEqual([{
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
    }]);
  });

  it('should be able to update visited list park codes', () => {
    wrapper.instance().updateParkCodes('visitedParks', newParkCodes);
    expect(wrapper.state('visitedParkCodes')).toEqual(newParkCodes);
  });

  it('should be able to update bucket list park codes', () => {
    wrapper.instance().updateParkCodes('bucketListParks', newParkCodes);
    expect(wrapper.state('bucketListParkCodes')).toEqual(newParkCodes);
  });

  it('should be able to pull visited parks from local storage', () => {
    localStorage.setItem('visitedParks',JSON.stringify(newParkCodes));
    wrapper.instance().pullFromLocalStorage();
    expect(wrapper.state('visitedParkCodes')).toEqual(newParkCodes);
  });

  it('should be able to pull bucket list parks from local storage', () => {
    localStorage.setItem('bucketList', JSON.stringify(newParkCodes));
    wrapper.instance().pullFromLocalStorage();
    expect(wrapper.state('bucketListParkCodes')).toEqual(newParkCodes);
  });

  it('should be able to open home page', () => {
    wrapper.setState({ pageStatus: 'landing' });
    wrapper.instance().openHomePage();
    expect(wrapper.state('pageStatus')).toEqual(homePage);
  });

  it('should be able to set map to state', () => {
    wrapper.instance().setMapToState('California', usStates.California);
    expect(wrapper.state('currentUsStateName')).toEqual('California');
    expect(wrapper.state('currentUsStateCoord')).toEqual([36.116203, -119.681564]);
    expect(wrapper.state('currentParksToShow')).toEqual([parks[0]]);
  }); 
});
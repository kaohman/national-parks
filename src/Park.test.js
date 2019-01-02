import React from 'react';
import Park from './Park';
import { shallow } from 'enzyme';

const selectedPark = {
  parkName: "Death Valley",
  state: ["California", "Nevada"],
  dateEstablished: "October 31, 1994",
  latitude: "36.24°N",
  longitude: "116.82°W",
  annualVisitors: 1294827,
  petsWelcome: true,
  editorsChoice: "Badwater Basin Salt Flats",
  websiteUrl: "https://www.nps.gov/deva/index.htm",
  urlCode: "deva",
  image: "assets/death-valley.jpg",
  imageRef: "<a rel=\"nofollow\" class=\"external text\" href=\"https://sites.google.com/site/thebrockeninglory/\">Brocken Inaglory</a> - <span class=\"int-own-work\" lang=\"en\">Own work</span>, <a href=\"https://creativecommons.org/licenses/by-sa/3.0\" title=\"Creative Commons Attribution-Share Alike 3.0\">CC BY-SA 3.0</a>, <a href=\"https://commons.wikimedia.org/w/index.php?curid=5990426\">Link</a>",
  sizeAcres: 337306314,
  description: "The Badlands are a collection of buttes, pinnacles, spires, and mixed-grass prairies. The White River Badlands contain the largest assemblage of known late Eocene and Oligocene mammal fossils. The wildlife includes bison, bighorn sheep, black-footed ferrets, and prairie dogs."
};
const visitedParks = ['deva', 'grsm'];
const bucketListParks = ['yell'];
const removeCardMock = jest.fn();
const updateParkCodesMock = jest.fn();

describe('Park', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Park
        selectedPark={selectedPark}
        removeCard={removeCardMock}
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
    expect(wrapper.state()).toEqual({ displayFull: false });
  });

  it('should be able to toggle between small and large card', () => {
    expect(wrapper.state('displayFull')).toEqual(false);
    wrapper.find('.button-small').simulate('click');
    expect(wrapper.state('displayFull')).toEqual(true);
  });

  it('should be able to remove a park card', () => {
    wrapper.find('#remove-card').simulate('click', { preventDefault: () => { } });
    expect(removeCardMock).toBeCalled();
    expect(wrapper.state('displayFull')).toEqual(false);
  });
});
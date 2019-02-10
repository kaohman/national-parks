const setParks = (results) => {
  return results.data.reduce((acc, park) => {
    const { designation, latLong, name, images, states, url, weatherInfo, description} = park;
    if (designation.includes('National Park')) {
      const parkCoord = updateCoordinates(latLong);
      const parkStates = updateStates(states);
      const newPark = {
        name,
        lat: parkCoord[0],
        lon: parkCoord[1],
        images,
        states: parkStates,
        url,
        weatherInfo,
        description,
      }
      acc = [...acc, newPark]
    }
    return acc
  }, []);
}

const updateCoordinates = (latLong) => {
  const coords = latLong.split(',');
  const newLat = coords[0].substring(4);
  const newLong = coords[1].substring(6);
  return [newLat, newLong]
}

const updateStates = (states) => {
  return states.split(',')
}

export default {
  setParks,
}
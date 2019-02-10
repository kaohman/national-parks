export const setParks = (parks) => ({
  type: 'SET_PARKS',
  parks,
});

export const setVisitedParks = (visitedParkCodes) => ({
  type: 'SET_VISITED_PARKS',
  visitedParkCodes,
});

export const toggleVisitedPark = (parkCode) => ({
  type: 'TOGGLE_VISITED_PARK',
  parkCode,
});

export const setBucketListParks = (bucketListParkCodes) => ({
  type: 'SET_BUCKET_LIST_PARKS',
  bucketListParkCodes,
});

export const toggleBucketListPark = (parkCode) => ({
  type: 'TOGGLE_BUCKET_LIST_PARK',
  parkCode,
});

export const setUsStates = (usStates) => ({
  type: 'SET_US_STATES',
  usStates,
});

export const setParksToShow = (name) => ({
  type: 'SET_PARKS_TO_SHOW',
  name,
});

export const setParkCardToShow = (parkId) => ({
  type: 'SET_PARK_CARD_TO_SHOW',
  parkId,
});

export const setErrorStatus = (error) => ({
  type: 'SET_ERROR_STATUS',
  error,
});

export const setLoadingStatus = (loading) => ({
  type: 'SET_LOADING_STATUS',
  loading,
});
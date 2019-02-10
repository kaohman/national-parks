export const bucketListParksReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BUCKET_LIST_PARKS':
      return action.bucketListParkCodes;
    case 'TOGGLE_BUCKET_LIST_PARK':
      const newBucketList = state.filter(parkCode => parkCode !== action.parkCode);
      if (newBucketList.length < state.length) {
        return newBucketList;
      } else {
        return [...state, action.parkCode];
      }
    default:
      return state;
  }
}
export const displayedParksReducer = (state = 'all', action) => {
  switch (action.type) {
    case 'SET_PARKS_TO_SHOW':
      return action.name;
    default:
      return state;
  }
}
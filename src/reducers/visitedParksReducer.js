export const visitedParksReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_VISITED_PARKS':
      return action.visitedParkCodes;
    case 'TOGGLE_VISITED_PARK':
      const newVisited = state.filter(parkCode => parkCode !== action.parkCode);
      if (newVisited.length < state.length) {
        return newVisited;
      } else {
        return [ ...state, action.parkCode ];
      }
    default:
      return state;
  }
}
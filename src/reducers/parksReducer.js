export const parksReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PARKS':
      return action.parks;
    default:
      return state;
  }
}
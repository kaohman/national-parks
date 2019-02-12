export const parkCardReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_PARK_CARD_TO_SHOW':
      return action.parkCode;
    default:
      return state;
  }
}
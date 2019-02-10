export const errorReducer = (state = '', action) => {
  switch (action.type) {
    case 'ERROR_TO_DISPLAY':
      return action.error;
    default:
      return state;
  }
}
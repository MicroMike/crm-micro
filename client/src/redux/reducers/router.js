export default (state = { path: '/' }, action) => {
  switch (action.type) {
    case 'CHANGE_PATH':
      return { path: action.path }

    default:
      return state
  }
}

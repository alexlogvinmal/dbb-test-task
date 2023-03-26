const initialState = [
    { name: 'Main', path: '' },
  ];
  
  export const pathUrlReducer = (state = initialState, action: { type: string; path: string; name: string; length:number}) => {
    switch (action.type) {
      case 'ADD_PATHURL':
        return [
          ...state,
          {
            name: action.name,
            path: action.path,
          },
        ];
        case 'DEL_PATHURL':
        return state.filter(item => item.path.length <= action.length);
      default:
        return state;
    }
  };



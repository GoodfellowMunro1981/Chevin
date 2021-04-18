import React, { createContext, useContext, useEffect, useReducer } from 'react';

enum MenuStatus {
  Closed,
  Opened,
  TemporaryOpened
}

type NavigationProviderProps = {

}

type NavigationContextState = {
  currentPath: string;
  menuStatus: MenuStatus;
}

type NavigationContextType = {
  state: NavigationContextState,
  setCurrentNavigationPath: (path: string) => void
  setMenuStatus: (status: MenuStatus) => void
}

type NavigationContextActions =
  | { type: 'SET_PATH', value: string }
  | { type: 'SET_MENU_STATUS', value: MenuStatus };

let initialState: NavigationContextState = {
  currentPath: '',
  menuStatus: MenuStatus.Opened
}

let NavigationContext = createContext<NavigationContextType>({
  state: initialState,

  setCurrentNavigationPath: () => { },
  setMenuStatus: () => { }
})

let navigationReducer = (state: NavigationContextState, action: NavigationContextActions): NavigationContextState => {

  switch (action.type) {
    case 'SET_PATH':
      return { ...state, currentPath: action.value }
    case 'SET_MENU_STATUS':
      return { ...state, menuStatus: action.value }
    default:
      return initialState;
  }
}

const NavigationProvider: React.FC<NavigationProviderProps> = props => {
  let [state, dispatch] = useReducer(navigationReducer, initialState);

  const setCurrentNavigationPath = async (path: string) => {
    dispatch({ type: 'SET_PATH', value: path });
  }

  const setMenuStatus = async (status: MenuStatus) => {
    dispatch({ type: 'SET_MENU_STATUS', value: status })
  }

  return <NavigationContext.Provider value={{
    state,
    setCurrentNavigationPath,
    setMenuStatus
  }}>
    {props.children}
  </NavigationContext.Provider>
}

let NavigationConsumer = NavigationContext.Consumer;


const withNavigationWatcher = (Component: any) => {
  return (props: any) => {
    const { path } = props.match;
    const { setCurrentNavigationPath } = useContext(NavigationContext);

    useEffect(() => {
      setCurrentNavigationPath(path);
    }, [path]);

    return React.createElement(Component, props);
  }
}

export {
  MenuStatus,
  NavigationContext,
  NavigationProvider,
  NavigationConsumer,
  withNavigationWatcher
}
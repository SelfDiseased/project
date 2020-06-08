import React, { useReducer } from "react"

 
const initialSearch = {
  search: "",
}
 
const initialSearchContext = {
  search: initialSearch,
  handleSettingSearch: (search) => {
    throw new Error("Method not implemented.")
  },
}
 
const reducer = (state, action) => {
  switch (action.type) {
    case "handleSettingSearch":
      return {
        ...state,
        search: action.payload.search,
      }
    default:
      return state
  }
}

const SearchContext = React.createContext(initialSearchContext)
 
const SearchContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialSearchContext)
 
  return (
    <SearchContext.Provider
     value={{
       ...state,
       handleSettingSearch: (search) => {
          dispatch({ type: "handleSettingSearch", payload: search })
        },
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
 
export { SearchContextProvider, SearchContext }
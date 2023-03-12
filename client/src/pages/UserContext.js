import {createContext} from 'react'

export const UserContext = createContext({uname: "", 
                                            setUname: () => {},
                                            n: "", 
                                            setN: () => {},
                                            points: "",
                                            setPoints: () => {}});
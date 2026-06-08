import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TicTacToe from './TicTacToe/TicTacToe'
import DataGrid from './DataGrid/DataGrid'
import Autocomplete from './Autocomplete/Autocomplete'
import AuthForm from './AuthForm/AuthForm'

function App() {

  return (
    <>
      {/* <TicTacToe /> */}
      {/* <DataGrid /> */}
      {/* <Autocomplete /> */}
      <AuthForm />
    </>
  )
}

export default App

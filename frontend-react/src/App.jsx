import './App.css'
import { UserContextProvider } from './context/userContextProvider';
import { AppRouter } from './pages/AppRouter';

function App() {

  return (
    <>
    <UserContextProvider>
      <AppRouter />
    </UserContextProvider>
    </>
  )
}

export default App

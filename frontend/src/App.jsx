import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CreateNewCompany from './components/admin/CreateNewCompany'
import CompanySetup from './components/admin/CompanySetup'

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <HomePage />
  },
  {
    path : "/login",
    element : <Login />
  },
  {
    path : "/signup",
    element : <Signup />
  },
  {
    path : "/jobs",
    element : <Jobs />
  },
  {
    path : "/description/:id",
    element : <JobDescription />
  },
  {
    path : "/browse",
    element : <Browse />
  },
  {
    path : "/profile",
    element : <Profile />
  },
  {
    path : "/admin/companies",
    element : <Companies />
  },
  {
    path : "/admin/companies/create",
    element : <CreateNewCompany />
  },
  {
    path : "/admin/companies/:id",
    element : <CompanySetup />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App

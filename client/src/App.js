import logo from './logo.svg';
import './App.css';
import { AuthContext } from './context/auth.context';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from './hooks/auth.hook';
import Main from './routes/main';
import Authorization from './components/authorization/authorization';
import Layout from './components/layout/layout';
import { AxiosProvider } from './context/request.context'




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
]);

function App() {


  const { authState, login } = useAuth();

  console.log(authState)



  return (

    <AuthContext.Provider value={{ authState, login }}>
      <AxiosProvider>
        {authState.authenticated ?
          <Layout>
            <RouterProvider router={router} />
          </Layout>
          :
          <Authorization></Authorization>
        }
      </AxiosProvider>
    </AuthContext.Provider >

    // <ApolloProvider client={client}>

    // </ApolloProvider>
  );
}

export default App;

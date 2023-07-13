
import React from 'react';
import './App.css';
import { AuthContext } from './context/auth.context';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { useAuth } from './hooks/auth.hook';
import Main from './routes/main';
import Auth from './routes/auth';
import Layout from './components/layout/layout';
import { AxiosProvider } from './context/request.context'
import useCssVariables from './hooks/cssVariables.hook'
import "./fontello/css/fontello.css"




const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
	},
]);

function App() {


	const { authState, login, logout } = useAuth();

	useCssVariables()




	return (
		<AuthContext.Provider value={{ authState, login, logout }}>
			<AxiosProvider>
				{authState.authenticated ?
					<Layout>
						<RouterProvider router={router} />
					</Layout>
					:

					<Auth></Auth>
				}
			</AxiosProvider>
		</AuthContext.Provider >
	);
}

export default App;

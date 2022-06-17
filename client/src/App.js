import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Books from "./components/Book/Books";

const App = () => {
	return (
		
		<div>
			<Routes>
				<Route path="/" exact  element={<Login />}  />
				<Route path="/books" element={localStorage.getItem("token") != null ? <Books /> : <Login />}/>
			</Routes>
		</div>
	)
}

export default App
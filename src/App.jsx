import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./view/client/Login";
import Main from "./view/client/Main";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Routes>
          <Route path='/'         element={ <Navigate to="/main" /> }/>
					<Route path="/login"    element={<Login/>}></Route>
					<Route path="/main/*"   element={<Main/>}></Route>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;

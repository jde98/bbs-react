import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./view/bbs/Login";
import Main from "./view/bbs/Main";


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

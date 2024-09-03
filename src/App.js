import Login from "./components/users/Login";
import Register from "./components/users/Register";
// import Index from "./components/Index";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/myspends" element={<Main/>}>
          </Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

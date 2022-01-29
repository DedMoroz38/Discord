import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import ProfilePage from './routes/ProfilePage/ProfilePage';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/Registration/RegistarationPage';
import PrivateRoute from './hocs/PrivateRoute';

function App() {
  return (
    <div className="app">
      <div className="app">
        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
          />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

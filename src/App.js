import { useEffect } from 'react';
import './assets/styles/App.css';
import Login from './pages/Auth/Login';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Message from './pages/Message/DisplayChats';
import DirectMessagePage from './pages/DirectMessage/DirectMessagePage';
import Search from './pages/Search/Search';
import Trending from './pages/Trending/Trending';
import Error from './pages/Error404/Error';
import { setLightMode, setDarkMode } from './utils/Functions';

function App() {
  const id = localStorage.getItem('id')

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark')
      setDarkMode()
    else
      setLightMode()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login user={id} />} />
        <Route element={<ProtectedRoute user={id} />}>
          <Route path="/" element={<Layout id={id} />} >
            <Route path="" element={<Navigate to="home" replace />} />
            <Route path="home" index element={<Home />} />
            <Route path="trending" element={<Trending />} />
            <Route path="message" element={<Message />} />
            <Route path="search" element={<Search />} />
            <Route path="dm/:username" element={<DirectMessagePage />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;

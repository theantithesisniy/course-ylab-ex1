import { Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../index.scss';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage.async';

function App() {
  return (
    <div className="App">
      <Link to='/'></Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={'/'} element={<AuthenticationPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

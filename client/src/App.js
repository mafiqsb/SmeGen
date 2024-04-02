import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Center from './Center';
import SignInWelcomeScreen from './Screens/Authentication_User/SignIn/SignInWelcomeScreen';
import SignUpWelcomeScreen from './Screens/Authentication_User/SignUp/SignUpWelcomeScreen';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicPage from './PublicFacing/PublicPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App ">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          limit={1}
          closeOnClick
          rtl={false}
        />
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="*" element={<Center />} />
          <Route path="/login" element={<SignInWelcomeScreen />} />
          <Route path="/register" element={<SignUpWelcomeScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

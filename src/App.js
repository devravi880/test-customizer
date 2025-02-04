import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/Sass/style.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { routes } from './Routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        {routes.map((item, index) => <Route key={index} path={item.path} element={item.element} />)}
      </Routes>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/Routes/routes';

function App() {
  return (
    <div className="">
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
    </div>
  );
}

export default App;

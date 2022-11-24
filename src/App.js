import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/Routes/routes';

function App() {
  return (
    <div className="container mx-auto">
        <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

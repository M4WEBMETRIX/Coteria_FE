import { Route, Routes } from 'react-router-dom';
import AllRoutes from './_routes';
import RouteErrorBoundary from './pages/authentications/error-boundary';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path='/*'
                    element={<AllRoutes />}
                    errorElement={<RouteErrorBoundary />}
                />
            </Routes>
        </>
    );
}

export default App;

import ReactDOM from 'react-dom/client'
import '@/shared/styles/index.scss'
import { Provider as StoreProvider} from 'react-redux';
import { RouterProvider } from "react-router-dom";
import { setupStore } from './providers/store';
import { setupRouter } from './providers/router';
import { AntProvider } from './providers/ant-design';

const store = setupStore()
const router = setupRouter()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className='app'>
        <AntProvider>
            <StoreProvider store={store}>
                    <RouterProvider router={router} />
            </StoreProvider>
        </AntProvider>
    </div>
);
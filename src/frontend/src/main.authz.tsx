import ReactDOM from 'react-dom/client';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthzProvider } from './hooks/useAuthzState';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <InternetIdentityProvider>
            <AuthzProvider>
                <App />
            </AuthzProvider>
        </InternetIdentityProvider>
    </QueryClientProvider>
);

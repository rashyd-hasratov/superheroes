import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { RouterProvider } from 'react-router-dom';

import { router } from './utils/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

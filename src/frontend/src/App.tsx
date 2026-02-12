import { useEffect } from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { seedAdmin } from './utils/seed';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import VideosPage from './pages/VideosPage';
import PortfolioPage from './pages/PortfolioPage';
import AdminPage from './pages/AdminPage';
import MyVideosPage from './pages/MyVideosPage';
import MyFilesPage from './pages/MyFilesPage';
import IntelusPage from './pages/IntelusPage';
import LivePage from './pages/LivePage';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';
import SectionRouteGuard from './components/routing/SectionRouteGuard';
import AppLayout from './components/layout/AppLayout';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

// Public routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});

// Protected routes with page-level guards
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <ProtectedRoute>
      <SectionRouteGuard pageId="home">
        <HomePage />
      </SectionRouteGuard>
    </ProtectedRoute>
  ),
});

const videosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/videos',
  component: () => (
    <ProtectedRoute>
      <SectionRouteGuard pageId="videos">
        <VideosPage />
      </SectionRouteGuard>
    </ProtectedRoute>
  ),
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio',
  component: () => (
    <ProtectedRoute>
      <SectionRouteGuard pageId="portfolio">
        <PortfolioPage />
      </SectionRouteGuard>
    </ProtectedRoute>
  ),
});

const intelusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/intelus',
  component: () => (
    <ProtectedRoute>
      <SectionRouteGuard pageId="intelus">
        <IntelusPage />
      </SectionRouteGuard>
    </ProtectedRoute>
  ),
});

const liveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/live',
  component: () => (
    <ProtectedRoute>
      <SectionRouteGuard pageId="live">
        <LivePage />
      </SectionRouteGuard>
    </ProtectedRoute>
  ),
});

const myVideosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-videos',
  component: () => (
    <ProtectedRoute>
      <SectionRouteGuard pageId="myVideos">
        <MyVideosPage />
      </SectionRouteGuard>
    </ProtectedRoute>
  ),
});

const myFilesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-files',
  component: () => (
    <ProtectedRoute>
      <SectionRouteGuard pageId="myFiles">
        <MyFilesPage />
      </SectionRouteGuard>
    </ProtectedRoute>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <ProtectedRoute>
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  homeRoute,
  videosRoute,
  portfolioRoute,
  intelusRoute,
  liveRoute,
  myVideosRoute,
  myFilesRoute,
  adminRoute,
]);

const router = createRouter({ routeTree, defaultPreload: 'intent' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  useEffect(() => {
    seedAdmin();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

// File: App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CustomErrorBoundary from './components/CustomErrorBoundary';
import camelCaseToKebabCase from './utils/camelCaseToKebabCase';

const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });

const routes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes('$') ? fileName.replace('$', ':') : fileName.replace(/\/index/, '');
  console.log(normalizedPathName);

  // Generate the path using camelCaseToKebabCase
  const pathName = fileName === 'Home' ? '/' : `/${camelCaseToKebabCase(normalizedPathName)}`;
  
  routes.push({
    path: pathName,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: CustomErrorBoundary,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

const App = () => {
  return (
    <div className="app grid grid-cols-4">
      <Sidebar />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
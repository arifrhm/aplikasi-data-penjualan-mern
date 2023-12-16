
import React from 'react';

const CustomErrorBoundary = () => {
  return (
    <div class="container mx-auto px-4 py-16 min-h-screen text-center">
      <h1 class="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p class="text-lg leading-relaxed mb-8">We're sorry, but we couldn't find the page you were looking for.</p>
      <div class="flex justify-center space-x-4">
        <a href="/" class="btn btn-primary">Go to homepage</a>
      </div>
    </div>
  );
};

export default CustomErrorBoundary;
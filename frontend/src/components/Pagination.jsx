import React from 'react';

const Pagination = () => {
  return (
<div class="container flex justify-center">
  <div class="join pt-5">
    <button class="join-item btn">1</button>
    <button class="join-item btn">2</button>
    <button class="join-item btn btn-disabled">...</button>
    <button class="join-item btn">99</button>
    <button class="join-item btn">100</button>
  </div>
</div>
  );
};

export default Pagination;

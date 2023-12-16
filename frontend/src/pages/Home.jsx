import React from 'react';

const Home = () => {
    
    return (
        <div className='col-start-2 col-span-4 pl-12 pt-10 place-items-stretch'>
            <p class="text-lg font-bold h-16 pl-3">Home</p>
            <div className="stats stats-vertical lg:stats-horizontal shadow col-start-3 col-span-2">
                <div className="stat">
                    <div className="stat-title">Items</div>
                    <div className="stat-value">7</div>
                    <div className="stat-desc">400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Transactions</div>
                    <div className="stat-value">7</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
            </div>
        </div>
    );
};

export default Home;

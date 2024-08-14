/** @format */

import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<main>
			<div className=' gap-6 text-center p-10'>
			<h1 className="text-5xl font-bold text-white mb-6 animate-bounce">Welcome to the Destination Diaries Platform</h1>
			<p className="text-xl text-white mb-4">Discover amazing stories and insights from our community.</p>
				</div>

			<div className=''>
			<Header />
			
			<Outlet />
			<footer className="text-center text-white mt-10">
          <p>&copy; 2024 Travel Blog Platform. All Rights Reserved. Owned by SIVARAM'S corporation</p>
          <p>Contact: contact@travelblogplatform.com</p>
        </footer>
			</div>
		</main>
	);
}

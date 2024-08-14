/** @format */

import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';

export default function Header() {
	const { setUserInfo, userInfo } = useContext(UserContext);

	useEffect(() => {
		fetch('http://localhost:4000/profile', {
			credentials: 'include',
		})
			.then((response) => response.json())
			.then((userInfo) => {
				setUserInfo(userInfo);
			});
	}, [setUserInfo]);

	function logout() {
		fetch('http://localhost:4000/logout', {
			credentials: 'include',
			method: 'POST',
		});
		setUserInfo(null);
	}

	const username = userInfo?.username;
	

	return (
		
		<header className="bg-white shadow-md rounded-full p-2 ">
			
			<Link
				to="/"
				className="text-2xl px-28 font-bold text-blue-600 hover:text-blue-800 transition-colors"
			>
				MyBlog
			</Link>
			<nav className="flex items-center space-x-6 ">
				{username ? (
					<>
						<Link
							to="/create"
							className="font-semibold text-2xl  text-gray-800 hover:text-blue-600 transition-colors"
						>
							NewPost
						</Link>
						<button
							onClick={logout}
							className="text-xl ps-10 pe-10 font-semibold bg-black hover:bg-gradient-to-tr bg-blue-500 from-green-500 hover:text-white transition-colors px-4 py-2 rounded-full"
						>
							Logout ({username})
						</button>
					</>
				) : (
					<>
						<Link
							to="/login"
							className="text-xl font-semibold text-gray-700 hover:text-blue-600 transition-colors"
						>
							Login
						</Link>
						<Link
							to="/register"
							className="text-xl font-semibold text-gray-700 hover:text-blue-600 transition-colors"
						>
							Register
						</Link>

						
					</>
					
				)}
			</nav>
		</header>
	);
}

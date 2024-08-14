import Post from '../Post';
import { useEffect, useState } from 'react';

export default function IndexPage() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(6);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('http://localhost:4000/post');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setPosts(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	// Filter posts based on search query
	const filteredPosts = posts.filter(post =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
		post.content.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Pagination logic
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="index-page container mx-auto px-4 py-8 bg-gray-100 rounded-lg">
			<h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Latest Posts</h1>

			<div className="mb-6 flex justify-center">
				<input
					type="text"
					placeholder="Search posts..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
				/>
			</div>

			{loading ? (
				<div className="flex justify-center items-center h-48">
					<svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
					</svg>
				</div>
			) : error ? (
				<div className="text-center text-red-600">
					<p>Error: {error}</p>
				</div>
			) : (
				<>
					<div className="p-6">
						<div className="px-4 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white rounded-xl shadow-md">
							{currentPosts.length > 0 ? (
								currentPosts.map((post) => (
									<Post key={post._id} {...post} />
								))
							) : (
								<div className="text-center col-span-3">
									<p className="text-gray-600">No posts found</p>
								</div>
							)}
						</div>
					</div>

					{/* Pagination */}
					<div className="flex justify-center mt-6">
						{[...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys()].map((number) => (
							<button
								key={number + 1}
								onClick={() => paginate(number + 1)}
								className={`mx-1 px-4 py-2 rounded-lg ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'} transition-colors`}
							>
								{number + 1}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}

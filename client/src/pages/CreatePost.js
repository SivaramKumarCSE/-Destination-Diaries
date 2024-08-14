import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
	const [title, setTitle] = useState('');
	const [summary, setSummary] = useState('');
	const [content, setContent] = useState('');
	const [files, setFiles] = useState('');
	const [redirect, setRedirect] = useState(false);

	async function createNewPost(ev) {
		ev.preventDefault();

		const data = new FormData();
		data.set('title', title);
		data.set('summary', summary);
		data.set('content', content);
		data.set('file', files[0]);

		const response = await fetch('http://localhost:4000/post', {
			method: 'POST',
			body: data,
			credentials: 'include',
		});

		if (response.ok) {
			setRedirect(true);
		}
	}

	if (redirect) {
		return <Navigate to="/" />;
	}

	return (
		<form
			onSubmit={createNewPost}
			className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg space-y-6"
		>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(ev) => setTitle(ev.target.value)}
				className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
			/>
			<input
				type="text"
				placeholder="Summary"
				value={summary}
				onChange={(ev) => setSummary(ev.target.value)}
				className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
			/>
			<input
				type="file"
				onChange={(ev) => setFiles(ev.target.files)}
				className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
			/>
			<Editor
				value={content}
				onChange={setContent}
				className="w-full p-3 border border-gray-300 rounded-lg"
			/>
			<button
				type="submit"
				className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition-colors"
				style={{ marginTop: '5px' }}
			>
				Create Post
			</button>
		</form>
	);
}

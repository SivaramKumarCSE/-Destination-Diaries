import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author,
}) {
  return (
    <div className=' bg-white rounded-lg shadow-lg overflow-hidden mb-10 transform transition-all hover:-translate-y-2 hover:shadow-2xl w-96'>
      <div className='p-6 text-center'>
        <Link to={`/post/${_id}`}>
          <h2 className='text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors duration-200 mb-4'>
            {title}
          </h2>
        </Link>
      </div>
      <div className='flex justify-center mb-4'>
        <Link to={`/post/${_id}`}>
          <img
            src={'http://localhost:4000/' + cover}
            alt={title}
            className='w-96 h-96 object-cover rounded-2xl p-3 shadow-md hover:scale-105 transition-transform duration-300 ease-in-out'
          />
        </Link>
      </div>
      <div className='texts p-6 text-center'>
        <p className='info text-gray-600 text-sm flex items-center justify-center space-x-4 mb-4'>
          <span className='author font-bold text-purple-500'>{author.username}</span>
          <time className='italic'>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className=' text-gray-700 leading-relaxed mb-6'>
          {summary}
        </p>
        <div>
          <Link
            to={`/post/${_id}`}
            className='inline-block bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors duration-200'
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
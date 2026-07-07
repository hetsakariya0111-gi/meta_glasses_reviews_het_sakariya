import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='min-h-[calc(100vh-80px)] bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
      <div className='container mx-auto px-4 py-20'>
        <div className='max-w-5xl mx-auto text-center'>
          <div className='inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6'>
            ✨ Discover Real User Experiences
          </div>
          <h1 className='text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight'>
            Find Your Perfect{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
              Meta Glasses
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto'>
            Join thousands of users sharing honest reviews, ratings, and experiences with Meta's AR/VR products
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16'>
            <Link
              to='/reviews'
              className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl text-xl font-semibold shadow-lg shadow-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200'
            >
              Explore Reviews
            </Link>
            <Link
              to='/register'
              className='bg-white text-gray-900 border-2 border-gray-200 px-10 py-4 rounded-xl text-xl font-semibold hover:border-blue-300 hover:bg-blue-50 hover:-translate-y-1 transition-all duration-200'
            >
              Get Started Free
            </Link>
          </div>
          
          {/* Stats Section */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto'>
            <div className='bg-white p-6 rounded-2xl shadow-md'>
              <div className='text-4xl font-bold text-blue-600 mb-1'>10k+</div>
              <div className='text-gray-500 font-medium'>Reviews</div>
            </div>
            <div className='bg-white p-6 rounded-2xl shadow-md'>
              <div className='text-4xl font-bold text-purple-600 mb-1'>500+</div>
              <div className='text-gray-500 font-medium'>Users</div>
            </div>
            <div className='bg-white p-6 rounded-2xl shadow-md'>
              <div className='text-4xl font-bold text-green-600 mb-1'>4.8</div>
              <div className='text-gray-500 font-medium'>Avg Rating</div>
            </div>
            <div className='bg-white p-6 rounded-2xl shadow-md'>
              <div className='text-4xl font-bold text-orange-600 mb-1'>24/7</div>
              <div className='text-gray-500 font-medium'>Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

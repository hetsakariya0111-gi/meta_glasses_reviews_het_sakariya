import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMessageSquare, FiUsers, FiStar, FiCpu, FiVideo, FiMic, FiRadio, FiArrowRight } from 'react-icons/fi'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const features = [
    {
      icon: <FiVideo className="w-6 h-6 text-purple-400" />,
      title: "Ultra-wide 12MP Camera",
      description: "High-quality video and photo capture from a unique first-person perspective."
    },
    {
      icon: <FiMic className="w-6 h-6 text-purple-400" />,
      title: "Open-Ear Audio",
      description: "Custom speakers built into the frames offer immersive sound without blocking your ears."
    },
    {
      icon: <FiCpu className="w-6 h-6 text-purple-400" />,
      title: "Meta AI Voice Control",
      description: "Ask questions, write messages, and control settings hands-free with your voice."
    },
    {
      icon: <FiRadio className="w-6 h-6 text-purple-400" />,
      title: "Seamless Live Streaming",
      description: "Stream directly to Instagram and Facebook to share moments instantly."
    }
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-950 text-white relative overflow-hidden flex flex-col justify-between">
      {/* Glowing background highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 flex-grow flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full text-xs font-semibold mb-6 tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            DISCOVER REAL USER EXPERIENCES
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Find Your Perfect{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              Meta Glasses
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of smart eyewear enthusiasts sharing honest, verified reviews and analytical ratings for Meta's AR/VR & smart glasses line.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
          >
            <Link
              to="/reviews"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-base font-semibold shadow-lg shadow-purple-500/15 hover:shadow-purple-500/25 transition-all hover:scale-102 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Explore Reviews
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-gray-200 border border-white/10 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:scale-102 flex items-center justify-center"
            >
              Get Started Free
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-28"
          >
            {[
              { label: 'Reviews', value: '10k+', icon: <FiMessageSquare className="w-5 h-5 text-purple-400" />, color: 'from-purple-500/20 to-transparent' },
              { label: 'Users', value: '500+', icon: <FiUsers className="w-5 h-5 text-indigo-400" />, color: 'from-indigo-500/20 to-transparent' },
              { label: 'Avg Rating', value: '4.8', icon: <FiStar className="w-5 h-5 text-pink-400" />, color: 'from-pink-500/20 to-transparent' },
              { label: 'AI Support', value: '24/7', icon: <FiCpu className="w-5 h-5 text-violet-400" />, color: 'from-violet-500/20 to-transparent' },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
              >
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${stat.color} opacity-40 blur-lg rounded-full`} />
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-extrabold text-white mb-0.5 tracking-tight">{stat.value}</div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="border-t border-white/5 pt-20">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white mb-12">
              Next-Gen Wearable Innovation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl hover:border-purple-500/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                      {feat.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer minimal info */}
      <div className="border-t border-white/5 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Meta Glasses Reviews App. Powered by React & Tailwind.
      </div>
    </div>
  )
}

export default Home

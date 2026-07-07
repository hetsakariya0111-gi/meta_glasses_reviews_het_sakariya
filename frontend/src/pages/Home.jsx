import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageSquare, Users, Star, Cpu, Video, Mic, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  }

  const features = [
    {
      icon: <Video className="w-5 h-5 text-blue-500" />,
      title: "Ultra-wide 12MP Capture",
      description: "First-person perspective photo and video capture designed for hands-free live streaming."
    },
    {
      icon: <Mic className="w-5 h-5 text-blue-500" />,
      title: "Open-Ear Custom Sound",
      description: "Discreet directional speakers integrated into structural frames for premium sound."
    },
    {
      icon: <Cpu className="w-5 h-5 text-blue-500" />,
      title: "AI Voice Assistants",
      description: "Instant voice answers and hands-free communications powered by Meta's Llama models."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      title: "Real-time Metrics Feed",
      description: "Live telemetry dashboard analyzing user sentiments, rating indexes, and active feedback."
    }
  ]

  const steps = [
    { number: "01", title: "Write a Review", desc: "Share your unedited real-world experience, audio test logs, and camera evaluations." },
    { number: "02", title: "Verify Purchase", desc: "Attach purchase metadata to achieve verified developer badge rankings on review feeds." },
    { number: "03", title: "Explore Analytics", desc: "Access Recharts interactive bar, pie, and timeline charts representing all consumer reviews." }
  ]

  const testimonials = [
    { quote: "Meta Ray-Ban smart glasses completely transformed how I capture walk-throughs. This platform has the best reviews to read before buying.", author: "Sarah Jenkins", role: "Vercel Dev Advocate" },
    { quote: "The Open-Ear Audio review breakdowns here were spot-on. Highly recommend this analytics dashboard to anyone researching wearables.", author: "Marcus Chen", role: "Product Engineer, Linear" }
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090B] text-[#FAFAFA] relative overflow-hidden flex flex-col justify-between">
      {/* Background radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[500px] bg-gradient-to-b from-blue-900/10 via-transparent to-transparent blur-[120px] pointer-events-none" />

      {/* Hero section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10 flex-grow flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-semibold mb-8 tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Verified Ray-Ban Review Index
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#FAFAFA] mb-8 leading-[1.05]"
          >
            A SaaS Review Center for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">
              Meta Smart Glasses
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-[#A1A1AA] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            A minimal, metrics-driven portal aggregating real-world reviews, developer analytics, and smart audio ratings for Meta Ray-Ban glasses.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
          >
            <Link
              to="/reviews"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-900/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer"
            >
              Explore Reviews
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto bg-[#111113] hover:bg-[#18181B] text-[#FAFAFA] border border-white/10 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
            >
              Get Started Free
            </Link>
          </motion.div>

          {/* Trusted by Developers */}
          <motion.div variants={itemVariants} className="mb-24">
            <p className="text-xs font-semibold text-[#A1A1AA] tracking-wider uppercase mb-6">TRUSTED BY DEVELOPERS AT</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-[#A1A1AA]/40 font-display font-bold text-lg select-none">
              <span>STRIPE</span>
              <span>LINEAR</span>
              <span>VERCEL</span>
              <span>NOTION</span>
              <span>RAYCAST</span>
            </div>
          </motion.div>

          {/* Statistics board */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-32"
          >
            {[
              { label: 'Reviews', value: '1,240', icon: <MessageSquare className="w-4 h-4 text-blue-500" /> },
              { label: 'Verified Users', value: '540', icon: <Users className="w-4 h-4 text-blue-500" /> },
              { label: 'Avg Rating', value: '4.7', icon: <Star className="w-4 h-4 text-blue-500" /> },
              { label: 'Helpful Votes', value: '98%', icon: <ShieldCheck className="w-4 h-4 text-blue-500" /> },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-[#18181B] border border-white/[0.08] p-6 rounded-2xl text-left relative overflow-hidden group hover:border-white/15 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-[#A1A1AA]">{stat.label}</div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">{stat.value}</div>
              </div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="border-t border-white/[0.08] pt-20 mb-32 text-left">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#FAFAFA] mb-4 text-center">
              Next-Gen Smart Eyewear Innovation
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base text-center max-w-xl mx-auto mb-16">
              Evaluating the structural, optical, and acoustic feedback shared by actual software engineers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-[#18181B] border border-white/[0.08] p-6 rounded-2xl hover:border-white/15 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                      {feat.icon}
                    </div>
                    <h3 className="text-base font-bold text-[#FAFAFA] mb-2">{feat.title}</h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How it works */}
          <motion.div variants={itemVariants} className="border-t border-white/[0.08] pt-20 mb-32 text-left">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#FAFAFA] mb-4 text-center">
              How the Index Operates
            </h2>
            <p className="text-[#A1A1AA] text-sm text-center max-w-md mx-auto mb-16">
              A transparent reviews lifecycle validating real user metrics on every submission.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative group">
                  <div className="text-4xl font-extrabold text-blue-500/20 mb-4 font-display group-hover:text-blue-500/30 transition-colors">{step.number}</div>
                  <h3 className="text-base font-bold text-[#FAFAFA] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={itemVariants} className="border-t border-white/[0.08] pt-20 mb-32 text-left">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#FAFAFA] mb-12 text-center">
              Developer Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((test, i) => (
                <div key={i} className="bg-[#18181B] border border-white/[0.08] p-8 rounded-2xl relative">
                  <p className="text-[#FAFAFA] text-base leading-relaxed mb-6">"{test.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
                      {test.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#FAFAFA]">{test.author}</div>
                      <div className="text-xs text-[#A1A1AA]">{test.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            variants={itemVariants}
            className="bg-[#18181B] border border-white/[0.08] p-12 rounded-3xl text-center relative overflow-hidden mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />
            <h2 className="font-display text-3xl font-extrabold mb-4 text-[#FAFAFA]">Review Analytics Platform</h2>
            <p className="text-[#A1A1AA] text-sm max-w-md mx-auto mb-8">
              Join our user indexing portal and inspect aggregate sentiment trends for your Ray-Ban glasses today.
            </p>
            <Link
              to="/register"
              className="inline-flex bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl text-sm font-semibold shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              Get Started Now
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer minimal info */}
      <div className="border-t border-white/[0.08] py-8 text-center text-xs text-[#A1A1AA]">
        © {new Date().getFullYear()} Meta Glasses Reviews App. Powered by React, Vite and Tailwind.
      </div>
    </div>
  )
}

export default Home

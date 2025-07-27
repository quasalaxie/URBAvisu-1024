import { motion } from 'framer-motion';
import { FaPlay, FaUsers, FaGlobe, FaFilm, FaTv, FaLinkedin, FaGithub } from 'react-icons/fa';

const About = () => {
  const stats = [
    { icon: FaUsers, value: '50M+', label: 'Happy Viewers', description: 'Active subscribers worldwide' },
    { icon: FaFilm, value: '100K+', label: 'Movies & Shows', description: 'Hours of entertainment' },
    { icon: FaGlobe, value: '190+', label: 'Countries', description: 'Global availability' }
  ];

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay loop muted className="absolute w-full h-full object-cover opacity-40">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-people-watching-a-movie-at-home-4809-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white">About StreamFlix</h1>
              <p className="text-xl text-white">
                Your premier destination for unlimited entertainment. We bring you the best movies, TV shows, and documentaries from around the world.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gradient-to-b from-black to-[#141414]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Meet Our Leadership</h2>
            <p className="text-xl text-white">The visionaries behind StreamFlix</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gray-850 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src="https://instagram.famd1-1.fna.fbcdn.net/v/t51.2885-19/433821944_1074658117174778_5744776889752806626_n.jpg?_nc_ht=instagram.famd1-1.fna.fbcdn.net&_nc_cat=102&_nc_oc=Q6cZ2AFyvE7Z1GltmKvUvKl9n-AGNkcW4ALSLp7XlRZH04Du78Z9pwJgb2dws5DUPiJg-Jox7qZOXEfRu-7wiTn4NN0O&_nc_ohc=fdo6AEOXo0UQ7kNvgEl-s5t&_nc_gid=e3f4a4e210464576a4863d4a2955c958&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYD_jT-7a2Gz7nSfE25HDomrRoI9togAoOXnYQ72qM79yA&oe=67C7CB1B&_nc_sid=7a9f4b"
                  alt="Sushant Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-2/3">
                <h3 className="text-2xl font-bold mb-2 text-white">Sushant Sharma</h3>
                <p className="text-primary font-semibold mb-4">CEO & Founder</p>
                <p className="text-white mb-6">
                  Student at Vellore Institute of Technology | Full Stack Developer | Cyber Security Enthusiast | Technical Content Writer
                </p>
                <div className="space-y-3 text-white">
                  <p>🎓 B.Tech in Computer Science & Engineering</p>
                  <p>💼 Technical Content Writer at GeeksforGeeks</p>
                  <p>🚀 Passionate about Web Development & Cyber Security</p>
                </div>
                <div className="mt-6 flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/sharmasushant2310/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/90 transition-colors"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/90 transition-colors"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-850 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300"
              >
                <stat.icon className="text-primary text-4xl mb-4 mx-auto" />
                <h2 className="text-4xl font-bold mb-2 text-white">{stat.value}</h2>
                <h3 className="text-xl font-semibold mb-2 text-white">{stat.label}</h3>
                <p className="text-white">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gradient-to-b from-black to-[#141414]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-xl text-white mb-8">
              To revolutionize the way people consume entertainment by providing high-quality content and an exceptional streaming experience.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-white rounded-lg font-medium text-lg inline-flex items-center"
            >
              <FaPlay className="mr-2" /> Start Watching
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
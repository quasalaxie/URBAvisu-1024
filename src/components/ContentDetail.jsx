// Update the cast section in ContentDetail.jsx

{/* Cast & Crew */}
<section>
  <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
    {content.cast.map((actor, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        className="bg-gray-850 rounded-lg overflow-hidden group cursor-pointer"
      >
        <div className="aspect-[2/3] relative">
          <img
            src={actor.image}
            alt={actor.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-4">
          <h4 className="font-medium">{actor.name}</h4>
          <p className="text-sm text-gray-400">{actor.role}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/* Gallery Section */}
<section className="mt-12">
  <h2 className="text-2xl font-bold mb-6">Gallery</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {content.gallery.map((image, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.02 }}
        className="aspect-video rounded-lg overflow-hidden"
      >
        <img
          src={image}
          alt={`Gallery image ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </motion.div>
    ))}
  </div>
</section>

{/* Behind the Scenes */}
<section className="mt-12">
  <h2 className="text-2xl font-bold mb-6">Behind the Scenes</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {content.behindTheScenes.map((image, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.02 }}
        className="aspect-video rounded-lg overflow-hidden"
      >
        <img
          src={image}
          alt={`Behind the scenes ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </motion.div>
    ))}
  </div>
</section>

{/* Episodes Section with Thumbnails */}
{content.episodes && (
  <section className="bg-gray-850 rounded-lg overflow-hidden mt-12">
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Episodes</h2>
      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        {[...Array(content.seasons)].map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedSeason(index + 1)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedSeason === index + 1
                ? 'bg-primary text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Season {index + 1}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {content.episodes?.map((episode, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer group"
          >
            <div className="flex">
              <div className="w-48 h-28 relative flex-shrink-0">
                <img
                  src={episode.thumbnail}
                  alt={episode.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaPlay className="text-2xl" />
                </div>
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">
                    {episode.episode}. {episode.title}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {episode.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  {episode.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)}
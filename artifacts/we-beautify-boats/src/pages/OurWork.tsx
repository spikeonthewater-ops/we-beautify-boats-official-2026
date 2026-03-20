import { motion } from "framer-motion";

const GALLERY = [
  {
    title: "Cruisers 28",
    desc: "A boat for sale needed a spring cleaning. Full interior detail prepped at Bronte Outer Harbor.",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", // stock boat interior/exterior
  },
  {
    title: "Chaparral 31 LOA",
    desc: "Complete detailing for market prep. 'Just want it cleaned, nothing fancy' turned into a showroom finish.",
    img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80", // stock boat exterior
  },
  {
    title: "Teak Restoration",
    desc: "Transom step-through of a sailing yacht with freshly oiled teak and polished gelcoat.",
    img: "https://images.unsplash.com/photo-1520255870062-bd79d3865de7?w=800&q=80", // stock teak/deck
  },
  {
    title: "Hull Polish",
    desc: "The bow of a beautifully polished powerboat reflecting the clouds perfectly.",
    img: "https://images.unsplash.com/photo-1621277225134-8c8f000b21a3?w=800&q=80", // stock shiny hull
  }
];

export default function OurWork() {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-marine-900 mb-6"
          >
            Our Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            At We Beautify Boats, we specialize in premium yacht detailing, bringing every inch of your vessel back to its prime. 
            Using advanced tools and eco-friendly products, we ensure your yacht shines from bow to stern.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="group relative rounded-3xl overflow-hidden shadow-xl aspect-square md:aspect-[4/3] bg-marine-900"
            >
              {/* stock boat detailing images */}
              <img 
                src={item.img} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-marine-900 via-marine-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a
            href="https://www.webeautifyboats.com/book-spike"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-8 py-4 rounded-full bg-marine-900 hover:bg-cyan-500 text-white font-bold text-lg transition-colors shadow-lg"
          >
            Book Your Transformation
          </a>
        </div>

      </div>
    </div>
  );
}

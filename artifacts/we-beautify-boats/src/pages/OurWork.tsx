import { motion } from "framer-motion";
import { MapPin, Youtube, ChevronRight } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import PageMeta from "@/components/PageMeta";

const fadeIn = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

/* ─────────────────────────────────────────────────────
   8 FEATURED PROJECTS  (numbered on the Wix page)
───────────────────────────────────────────────────── */
const FEATURED = [
  {
    num: "01",
    title: "Cruisers 28",
    location: "Bronte Outer Harbour, Oakville",
    locationUrl: "https://marinas.com/view/marina/63c4xx_Bronte_Outer_Harbour_Marina_Oakville_ON_Canada",
    quote: "A boat for sale needed a spring cleaning in September. It was decided to do the interior only to our chagrin — boats for sale can and should be completely detailed when prepped for sale.",
    services: ["Interior Detail Level 3"],
    youtubeUrl: "https://youtu.be/ksqDCsuGey4?si=aHzAOrqBSyLI0oFX",
    img: "https://static.wixstatic.com/media/2836bb_bd91226f0e15437e8c76bb5f1d739fe9~mv2.jpg",
    imgAlt: "Freshly vacuumed carpeted stairs inside a Cruisers 28, fibers showing deep-clean lines",
  },
  {
    num: "02",
    title: "Chaparral 31 LOA",
    location: "Oakville Power Boat Club",
    locationUrl: "https://oakvillepowerboatclub.com/",
    quote: "What are your goals for your boat this season? Just would like to have it cleaned, nothing fancy. Putting boat on market after this weekend.",
    services: ["Interior Detail Level 2", "Brightwork Polishing"],
    youtubeUrl: "https://youtu.be/8WYw88kGCsw?si=h7Vmbqz5gW9vx_Jn",
    img: "https://static.wixstatic.com/media/2836bb_f182413e2cd44a25847511f71a7c6ea7~mv2.jpg",
    imgAlt: "Professional polishing machine with wool pad and compound bar ready for boat exterior work",
  },
  {
    num: "03",
    title: "Cobalt 32",
    location: "Bronte Outer Harbour, Oakville",
    locationUrl: "https://marinas.com/view/marina/63c4xx_Bronte_Outer_Harbour_Marina_Oakville_ON_Canada",
    quote: "I need my Cobalt 302 unwrapped and cleaned. Delivered from Idaho and we got the first look.",
    services: ["Interior Detail Level 3", "Full Exterior Wash"],
    youtubeUrl: "https://youtu.be/v6QZejeOgOs?si=H3PXLA2O5lTMmrbN",
    img: "https://static.wixstatic.com/media/2836bb_126a416cfb57488cb1ba18a38e8c37b0~mv2.jpg",
    imgAlt: "Blue extraction hose cleaning boat interior carpet, wooden cabinets visible in background",
  },
  {
    num: "04",
    title: "Carver 34 LOA",
    location: "Toronto Island Marina",
    locationUrl: "https://torontoislandmarina.com/",
    quote: "Decks, bridge and especially canvas needs deep cleaning. Interior down to bilges and mechanical room needs steam, enzyme and ozone treatment to eliminate and abate mold stains from carpets and compartments.",
    services: ["Deck Wash", "Canvas Cleaning", "Interior Level 4 — Bilge & Mold"],
    youtubeUrl: "https://youtu.be/0metoWdMBTE?si=Ea2Lm5QjcTNW-o6t",
    img: "https://static.wixstatic.com/media/ce0863_525cad2626af46a89ab59bb6e505b6ed~mv2.jpg",
    imgAlt: "Carver 34 LOA being detailed at marina",
  },
  {
    num: "05",
    title: "C&C 33",
    location: "Bayfield Marina, ON",
    locationUrl: "https://www.bayfieldmarina.ca/",
    quote: "Recently bought a C&C 33 and it's in need of a good cleaning & bottom paint. I am in Sarnia and the boat is in Bayfield. Just wondering if there is anything you can do for me?",
    services: ["Full Interior Clean", "Antifouling / Bottom Prep"],
    youtubeUrl: "",
    img: "https://static.wixstatic.com/media/2836bb_546af758e13c4266bba885a44b4d2a8a~mv2.jpg",
    imgAlt: "Fresh antifouling application on C&C 33 keel area, smooth protective coating visible",
  },
  {
    num: "06",
    title: "Monterrey 33",
    location: "Harley, Ontario",
    locationUrl: "https://en.wikipedia.org/wiki/Harley,_Ontario",
    quote: "Would you come out to Harley, ON? The black gelcoat is not anymore and I've heard you are the best.",
    services: ["Deck Polish Level 5", "Wet Sanding Spots"],
    youtubeUrl: "",
    img: "https://static.wixstatic.com/media/2836bb_d72bee464e9f49f883fce542d3a685d3~mv2.jpg",
    imgAlt: "Vivid blue hull reflection with orange waterline stripe after wet sanding and polishing",
  },
  {
    num: "07",
    title: "Cobalt 23",
    location: "Aurora, Ontario",
    locationUrl: "https://en.wikipedia.org/wiki/Aurora,_Ontario",
    quote: "She is perfect except for the deep scratches from getting hit by an idiot. Please buff them out!",
    services: ["Wet Sanding Spots", "Deck Polish"],
    youtubeUrl: "",
    img: "https://static.wixstatic.com/media/2836bb_621118eb211e48018ed1cee14dc6c2a7~mv2.jpg",
    imgAlt: "Person in sunglasses inspecting mirror-like polished boat surface with reflection showing",
  },
  {
    num: "08",
    title: "Catalina 470",
    location: "Whitby, Ontario",
    locationUrl: "https://en.wikipedia.org/wiki/Whitby,_Ontario",
    quote: "I'd like to have the family on board for a couple weeks but it has not been opened up for a couple years. Maybe mold??",
    services: ["Interior Detail Level 4", "Mold Remediation", "Ozone Treatment"],
    youtubeUrl: "",
    img: "https://static.wixstatic.com/media/2836bb_2f19603e14724fbab3f6a0372587834a~mv2.jpeg",
    imgAlt: "Yacht ceiling light fixture with visible mold — before state requiring deep cleaning service",
  },
];

/* ─────────────────────────────────────────────────────
   NOTABLE FLEET  ("Some Boats We Beautified")
───────────────────────────────────────────────────── */
const FLEET = [
  {
    name: "2024 Axopar 37",
    services: "Delivery detail · Weekly interior & exterior wash",
    img: "https://static.wixstatic.com/media/2836bb_0d213d66f2b44f0fa2f01aed9141a6dd~mv2.jpeg",
    imgAlt: "Pristine white Axopar 37 yacht docked at marina, gleaming polished hull reflecting sunlight",
  },
  {
    name: "C&C 121",
    services: "Interior Detail",
    img: "https://static.wixstatic.com/media/2836bb_62ab667d8d2d4e3191c05d85f3f0ec8e~mv2.jpeg",
    imgAlt: "Interior of C&C 121 yacht with We Beautify Boats equipment on polished wooden floors",
  },
  {
    name: "Azimut 55 Fly",
    services: "Delivery detail · Deck Polish · Hull Wash",
    img: "https://static.wixstatic.com/media/2836bb_a49f5c01f9d5478386227c940b82d74f~mv2.jpeg",
    imgAlt: "Close-up of luxury Azimut 55 Fly yacht with polished surfaces reflecting sky and greenery",
  },
  {
    name: "Sundancer 60",
    services: "Cockpit wood refinished · Deck & hull polish",
    img: "https://static.wixstatic.com/media/2836bb_40d7761281be48a3895f7e6900640be2~mv2.jpeg",
    imgAlt: "Beautifully polished teak deck on Sundancer 60 with glossy reflective finish",
  },
  {
    name: "Four Winns 28",
    services: "Hull Polish",
    img: "https://static.wixstatic.com/media/2836bb_4c22ad20c5204d628674f318e0ac836c~mv2.jpeg",
    imgAlt: "Rear view of black and red Four Winns 28 motorboat on trailer, glossy polished exterior",
  },
  {
    name: "2020 Dufour 530",
    services: "Deck Wash · Interior Detail",
    img: "https://static.wixstatic.com/media/2836bb_347d389285724b8a97c11b23a6680ee9~mv2.jpg",
    imgAlt: "Dufour 530 sailboat cockpit with dual wheels and clean polished teak deck under canopy",
  },
  {
    name: "Zodiac",
    services: "Bottom cleaning · Deck polish",
    img: "https://static.wixstatic.com/media/2836bb_08d61665f9274f75a98d7baec7899a88~mv2.jpeg",
    imgAlt: "View from helm of red inflatable Zodiac docked with CN Tower Toronto skyline in background",
  },
  {
    name: "1988 Tayana 37",
    services: "Deck Wash · Hull Wash · Interior Detail",
    img: "https://static.wixstatic.com/media/2836bb_47a34fe24453404a807179b0044906c4~mv2.jpeg",
    imgAlt: "Close-up of polished Tayana engraved wooden panel aboard yacht with smooth glossy finish",
  },
  {
    name: "Cruisers 370",
    services: "Deck Wash",
    img: "https://static.wixstatic.com/media/2836bb_2e9ba78df4a84e6fa40ba9fef85a3d3c~mv2.jpeg",
    imgAlt: "White Cruisers 370 yacht docked at marina with person performing maintenance on deck",
  },
];

/* ─────────────────────────────────────────────────────
   FROM THE FIELD  ("Other Boats We Beautified")
───────────────────────────────────────────────────── */
const FIELD = [
  {
    name: "Bentley 23 LOA",
    story: "Pontoon polishing is painful but with our purpose paid for, we get r done!",
    img: "https://static.wixstatic.com/media/2836bb_d94e869d7a314bf1bbec59445a6a5879~mv2.jpeg",
    imgAlt: "Pontoon boat on trailer with aluminum pontoons freshly polished to a reflective shine",
  },
  {
    name: "1986 Mirage 35",
    story: "Owner refinished all the wood and left us all the duct and cushions to clean up.",
    img: "https://static.wixstatic.com/media/2836bb_e15b34dd6d30486ca8aa4e49443903ce~mv2.jpeg",
    imgAlt: "Yacht interior with polished wooden floors and cozy seating after thorough detailing service",
  },
  {
    name: "Para Marine 33",
    story: "2× tank failures — first diesel then grey water. 2 visits. 2 wins.",
    img: "https://static.wixstatic.com/media/2836bb_0142d45440784c2c8b49745acead4730~mv2.jpeg",
    imgAlt: "Interior structural framework of boat with exposed aluminum beams showing before cleaning",
  },
  {
    name: "Carver 43",
    story: "A funky smell like spoilt milk led to a full steam order. In the last room, behind the built-in TV — two expired muskrats found on Christmas Day.",
    img: "https://static.wixstatic.com/media/2836bb_487798326cb946cdb2734cb4616ee556~mv2.jpeg",
    imgAlt: "Electrical wiring inside a boat revealing a significant maintenance and odour issue",
  },
  {
    name: "Grampian 7.9",
    story: "Fresh floors for this ol' lady — patterned, custom cut and finished.",
    img: "https://static.wixstatic.com/media/2836bb_0c9021e3a8874a59ad02dc6761753424~mv2.jpeg",
    imgAlt: "Newly replaced yacht interior wooden floors with custom pattern and glossy reflective finish",
  },
  {
    name: "Cruisers 500 — The Process",
    story: "Dry sanding to 320 for deep oxidization. Gouges overfilled with perfect gel matching. Build to 200 before compound polishing.",
    img: "https://static.wixstatic.com/media/2836bb_4c16edbac6a04dbaa47938f4aee808b7~mv2.jpeg",
    imgAlt: "Cruisers 500 transom with vibrant blue design and polishing pads during detailing process",
  },
  {
    name: "Cruisers 500 — Wet Sanding",
    story: "The wet sanding in entirety took 3 full days non-stop.",
    img: "https://static.wixstatic.com/media/2836bb_3dd337a848494df5b720a2a28d731c4e~mv2.png",
    imgAlt: "Cruisers 500 hull during wet sanding with swirl pattern marks visible across surface",
  },
  {
    name: "Cruisers 500 — The Finish",
    story: "Tree and lake perfectly mirrored in the hull. This is why we do what we do.",
    img: "https://static.wixstatic.com/media/2836bb_a47ed66c1b19473794d1bbd37404b7da~mv2.jpeg",
    imgAlt: "Stunning mirror-like reflection of tree and lake on perfectly polished Cruisers 500 hull",
  },
  {
    name: "C&C 33",
    story: "Deep dive interior — every compartment opened, cleaned and documented.",
    img: "https://static.wixstatic.com/media/2836bb_5b86662b5cac45e69de062721c1706b3~mv2.jpeg",
    imgAlt: "Yacht with storage compartments open revealing cleaned white surfaces below deck",
  },
  {
    name: "Beneteau GT 49",
    story: "Yogurt forgotten last fall. Who you gonna call?",
    img: "https://static.wixstatic.com/media/2836bb_226de951b5c84a0eae46477db86f1eca~mv2.jpeg",
    imgAlt: "Immaculately clean refrigerator interior aboard yacht after deep cleaning service",
  },
  {
    name: "1999 Sea Ray 460",
    story: "A spring tradition aboard this cherished vessel.",
    img: "https://static.wixstatic.com/media/2836bb_932700da0af149d38e368626e71fa67a~mv2.jpeg",
    imgAlt: "Carpet with deep extraction cleaning lines through yacht main living area and cabin",
  },
  {
    name: "2000 Sea Ray 460",
    story: "A delicate and all-too-often forgotten part that we always polish.",
    img: "https://static.wixstatic.com/media/2836bb_6115325e1dc84433a94f3ff922c2b7d0~mv2.jpeg",
    imgAlt: "Top-down view of polished deck with masking tape along arch edges — flawless detailing finish",
  },
];

export default function OurWork() {
  const { openQuote } = useQuote();
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Our Work — Featured Projects | Spike On The Water (Ontario)"
        description="Real boat detailing projects across Ontario's marinas — interior detailing, hull polishing, wet sanding, and bottom prep. See the results. Call Spike: 416-890-5899."
        path="/our-work"
      />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative bg-marine-900 pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-600 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.span
            {...fadeIn}
            className="text-cyan-400 font-bold uppercase tracking-widest text-xs block mb-4"
          >
            Results That Speak
          </motion.span>
          <motion.h1
            {...fadeIn}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight"
          >
            Our Work
          </motion.h1>
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl leading-relaxed"
          >
            Premium yacht detailing bringing every inch of your vessel back to prime condition —
            polishing metal accents, restoring gelcoat finishes, deep cleaning interiors, and more.
            From routine washes to complete restorations: we deliver meticulous attention to detail with every project.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-28">

        {/* ── FEATURED PROJECTS ─────────────────────────────── */}
        <section>
          <motion.h2
            {...fadeIn}
            className="text-3xl font-display font-bold text-marine-900 mb-3"
          >
            Featured Projects
          </motion.h2>
          <motion.p {...fadeIn} transition={{ delay: 0.05 }} className="text-muted-foreground mb-12 max-w-xl">
            Real client goals. Real boats. Documented from first contact to final result.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED.map((p, i) => (
              <motion.article
                key={p.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Image — linked to YouTube when available */}
                {p.youtubeUrl ? (
                  <a
                    href={p.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-56 overflow-hidden bg-marine-900 shrink-0 block"
                    aria-label={`Watch ${p.title} on YouTube`}
                  >
                    <img
                      src={p.img}
                      alt={p.imgAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-marine-900/60 to-transparent" />
                    <span className="absolute top-4 left-4 text-5xl font-display font-black text-white/20 leading-none select-none">
                      {p.num}
                    </span>
                    <div className="absolute bottom-3 right-3 bg-red-600 rounded-full p-1.5 shadow-lg">
                      <Youtube className="w-4 h-4 text-white" />
                    </div>
                  </a>
                ) : (
                  <div className="relative h-56 overflow-hidden bg-marine-900 shrink-0">
                    <img
                      src={p.img}
                      alt={p.imgAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-marine-900/60 to-transparent" />
                    <span className="absolute top-4 left-4 text-5xl font-display font-black text-white/20 leading-none select-none">
                      {p.num}
                    </span>
                  </div>
                )}

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-display font-bold text-marine-900 mb-1">{p.title}</h3>

                  <a
                    href={p.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-cyan-600 hover:text-cyan-500 font-semibold mb-4"
                  >
                    <MapPin className="w-3 h-3" /> {p.location}
                  </a>

                  <blockquote className="text-sm text-gray-600 italic leading-relaxed border-l-2 border-cyan-400 pl-4 mb-4 flex-1">
                    "{p.quote}"
                  </blockquote>

                  {/* Services tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.services.map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold border border-cyan-100">
                        {s}
                      </span>
                    ))}
                  </div>

                  {p.youtubeUrl && (
                    <a
                      href={p.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-500 transition-colors"
                    >
                      <Youtube className="w-4 h-4" /> Watch Spike's Estimate
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── NOTABLE FLEET ─────────────────────────────────── */}
        <section>
          <motion.h2 {...fadeIn} className="text-3xl font-display font-bold text-marine-900 mb-2">
            Some Boats We Beautified
          </motion.h2>
          <motion.p {...fadeIn} transition={{ delay: 0.05 }} className="text-muted-foreground mb-12">
            Absolutely any boat.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLEET.map((boat, i) => (
              <motion.div
                key={boat.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-marine-900 shadow-lg"
              >
                <img
                  src={boat.img}
                  alt={boat.imgAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-marine-900 via-marine-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-lg font-display font-bold text-white leading-tight mb-1">{boat.name}</h3>
                  <p className="text-cyan-300 text-xs font-medium leading-relaxed">{boat.services}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FROM THE FIELD ────────────────────────────────── */}
        <section>
          <motion.h2 {...fadeIn} className="text-3xl font-display font-bold text-marine-900 mb-2">
            Other Boats We Beautified
          </motion.h2>
          <motion.p {...fadeIn} transition={{ delay: 0.05 }} className="text-muted-foreground mb-12">
            Many of these boats were disasters to calmly correct.
          </motion.p>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {FIELD.map((item, i) => (
              <motion.div
                key={item.name + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="break-inside-avoid group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.imgAlt}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-display font-bold text-marine-900 text-sm mb-1">{item.name}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.story}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <motion.section
          {...fadeIn}
          className="bg-marine-900 rounded-3xl p-10 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready for Your Transformation?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Every boat has a story. Let's start yours. Book Spike for a personalized estimate and see your vessel returned to its prime.
          </p>
          <button
            onClick={() => openQuote()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-lg shadow-[0_0_30px_rgba(120,60,200,0.4)] hover:shadow-[0_0_40px_rgba(120,60,200,0.6)] transition-all hover:-translate-y-1"
          >
            Reserve Assessment <ChevronRight className="w-5 h-5" />
          </button>
        </motion.section>

      </div>
    </div>
  );
}

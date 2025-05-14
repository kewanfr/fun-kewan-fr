// import { Link } from "react-router-dom";

// function Home() {

//   const pages = [
//     { name: "Date Jar", path: "/date", color: "bg-secondary", icon: "❤️" },
//     { name: "Autre Page", path: "/autre", color: "bg-accent", icon: "✨" },
//   ];

//   return (
//     <div className="min-h-screen bg-background p-8 flex flex-col items-center ">
//       <h1 className="text-4xl font-bold text-text mb-4">fun.kewan.dev</h1>
//       <div className="h-1 w-24 bg-primary mb-8 rounded-full"></div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {pages.map(({ name, path, color, icon }) => (
//           <Link
//             key={name}
//             to={path}
//             className={`flex flex-col items-center justify-center bg-${color} rounded-2xl shadow-lg p-6 transform transition hover:scale-105`}
//           >
//             <span className="text-6xl mb-3">{icon}</span>
//             <span className="text-lg font-semibold text-text">{name}</span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const pages = [
  { name: "Date Jar", path: "/date/add", icon: "❤️", from: "bottom" },
  { name: "Tirage", path: "/date/random", icon: "🎲", from: "bottom" },
  // { name: "Autre", path: "/autre", icon: "✨", from: "bottom" },
];

export default function HomePage() {
  return (
    // <div className="relative min-h-screen overflow-hidden">
    //   {/* Forme pastel en arrière-plan */}
    //   <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-gradientStart to-gradientEnd background-shape" />

    //   <div className="relative px-6 py-16 flex flex-col items-center">
    //     <motion.h1
    //       initial={{ opacity: 0, y: -20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.6 }}
    //       className="text-5xl font-extrabold text-white mb-2"
    //     >
    //       fun.kewan.dev
    //     </motion.h1>
    //     <motion.p
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 0.7 }}
    //       transition={{ delay: 0.4 }}
    //       className="text-lg text-white mb-12"
    //     >
    //       Des mini-apps rigolotes en React
    //     </motion.p>

    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    //       {pages.map((page, i) => (
    //         <motion.div
    //           key={page.name}
    //           initial={{ opacity: 0, y: 30 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           transition={{ delay: 0.5 + i * 0.2 }}
    //         >
    //           <Link
    //             to={page.path}
    //             className="flex flex-col items-center justify-center w-52 h-52 bg-white rounded-3xl shadow-soft hover:shadow-lg transform hover:-translate-y-1 transition"
    //           >
    //             <span className="text-6xl mb-3 animate-pulse">
    //               {page.icon}
    //             </span>
    //             <span className="text-xl font-bold text-text">
    //               {page.name}
    //             </span>
    //           </Link>
    //         </motion.div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-gradientStart to-gradientEnd background-shape" />
      <div className="relative px-6 py-16 flex flex-col items-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-white mb-2"
        >
          fun.kewan.dev
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-white mb-12"
        >
          Des mini-apps rigolotes en React
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pages.map((page, i) => (
            <motion.div
              key={page.name}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.2 }}
            >
              <Link
                to={page.path}
                className="flex flex-col items-center justify-center w-52 h-52 bg-white/90 backdrop-blur-md rounded-3xl shadow-soft hover:shadow-lg transform hover:-translate-y-1 transition"
              >
                <span className="text-6xl mb-3 animate-pulse text-text">
                  {page.icon}
                </span>
                <span className="text-xl font-bold text-text">
                  {page.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

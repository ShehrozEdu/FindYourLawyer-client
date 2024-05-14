import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function TopLawyersBox({ lawyers }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={controls}
      transition={{ ease: "easeIn", duration: 0.5 }}
      className="xl:w-1/4 md:w-1/2 p-4"
    >
      <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-400 d-flex flex-col">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
          className="h-52 rounded lg:w-full object-cover object-center mb-6 w-75"
          src={lawyers.image}
          alt="content"
        />

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
          className="text-lg text-amber-900 font-extrabold Crimson title-font mb-4"
        >
          {lawyers.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
          className="leading-relaxed text-base"
        >
          {lawyers.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

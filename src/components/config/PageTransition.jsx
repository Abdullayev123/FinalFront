import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", // Start from the right
          opacity: 0,
        }}
        animate={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Fully visible
          opacity: 1,
        }}
        exit={{
          clipPath: "polygon(-100% 0, 0 0, 0 100%, -100% 100%)", // Exit to the left
          opacity: 0,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;

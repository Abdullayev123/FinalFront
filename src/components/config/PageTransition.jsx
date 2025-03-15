import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{
          clipPath: "polygon(50% 50% , 50% 50% , 50% 50% , 50% 50%)", // Start from the right
          opacity: 0,
        }}
        animate={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Fully visible
          opacity: 1,
        }}
        exit={{
          clipPath: "polygon(50% 50% , 50% 50% , 50% 50% , 50% 50%)", // Exit to the left
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;

// AnimatedLoading.tsx or AnimatedLoading.jsx
import { motion } from "framer-motion";
import React from "react";
import loadIcon from "../assets/load-icon.png"; // Make sure this path is correct

const AnimatedLoading = () => {
  return (
    <div style={styles.container}>
      <motion.img
        src={loadIcon}
        alt="Loading"
        style={styles.image}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // Full screen height
  },
  image: {
    width: 35,
    height: 35,
  },
};

export default AnimatedLoading;

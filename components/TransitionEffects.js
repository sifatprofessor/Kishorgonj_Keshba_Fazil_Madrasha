import { motion } from "framer-motion";

function TransitionEffects() {
  return (
    <>
      <motion.div
        className="fixed top-0 bottom-0 right-full h-screen w-screen z-50"
        style={{ 
          backgroundColor: 'rgba(254, 249, 199, 0.4)', 
          backdropFilter: 'blur(10px)' 
        }}
        initial={{ x: "100%", width: "100%" }}
        animate={{
          scale: [1, 0.9, 0.8, 0.7, 0.6,0.5,0.4,0.3,0.2,0.1,0],
          borderRadius: ["20%", "20%", "50%", "50%", "50%"],
        }}
        
        exit={{ scale: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.img
          src="https://utfs.io/f/2f9be6ee-7488-4909-a2bd-02669daaebc9-1evuz.png"
          alt="Center Image"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.div>

    </>
  );
}

export default TransitionEffects;

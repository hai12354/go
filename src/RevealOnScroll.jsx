import { motion } from "framer-motion";

const RevealOnScroll = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Bắt đầu: Mờ và nằm thấp 50px
      whileInView={{ opacity: 1, y: 0 }} // Khi nhìn thấy: Rõ và về vị trí cũ
      viewport={{ once: true, margin: "-50px" }} // Chỉ chạy 1 lần
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
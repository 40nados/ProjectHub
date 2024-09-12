//Loadins entre telas, opcional para usarmos, bom que em um so lugar ja seta loading para todas as rotas
import { motion } from 'framer-motion';

const loaderVariants = {
    initial: { opacity: 0.8 },
    animate: { opacity: 1 },
    exit: { opacity: 0.8 },
};

export default function Loader() {
    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 pointer-events-none"
            variants={loaderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
            style={{ backgroundColor: 'transparent' }}
        >
            <div className="text-xl loader">Loading...</div>
        </motion.div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
/*import Loader from './loader';*/ /* Se caso for usar loading aqui*/

const pageVariants = {
    initial: {
        opacity: 0.91,
        x: 0,
    },
    enter: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 1,
        x: 0,
    },
};

const transition = { duration: 1.5 };

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                transition={transition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

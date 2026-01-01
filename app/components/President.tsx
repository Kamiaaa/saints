'use client';

import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Type definitions
interface PresidentProps {
  title?: string;
  name?: string;
  position?: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  paragraphs?: string[];
  showTitleSection?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  containerMaxWidth?: string;
}

export default function President({
  title = "President",
  name = "Dr. Sarah Johnson",
  position = "President & CEO",
  imageSrc = "/img/president.jpg",
  imageAlt = "",
  paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis eros at lacus feugiat hendrerit sed ut tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis eros at lacus feugiat hendrerit sed ut tortor.",
    "Suspendisse et magna quis elit efficitur consequat. Mauris eleifend velit a pretium iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis eros at lacus feugiat hendrerit sed ut tortor.",
    "Donec sagittis velit et magna euismod, vel aliquet nulla malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis eros at lacus feugiat hendrerit sed ut tortor."
  ],
  showTitleSection = true,
  imageWidth = 400,
  imageHeight = 600,
  containerMaxWidth = "max-w-7xl"
}: PresidentProps) {
  const generatedAlt = imageAlt || `${name}, ${position}`;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const textInitial = isMobile
    ? { opacity: 0, y: 40 }
    : { opacity: 0, x: -80 };

  const imageInitial = isMobile
    ? { opacity: 0, y: 40 }
    : { opacity: 0, x: 80 };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {showTitleSection && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16 pt-8"
        >
          <h2 className="text-4xl md:text-5xl font-cormorant text-blue-950 dark:text-gray-50 mb-4">
            {title}
          </h2>
          <div className="relative inline-block">
            <div className="w-24 h-1 bg-blue-950 dark:bg-gray-50 rounded-full mb-1 mx-auto"></div>
            <div className="w-16 h-1 bg-blue-950 dark:bg-gray-50 rounded-full mx-auto"></div>
          </div>
        </motion.div>
      )}

      <div className={`container mx-auto ${containerMaxWidth} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">

          {/* Text Column */}
          <motion.div
            initial={textInitial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-3xl font-cormorant text-gray-900 dark:text-white sm:text-4xl font-bold">
              {name}
            </h2>
            <p className="mt-2 text-2xl font-cormorant text-gray-700 dark:text-gray-300 font-semibold">
              {position}
            </p>

            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-600 text-justify font-cormorant dark:text-gray-400 text-2xl leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Image Column */}
          {imageSrc && (
            <motion.div
              initial={imageInitial}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="w-full flex justify-center md:justify-end"
            >
              <div className="relative w-full max-w-md group">
                <div className="relative p-1 bg-linear-to-r from-blue-950 via-blue-800 to-blue-400 rounded-2xl shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={generatedAlt}
                      width={imageWidth}
                      height={imageHeight}
                      className="object-cover w-full h-auto rounded-xl transform group-hover:scale-[1.02] transition-transform duration-500"
                      priority
                    />
                  </div>

                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-blue-950 rounded-tl-lg opacity-70"></div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-blue-950 rounded-br-lg opacity-70"></div>
                </div>

                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-linear-to-r from-blue-950 to-blue-800 opacity-10 rounded-full -z-10 blur-sm"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-lime-600 to-[#231B67] opacity-5 rounded-full -z-10 blur-sm"></div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

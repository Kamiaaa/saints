'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ExecutiveMember {
    id: number;
    name: string;
    role: string;
    imageUrl: string;
    alt: string;
}

const executiveMembers: ExecutiveMember[] = [
    {
        id: 1,
        name: 'Kazi Mizan Ahmed',
        role: 'General Secretary',
        imageUrl: '/img/president.jpg',
        alt: 'Kazi Mizan Ahmed'
    },
    {
        id: 2,
        name: 'Kazi Mizan Ahmed',
        role: 'Member',
        imageUrl: '/img/president.jpg',
        alt: 'Kazi Mizan Ahmed'
    },
    {
        id: 3,
        name: 'Kazi Mizan Ahmed',
        role: 'Member',
        imageUrl: '/img/president.jpg',
        alt: 'Kazi Mizan Ahmed'
    },
    {
        id: 4,
        name: 'Kazi Mizan Ahmed',
        role: 'Member',
        imageUrl: '/img/president.jpg',
        alt: 'Kazi Mizan Ahmed'
    }
];

interface ExecutiveMembersSectionProps {
    title?: string;
    ctaText?: string;
    ctaLink?: string;
}

const ExecutiveMembersSection: React.FC<ExecutiveMembersSectionProps> = ({
    title = "Executive Members",
    ctaText = "View All Members",
    ctaLink = "/team"
}) => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl text-blue-950 font-cormorant dark:text-gray-50 mb-4">
                        {title}
                    </h2>
                    <div className="relative inline-block">
                        <div className="w-24 h-1 bg-blue-950 dark:bg-gray-50 rounded-full mb-1 mx-auto"></div>
                        <div className="w-16 h-1 bg-blue-950 dark:bg-gray-50 rounded-full mx-auto"></div>
                    </div>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {executiveMembers.map((member, index) => (
                        <AnimatedMemberCard
                            key={member.id}
                            member={member}
                            direction={index % 2 === 0 ? 'left' : 'right'}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <a
                        href={ctaLink}
                        className="inline-block bg-linear-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-950 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    >
                        {ctaText}
                    </a>
                </div>
            </div>
        </section>
    );
};

interface AnimatedMemberCardProps {
    member: ExecutiveMember;
    direction: 'left' | 'right';
    delay?: number;
}

const AnimatedMemberCard: React.FC<AnimatedMemberCardProps> = ({
    member,
    direction,
    delay = 0,
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const initialAnimation = isMobile
        ? { opacity: 0, y: 40 }
        : {
            opacity: 0,
            x: direction === 'left' ? -80 : 80,
        };

    return (
        <motion.div
            initial={initialAnimation}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay,
            }}
        >
            <MemberCard member={member} />
        </motion.div>
    );
};

interface MemberCardProps {
    member: ExecutiveMember;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 w-full shadow-2xl transition-all duration-500 hover:-translate-y-2">

            {/* Animated Border */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-br from-blue-950 to-blue-800 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-950 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                <div className="absolute top-0 right-0 w-0.5 h-full bg-blue-950 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 delay-100"></div>
                <div className="absolute bottom-0 right-0 w-full h-0.5 bg-blue-950 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 delay-200"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-full bg-blue-950 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 delay-300"></div>
            </div>

            {/* Image */}
            <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden mb-6">
                <Image
                    src={member.imageUrl}
                    alt={member.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={member.id <= 2}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Info */}
            <div className="relative z-10">
                <h3 className="font-playfair text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {member.name}
                </h3>
                <p className="text-tab-gray dark:text-gray-400">
                    {member.role}
                </p>
            </div>
        </div>
    );
};

export default ExecutiveMembersSection;

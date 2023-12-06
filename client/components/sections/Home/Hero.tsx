"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import HeadingPrimary from "@/components/reusable/HeadingPrimary";
import LimitedWidthContainer from "@/components/containers/LimitedWidthContainer";
import LinkPrimary from "@/components/reusable/LinkPrimary";
import ParagraphRegular from "@/components/reusable/ParagraphRegular";
import { useRef } from "react";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mountainsBottomLeftY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const mountainsLower = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const mountainsUpper = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const planetsY = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <div className="w-full h-screen overflow-hidden relative grid place-items-center" ref={ref}>
      <motion.div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url('/backgrounds/indexPage/background.png')`,
          y: backgroundY,
        }}
      />
      <motion.div className="absolute inset-0 z-50" style={{ y: textY }}>
        <LimitedWidthContainer additionalClasses=" min-h-[calc(100vh-56px)] flex flex-col gap-10 justify-center items-center">
          <HeadingPrimary>
            Welcome to ChronoQuest <br /> Your Epic Journey Through Time!
          </HeadingPrimary>
          <ParagraphRegular additionalClasses="text-center ">
            In ChronoQuest, you&apos;ll step into the shoes of a daring time traveler, equipped with a state-of-the-art
            time machine, ready to explore the depths of history and the mysteries of the future. Your quest will take
            you to exotic locales, ancient civilizations, and even alternate dimensions. It&apos;s time to make your
            mark on history, or perhaps even rewrite it!
          </ParagraphRegular>
          <div className="flex gap-5 justify-center">
            <LinkPrimary to="/signin">Sign In</LinkPrimary>
            <LinkPrimary to="/signup">Sign Up</LinkPrimary>
          </div>
        </LimitedWidthContainer>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-center bg-contain bg-no-repeat"
        style={{
          backgroundImage: `url('/backgrounds/indexPage/planets.png')`,
          y: planetsY,
        }}
      />
      <motion.div
        className="absolute inset-0 z-30 bg-bottom bg-cover"
        style={{
          backgroundImage: `url('/backgrounds/indexPage/mountains_lower.png')`,
          y: mountainsLower,
        }}
      />
      <motion.div
        className="absolute inset-0 z-20 bg-bottom bg-cover"
        style={{
          backgroundImage: `url('/backgrounds/indexPage/mountains_upper.png')`,
          y: mountainsUpper,
        }}
      />
      <motion.div
        className="absolute inset-0 z-40 bg-bottom bg-cover"
        style={{
          backgroundImage: `url('/backgrounds/indexPage/mountains_bottom_left.png')`,
          y: mountainsBottomLeftY,
        }}
      />
    </div>
  );
};

export default Hero;

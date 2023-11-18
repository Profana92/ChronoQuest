"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import LimitedWidthContainer from "@/components/containers/LimitedWidthContainer";
import SectionContainer from "@/components/containers/SectionContainer";
import HeadingPrimary from "@/components/reusable/HeadingPrimary";
import ParagraphRegular from "@/components/reusable/ParagraphRegular";
import LinkPrimary from "@/components/reusable/LinkPrimary";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mountainsBottomLeftY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const mountainsLower = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const planetsY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 900]);
  return (
    <div className="w-full h-screen overflow-hidden relative grid place-items-center bg-indexPageHero" ref={ref}>
      <motion.div className="absolute inset-0 z-30" style={{ y: textY }}>
        <LimitedWidthContainer additionalClasses=" min-h-[calc(100vh-56px)] flex flex-col gap-10 justify-center items-center">
          <HeadingPrimary>
            Welcome to ChronoQuest <br /> Your Epic Journey Through Time!
          </HeadingPrimary>
          <ParagraphRegular additionalClasses="text-center">
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
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/backgrounds/indexPage/planets.png')`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          y: planetsY,
        }}
      />
      <motion.div
        className="absolute inset-0 z-40"
        style={{
          backgroundImage: `url('/backgrounds/indexPage/mountains_lower.png')`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: mountainsLower,
        }}
      />
      <motion.div
        className="absolute inset-0 z-50"
        style={{
          backgroundImage: `url('/backgrounds/indexPage/mountains_bottom_left.png')`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: mountainsBottomLeftY,
        }}
      />
    </div>
  );
};

export default Hero;

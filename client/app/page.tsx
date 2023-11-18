import FullWidthContainer from "@/components/containers/FullWidthContainer";
import HalfWidthContainer from "@/components/containers/HalfWidthContainer";
import LimitedWidthContainer from "@/components/containers/LimitedWidthContainer";
import SectionContainer from "@/components/containers/SectionContainer";
import HeadingPrimary from "@/components/reusable/HeadingPrimary";
import HeadingSecondary from "@/components/reusable/HeadingSecondary";
import IconBox from "@/components/reusable/IconBox";
import LinkPrimary from "@/components/reusable/LinkPrimary";
import ParagraphRegular from "@/components/reusable/ParagraphRegular";
import { SiNextdotjs } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiJest } from "react-icons/si";
import { SiJsonwebtokens } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiMongoose } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiTestinglibrary } from "react-icons/si";

import Hero from "@/components/sections/Home/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionContainer>
        <LimitedWidthContainer>
          <HeadingSecondary>What Awaits You:</HeadingSecondary>
          <ul className="text-center">
            <li>🌐 Explore diverse historical eras, from the distant past to the distant future. 🌐</li>
            <li>🚀 Unlock your time machine&apos;s potential and master time manipulation. 🚀</li>
            <li>💡 Solve puzzles, uncover secrets, and face temporal challenges.💡</li>
            <li>⚔️ Encounter legendary figures and alter the course of history. ⚔️</li>
            <li>🌌 Unravel the fabric of time and discover the hidden truths of the universe. 🌌</li>
          </ul>
        </LimitedWidthContainer>
      </SectionContainer>
      <SectionContainer>
        <LimitedWidthContainer>
          <HeadingSecondary>New to Time Travel? No worries!</HeadingSecondary>
          <ParagraphRegular>
            ChronoQuest offers a helpful tutorial and an expert guide to get you started. We&apos;ve got your back as
            you traverse the fourth dimension!
          </ParagraphRegular>
          <LinkPrimary to="/how-to" additionalClasses="mx-auto">
            Learn More!
          </LinkPrimary>
          <ParagraphRegular>
            Get ready to unravel the threads of time and create your own destiny. Welcome to ChronoQuest, where history
            is your playground, and the future is in your hands. Your time-traveling odyssey begins now!
          </ParagraphRegular>
        </LimitedWidthContainer>
      </SectionContainer>{" "}
      <SectionContainer>
        <LimitedWidthContainer>
          <HeadingSecondary>New to Time Travel? No worries!</HeadingSecondary>
          <ParagraphRegular>
            ChronoQuest offers a helpful tutorial and an expert guide to get you started. We&apos;ve got your back as
            you traverse the fourth dimension!
          </ParagraphRegular>
          <LinkPrimary to="/how-to" additionalClasses="mx-auto">
            Learn More!
          </LinkPrimary>
          <ParagraphRegular>
            Get ready to unravel the threads of time and create your own destiny. Welcome to ChronoQuest, where history
            is your playground, and the future is in your hands. Your time-traveling odyssey begins now!
          </ParagraphRegular>
        </LimitedWidthContainer>
      </SectionContainer>{" "}
      <SectionContainer>
        <LimitedWidthContainer>
          <HeadingSecondary>New to Time Travel? No worries!</HeadingSecondary>
          <ParagraphRegular>
            ChronoQuest offers a helpful tutorial and an expert guide to get you started. We&apos;ve got your back as
            you traverse the fourth dimension!
          </ParagraphRegular>
          <LinkPrimary to="/how-to" additionalClasses="mx-auto">
            Learn More!
          </LinkPrimary>
          <ParagraphRegular>
            Get ready to unravel the threads of time and create your own destiny. Welcome to ChronoQuest, where history
            is your playground, and the future is in your hands. Your time-traveling odyssey begins now!
          </ParagraphRegular>
        </LimitedWidthContainer>
      </SectionContainer>
      <SectionContainer>
        <LimitedWidthContainer>
          <HeadingSecondary>This project uses:</HeadingSecondary>
          <div className="flex flex-row gap-3 justify-center items-center">
            <IconBox link="https://nextjs.org/">
              <SiNextdotjs size="1.6rem" color="#fff" />
            </IconBox>
            <IconBox link="https://react.dev/">
              <SiReact size="1.6rem" />
            </IconBox>
            <IconBox link="https://www.typescriptlang.org/">
              <SiTypescript size="1.6rem" />
            </IconBox>
            <IconBox link="https://tailwindcss.com/">
              <SiTailwindcss size="1.6rem" />
            </IconBox>
            <IconBox link="https://jestjs.io/">
              <SiJest size="1.6rem" />
            </IconBox>
            <IconBox link="https://testing-library.com/">
              <SiTestinglibrary size="1.6rem" />
            </IconBox>
            <IconBox link="https://jwt.io/">
              <SiJsonwebtokens size="1.6rem" />
            </IconBox>
            <IconBox link="https://www.mongodb.com/">
              <SiMongodb size="1.6rem" />
            </IconBox>
            <IconBox link="https://mongoosejs.com/">
              <SiMongoose size="1.6rem" />
            </IconBox>
          </div>
        </LimitedWidthContainer>
      </SectionContainer>
    </>
  );
}

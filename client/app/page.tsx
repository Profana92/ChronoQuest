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

export default function Home() {
  return (
    <>
      <SectionContainer>
        <FullWidthContainer>
          <LimitedWidthContainer>
            <HalfWidthContainer>
              <HeadingPrimary>
                Welcome to ChronoQuest: Your Epic Journey Through Time!
              </HeadingPrimary>
              <ParagraphRegular>
                In ChronoQuest, you&apos;ll step into the shoes of a daring time
                traveler, equipped with a state-of-the-art time machine, ready
                to explore the depths of history and the mysteries of the
                future. Your quest will take you to exotic locales, ancient
                civilizations, and even alternate dimensions. It&apos;s time to
                make your mark on history, or perhaps even rewrite it!
              </ParagraphRegular>
              <LinkPrimary to="/signin">Sign In</LinkPrimary>
              <ParagraphRegular>Not yet registered?</ParagraphRegular>
              <LinkPrimary to="/signup">Sign Up</LinkPrimary>
            </HalfWidthContainer>
            <HalfWidthContainer>dsds</HalfWidthContainer>
          </LimitedWidthContainer>
        </FullWidthContainer>
      </SectionContainer>
      <SectionContainer>
        <LimitedWidthContainer>
          <HeadingPrimary>What Awaits You:</HeadingPrimary>
          <ul>
            <li>
              🌐 Explore diverse historical eras, from the distant past to the
              distant future.
            </li>
            <li>
              🚀 Unlock your time machine&apos;s potential and master time
              manipulation.
            </li>
            <li>
              💡 Solve puzzles, uncover secrets, and face temporal challenges.
            </li>
            <li>
              ⚔️ Encounter legendary figures and alter the course of history.
            </li>
            <li>
              🌌 Unravel the fabric of time and discover the hidden truths of
              the universe.
            </li>
          </ul>
        </LimitedWidthContainer>
      </SectionContainer>
      <SectionContainer>
        <LimitedWidthContainer>
          <HeadingSecondary>New to Time Travel? No worries!</HeadingSecondary>
          <ParagraphRegular>
            ChronoQuest offers a helpful tutorial and an expert guide to get you
            started. We&apos;ve got your back as you traverse the fourth
            dimension!
          </ParagraphRegular>
          <LinkPrimary to="/how-to">Learn More!</LinkPrimary>
          <ParagraphRegular>
            Get ready to unravel the threads of time and create your own
            destiny. Welcome to ChronoQuest, where history is your playground,
            and the future is in your hands. Your time-traveling odyssey begins
            now!
          </ParagraphRegular>
        </LimitedWidthContainer>
      </SectionContainer>
      <SectionContainer>
        <LimitedWidthContainer>
          <HeadingSecondary>This project uses:</HeadingSecondary>
        </LimitedWidthContainer>
        <LimitedWidthContainer additionalClasses="flex gap-3 justify-center items-center">
          <IconBox>
            <SiNextdotjs size="2rem" />
          </IconBox>
          <IconBox>
            <SiReact size="2rem" />
          </IconBox>
          <IconBox>
            <SiTypescript size="2rem" />
          </IconBox>
          <IconBox>
            <SiTailwindcss size="2rem" />
          </IconBox>
          <IconBox>
            <SiJest size="2rem" />
          </IconBox>
          <IconBox>
            <SiJsonwebtokens size="2rem" />
          </IconBox>
          <IconBox>
            <SiMongodb size="2rem" />
          </IconBox>
          <IconBox>
            <SiMongoose size="2rem" />
          </IconBox>
        </LimitedWidthContainer>
      </SectionContainer>
    </>
  );
}

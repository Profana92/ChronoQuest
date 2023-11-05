import FullWidthContainer from "@/components/containers/FullWidthContainer";
import HalfWidthContainer from "@/components/containers/HalfWidthContainer";
import LimitedWidthContainer from "@/components/containers/LimitedWidthContainer";
import SectionContainer from "@/components/containers/SectionContainer";
import HeadingPrimary from "@/components/reusable/HeadingPrimary";
import ParagraphRegular from "@/components/reusable/ParagraphRegular";

export default function Home() {
  return (
    <SectionContainer>
      <FullWidthContainer>
        <LimitedWidthContainer>
          <HalfWidthContainer>
            <HeadingPrimary>
              Welcome to ChronoQuest: Your Epic Journey Through Time!
            </HeadingPrimary>
            <ParagraphRegular>
              In ChronoQuest, you'll step into the shoes of a daring time
              traveler, equipped with a state-of-the-art time machine, ready to
              explore the depths of history and the mysteries of the future.
              Your quest will take you to exotic locales, ancient civilizations,
              and even alternate dimensions. It's time to make your mark on
              history, or perhaps even rewrite it!
            </ParagraphRegular>
          </HalfWidthContainer>
          <HalfWidthContainer>dsds</HalfWidthContainer>
        </LimitedWidthContainer>
      </FullWidthContainer>
    </SectionContainer>
  );
}

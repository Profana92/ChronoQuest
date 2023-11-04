import FullWidthContainer from "@/components/containers/FullWidthContainer";
import LimitedWidthContainer from "@/components/containers/LimitedWidthContainer";
import SectionContainer from "@/components/containers/SectionContainer";
import HeadingPrimary from "@/components/reusable/HeadingPrimary";

export default function Home() {
  return (
    <SectionContainer>
      <FullWidthContainer>
        <LimitedWidthContainer>
          <HeadingPrimary>
            Welcome to ChronoQuest: Your Epic Journey Through Time!
          </HeadingPrimary>
        </LimitedWidthContainer>
      </FullWidthContainer>
    </SectionContainer>
  );
}

import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { CheckoutProvider } from "@/components/sections/CheckoutProvider";
import { UrgencyBar } from "@/components/sections/UrgencyBar";
import { Hero } from "@/components/sections/Hero";
import { Divide } from "@/components/sections/Divide";
import { About } from "@/components/sections/About";
import { Includes } from "@/components/sections/Includes";
import { Audience } from "@/components/sections/Audience";
import { Schedule } from "@/components/sections/Schedule";
import { Speakers } from "@/components/sections/Speakers";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Index() {
  return (
    <CheckoutProvider>
      <div className="min-h-screen bg-background text-foreground">
        <ScrollProgress />
        <UrgencyBar />
        <main>
          <Hero />
          <Divide />
          <About />
          <Includes />
          <Audience />
          <Schedule />
          <Speakers />
          <Testimonials />
          <Pricing />
          <Faq />
        </main>
        <Footer />
      </div>
    </CheckoutProvider>
  );
}

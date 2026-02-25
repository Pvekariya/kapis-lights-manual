import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
export const metadata = {
  title: "About Kapis Lights",
  description:
    "Learn about Kapis Lights, a trusted LED lighting manufacturer.",
};
export default function About() {
  return (
    <>
      <Navbar />
      <PageWrapper>
      <main className="px-6 py-16 max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-yellow-300 text-center mb-12">
          About Kapis Lights
        </h1>

        <section className="space-y-6 text-gray-200 text-lg">

          <p>
            Kapis Lights is a specialized LED lighting manufacturer focused on decorative and utility lighting solutions for the Indian market. We design products that balance performance, visual appeal, and affordability for homes, commercial spaces, and festive environments.
          </p>

          <p>
            Every product is built with strict quality standards and modern manufacturing practices to ensure durability, safety, and consistent performance. Our growing dealer network reflects our commitment to long-term partnerships and reliable supply across regions.
          </p>

        </section>

        <section className="mt-16 bg-[#2b083d] p-10 rounded-xl">

          <h2 className="text-2xl font-bold text-yellow-300 mb-4">
            Our Mission
          </h2>

          <p className="text-gray-200">
            To provide smart, affordable, and reliable lighting solutions
            while building strong partnerships with dealers and distributors
            across the market.
          </p>

        </section>

        <section className="mt-16 bg-[#2b083d] p-10 rounded-xl">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">
            MSME Registered 
          </h2>

          <p className="text-gray-200">
            Kapis Lights is a Government of India registered Micro Enterprise 
            (Udyam Registration No: UDYAM-DL-11-0041596) under the Ministry of MSME.
          </p>
        </section>

        <section className="mt-16">

          <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">
            Certifications & Quality
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">

            <div className="bg-[#2b083d] p-6 rounded-xl">
              <h3 className="font-bold text-lg">ISO Certified</h3>
              <p className="text-gray-400 mt-2">Quality management compliance</p>
            </div>

            <div className="bg-[#2b083d] p-6 rounded-xl">
              <h3 className="font-bold text-lg">Energy Efficient</h3>
              <p className="text-gray-400 mt-2">Low power consumption design</p>
            </div>

            <div className="bg-[#2b083d] p-6 rounded-xl">
              <h3 className="font-bold text-lg">Safety Tested</h3>
              <p className="text-gray-400 mt-2">Reliable performance standards</p>
            </div>

          </div>

        </section>

      </main>
      </PageWrapper>
      <Footer />
    </>
  );
}
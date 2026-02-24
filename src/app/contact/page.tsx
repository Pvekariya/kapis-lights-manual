import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
export const metadata = {
  title: "Contact Kapis Lights",
  description:
    "Get in touch with Kapis Lights for dealership and inquiries.",
};
export default function Contact() {
  return (
    <>
      <Navbar />

      <PageWrapper>
      
      <main className="px-6 py-16 text-center">

        <h1 className="text-4xl font-bold text-yellow-300 mb-12">
          Contact Us
        </h1>

        <div className="max-w-3xl mx-auto bg-[#2b083d] p-10 rounded-xl space-y-6">

          <p>
            <b>Address:</b> Kapis Lights ,<br />
            DLF Industrial Area, Moti Nagar, New Delhi - 110015
          </p>

          <p>
            <b>Phone:</b> +91 99530 84555
          </p>

          <p>
            <b>Email:</b> kapislights@gmail.com
          </p>

          <div className="rounded-xl overflow-hidden h-80">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24260.925604437518!2d77.16453863935692!3d28.643617498708174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1770808591858!5m2!1sen!2sin" 
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>

      </main>

      </PageWrapper>

      <Footer />
    </>
  );
}
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SurveyForm from "@/components/SurveyForm";

export default function SurveyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12 px-4">
        <SurveyForm />
      </main>
      <Footer />
    </>
  );
}

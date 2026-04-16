import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SurveyForm from "@/components/SurveyForm";

export const metadata: Metadata = {
  title: "Free AI Job Risk Assessment — 2-Minute Career Survey",
  description:
    "Answer 7 quick questions about your job and get a personalized AI risk score. Find out how likely AI is to automate your role — free, no sign-up required.",
  alternates: {
    canonical: "https://jobsaiwillreplace.com/survey",
  },
  openGraph: {
    title: "Free AI Job Risk Assessment — 2-Minute Career Survey",
    description:
      "Answer 7 quick questions and get your AI replacement risk score. Free, no sign-up required.",
    url: "https://jobsaiwillreplace.com/survey",
  },
};

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

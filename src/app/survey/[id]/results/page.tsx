import { Suspense } from "react";
import SurveyResultsContent from "./SurveyResultsContent";

export default function SurveyResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-20 text-center text-sm text-[#848e9c] sm:px-6 lg:px-8">
          Loading results…
        </div>
      }
    >
      <SurveyResultsContent />
    </Suspense>
  );
}

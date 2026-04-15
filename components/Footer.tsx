export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-4 text-center text-gray-400 text-xs">
        <p>&copy; {new Date().getFullYear()} JobsAIWillReplace.com</p>
        <p className="mt-1">
          Predictions are estimates based on current trends and do not constitute career advice.
        </p>
      </div>
    </footer>
  );
}

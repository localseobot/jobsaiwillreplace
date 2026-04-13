export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} JobsAIWillReplace.com. All rights reserved.</p>
        <p className="mt-2">
          AI predictions are estimates based on current trends and should not be taken as career advice.
        </p>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-center text-xs text-gray-500">
      © {new Date().getFullYear()} FocusRune · Built for productivity
    </footer>
  );
}

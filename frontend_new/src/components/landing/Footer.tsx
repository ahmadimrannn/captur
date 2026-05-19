export default function Footer() {
  return (
    <footer className="px-3 sm:px-4 mt-4 mb-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-neutral-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4d23]" />
          <span className="text-neutral-900 font-medium">Captur</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-5">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
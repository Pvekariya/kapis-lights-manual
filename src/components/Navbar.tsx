export default function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row md:justify-between md:items-center px-4 md:px-8 py-3 bg-[#1a0526] shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Kapis Lights Logo"
          className="h-12 md:h-16 w-auto object-contain"
        />
      </div>

      <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 mt-3 md:mt-0 text-yellow-300 font-semibold text-sm md:text-base">
        <a href="/" className="hover:text-yellow-300 transition">Home</a>
        <a href="/products" className="hover:text-yellow-300 transition">Products</a>
        <a href="/about" className="hover:text-yellow-300 transition">About</a>
        <a href="/dealer" className="hover:text-yellow-300 transition">Dealer</a>
        <a href="/contact" className="hover:text-yellow-300 transition">Contact</a>
      </div>
    </nav>
  );
}
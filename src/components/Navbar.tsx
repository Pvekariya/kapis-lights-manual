export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-[#1a0526] shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Kapis Lights Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      <div className="space-x-6 text-white font-medium">
        <a href="/" className="hover:text-yellow-300 transition">Home</a>
        <a href="/products" className="hover:text-yellow-300 transition">Products</a>
        <a href="/about" className="hover:text-yellow-300 transition">About</a>
        <a href="/dealer" className="hover:text-yellow-300 transition">Dealer</a>
        <a href="/contact" className="hover:text-yellow-300 transition">Contact</a>
      </div>
    </nav>
  );
}
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-[#1a0526] shadow-lg">
      <h1 className="text-2xl font-bold text-yellow-300">Kapis Lights</h1>

      <div className="space-x-6 text-white">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
        <a href="/dealer">Dealer</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}
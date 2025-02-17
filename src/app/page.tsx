import Link from "next/link";

export default function Home() {
  return (
    <div 
      className="min-h-screen p-6 bg-gray-100 bg-cover bg-center relative" 
      style={{ backgroundImage: "url('/torben-gettermann.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      <h1 className="text-2xl font-bold text-center text-white mb-6 drop-shadow-lg z-10 relative">
        Tic Tac Toe Games
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-10 relative">
        <Link href="/1d-array-implementation" className="block">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition cursor-pointer max-w-xs mx-auto">
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">1D Array Implementation</h2>
            </div>
          </div>
        </Link>
        <Link href="/bitwise-operations-variation" className="block">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition cursor-pointer max-w-xs mx-auto">
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">Bitwise Operations Variation</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

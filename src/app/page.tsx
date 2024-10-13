'use client'; // Mark this as a Client Component
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use for client-side navigation

export default function LandingPage() {
  const [showRoomInput, setShowRoomInput] = useState(false);
  const [roomId, setRoomId] = useState('');
  const router = useRouter();

  const handleJoinRoom = () => {
    setShowRoomInput(true);
  };

  const handleHostRoom = () => {
    // Generate a unique session ID for the host
    const uniqueSessionId = `session-${Math.random().toString(36).substr(2, 9)}`;
    // Navigate to the dynamically generated room page
    router.push(`/room/${uniqueSessionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#000000] via-[#000000] to-[rgba(255, 0, 127, 0.2)] text-white font-poppins">
      {/* Header Section */}
      <header className="flex justify-between items-center p-6">
        <img src="/images/G4838.png" alt="logo" className="w-8 max-w-lg mx-auto" />
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center space-y-8">
        <div className="flex justify-center space-x-8 mt-10">
          {/* Cards */}
          <div className="card w-[700px] h-[500px] flex justify-center items-center">
            <img src="/images/Screen02.png" alt="Card Image 1" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="card w-[700px] h-[500px] flex justify-center items-center">
            <img src="/images/Screen01.png" alt="Card Image 2" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>

        <img src="/images/Vector.png" alt="Main Header Image" className="w-60 max-w-lg mx-auto" />

        <p className="description text-xl font-light max-w-lg mx-auto">
          Host or join a spontaneous trip with your friends, make picks, spin
          the wheel, and decide on your dream destination and stay!
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-6 space-x-4">
          <button
            onClick={handleHostRoom}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg py-4 px-8 rounded-lg shadow-lg hover:scale-105 transition"
          >
            🎉 Host Room
          </button>
          <button
            onClick={handleJoinRoom}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg py-4 px-8 rounded-lg shadow-lg hover:scale-105 transition"
          >
            🚪 Join Room
          </button>
        </div>

        {/* Show Room ID Input if Join Room is clicked */}
        {showRoomInput && (
          <div className="mt-6">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="border border-gray-300 p-4 rounded-lg text-black w-full max-w-xs"
            />
            <Link href={`/room/${roomId}`}>
              <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 block">
                Enter Room
              </button>
            </Link>
          </div>
        )}
      </main>

      {/* Footer Section */}
      <footer className="p-6">
        <p className="text-center text-gray-500">
          &copy; 2024 Made it out the GC
        </p>
      </footer>
    </div>
  );
}

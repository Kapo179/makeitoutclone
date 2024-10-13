import { useState } from 'react';

// List of countries
const countries = [
  "United States",
  "Canada",
  "France",
  "Germany",
  "Japan",
  "Australia",
  "Brazil"
];

// Function to eliminate a country randomly
const eliminateCountry = (currentCountries: string[]) => {
  if (currentCountries.length > 1) {
    const randomIndex = Math.floor(Math.random() * currentCountries.length);
    const updatedCountries = currentCountries.filter((_, index) => index !== randomIndex);
    return updatedCountries;
  }
  return currentCountries;  // Return if only one country left (winner)
};

export default function CountryVoting() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [remainingCountries, setRemainingCountries] = useState<string[] | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  // Handle selecting a country (up to 5 selections)
  const handleSelectCountry = (country: string) => {
    if (selectedCountries.length < 1 && !selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  // Handle the elimination process
  const handleEliminateCountries = () => {
    let countriesToEliminate = [...selectedCountries];
    const eliminationInterval = setInterval(() => {
      if (countriesToEliminate.length > 1) {
        countriesToEliminate = eliminateCountry(countriesToEliminate);
        setRemainingCountries(countriesToEliminate);
      } else {
        clearInterval(eliminationInterval);  // Stop when only one country left
        setWinner(countriesToEliminate[0]);  // Set the final country as winner
      }
    }, 1000);  // Eliminate a country every second
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Select 5 countries</h1>
      
      {/* Country Selection */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        {countries.map((country) => (
          <div
            key={country}
            className={`card bg-white text-black rounded-lg shadow-lg p-4 hover:shadow-xl hover:scale-105 transition transform duration-300 ${
              selectedCountries.includes(country) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleSelectCountry(country)}
          >
            <p>{country}</p>
          </div>
        ))}
      </div>

      {/* Display Selected Countries */}
      <div className="mt-8">
        <h2 className="text-xl">Your selected countries:</h2>
        {selectedCountries.map((country) => (
          <p key={country}>{country}</p>
        ))}
      </div>

      {/* Button to Start Elimination */}
      {selectedCountries.length === 5 && !winner && (
        <button
          onClick={handleEliminateCountries}
          className="mt-4 bg-red-600 hover:bg-red-500 py-2 px-4 rounded-lg shadow-lg transition"
        >
          Start Elimination
        </button>
      )}

      {/* Display Remaining Countries */}
      {remainingCountries && (
        <div className="mt-8">
          <h2 className="text-xl">Remaining countries:</h2>
          {remainingCountries.map((country) => (
            <p key={country}>{country}</p>
          ))}
        </div>
      )}

      {/* Display Winner */}
      {winner && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Winner:</h2>
          <p className="text-2xl">{winner}</p>
        </div>
      )}
    </div>
  );
}

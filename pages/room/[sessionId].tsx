import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../src/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import '../../src/app/room.css'; // Import the new stylesheet

const countries = [
  { name: "Greece", flag: "/country-cards/greece.png" },
  { name: "Italy", flag: "/country-cards/italy.png" },
  { name: "Japan", flag: "/country-cards/japan.png" },
  { name: "UAE", flag: "/country-cards/uae.png" },
  { name: "Germany", flag: "/flags/germany.png" },
  { name: "Australia", flag: "/flags/australia.png" },
  { name: "Brazil", flag: "/flags/brazil.png" },
];

export default function Room() {
  const router = useRouter();
  const { sessionId } = router.query;
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [allConfirmed, setAllConfirmed] = useState(false);
  const usersCollection = sessionId ? collection(db, 'rooms', sessionId as string, 'users') : null;
  const [usersData] = useCollectionData(usersCollection);

  useEffect(() => {
    console.log('Session ID:', sessionId);
    if (typeof sessionId === 'string') {
      const initializeRoom = async () => {
        try {
          const roomRef = doc(db, "rooms", sessionId);
          const roomSnap = await getDoc(roomRef);
          
          if (!roomSnap.exists()) {
            console.log('Room does not exist, creating new room...');
            await setDoc(roomRef, {
              countries,
              users: [],
            });
          } else {
            console.log('Room already exists:', roomSnap.data());
          }
        } catch (error) {
          console.error('Error initializing room:', error);
        }
      };
      initializeRoom();
    }
  }, [sessionId]);

  useEffect(() => {
    console.log('Users Data:', usersData);
    if (usersData && usersData.length > 0) {
      const allUsersConfirmed = usersData.every((user) => user.confirmed);
      setAllConfirmed(allUsersConfirmed);
      if (allUsersConfirmed) {
        console.log('All users confirmed, redirecting to spinner page...');
        router.push(`/spinner/${sessionId}`); // Redirect to the spinner page
      }
    }
  }, [usersData, router, sessionId]);

  const handleSelectCountry = (country: string) => {
    console.log('Selected Country:', country);
    setSelectedCountry(country);
  };

  const handleConfirmSelection = async () => {
    if (selectedCountry && typeof sessionId === 'string') {
      try {
        console.log('Confirming selection for country:', selectedCountry);
        const userRef = doc(usersCollection!, `user-${Math.random().toString(36).substr(2, 9)}`);
        await setDoc(userRef, {
          country: selectedCountry,
          confirmed: true,
        });
        setConfirmed(true);
        console.log('Selection confirmed successfully');
      } catch (error) {
        console.error('Error confirming selection:', error);
      }
    }
  };

  return (
    <div className="room-container">
      <h1 className="room-header">Room Code: {sessionId}</h1>
      <div className="space-y-6">
        <h2 className="country-selection-title">Select Your Country</h2>
        
        {/* Show Confirm Button only after a country is selected */}
        {selectedCountry && !confirmed && (
          <button
            onClick={handleConfirmSelection}
            className="confirm-button"
          >
            Confirm Selection
          </button>
        )}
        
        <div className="country-container">
          {countries.map(({ name, flag }) => (
            <div key={name} className={`country-card ${selectedCountry === name ? 'selected' : ''}`}>
              <button onClick={() => handleSelectCountry(name)}>
                <img src={flag} className="country-image" />
              </button>
            </div>
          ))}
        </div>
        
        {confirmed && (
          <p className="confirmed-message">Selection Confirmed: {selectedCountry}</p>
        )}
      </div>
    </div>
  );
}

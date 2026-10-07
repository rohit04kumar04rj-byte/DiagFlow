import { useState } from "react";
import "./App.css";

const tests = [
  {
    name: "MRI Brain",
    category: "MRI",
    description: "High-resolution imaging for brain and neurological conditions.",
    price: "₹2,500",
    centres: 8,
  },
  {
    name: "CT Scan Chest",
    category: "CT Scan",
    description: "Detailed cross-sectional imaging of the chest.",
    price: "₹1,800",
    centres: 6,
  },
  {
    name: "Complete Blood Count",
    category: "Blood Test",
    description: "Routine blood test covering major blood parameters.",
    price: "₹350",
    centres: 15,
  },
  {
    name: "Chest X-Ray",
    category: "X-Ray",
    description: "Digital X-ray imaging of the chest and lungs.",
    price: "₹250",
    centres: 18,
  },
];

const centres = [
  {
    name: "Apollo Diagnostics",
    location: "Delhi NCR",
    rating: "4.8",
    price: "₹2,500",
    distance: "2.4 km",
    slots: ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"],
  },
  {
    name: "Dr. Lal PathLabs",
    location: "Ghaziabad",
    rating: "4.7",
    price: "₹2,650",
    distance: "3.1 km",
    slots: ["9:30 AM", "12:00 PM", "3:30 PM", "5:00 PM"],
  },
  {
    name: "Metropolis Healthcare",
    location: "Noida",
    rating: "4.6",
    price: "₹2,400",
    distance: "5.8 km",
    slots: ["10:30 AM", "1:00 PM", "3:00 PM", "6:00 PM"],
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [booking, setBooking] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = () => {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    setBooking(true);

    setTimeout(() => {
      setBooking(false);
      setConfirmed(true);
    }, 1000);
  };

  const resetBooking = () => {
    setSelectedTest(null);
    setSelectedCentre(null);
    setSelectedSlot("");
    setConfirmed(false);
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">✚</span>
          Diag<span>Flow</span>
        </div>

        <div className="nav-links">
          <a href="#tests">Tests</a>
          <a href="#centres">Centres</a>
          <a href="#how">How it works</a>
          <button className="nav-btn">My Bookings</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge">● Trusted diagnostic booking platform</div>

          <h1>
            Find the right test.
            <br />
            <span>At the right centre.</span>
          </h1>

          <p>
            Compare diagnostic tests, prices and nearby centres —
            then book your appointment in minutes.
          </p>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search MRI, CT Scan, Blood Test..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Search</button>
          </div>

          <div className="quick-search">
            Popular:
            <button onClick={() => setSearch("MRI")}>MRI</button>
            <button onClick={() => setSearch("CT")}>CT Scan</button>
            <button onClick={() => setSearch("Blood")}>Blood Test</button>
            <button onClick={() => setSearch("X-Ray")}>X-Ray</button>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-top">
            <span>Today's availability</span>
            <span className="live">● LIVE</span>
          </div>

          <div className="scan-icon">⌁</div>

          <h3>Diagnostic centres near you</h3>
          <p>120+ centres available</p>

          <div className="availability">
            <div>
              <strong>45+</strong>
              <span>Tests</span>
            </div>
            <div>
              <strong>120+</strong>
              <span>Centres</span>
            </div>
            <div>
              <strong>4.8★</strong>
              <span>Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      {search && (
        <section className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SEARCH RESULTS</p>
              <h2>Available diagnostic tests</h2>
            </div>
          </div>

          <div className="test-grid">
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <div className="test-card" key={test.name}>
                  <div className="test-icon">✚</div>
                  <span className="category">{test.category}</span>
                  <h3>{test.name}</h3>
                  <p>{test.description}</p>

                  <div className="card-bottom">
                    <div>
                      <small>Starting from</small>
                      <strong>{test.price}</strong>
                    </div>

                    <button onClick={() => setSelectedTest(test)}>
                      Compare →
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No diagnostic test found.</p>
            )}
          </div>
        </section>
      )}

      {/* POPULAR TESTS */}
      <section className="section" id="tests">
        <div className="section-heading">
          <div>
            <p className="eyebrow">POPULAR TESTS</p>
            <h2>Book a diagnostic test</h2>
          </div>

          <span className="view-all">View all →</span>
        </div>

        <div className="test-grid">
          {tests.map((test) => (
            <div className="test-card" key={test.name}>
              <div className="test-icon">✚</div>
              <span className="category">{test.category}</span>
              <h3>{test.name}</h3>
              <p>{test.description}</p>

              <div className="card-bottom">
                <div>
                  <small>Starting from</small>
                  <strong>{test.price}</strong>
                </div>

                <button onClick={() => setSelectedTest(test)}>
                  Compare →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CENTRES */}
      <section className="section centres-section" id="centres">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TOP CENTRES</p>
            <h2>Compare nearby diagnostic centres</h2>
          </div>
        </div>

        <div className="centre-grid">
          {centres.map((centre) => (
            <div className="centre-card" key={centre.name}>
              <div className="centre-image">🏥</div>

              <div className="centre-info">
                <div className="rating">★ {centre.rating}</div>
                <h3>{centre.name}</h3>
                <p>📍 {centre.location}</p>
                <p>↗ {centre.distance} away</p>

                <div className="centre-price">
                  <span>Starting from</span>
                  <strong>{centre.price}</strong>
                </div>

                <button
                  className="book-btn"
                  onClick={() => {
                    setSelectedCentre(centre);
                    setSelectedTest(tests[0]);
                  }}
                >
                  View slots
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <div className="section-heading center">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>Healthcare booking, simplified.</h2>
        </div>

        <div className="steps">
          <div>
            <span>01</span>
            <h3>Search</h3>
            <p>Find the diagnostic test you need.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Compare</h3>
            <p>Compare centres, prices and availability.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Book</h3>
            <p>Select a convenient slot and confirm.</p>
          </div>

          <div>
            <span>04</span>
            <h3>Go</h3>
            <p>Visit the centre at your scheduled time.</p>
          </div>
        </div>
      </section>

      {/* BOOKING MODAL */}
      {selectedTest && (
        <div className="modal-overlay">
          <div className="modal">
            {!confirmed ? (
              <>
                <button className="close" onClick={resetBooking}>
                  ×
                </button>

                <p className="eyebrow">BOOK APPOINTMENT</p>

                <h2>{selectedTest.name}</h2>

                <p className="modal-subtitle">
                  Choose a diagnostic centre and available time slot.
                </p>

                <div className="modal-centres">
                  {centres.map((centre) => (
                    <div
                      className={`modal-centre ${
                        selectedCentre?.name === centre.name ? "selected" : ""
                      }`}
                      key={centre.name}
                      onClick={() => setSelectedCentre(centre)}
                    >
                      <div>
                        <strong>{centre.name}</strong>
                        <small>
                          ★ {centre.rating} · {centre.distance}
                        </small>
                      </div>

                      <strong>{centre.price}</strong>
                    </div>
                  ))}
                </div>

                {selectedCentre && (
                  <>
                    <label>Select a time slot</label>

                    <div className="slots">
                      {selectedCentre.slots.map((slot) => (
                        <button
                          className={selectedSlot === slot ? "active" : ""}
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    <button className="confirm-btn" onClick={handleBook}>
                      {booking ? "Processing..." : "Continue to Payment →"}
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="success">
                <div className="success-icon">✓</div>

                <p className="eyebrow">BOOKING CONFIRMED</p>

                <h2>Your appointment is confirmed!</h2>

                <p>
                  {selectedTest.name} at{" "}
                  <strong>{selectedCentre.name}</strong>
                </p>

                <div className="confirmation">
                  <span>Appointment</span>
                  <strong>Today · {selectedSlot}</strong>
                </div>

                <div className="confirmation">
                  <span>Payment</span>
                  <strong>₹{selectedCentre.price.replace("₹", "")}</strong>
                </div>

                <button className="confirm-btn" onClick={resetBooking}>
                  Back to DiagFlow
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div className="logo">
          <span className="logo-icon">✚</span>
          Diag<span>Flow</span>
        </div>

        <p>
          Simplifying diagnostic discovery and appointment booking.
        </p>

        <small>© 2026 DiagFlow · MVP Project</small>
      </footer>
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";

const tests = [
  { id: 1, name: "MRI Brain", category: "MRI", price: 2500, centres: 8 },
  { id: 2, name: "CT Scan Chest", category: "CT Scan", price: 1800, centres: 6 },
  { id: 3, name: "Complete Blood Count", category: "Blood Test", price: 350, centres: 15 },
  { id: 4, name: "Chest X-Ray", category: "X-Ray", price: 250, centres: 18 },
];

const centres = [
  {
    id: 1,
    name: "Apollo Diagnostics",
    location: "Delhi NCR",
    rating: 4.8,
    price: 2500,
    distance: "2.4 km",
    slots: ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"],
  },
  {
    id: 2,
    name: "Dr. Lal PathLabs",
    location: "Ghaziabad",
    rating: 4.7,
    price: 2650,
    distance: "3.1 km",
    slots: ["9:30 AM", "12:00 PM", "3:30 PM", "5:00 PM"],
  },
  {
    id: 3,
    name: "Metropolis Healthcare",
    location: "Noida",
    rating: 4.6,
    price: 2400,
    distance: "5.8 km",
    slots: ["10:30 AM", "1:00 PM", "3:00 PM", "6:00 PM"],
  },
];

const getUsers = () =>
  JSON.parse(localStorage.getItem("diagflow_users") || "[]");

const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("diagflow_current_user") || "null");

const getBookings = () =>
  JSON.parse(localStorage.getItem("diagflow_bookings") || "[]");

function Layout({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const sync = () => setUser(getCurrentUser());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const logout = () => {
    localStorage.removeItem("diagflow_current_user");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logoIcon">✚</span>
          Diag<span>Flow</span>
        </Link>

        <div className="navLinks">
          <Link to="/">Home</Link>

          {user ? (
            <>
              <Link to="/dashboard">My Bookings</Link>
              <span className="welcome">Hi, {user.name.split(" ")[0]}</span>
              <button className="navBtn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="navCta">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {children}

      <footer>
        <div>
          <h3>
            <span>✚</span> DiagFlow
          </h3>
          <p>Find. Compare. Book. Your diagnostics, simplified.</p>
        </div>
        <div>
          <p>© 2026 DiagFlow • Healthcare Booking Platform</p>
          <small>MVP Demo — Secure backend integration coming soon.</small>
        </div>
      </footer>
    </>
  );
}

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = tests.filter((test) =>
    test.name.toLowerCase().includes(search.toLowerCase())
  );

  const bookTest = (test) => {
    navigate(`/book/${test.id}`);
  };

  return (
    <div>
      <section className="hero">
        <div className="heroContent">
          <div className="badge">Healthcare diagnostics, simplified</div>

          <h1>
            Find the right test.
            <br />
            <span>Book it with confidence.</span>
          </h1>

          <p>
            Compare diagnostic centres, prices and available slots in one
            simple platform.
          </p>

          <div className="searchBox">
            <span>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search MRI, CT Scan, Blood Test..."
            />
            <button onClick={() => document.getElementById("tests")?.scrollIntoView()}>
              Search
            </button>
          </div>
        </div>

        <div className="heroCard">
          <div className="heroCardIcon">🩺</div>
          <h3>Healthcare at your fingertips</h3>
          <p>Compare trusted diagnostic centres near you.</p>
          <div className="heroStats">
            <div><strong>40+</strong><small>Tests</small></div>
            <div><strong>25+</strong><small>Centres</small></div>
            <div><strong>4.8★</strong><small>Rating</small></div>
          </div>
        </div>
      </section>

      <section className="section" id="tests">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">POPULAR TESTS</p>
            <h2>What are you looking for?</h2>
          </div>
        </div>

        <div className="testGrid">
          {filtered.map((test) => (
            <div className="testCard" key={test.id}>
              <div className="testIcon">
                {test.category === "Blood Test"
                  ? "🩸"
                  : test.category === "X-Ray"
                  ? "🦴"
                  : "🔬"}
              </div>
              <h3>{test.name}</h3>
              <p>{test.category}</p>
              <div className="testBottom">
                <strong>₹{test.price}</strong>
                <span>{test.centres} centres</span>
              </div>
              <button onClick={() => bookTest(test)}>Compare Centres →</button>
            </div>
          ))}
        </div>
      </section>

      <section className="section lightSection">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">TRUSTED CENTRES</p>
            <h2>Top diagnostic centres</h2>
          </div>
        </div>

        <div className="centreGrid">
          {centres.map((centre) => (
            <div className="centreCard" key={centre.id}>
              <div className="centreTop">
                <div className="centreLogo">✚</div>
                <div>
                  <h3>{centre.name}</h3>
                  <p>📍 {centre.location}</p>
                </div>
              </div>

              <div className="centreInfo">
                <span>⭐ {centre.rating}</span>
                <span>📍 {centre.distance}</span>
              </div>

              <div className="centrePrice">
                <span>Starting from</span>
                <strong>₹{centre.price}</strong>
              </div>

              <button onClick={() => navigate("/book/1")}>
                View Slots
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="howSection">
        <p className="eyebrow">HOW IT WORKS</p>
        <h2>Healthcare booking made simple</h2>

        <div className="steps">
          <div>
            <span>01</span>
            <h3>Search</h3>
            <p>Find the diagnostic test you need.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Compare</h3>
            <p>Compare centres, prices and slots.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Book</h3>
            <p>Select your preferred time slot.</p>
          </div>
          <div>
            <span>04</span>
            <h3>Confirm</h3>
            <p>Complete payment and receive confirmation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();

    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("diagflow_current_user", JSON.stringify(user));
    navigate("/dashboard");
    window.location.reload();
  };

  return (
    <AuthPage
      title="Welcome back"
      subtitle="Login to manage your diagnostic bookings."
    >
      <form onSubmit={login} className="authForm">
        {error && <div className="error">{error}</div>}

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <button type="submit">Login →</button>

        <p className="authSwitch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </AuthPage>
  );
}

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const register = (e) => {
    e.preventDefault();

    const users = getUsers();

    if (users.some((u) => u.email === form.email)) {
      setError("An account with this email already exists.");
      return;
    }

    users.push(form);
    localStorage.setItem("diagflow_users", JSON.stringify(users));
    localStorage.setItem("diagflow_current_user", JSON.stringify(form));

    navigate("/dashboard");
    window.location.reload();
  };

  return (
    <AuthPage
      title="Create your account"
      subtitle="Book diagnostic tests in just a few clicks."
    >
      <form onSubmit={register} className="authForm">
        {error && <div className="error">{error}</div>}

        <label>Full Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Rohit Kumar"
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
        />

        <label>Password</label>
        <input
          type="password"
          required
          minLength="6"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Minimum 6 characters"
        />

        <button type="submit">Create Account →</button>

        <p className="authSwitch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthPage>
  );
}

function AuthPage({ title, subtitle, children }) {
  return (
    <div className="authPage">
      <div className="authCard">
        <Link to="/" className="authLogo">
          <span>✚</span> DiagFlow
        </Link>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

function Booking() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const testId = Number(window.location.pathname.split("/").pop());
  const test = tests.find((t) => t.id === testId) || tests[0];

  const [selectedCentre, setSelectedCentre] = useState(centres[0]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const confirmBooking = () => {
    if (!selectedSlot) return;

    setProcessing(true);

    setTimeout(() => {
      const booking = {
        id: `DF-${Date.now().toString().slice(-6)}`,
        userEmail: user.email,
        test: test.name,
        centre: selectedCentre.name,
        location: selectedCentre.location,
        slot: selectedSlot,
        amount: selectedCentre.price,
        status: "Confirmed",
        date: new Date().toLocaleDateString("en-IN"),
      };

      const bookings = getBookings();
      bookings.push(booking);
      localStorage.setItem("diagflow_bookings", JSON.stringify(bookings));

      navigate(`/confirmation/${booking.id}`);
    }, 1000);
  };

  return (
    <div className="bookingPage">
      <div className="bookingContainer">
        <button className="backBtn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <div className="bookingHeader">
          <p className="eyebrow">BOOK DIAGNOSTIC TEST</p>
          <h1>{test.name}</h1>
          <p>Compare centres and choose your preferred slot.</p>
        </div>

        <div className="bookingLayout">
          <div>
            <h2>1. Choose a centre</h2>

            {centres.map((centre) => (
              <div
                key={centre.id}
                className={`centreOption ${
                  selectedCentre.id === centre.id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedCentre(centre);
                  setSelectedSlot("");
                }}
              >
                <div>
                  <h3>{centre.name}</h3>
                  <p>
                    📍 {centre.location} • ⭐ {centre.rating} •{" "}
                    {centre.distance}
                  </p>
                </div>
                <strong>₹{centre.price}</strong>
              </div>
            ))}

            <h2 className="slotTitle">2. Choose a time slot</h2>

            <div className="slots">
              {selectedCentre.slots.map((slot) => (
                <button
                  key={slot}
                  className={selectedSlot === slot ? "slot selectedSlot" : "slot"}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="summaryCard">
            <p className="eyebrow">BOOKING SUMMARY</p>
            <h2>{test.name}</h2>

            <div className="summaryRow">
              <span>Centre</span>
              <strong>{selectedCentre.name}</strong>
            </div>

            <div className="summaryRow">
              <span>Location</span>
              <strong>{selectedCentre.location}</strong>
            </div>

            <div className="summaryRow">
              <span>Time</span>
              <strong>{selectedSlot || "Select a slot"}</strong>
            </div>

            <div className="summaryTotal">
              <span>Total</span>
              <strong>₹{selectedCentre.price}</strong>
            </div>

            <button
              className="payBtn"
              disabled={!selectedSlot || processing}
              onClick={confirmBooking}
            >
              {processing ? "Processing..." : "Pay & Confirm Booking"}
            </button>

            <small>🔒 Demo payment — no real money is charged.</small>
          </div>
        </div>
      </div>
    </div>
  );
}

function Confirmation() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const bookingId = window.location.pathname.split("/").pop();

  const booking = getBookings().find(
    (b) => b.id === bookingId && b.userEmail === user?.email
  );

  if (!booking) return <Navigate to="/dashboard" replace />;

  return (
    <div className="confirmationPage">
      <div className="confirmationCard">
        <div className="successIcon">✓</div>
        <p className="eyebrow">BOOKING CONFIRMED</p>
        <h1>Your diagnostic test is booked!</h1>
        <p className="confirmationText">
          Your appointment details have been saved to your DiagFlow account.
        </p>

        <div className="confirmationDetails">
          <div><span>Booking ID</span><strong>{booking.id}</strong></div>
          <div><span>Test</span><strong>{booking.test}</strong></div>
          <div><span>Centre</span><strong>{booking.centre}</strong></div>
          <div><span>Time</span><strong>{booking.slot}</strong></div>
          <div><span>Amount</span><strong>₹{booking.amount}</strong></div>
        </div>

        <button onClick={() => navigate("/dashboard")}>
          View My Bookings
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" replace />;

  const bookings = getBookings().filter(
    (booking) => booking.userEmail === user.email
  );

  return (
    <div className="dashboard">
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <div>
            <p className="eyebrow">MY ACCOUNT</p>
            <h1>Hello, {user.name} 👋</h1>
            <p>Manage your diagnostic appointments.</p>
          </div>
          <Link to="/" className="bookNewBtn">
            + Book New Test
          </Link>
        </div>

        <div className="dashboardStats">
          <div>
            <span>📋</span>
            <strong>{bookings.length}</strong>
            <p>Total Bookings</p>
          </div>
          <div>
            <span>✓</span>
            <strong>{bookings.filter((b) => b.status === "Confirmed").length}</strong>
            <p>Confirmed</p>
          </div>
          <div>
            <span>🏥</span>
            <strong>25+</strong>
            <p>Diagnostic Centres</p>
          </div>
        </div>

        <div className="bookingList">
          <h2>My Bookings</h2>

          {bookings.length === 0 ? (
            <div className="emptyBookings">
              <div>📋</div>
              <h3>No bookings yet</h3>
              <p>Find a diagnostic test and book your first appointment.</p>
              <Link to="/">Explore Tests</Link>
            </div>
          ) : (
            bookings
              .slice()
              .reverse()
              .map((booking) => (
                <div className="bookingCard" key={booking.id}>
                  <div className="bookingIcon">🔬</div>

                  <div className="bookingMain">
                    <div>
                      <h3>{booking.test}</h3>
                      <p>{booking.centre} • {booking.location}</p>
                    </div>

                    <div className="bookingMeta">
                      <span>📅 {booking.date}</span>
                      <span>🕐 {booking.slot}</span>
                      <span>₹{booking.amount}</span>
                    </div>
                  </div>

                  <span className="status">{booking.status}</span>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

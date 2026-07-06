import { useState, useEffect, useRef } from 'react';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [splashVisible, setSplashVisible] = useState(true);
  const appJsLoaded = useRef(false);

  useEffect(() => {
    // Expose a global callback so app.js can signal React to dismiss the splash
    window.__hideSplashReact = () => {
      setSplashVisible(false);
    };

    // Dynamically load app.js after React mounts so it can access the DOM
    if (!appJsLoaded.current) {
      appJsLoaded.current = true;
      const script = document.createElement('script');
      script.src = import.meta.env.BASE_URL + 'app.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* Premium animated splash — managed by React state */}
      <SplashScreen isVisible={splashVisible} />

      {/* App shell — identical HTML structure to original index.html */}
      <div className="app-shell">

        {/* AUTH VIEW */}
        <div id="auth-view" style={{ display: 'none', padding: '30px 20px', overflowY: 'auto', height: '100%' }}>
          <header style={{ flexDirection: 'column', textAlign: 'center', marginBottom: 30, gap: 8 }}>
            <img
              src="assets/logo.png"
              alt="PocketSafe Logo"
              style={{ width: 88, height: 88, borderRadius: 24, boxShadow: '0 12px 40px rgba(26,107,219,0.3)', margin: '0 auto', display: 'block', objectFit: 'cover' }}
            />
            <div className="logo-text-lg" style={{ marginTop: 10 }}>
              <span className="word-pocket">Pocket</span><span className="word-safe">Safe</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>Collaborative Budget &amp; Split Tracker</p>
          </header>

          {/* Login Form */}
          <div id="login-form" className="card">
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Welcome Back</h2>
            <div className="input-group">
              <label>Username</label>
              <input type="text" id="login-username" placeholder="Enter username" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" id="login-password" placeholder="••••••••" />
            </div>
            <div className="input-group" style={{ marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, textTransform: 'none', cursor: 'pointer' }}>
                <input type="checkbox" id="login-remember" style={{ width: 'auto', height: 'auto' }} defaultChecked />
                Keep me logged in
              </label>
            </div>
            <button className="btn btn-primary" onClick={() => window.handleLogin()}>Login</button>

            <div id="google-signin-container" style={{ marginTop: 16 }}>
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 700, marginBottom: 12, position: 'relative' }}>
                <span style={{ background: 'var(--card-bg)', padding: '0 8px', position: 'relative', zIndex: 2 }}>OR</span>
                <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'var(--border-color)', zIndex: 1 }}></div>
              </div>
              <button className="btn btn-secondary" onClick={() => window.loginWithGoogle()} style={{ display: 'flex', gap: 10, padding: 12, borderRadius: 'var(--radius-md)', fontWeight: 700, alignItems: 'center', justifyContent: 'center', width: '100%', fontSize: '0.85rem', border: '1px solid var(--border-color)', background: 'var(--card-bg)', cursor: 'pointer', color: 'var(--text-primary)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 4 }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign In with Google
              </button>
            </div>

            <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              First time? <a href="#" onClick={(e) => { e.preventDefault(); window.toggleAuthMode('register'); }} style={{ color: 'var(--primary)', textDecoration: 'none' }}>Create unique profile</a>
            </p>
          </div>

          {/* Register Form */}
          <div id="register-form" className="card" style={{ display: 'none' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Create Profile</h2>
            <div className="input-group">
              <label>Username</label>
              <input type="text" id="reg-username" placeholder="Choose username" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" id="reg-password" placeholder="Minimum 6 characters" />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" id="reg-confirm-password" placeholder="Confirm your password" />
            </div>
            <button className="btn btn-primary" onClick={() => window.handleRegister()}>Sign Up</button>
            <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Already have a profile? <a href="#" onClick={(e) => { e.preventDefault(); window.toggleAuthMode('login'); }} style={{ color: 'var(--primary)', textDecoration: 'none' }}>Log In</a>
            </p>
          </div>
        </div>

        {/* MAIN APP VIEW */}
        <div id="app-view" style={{ display: 'none' }}>
          <div className="app-container">
            {/* App Header */}
            <header>
              <div className="logo-badge" onClick={() => window.showProfileModal()}>
                <img src="assets/logo.png" alt="Logo" />
                <div className="logo-text">
                  <span className="word-pocket">Pocket</span><span className="word-safe">Safe</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button className="icon-btn" onClick={() => window.toggleTheme()} id="theme-toggle">
                  <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ display: 'none', width: 17, height: 17 }}>
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                  <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: 17, height: 17 }}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </button>
                <div className="user-pill" id="user-profile-badge" onClick={() => window.showProfileModal()}>
                  <div className="user-pill-avatar" id="user-pill-avatar-img">👤</div>
                  <span id="user-display-name">...</span>
                </div>
              </div>
            </header>

            {/* 1. DASHBOARD VIEW */}
            <div id="view-dashboard" className="view active">
              <div id="username-reminder-banner" className="card" style={{ display: 'none', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', padding: '12px 16px', marginBottom: 16, borderRadius: 12, alignItems: 'center', gap: 10, color: 'var(--warning)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => window.showProfileModal()}>
                <span>⚠️ Set your unique username in Profile to make it easy for roommates to add you!</span>
              </div>
              <div className="card" style={{ padding: '16px 20px' }}>
                <div className="budget-gauge">
                  <div className="gauge-circle" id="budget-progress-dial">
                    <div className="gauge-content">
                      <div className="gauge-amount" id="safe-to-spend">₹0.00</div>
                      <div className="gauge-label">Safe Today</div>
                    </div>
                  </div>
                  <div className="budget-stats">
                    <div className="budget-stat-item">
                      <div className="budget-stat-val" id="parent-allowance">₹0.00</div>
                      <div className="budget-stat-lbl">Allowance</div>
                    </div>
                    <div className="budget-stat-item" style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: 20 }}>
                      <div className="budget-stat-val" id="total-wallet">₹0.00</div>
                      <div className="budget-stat-lbl">In Wallet</div>
                    </div>
                    <div className="budget-stat-item" style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: 20 }}>
                      <div className="budget-stat-val" id="saved-money" style={{ color: 'var(--success)' }}>₹0.00</div>
                      <div className="budget-stat-lbl">Savings</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 style={{ marginBottom: 8 }}>Quick Spend / Split ⚡</h2>
                <div className="quick-log-wrapper">
                  <div className="quick-log-input-group">
                    <span style={{ position: 'absolute', left: 16, top: 12, fontWeight: 700, fontSize: '1.25rem' }}>₹</span>
                    <input type="number" id="quick-amount" placeholder="0.00" className="quick-amount-input" style={{ paddingLeft: 36 }} />
                    <button className="btn btn-primary" onClick={() => window.handleQuickAdd()} style={{ width: 'auto', padding: '12px 18px', borderRadius: 14 }}>Log</button>
                  </div>
                  <div id="quick-split-section" style={{ marginTop: 4 }}>
                    <div className="roommate-bubbles-label">Tap to Split With (1-Click split):</div>
                    <div className="roommate-bubbles-container" id="quick-split-bubbles"></div>
                  </div>
                  <div className="quick-chips-scroll">
                    <button className="quick-chip" onClick={() => window.quickLogTemplate('Tea ☕', 20)}>☕ ₹20 Tea</button>
                    <button className="quick-chip" onClick={() => window.quickLogTemplate('Maggi 🍜', 50)}>🍜 ₹50 Maggi</button>
                    <button className="quick-chip" onClick={() => window.quickLogTemplate('Auto 🛺', 40)}>🛺 ₹40 Auto</button>
                    <button className="quick-chip" onClick={() => window.quickLogTemplate('Canteen 🍛', 120)}>🍛 ₹120 Lunch</button>
                    <button className="quick-chip" onClick={() => window.quickLogTemplate('Xerox 📚', 30)}>📚 ₹30 Xerox</button>
                  </div>
                </div>
              </div>

              <div className="card" id="savings-goal-card" style={{ cursor: 'pointer' }} onClick={() => window.switchView('view-settings', document.querySelector(".nav-item[data-target='view-settings']"))}>
                <div className="goal-header">
                  <span className="goal-title" id="goal-title-display">Goal: New Earphones 🎧</span>
                  <span className="goal-values" id="goal-progress-values">₹0 / ₹0</span>
                </div>
                <div className="goal-progress-track">
                  <div className="goal-progress-bar" id="goal-progress-bar"></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="goal-meta" id="goal-days-status">Log below budget to build savings!</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Edit Goal →</span>
                </div>
              </div>

              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h2>Recent Activity</h2>
                  <span id="quick-settlement-alert" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}></span>
                </div>
                <ul className="transaction-list" id="recent-transactions">
                  <li className="list-item" style={{ color: 'var(--text-secondary)', justifyContent: 'center', fontSize: '0.9rem' }}>No transactions recorded</li>
                </ul>
                <button className="btn btn-secondary" style={{ marginTop: 14, padding: 10 }} onClick={() => window.showHistoryView()}>Show Full History</button>
              </div>
            </div>

            {/* 2. HISTORY VIEW */}
            <div id="view-history" className="view">
              <header style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => window.switchView('view-dashboard', document.querySelector(".nav-item[data-target='view-dashboard']"))} style={{ background: 'none', border: 'none', fontSize: '1.3rem', color: 'var(--text-primary)', cursor: 'pointer', padding: 4 }}>←</button>
                  <h2 style={{ margin: 0 }}>History Feed</h2>
                </div>
              </header>
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, gap: 8 }}>
                  <select id="history-filter" onChange={() => window.renderHistoryView()} style={{ padding: 10, borderRadius: 12 }}>
                    <option value="30days">Last 30 Days</option>
                    <option value="1year">Last 1 Year</option>
                    <option value="all">All Time</option>
                  </select>
                  <button className="btn btn-primary" style={{ width: 'auto', padding: '10px 16px', borderRadius: 12, fontSize: '0.85rem' }} onClick={() => window.exportHistoryToCSV()}>Export CSV</button>
                </div>
                <ul className="transaction-list" id="history-list"></ul>
              </div>
            </div>

            {/* 3. REPORTS VIEW */}
            <div id="view-reports" className="view">
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h2 style={{ margin: 0 }}>Allowance Reports</h2>
                  <select id="reports-filter" onChange={() => window.renderReports()} style={{ width: 'auto', padding: 8, borderRadius: 10 }}>
                    <option value="this_month">This Month</option>
                    <option value="last_month">Last Month</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 16, color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600 }} id="reports-date-display"></div>
                <div className="stats-grid">
                  <div className="stat-item"><div className="stat-label">Inflow</div><div className="stat-value text-success" id="report-income">₹0.00</div></div>
                  <div className="stat-item"><div className="stat-label">Outflow</div><div className="stat-value text-danger" id="report-expense">₹0.00</div></div>
                  <div className="stat-item"><div className="stat-label">Savings</div><div className="stat-value" id="report-savings" style={{ color: 'var(--primary)' }}>₹0.00</div></div>
                </div>
              </div>
              <div className="card"><h2>Cash Flow</h2><div className="bar-chart-container" id="bar-chart-container"></div></div>
              <div className="card">
                <h2>Top Expenses</h2>
                <div className="chart-donut-wrapper">
                  <div id="category-donut" className="donut-chart"></div>
                  <div id="category-legend" className="donut-legend"></div>
                </div>
              </div>
            </div>

            {/* 4. FRIENDS / DEBT VIEW */}
            <div id="view-friends" className="view">
              <div className="card">
                <h2>Roommates &amp; Friends</h2>
                <div style={{ marginBottom: 16 }}>
                  <div className="stat-label">Total Others Owe You</div>
                  <span style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--success)' }} id="total-owed">₹0.00</span>
                </div>
                <ul className="friend-list" id="friends-list"></ul>
                <button className="btn btn-primary" onClick={() => window.showAddFriendModal()} style={{ marginTop: 14 }}>+ Add Split Friend</button>
              </div>
            </div>

            {/* 5. SETTINGS VIEW */}
            <div id="view-settings" className="view">
              <div className="card">
                <h2>Income / Allowance Config</h2>
                <div className="input-group">
                  <label>Monthly Allowance (Optional) (₹)</label>
                  <input type="number" id="salary-input" placeholder="Pocket money amount" />
                </div>
                <div className="input-group">
                  <label>Allowance Receive Date</label>
                  <select id="salary-date"></select>
                </div>
                <button className="btn btn-primary" id="save-salary-btn">Save Allowance Settings</button>
              </div>
              <div className="card">
                <h2>Savings Goal Setup</h2>
                <div className="input-group"><label>Goal Name</label><input type="text" id="goal-title-input" placeholder="e.g. New Earphones 🎧" /></div>
                <div className="input-group"><label>Target Amount (₹)</label><input type="number" id="goal-target-input" placeholder="Target budget" /></div>
                <div className="input-group"><label>Deposit into Savings (₹)</label><input type="number" id="goal-deposit-input" placeholder="Deduct from Wallet & Save" /></div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-secondary" onClick={() => window.depositToSavings()} style={{ flex: 1 }}>Deposit</button>
                  <button className="btn btn-primary" onClick={() => window.saveSavingsGoal()} style={{ flex: 2 }}>Save Goal Setup</button>
                </div>
              </div>
              <div className="card">
                <h2>Data Management</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button className="btn btn-secondary" onClick={() => window.loadDemoData()}>Load Sample Demo Data</button>
                  <button className="btn btn-danger" onClick={() => window.clearAllData()}>Reset All Profiles &amp; Data</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <nav className="bottom-nav">
            <a href="#" className="nav-item active" data-target="view-dashboard" onClick={(e) => { e.preventDefault(); window.switchView('view-dashboard', e.currentTarget); }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              <span>Home</span>
            </a>
            <a href="#" className="nav-item" data-target="view-friends" onClick={(e) => { e.preventDefault(); window.switchView('view-friends', e.currentTarget); }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A3.375 3.375 0 0111.625 22.5h-1.25a3.375 3.375 0 01-3.375-3.263v-.114m0-10.464a3 3 0 110-6 3 3 0 010 6zm6 0a3 3 0 110-6 3 3 0 010 6zM3.375 7.5h.008v.008H3.375V7.5zm0 3h.008v.008H3.375v-.008zm0 3h.008v.008H3.375v-.008z" /></svg>
              <span>Split</span>
            </a>
            <a href="#" className="nav-item" data-target="view-reports" onClick={(e) => { e.preventDefault(); window.switchView('view-reports', e.currentTarget); }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>
              <span>Reports</span>
            </a>
            <a href="#" className="nav-item" data-target="view-settings" onClick={(e) => { e.preventDefault(); window.switchView('view-settings', e.currentTarget); }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827a1.125 1.125 0 01.26 1.43l-1.297 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Setup</span>
            </a>
          </nav>

          {/* FAB */}
          <button className="fab" id="add-transaction-btn" onClick={() => window.showTransactionModal()}>+</button>
        </div>

        {/* MODAL OVERLAYS */}

        {/* 1. Transaction Modal */}
        <div id="modal-transaction" className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginBottom: 16 }}>New Transaction</h2>
            <div className="input-group"><label>Description</label><input type="text" id="t-desc" placeholder="e.g. Canteen Lunch, Xerox" /></div>
            <div className="input-group"><label>Amount (₹)</label><input type="number" id="t-amount" placeholder="0.00" /></div>
            <div className="input-group">
              <label>Transaction Type</label>
              <select id="t-type">
                <option value="expense">Personal Expense</option>
                <option value="income">External Income</option>
                <option value="lend">Lend to Friend</option>
                <option value="repayment">Friend Repayment</option>
                <option value="split">Split Bill</option>
              </select>
            </div>
            <div className="input-group" id="friend-selector-group" style={{ display: 'none' }}>
              <label>Select Friend</label>
              <select id="t-friend-select"></select>
            </div>
            <div className="input-group" id="split-selector-group" style={{ display: 'none' }}>
              <label style={{ marginBottom: 8, display: 'block' }}>Select Participants</label>
              <div style={{ border: '1px solid var(--border-color)', padding: 10, borderRadius: 12, maxHeight: 150, overflowY: 'auto', background: 'var(--input-bg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, borderBottom: '1px solid var(--border-color)', paddingBottom: 6 }}>
                  <input type="checkbox" id="split-include-me" defaultChecked style={{ width: 18, height: 18, marginRight: 8, accentColor: 'var(--primary)' }} />
                  <label htmlFor="split-include-me" style={{ margin: 0, fontWeight: 700 }}>Me (Payer)</label>
                </div>
                <div id="split-friends-list"></div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button className="btn btn-secondary" onClick={() => window.closeModals()} style={{ flex: 1 }}>Cancel</button>
              <button className="btn btn-primary" onClick={() => window.addTransaction()} style={{ flex: 2 }}>Save</button>
            </div>
          </div>
        </div>

        {/* 2. Add Friend Modal */}
        <div id="modal-friend" className="modal-overlay">
          <div className="modal-content" style={{ bottom: 'auto', top: '30%', width: '90%', margin: '0 auto', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
            <h2 style={{ marginBottom: 16 }}>Add Roommate / Friend</h2>
            <div className="input-group"><label>Roommate Username or Email</label><input type="text" id="f-name" placeholder="Enter username or email address" /></div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn btn-secondary" onClick={() => window.closeModals()} style={{ flex: 1 }}>Cancel</button>
              <button className="btn btn-primary" onClick={() => window.addFriend()} style={{ flex: 1 }}>Add Friend</button>
            </div>
          </div>
        </div>

        {/* 3. Onboarding Modal */}
        <div id="modal-onboarding" className="modal-overlay" style={{ display: 'none', background: 'rgba(0,0,0,0.85)', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="modal-content" style={{ bottom: 'auto', top: '15%', width: '90%', margin: '0 auto', borderRadius: 'var(--radius-lg)', position: 'relative', padding: 24 }}>
            <h2 style={{ marginBottom: 8, textAlign: 'center' }}>Welcome to PocketSafe! 🚀</h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, marginBottom: 20 }}>Let's set up your starting balance and monthly allowance.</p>
            <div className="input-group"><label>How much money is in your wallet now? (₹)</label><input type="number" id="onboard-balance" placeholder="e.g. 5000" min="0" /></div>
            <div className="input-group"><label>Monthly Allowance / Pocket Money (Optional) (₹)</label><input type="number" id="onboard-allowance" placeholder="e.g. 8000" min="0" /></div>
            <div className="input-group" style={{ marginBottom: 24 }}>
              <label>Allowance Day of Month</label>
              <select id="onboard-allowance-date"></select>
            </div>
            <button className="btn btn-primary" onClick={() => window.submitOnboarding()} style={{ width: '100%', padding: 12, fontWeight: 700 }}>Get Started</button>
          </div>
        </div>

        {/* 4. Profile Modal */}
        <div id="modal-profile" className="modal-overlay" style={{ display: 'none', background: 'rgba(0,0,0,0.85)', alignItems: 'center', justifyContent: 'center', zIndex: 9998 }}>
          <div className="modal-content" style={{ bottom: 'auto', top: '10%', width: '90%', margin: '0 auto', borderRadius: 'var(--radius-lg)', position: 'relative', padding: 24, maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: 8, textAlign: 'center' }}>My Profile 👤</h2>
            <div style={{ fontSize: '0.75rem', background: 'rgba(99,102,241,0.04)', border: '1px solid var(--border-color)', padding: '10px 14px', borderRadius: 12, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Email/Account: <span id="profile-email-display" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>...</span></div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>System Username ID: <span id="profile-id-display" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>...</span></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
              <div id="profile-avatar-preview" style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', border: '2px solid var(--primary)', overflow: 'hidden', objectFit: 'cover', color: 'var(--text-secondary)', marginBottom: 8 }}>👤</div>
              <input type="file" id="profile-upload" accept="image/*" style={{ display: 'none' }} onChange={(e) => window.handleImageUpload(e)} />
              <button className="btn btn-secondary" onClick={() => document.getElementById('profile-upload').click()} style={{ width: 'auto', padding: '6px 12px', fontSize: '0.75rem', fontWeight: 700, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--card-bg)', cursor: 'pointer', color: 'var(--text-primary)' }}>Choose Custom Photo</button>
            </div>
            <div className="input-group"><label>Unique Username (ID for friends to add you)</label><input type="text" id="profile-username" placeholder="e.g. rahul_wallet" /></div>
            <div className="input-group"><label>Mobile Number (Optional)</label><input type="tel" id="profile-phone" placeholder="e.g. +91 98765 43210" /></div>
            <div className="input-group" style={{ marginBottom: 24 }}><label>Room No. or Address (Optional)</label><input type="text" id="profile-room" placeholder="e.g. Room 204-B or 12 High St" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn btn-primary" onClick={() => window.saveProfile()} style={{ width: '100%', padding: 12, fontWeight: 700 }}>Save Profile</button>
              <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                <button className="btn btn-secondary" onClick={() => window.closeModals()} style={{ flex: 1, padding: 10 }}>Close</button>
                <button className="btn btn-danger" onClick={() => window.handleLogout()} style={{ flex: 1, padding: 10, background: 'var(--danger)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer' }}>Logout</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

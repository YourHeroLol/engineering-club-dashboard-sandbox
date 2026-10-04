import { useEffect, useMemo, useState } from 'react'
import SandboxBanner from './components/SandboxBanner.jsx'
import LoginPage from './pages/LoginPage.jsx'
import MemberHomePage from './pages/MemberHomePage.jsx'
import OverviewPage from './pages/OverviewPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RosterPage from './pages/RosterPage.jsx'
import { clubApi } from './services/clubApi.js'

const navItems = [
  { id: 'member', label: 'Member portal', minimumAccess: 'member' },
  { id: 'profile', label: 'My profile', minimumAccess: 'member' },
  { id: 'overview', label: 'Officer overview', minimumAccess: 'officer' },
  { id: 'roster', label: 'Member roster', minimumAccess: 'officer' },
]

const accessRank = {
  member: 0,
  officer: 1,
  executive: 2,
}

export default function App() {
  const [activePage, setActivePage] = useState('member')
  const [user, setUser] = useState(null)
  const [members, setMembers] = useState([])
  const [events, setEvents] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const accessLevel = user?.accessLevel ?? 'member'
  const canViewPhone = accessLevel === 'executive'

  const visibleNavItems = useMemo(
    () =>
      navItems.filter(
        (item) => accessRank[accessLevel] >= accessRank[item.minimumAccess],
      ),
    [accessLevel],
  )

  useEffect(() => {
    if (!user) return

    let cancelled = false

    async function loadSandbox() {
      setLoading(true)

      const [nextEvents, nextMembers, nextProfile] = await Promise.all([
        clubApi.getEvents(),
        clubApi.getRoster({ includePhone: canViewPhone }),
        clubApi.getMemberProfile(user.memberId),
      ])

      if (!cancelled) {
        setEvents(nextEvents)
        setMembers(nextMembers)
        setProfile(nextProfile)
        setLoading(false)
      }
    }

    loadSandbox()

    return () => {
      cancelled = true
    }
  }, [user, canViewPhone])

  useEffect(() => {
    const currentItem = navItems.find((item) => item.id === activePage)

    if (
      currentItem &&
      accessRank[accessLevel] < accessRank[currentItem.minimumAccess]
    ) {
      setActivePage('member')
    }
  }, [accessLevel, activePage])

  async function handleLogin(email) {
    const nextUser = await clubApi.login(email)
    if (nextUser) {
      setActivePage('member')
      setUser(nextUser)
    }
    return nextUser
  }

  function renderPage() {
    if (loading) {
      return <div className="loading-card">Loading fictional club data…</div>
    }

    switch (activePage) {
      case 'profile':
        return <ProfilePage profile={profile} />
      case 'overview':
        return <OverviewPage members={members} user={user} />
      case 'roster':
        return <RosterPage members={members} canViewPhone={canViewPhone} />
      case 'member':
      default:
        return <MemberHomePage user={user} events={events} profile={profile} />
    }
  }

  return (
    <div className="app-shell">
      <SandboxBanner />

      <header className="site-header">
        <div>
          <p className="eyebrow light">Hartnell Engineering Club</p>
          <h1>Dashboard design challenge</h1>
        </div>

        {user && (
          <button type="button" onClick={() => setUser(null)}>
            Sign out
          </button>
        )}
      </header>

      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div className="workspace">
          <aside className="sidebar" aria-label="Portal navigation">
            <div className="identity-card">
              <div className="avatar" aria-hidden="true">
                {(user?.fullName || '?').charAt(0)}
              </div>
              <div>
                <strong>{user?.fullName || 'Loading…'}</strong>
                <span>{user?.role || 'Checking role'}</span>
              </div>
            </div>

            <nav>
              {visibleNavItems.map((item) => (
                <button
                  className={activePage === item.id ? 'active' : ''}
                  key={item.id}
                  type="button"
                  onClick={() => setActivePage(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <p className="sidebar-note">
              Team members are encouraged to replace this navigation and visual
              system with their own approach.
            </p>
          </aside>

          <main className="main-content">{renderPage()}</main>
        </div>
      )}
    </div>
  )
}

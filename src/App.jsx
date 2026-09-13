import { useEffect, useMemo, useState } from 'react'
import RoleSwitcher from './components/RoleSwitcher.jsx'
import SandboxBanner from './components/SandboxBanner.jsx'
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
  const [accessLevel, setAccessLevel] = useState('executive')
  const [activePage, setActivePage] = useState('overview')
  const [user, setUser] = useState(null)
  const [members, setMembers] = useState([])
  const [events, setEvents] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const canViewPhone = accessLevel === 'executive'

  const visibleNavItems = useMemo(
    () =>
      navItems.filter(
        (item) => accessRank[accessLevel] >= accessRank[item.minimumAccess],
      ),
    [accessLevel],
  )

  useEffect(() => {
    let cancelled = false

    async function loadSandbox() {
      setLoading(true)

      const nextUser = await clubApi.getCurrentUser(accessLevel)
      const [nextEvents, nextMembers, nextProfile] = await Promise.all([
        clubApi.getEvents(),
        clubApi.getRoster({ includePhone: canViewPhone }),
        clubApi.getMemberProfile(nextUser.memberId),
      ])

      if (!cancelled) {
        setUser(nextUser)
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
  }, [accessLevel, canViewPhone])

  useEffect(() => {
    const currentItem = navItems.find((item) => item.id === activePage)

    if (
      currentItem &&
      accessRank[accessLevel] < accessRank[currentItem.minimumAccess]
    ) {
      setActivePage('member')
    }
  }, [accessLevel, activePage])

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

        <RoleSwitcher value={accessLevel} onChange={setAccessLevel} />
      </header>

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
    </div>
  )
}

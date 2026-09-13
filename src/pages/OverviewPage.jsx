export default function OverviewPage({ members, user }) {
  const volunteers = members.filter((member) => member.volunteerInterest).length
  const raffleTickets = members.reduce(
    (total, member) => total + member.raffleTickets,
    0,
  )
  const majors = new Set(members.map((member) => member.major)).size

  const stats = [
    ['Registered members', members.length],
    ['Volunteer interest', volunteers],
    ['Raffle tickets', raffleTickets],
    ['Majors represented', majors],
  ]

  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">Officer overview</p>
        <h2>Welcome, {user?.fullName || 'Officer'}.</h2>
        <p>
          These totals use mock data. Your redesign can add charts, shortcuts,
          announcements, or other useful officer tools.
        </p>
      </section>

      <section className="stat-grid" aria-label="Mock club statistics">
        {stats.map(([label, value]) => (
          <article className="stat-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="prompt-card">
        <p className="eyebrow">Design prompt</p>
        <h2>What would make officers’ work easier?</h2>
        <p>
          Consider mobile layouts, accessible color contrast, useful filters,
          clear information hierarchy, and fewer repetitive tasks.
        </p>
      </section>
    </div>
  )
}

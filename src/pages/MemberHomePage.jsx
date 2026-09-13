export default function MemberHomePage({ user, events, profile }) {
  return (
    <div className="page-stack">
      <section className="welcome-panel">
        <div>
          <p className="eyebrow">Member portal</p>
          <h2>Welcome, {profile?.nickname || user?.fullName || 'Member'}.</h2>
          <p>
            This is the member-facing starting point. Redesign it, reorganize it,
            or replace it completely.
          </p>
        </div>
        <div className="profile-badge" aria-hidden="true">
          {(profile?.fullName || user?.fullName || 'M').charAt(0)}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Calendar</p>
            <h2>Upcoming meetings and events</h2>
          </div>
          <span className="count-pill">{events.length} scheduled</span>
        </div>

        <div className="event-grid">
          {events.map((event) => (
            <article className="event-card" key={event.id}>
              <time dateTime={event.date}>
                {new Date(`${event.date}T12:00:00`).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <h3>{event.name}</h3>
              <p>{event.time}</p>
              <p>{event.location}</p>
              <p className="event-details">{event.details}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

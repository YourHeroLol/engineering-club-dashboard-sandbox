function Detail({ label, value }) {
  return (
    <div className="profile-detail">
      <dt>{label}</dt>
      <dd>{value || 'Not provided'}</dd>
    </div>
  )
}

export default function ProfilePage({ profile }) {
  if (!profile) {
    return <p>Profile unavailable.</p>
  }

  return (
    <div className="page-stack">
      <section className="profile-header">
        <div className="profile-badge large" aria-hidden="true">
          {profile.fullName.charAt(0)}
        </div>
        <div>
          <p className="eyebrow">My profile</p>
          <h2>{profile.fullName}</h2>
          <p>{profile.series} reference record</p>
        </div>
      </section>

      <dl className="profile-grid">
        <Detail label="Nickname" value={profile.nickname} />
        <Detail label="Pronouns" value={profile.pronouns} />
        <Detail label="Major" value={profile.major} />
        <Detail label="Portal email" value={profile.hartnellEmail} />
        <Detail
          label="Volunteer interests"
          value={profile.volunteerSkills.join(', ')}
        />
        <Detail label="Raffle tickets" value={String(profile.raffleTickets)} />
        <Detail label="Membership year" value={profile.membershipYear} />
      </dl>
    </div>
  )
}

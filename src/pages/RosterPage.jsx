import { useMemo, useState } from 'react'

export default function RosterPage({ members, canViewPhone }) {
  const years = useMemo(
    () => [...new Set(members.map((member) => member.membershipYear))].sort().reverse(),
    [members],
  )
  const [selectedYear, setSelectedYear] = useState(years[0] ?? '')
  const [query, setQuery] = useState('')

  const visibleMembers = useMemo(() => {
    const search = query.trim().toLowerCase()

    return members.filter((member) => {
      const matchesYear = !selectedYear || member.membershipYear === selectedYear
      const matchesSearch =
        !search ||
        [
          member.fullName,
          member.nickname,
          member.major,
          member.hartnellEmail,
          member.series,
        ].some((value) => value.toLowerCase().includes(search))

      return matchesYear && matchesSearch
    })
  }, [members, query, selectedYear])

  return (
    <div className="page-stack">
      <section className="page-intro roster-intro">
        <div>
          <p className="eyebrow">Officer tools</p>
          <h2>Member roster</h2>
          <p>
            {canViewPhone
              ? 'Executive access: fictional phone numbers are visible.'
              : 'Standard officer access: phone numbers are withheld by the data service.'}
          </p>
        </div>

        <div className="filters">
          <label>
            <span>Membership year</span>
            <select
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Search roster</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, major, series…"
            />
          </label>
        </div>
      </section>

      <div className="table-card">
        <div className="table-summary">
          Showing {visibleMembers.length} fictional member
          {visibleMembers.length === 1 ? '' : 's'}
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Nickname</th>
                <th>Pronouns</th>
                <th>Major</th>
                <th>Portal email</th>
                <th>Volunteer interests</th>
                <th>Raffle tickets</th>
                {canViewPhone && <th>Phone</th>}
              </tr>
            </thead>
            <tbody>
              {visibleMembers.map((member) => (
                <tr key={member.studentId}>
                  <td>
                    <strong>{member.fullName}</strong>
                    <small>{member.series}</small>
                  </td>
                  <td>{member.nickname}</td>
                  <td>{member.pronouns}</td>
                  <td>{member.major}</td>
                  <td>{member.hartnellEmail}</td>
                  <td>
                    {member.volunteerSkills.length > 0
                      ? member.volunteerSkills.join(', ')
                      : 'Not interested'}
                  </td>
                  <td className="numeric">{member.raffleTickets}</td>
                  {canViewPhone && <td>{member.phone}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

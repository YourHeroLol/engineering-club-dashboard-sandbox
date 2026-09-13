const roles = [
  {
    value: 'member',
    label: 'Registered member',
    detail: 'Member portal only',
  },
  {
    value: 'officer',
    label: 'Officer',
    detail: 'Roster without phone numbers',
  },
  {
    value: 'executive',
    label: 'Executive officer',
    detail: 'President, Vice President, or Secretary',
  },
]

export default function RoleSwitcher({ value, onChange }) {
  return (
    <label className="role-switcher">
      <span>Preview access level</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label} — {role.detail}
          </option>
        ))}
      </select>
    </label>
  )
}

import { mockEvents } from '../data/mockEvents.js'

// Public sandbox sheet with fictional records only. Edit the sheet to change
// the data; the row-1 headers must match the field names used by the pages.
// Never point this at the production spreadsheet.
const SHEET_ID = '1-SmDYsoxgFQypXSN9EmBbvCnb3BeCaWzw2BerZYNzyc'
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1`

const delay = (value) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(structuredClone(value)), 150)
  })

// Google wraps the JSON in a function call, so cut out the {...} part first.
async function getMembers() {
  const text = await (await fetch(SHEET_URL)).text()
  const { table } = JSON.parse(
    text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1),
  )
  const headers = table.cols.map((col) => col.label)

  return table.rows.map((row) => {
    const member = Object.fromEntries(
      headers.map((header, i) => [header, row.c[i]?.v ?? '']),
    )
    member.volunteerSkills = member.volunteerSkills
      ? member.volunteerSkills.split(',').map((skill) => skill.trim())
      : []
    return member
  })
}

export const clubApi = {
  // Sandbox login: anyone who types an email from the sheet gets in.
  // No password on purpose — real auth belongs on the production server.
  async login(email) {
    const members = await getMembers()
    const member = members.find(
      (record) =>
        record.hartnellEmail.toLowerCase() === email.trim().toLowerCase(),
    )
    if (!member) return null

    return {
      fullName: member.fullName,
      role: member.title || 'Registered Member',
      accessLevel: member.accessLevel || 'member',
      memberId: member.studentId,
    }
  },

  getEvents() {
    return delay(mockEvents)
  },

  async getRoster({ membershipYear, includePhone = false } = {}) {
    const members = await getMembers()
    return members
      .filter(
        (member) =>
          !membershipYear || member.membershipYear === membershipYear,
      )
      .map(({ phone, ...member }) =>
        includePhone ? { ...member, phone } : member,
      )
  },

  async getMemberProfile(memberId) {
    const members = await getMembers()
    return members.find((record) => record.studentId === memberId) ?? null
  },
}

import { mockEvents } from '../data/mockEvents.js'
import { mockMembers, mockUsers } from '../data/mockMembers.js'

const delay = (value) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(structuredClone(value)), 150)
  })

export const clubApi = {
  getCurrentUser(accessLevel = 'member') {
    return delay(mockUsers[accessLevel])
  },

  getEvents() {
    return delay(mockEvents)
  },

  getRoster({ membershipYear, includePhone = false } = {}) {
    const records = mockMembers
      .filter(
        (member) =>
          !membershipYear || member.membershipYear === membershipYear,
      )
      .map(({ phone, ...member }) =>
        includePhone ? { ...member, phone } : member,
      )

    return delay(records)
  },

  getMemberProfile(memberId) {
    const member = mockMembers.find((record) => record.studentId === memberId)
    return delay(member ?? null)
  },
}

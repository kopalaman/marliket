/* eslint-disable @typescript-eslint/no-unused-vars */
// src/lib/helpers/appwrite-helpers.ts
import { Models, Teams as TeamsType } from "node-appwrite"

/**
 * Check team membership and roles for a user
 */
export const checkTeamMembership = async (
  teams: TeamsType,
  teamId: string
): Promise<{ isMember: boolean; roles: string[] }> => {
  try {
    const membership = await teams.listMemberships(teamId)
    const userMembership = membership.memberships[0]

    return {
      isMember: !!userMembership,
      roles: userMembership?.roles || [],
    }
  } catch (error) {
    return { isMember: false, roles: [] }
  }
}

/**
 * Get all members of a vendor's team
 */
export const getVendorTeamMembers = async (
  teams: TeamsType,
  vendorId: string
) => {
  try {
    const memberships = await teams.listMemberships(vendorId)
    return memberships
  } catch (error) {
    console.error("Error fetching team memberships:", error)
    throw error
  }
}

/**
 * Check if user has specific role in team
 */
export const hasTeamRole = async (
  teams: TeamsType,
  teamId: string,
  role: string
): Promise<boolean> => {
  const { roles } = await checkTeamMembership(teams, teamId)
  return roles.includes(role)
}

/**
 * Get team details with membership info
 */
export const getTeamDetails = async (
  teams: TeamsType,
  teamId: string
): Promise<{
  team: Models.Team<Record<string, unknown>>
  memberships: Models.MembershipList
} | null> => {
  try {
    const [team, memberships] = await Promise.all([
      teams.get(teamId),
      teams.listMemberships(teamId),
    ])

    return {
      team,
      memberships,
    }
  } catch (error) {
    console.error("Error fetching team details:", error)
    return null
  }
}

/**
 * Create team invitation URL
 */
export const createTeamInviteUrl = (
  frontendUrl: string,
  teamId: string,
  membershipId: string
): string => {
  const url = new URL(`${frontendUrl}/vendor-invitation`)
  url.searchParams.set("teamId", teamId)
  url.searchParams.set("membershipId", membershipId)
  return url.toString()
}

/**
 * Format team membership data for response
 */
export const formatTeamMembership = (membership: Models.Membership) => ({
  id: membership.$id,
  userId: membership.userId,
  teamId: membership.teamId,
  roles: membership.roles,
  invited: membership.invited,
  joined: membership.joined,
  confirm: membership.confirm,
})

/**
 * Check if user can perform specific team action
 */
export const canPerformTeamAction = async (
  teams: TeamsType,
  teamId: string,
  requiredRoles: string[]
): Promise<boolean> => {
  const { roles } = await checkTeamMembership(teams, teamId)
  return requiredRoles.some((role) => roles.includes(role))
}

/**
 * Get paginated team members
 */
export const getPaginatedTeamMembers = async (
  teams: TeamsType,
  teamId: string,
  page: number = 1,
  limit: number = 20
) => {
  try {
    const memberships = await teams.listMemberships(teamId, [
      `limit(${limit})`,
      `offset(${(page - 1) * limit})`,
    ])

    return {
      data: memberships.memberships.map(formatTeamMembership),
      total: memberships.total,
      page,
      limit,
    }
  } catch (error) {
    console.error("Error fetching paginated team members:", error)
    throw error
  }
}

/**
 * Team role constants
 */
export const TeamRoles = {
  ADMIN: "admin",
  MEMBER: "member",
  OWNER: "owner",
} as const

type TeamRole = (typeof TeamRoles)[keyof typeof TeamRoles]

/**
 * Check if role is valid
 */
export const isValidTeamRole = (role: string): role is TeamRole => {
  return Object.values(TeamRoles).includes(role as TeamRole)
}

/**
 * Type guard for team membership
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTeamMembership = (obj: any): obj is Models.Membership => {
  return (
    obj &&
    typeof obj.$id === "string" &&
    typeof obj.userId === "string" &&
    typeof obj.teamId === "string" &&
    Array.isArray(obj.roles)
  )
}

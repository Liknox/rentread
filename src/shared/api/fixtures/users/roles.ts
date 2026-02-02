import type { Role } from "@shared/api/types"

export const USER: Role = {
  id: 1,
  name: "User",
}

export const MODERATOR: Role = {
  id: 2,
  name: "Moderator",
}

export const ADMIN: Role = {
  id: 3,
  name: "Admin",
}

export const getAll = [USER, MODERATOR, ADMIN]

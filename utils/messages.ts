export const MESSAGES = {
  TITLE: {
    MIN: "Title must be at least 3 characters",
    MAX: "Title cannot exceed 100 characters",
  },
  DESC: {
    MAX_LENGTH: "Description cannot exceed 500 characters",
  },
  PRIORITY: {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
  },
} as const;

export const ERRORS = {
  SERVER:{
    CODE:500,
    MESSAGE:'Somthing went wrong'
  }
}

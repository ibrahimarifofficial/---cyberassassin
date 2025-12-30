// Image path helper to ensure correct paths
export const getImagePath = (path: string): string => {
  // If path already starts with /, return as is
  if (path.startsWith('/')) {
    return path
  }
  // Otherwise, prepend /assets/images/
  return `/assets/images/${path}`
}

// Service icons with proper encoding
export const serviceIcons = {
  penetration: '/assets/images/cyber-security%20(1).png',
  webApp: '/assets/images/security%20(1).png',
  network: '/assets/images/cyber-security.png',
  dataPrivacy: '/assets/images/cyber-security%20(2).png',
  incident: '/assets/images/time-keeping.png',
  cloud: '/assets/images/secure-data.png',
}



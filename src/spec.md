# Specification

## Summary
**Goal:** Fix admin login failures by wiring the app to the correct Firebase project and switching the Login page to real Firebase email/password authentication (without changing the page UI).

**Planned changes:**
- Replace placeholder exports in `frontend/src/firebase.ts` with real Firebase initialization using the exact user-provided `firebaseConfig`, and export working Firebase instances (at minimum `auth` and `db`).
- Update `frontend/src/pages/LoginPage.tsx` to sign in via Firebase Authentication (email/password) instead of localStorage credential validation, while keeping the current layout and mapping errors to the existing messages.
- After successful Firebase sign-in, load the signed-in user’s authorization record from the app’s existing user storage source and populate in-memory authorization via `setAuthzState(...)` so navbar/route guards work.
- Remove or bypass localStorage-only admin seeding/credential checks so seeded users (e.g., admin@example.com/admin123) do not affect Firebase login outcomes.

**User-visible outcome:** Users can sign in with their Firebase Auth email/password; invalid credentials show “Invalid email or password”, and unapproved non-admin users see “Your account is waiting for admin approval.” Navigation and protected routes reflect the signed-in user’s authorization state.

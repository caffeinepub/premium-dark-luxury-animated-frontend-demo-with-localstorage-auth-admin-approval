# Specification

## Summary
**Goal:** Replace the existing per-section approval model with a per-user approval + page-level permissions system (`approved`, `allowedPages`) backed by the app’s existing localStorage user records, and enforce it across login, routes, and navigation (no real-time behavior).

**Planned changes:**
- Update localStorage user record shape to include `approved: boolean` and `allowedPages: string[]`, and remove or consistently map any existing `status: pending/approved/rejected` usage so the app no longer depends on the old model.
- Adjust login flow to: validate credentials, load the stored user record, block login if `approved` is false with the exact message “Your account is waiting for admin approval.”, and store session permission state (including `allowedPages`) for immediate use by navbar and route guards.
- On app load/page refresh, if a session exists, re-load the current user’s stored record and refresh in-memory permission state (no listeners/subscriptions).
- Update route guards for all existing internal routes to enforce `allowedPages`: unauthenticated users still go to `/login` with existing return-to behavior; approved non-admin users navigating to disallowed routes are redirected to `/` and an access-denied reason is surfaced via the existing `accessDenied` search-param pattern.
- Update the authenticated Navbar to show only links whose page IDs are present in `allowedPages` for non-admin users; admins continue to see all internal links (including Admin); logout remains available for all authenticated users.
- Extend the existing Admin Panel user management UI to support editing `approved` (toggle) and `allowedPages` (checkbox list of current route page IDs, at minimum: home, intelus, videos, files, live, admin as applicable), with a per-user save/update action that persists to storage immediately (no real-time behavior).

**User-visible outcome:** Admins can approve users and assign which pages they may access; approved users can log in and only see/visit permitted pages, while attempts to access disallowed pages redirect safely to home with an access-denied message, and permissions update on the next refresh or login.

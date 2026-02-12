# Specification

## Summary
**Goal:** Fix the runtime crash by ensuring the entire React component tree is wrapped by `AuthzProvider` at the root entry point.

**Planned changes:**
- Create a new React entry module (e.g., `frontend/src/main.authz.tsx`) that mirrors the provider composition from `frontend/src/main.tsx` and adds `AuthzProvider` so it wraps the router-rendered `<App />`.
- Update `frontend/index.html` to load the new entry module instead of `./src/main.tsx`.
- Keep `frontend/src/App.tsx` unchanged and avoid modifying the immutable `frontend/src/main.tsx`.

**User-visible outcome:** The app loads and all routes (public and protected) render without the error `useAuthzState must be used within an AuthzProvider`.

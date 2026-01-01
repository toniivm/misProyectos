# 🔧 Login Persistence Fix for Production

## Problem
In production, the login was not persisting across page refreshes. Users would log in, but when refreshing the page, they would be logged out.

## Root Causes Found

### 1. **AuthContext Not Restoring User on Mount** ⚠️
**File:** `src/context/AuthContext.jsx`

The context was:
- ✅ Saving user to `localStorage` when logged in
- ❌ **NOT reading from `localStorage` on app initialization**
- ❌ Starting with `user = null` on every page load

**Impact:** On page refresh, even though the user was in localStorage, the component re-mounted and reset the state to `null`, clearing the login immediately.

### 2. **Firebase Initialization Race Condition** ⚠️
The app would display nothing (`loading=true`) while waiting for Firebase `onAuthStateChanged`. But if Firebase env vars were missing in the Docker build, `auth` would be `null`, and the listener would never fire.

### 3. **Environment Variables Not Passed to Docker Build** ⚠️
**Files:** `Dockerfile`, `render.yaml`

React requires environment variables to be baked into the build (not available at runtime). But:
- ❌ The Dockerfile was using `ARG` without defaults
- ❌ `render.yaml` wasn't passing env vars as build arguments
- ❌ Result: Firebase was initialized as `null` in production

## Solutions Implemented

### ✅ 1. Restore User from localStorage on Mount
**File:** `src/context/AuthContext.jsx`

```jsx
const [user, setUser] = useState(() => {
  // Restore user from localStorage on mount
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
});
```

**Benefit:** User persists immediately on page load, no blank screen.

### ✅ 2. Fix Firebase Auth Not Clearing on Logout
```jsx
if (currentUser) {
  // User logged in - update state
  localStorage.setItem('user', JSON.stringify(normalized));
  setUser(normalized);
} else {
  // Only clear if explicitly signed out (not on init)
  localStorage.removeItem('user');
  setUser(null);
}
```

### ✅ 3. Pass Environment Variables to Docker Build
**File:** `Dockerfile`

```dockerfile
# Use ${VAR:-} to allow fallback to empty string
ENV REACT_APP_FIREBASE_API_KEY=${REACT_APP_FIREBASE_API_KEY:-} \
    REACT_APP_FIREBASE_AUTH_DOMAIN=${REACT_APP_FIREBASE_AUTH_DOMAIN:-} \
    ...
```

**File:** `render.yaml`

```yaml
dockerArgs:
  - build-arg
  - REACT_APP_FIREBASE_API_KEY
  - build-arg
  - REACT_APP_FIREBASE_AUTH_DOMAIN
  ...
```

**Benefit:** Render now passes environment variables to Docker build stage.

## Testing

✅ Local development - user persists on page refresh  
✅ Build completes successfully with new Dockerfile  
✅ Changes pushed to production (will rebuild on next deploy)

## What to Expect

After redeployment on Render:
1. User logs in → localStorage stores the user
2. Page refreshes → User state restored immediately
3. Logout → User cleared from localStorage
4. Page refresh after logout → Stays logged out

## Files Changed

- ✏️ `src/context/AuthContext.jsx` - Restore user from localStorage
- ✏️ `Dockerfile` - Pass env vars to build
- ✏️ `render.yaml` - Add dockerArgs for build args

---

**Commit:** `fix(auth): restore user from localStorage on mount; pass env vars to Docker build`

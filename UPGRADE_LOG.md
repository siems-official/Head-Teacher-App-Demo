# Expo SDK Upgrade Log — SDK 52 → 53

**Date:** 2026-09-23
**Scope:** SDK 52.0.47 → 53.0.27 only (task explicitly stops at SDK 53.)
**Nothing was committed or pushed; all changes left as uncommitted working-tree changes.**

---

## 1. SDK version

| | Before | After |
|---|---|---|
| expo | ~52.0.47 | ~53.0.27 |
| react-native | 0.76.9 | 0.79.6 |
| react | 18.3.1 | 19.0.0 |
| expo-router | ~4.0.21 | ~5.1.11 |

## 2. Package.json dependency diff (before → after)

### dependencies
| Package | Before | After | Type |
|---|---|---|---|
| expo | ~52.0.47 | ~53.0.27 | MAJOR (SDK bump) |
| @react-native-async-storage/async-storage | 1.23.1 | 2.1.2 | MAJOR (API-compatible) |
| expo-router | ~4.0.21 | ~5.1.11 | MAJOR |
| react | 18.3.1 | 19.0.0 | MAJOR |
| react-native | 0.76.9 | 0.79.6 | MINOR (signific. change) |
| react-native-safe-area-context | 4.12.0 | 5.4.0 | MAJOR (SafeAreaView only) |
| react-native-reanimated | ~3.16.1 | ~3.17.4 (inst. 3.17.5) | MINOR |
| react-native-screens | ~4.4.0 | ~4.11.1 | MINOR |
| react-native-svg | 15.8.0 | 15.11.2 | MINOR |
| expo-build-properties | ~0.13.3 | ~0.14.8 | MINOR |
| expo-image | ~2.0.7 | ~2.4.1 | MINOR |
| expo-secure-store | ^14.0.1 | ~14.2.4 | MINOR (range normalized) |
| expo-application | ~6.0.2 | ~6.1.5 | MINOR |
| expo-checkbox | ~4.0.1 | ~4.1.4 | MINOR |
| expo-constants | ~17.0.7 | ~17.1.8 | MINOR |
| expo-linear-gradient | ~14.0.2 | ~14.1.5 | MINOR |
| expo-linking | ~7.0.5 | ~7.1.7 | MINOR |
| expo-status-bar | ~2.0.1 | ~2.2.3 | MINOR |
| **expo-font** | *(not declared — satisfied transitively)* | ~13.3.2 | **ADDED** (was required by code) |
| **expo-asset** | *(not declared — satisfied transitively)* | ~11.1.7 | **ADDED** (dep of expo-font) |

Unchanged: @reduxjs/toolkit ^2.6.0, @rn-primitives/portal ^1.2.0, @rn-primitives/select ^1.1.0, clsx ^2.1.1, jwt-decode ^4.0.0, moment ^2.30.1, nativewind ^4.1.23, react-hook-form ^7.54.2, react-native-calendars ^1.1311.0, react-native-modal ^13.0.1, react-native-portalize ^1.0.7, react-native-simple-toast ^3.3.2, react-native-toast-message ^2.2.1, react-native-version-check ^3.5.0, react-redux ^9.2.0, tailwind-merge ^3.0.2, tailwindcss ^3.4.17.

### devDependencies
| Package | Before | After | Type |
|---|---|---|---|
| @types/react | ~18.3.12 | ~19.0.10 (inst. 19.0.14) | MAJOR |
| (others unchanged: @babel/core, @react-native-community/cli ^19.1.0, babel-plugin-module-resolver, react-native-dotenv, typescript) | | | |

### overrides (ADDED — required to resolve npm ERESOLVE, see section 5)
```json
"overrides": {
  "@types/react": "~19.0.10",
  "react": "19.0.0",
  "react-native": "0.79.6",
  "react-dom": "19.0.0",
  "react-server-dom-webpack": "~19.0.4"
}
```
Rationale: the SDK-53 npm install repeatedly failed ERESOLVE because
`expo-router@5.1.11`'s optional peer `react-server-dom-webpack` resolved to the
latest line (19.2.8) whose peers (`react`/`react-dom` ^19.2.8) conflict with
Expo SDK 53's pinned `react@19.0.0`. This mirrors the SDK-53 default template's
official `overrides` remedy; the literal versions are equal to what Expo installs.

## 3. App config changes (app.json)
- Added config plugins requested by `expo install`: `expo-secure-store`, `expo-font`, `expo-asset`.
- No version numbers or build settings were hand-edited (rule 3 respected throughout).

## 4. Code changes
**None.** No `.js`/`.jsx` source was modified. All changes are dependency/config
declarations: `package.json`, `package-lock.json`, `app.json`.

## 5. Issues hit & resolutions
1. **npm ERESOLVE (react-server-dom-webpack)** during `npx expo install --fix` → fixed with `overrides` above (approved by project owner before applying).
2. **Unable to resolve reference $react-native** (npm `$ref` override mechanics under PowerShell/npm 10.8.2) → converted the three `$ref` overrides to literal pins equal to the manifest versions.
3. **EOVERRIDE @types/react** (override vs direct dep mismatch) → aligned the `devDependencies` entry to the Expo-expected `~19.0.10`.
4. **`expo-font` / `expo-asset` missing at bundle time** — both were previously supplied transitively by the SDK 52 tree; SDK 53's stricter resolution exposed that `app/_layout.jsx` (`useFonts`) and `expo-font`'s `FontLoader` (`expo-asset`) were never declared. Installed explicitly via `npx expo install expo-font` / `npx expo install expo-asset` and registered their config plugins.

## 6. Test results (Metro bundle verification — no device interaction per owner's decision)
Because Expo Go in Sept 2026 runs SDK 54+ only and there is no dev-client binary for SDK 53, runtime verification was performed by forcing full Metro (Hermes, dev-mode) compiles. See `platform` column; PASS = HTTP 200 + complete bundle, no bundler errors.

| Target | Android | iOS |
|---|---|---|
| Full app entry (all routes graph) | PASS (12,108,331 B) | PASS (12,098,118 B) |
| login (`app/login.jsx`) | PASS | PASS |
| attendance (`attendance-management/index`, `list`) | PASS | PASS |
| accounts (`accounts/index`) | PASS | PASS |
| exams (`exam/index`) | PASS | PASS |
| leave management (`leave-management/index`) | PASS | PASS |
| enrollment (`enrollment/index`) | PASS | PASS |
| blood bank (`blood-bank/index`) | PASS | PASS |
| notifications (`notifications/index`) | PASS | PASS |

**Interactive UI testing (login form, navigation, screen interactions) was NOT run** — deferred to you (no usable device/SDK-53 runtime available in this environment).

## 7. Warnings / issues left unresolved
- **expo-doctor RN Directory advisory (pre-existing):** `react-native-version-check` "Untested on New Architecture", `clsx` "Unmaintained", `moment` + `react-native-portalize` "no metadata". Same warning existed on SDK 52 baseline. Left alone (advisory only). `react-native-version-check` is a JS-only package; real New-Arch risk assessment requires an EAS native build.
- **`react-native-simple-toast` / `react-native-version-check` / `react-native-simple-toast` native compatibility:** no native build was executed (EAS cloud build only) — JS/peer compatibility verified (simple-toast peer `react-native >=0.71.0`, version-check `>=0.48.0`), but the **New Architecture native build is unverified** and must be confirmed in a future EAS build.
- **Metro warning:** `@reduxjs/toolkit/query` and `@reduxjs/toolkit/query/react` (used in `store/api/slice.js`) print a non-fatal Metro "invalid package.json configuration" warning (their `exports` contain `..` subpaths). Metro 0.79's default-on `exports` handling falls back to file resolution; the bundle compiles and works. Not auto-fixed (would require changing RTK version out of scope).
- **Metro dev-server crashed (V8 native crash) once** after ~15 sequential large dev bundles during headless verification; clean restart and re-run passed. Most likely environment/memory pressure on Windows during repeated cold-cache Hermes compiles, not a code defect — but monitor if you run many concurrent dev bundles.
- **`expo-splash-screen` still not declared** (`SplashScreen` from expo-router no-ops safely without it). Pre-existing on SDK 52; flagging for awareness, not part of this bump.

## 8. Commit status
- No commits, no pushes, no history changes. Working tree: `app.json`, `package.json`, `package-lock.json` modified; UPGRADE_LOG.md untracked.
# Expo SDK Upgrade Log — SDK 54 → 57

**Date:** 2026-09-24
**Scope:** SDK 54.0.37 → 57.0.24 only (cumulative breaking changes of SDK 55, 56, 57 applied).
**Nothing was committed or pushed; all changes left as uncommitted working-tree changes.**

---

## 1. SDK version

| | Before | After |
|---|---|---|
| expo | ~54.0.37 | ~57.0.24 |
| react-native | 0.81.5 | 0.86.3 |
| react | 19.1.0 | 19.2.3 |
| expo-router | ~6.0.24 | ~57.0.22 (SDK-versioned since SDK 55) |

## 2. Package.json dependency diff (before → after)

### dependencies
| Package | Before | After | Type |
|---|---|---|---|
| expo | ~54.0.37 | ~57.0.24 | MAJOR (SDK bump 55/56/57) |
| expo-router | ~6.0.24 | ~57.0.22 | MAJOR (SDK-v versioning; forked away from react-navigation — react-navigation tree removed from lockfile) |
| react | 19.1.0 | 19.2.3 | MINOR |
| react-native | 0.81.5 | 0.86.3 | MINOR (Hermes v1 + memory fixes) |
| react-native-reanimated | ~4.1.1 (4.1.7) | 4.5.1 | MAJOR |
| react-native-worklets | 0.5.1 | 0.10.1 | MAJOR (SDK-57 aligned) |
| react-native-safe-area-context | ~5.6.0 (5.6.2) | ~5.7.0 | MINOR |
| react-native-screens | ~4.16.0 | ~4.26.0 (4.26.2) | MINOR |
| react-native-svg | 15.12.1 | 15.15.4 | MINOR |
| expo-build-properties | ~1.0.10 | ~57.0.21 | MAJOR (SDK-v versioning) |
| expo-image | ~3.0.11 | ~57.0.5 | MAJOR (SDK-v versioning; API used — `source`/style — unchanged) |
| expo-secure-store | ~15.0.8 | ~57.0.4 | MAJOR |
| expo-application | ~7.0.8 | ~57.0.3 | MAJOR |
| expo-checkbox | ~5.0.8 | ~57.0.0 | MAJOR |
| expo-constants | ~18.0.14 | ~57.0.19 | MAJOR |
| expo-font | ~14.0.12 | ~57.0.4 | MAJOR |
| expo-asset | ~12.0.13 | ~57.0.18 | MAJOR |
| expo-linear-gradient | ~15.0.8 | ~57.0.2 | MAJOR |
| expo-linking | ~8.0.12 | ~57.0.10 | MAJOR |
| expo-status-bar | ~3.0.9 | ~57.0.1 | MAJOR |
| **expo-splash-screen** | *(not declared)* | ~57.0.9 | **ADDED + config plugin** (required after `splash` key removal, see §3) |
| @react-native-async-storage/async-storage | 2.2.0 | 2.2.0 | unchanged (still SDK-expected) |

Unchanged: @reduxjs/toolkit ^2.6.0, @rn-primitives/portal ^1.2.0, @rn-primitives/select ^1.1.0, clsx ^2.1.1, jwt-decode ^4.0.0, moment ^2.30.1, nativewind ^4.1.23, react-hook-form ^7.54.2, react-native-calendars ^1.1314.0, react-native-modal ^13.0.1, react-native-portalize ^1.0.7, react-native-simple-toast ^3.3.2, react-native-toast-message ^2.2.1, react-native-version-check ^3.5.0, react-redux ^9.2.0, tailwind-merge ^3.0.2, tailwindcss ^3.4.17.

### devDependencies
| Package | Before | After | Type |
|---|---|---|---|
| @babel/core | ^7.20.0 | ^7.29.0 | MINOR (Expo-expected) |
| @types/react | ~19.1.10 (19.1.17) | ~19.2.4 (19.2.18) | MINOR |
| typescript | ~5.9.2 | ~6.0.3 | MAJOR (Expo-expected) |

### overrides (keep — re-pinned to SDK 57 values; npm `EOVERRIDE` requires override = direct dep)
```json
"overrides": {
  "@types/react": "~19.2.4",
  "react": "19.2.3",
  "react-native": "0.86.3",
  "react-dom": "19.2.3",
  "react-server-dom-webpack": "~19.2.4"
}
```
Rationale: identical mechanism as prior boots — the overrides block re-pins
react / react-native / react-dom / react-server-dom-webpack / @types/react to
the SDK 57 expected versions (from the sdk-57 `bundledNativeModules.json` and
default template). Values were first held at SDK 54 so `expo install expo@^57`
could install, then `expo install --fix` wrote the 57 direct deps, then the
block was re-pinned to match (no `--legacy-peer-deps`).

## 3. App config changes (app.json)
- **Removed `newArchEnabled: true`** — the option was removed at SDK 55 (Legacy Architecture no longer exists; New Architecture is the only runtime).
- **Migrated `splash` → `expo-splash-screen` config plugin** — top-level `splash` is no longer a valid `app.json` schema key at SDK 57 (expo-doctor schema error). Installed `expo-splash-screen` (`npx expo install`) and moved the same `image`/`resizeMode: "contain"`/`backgroundColor: "#ffffff"` into `["expo-splash-screen", {...}]` in `plugins` (preserves native splash exactly). expo-doctor returned to passing.
- `expo-build-properties` Android block (compileSdk/targetSdk 36, buildTools 36.0.0, usesCleartextTraffic true, versionCode 6, permissions) kept as-is; all keys except `versionCode`/`permissions` are real plugin options at ~57.0.21 (see §7 note).

## 4. Code changes
**None.** No `.js`/`.jsx` source was modified. All changes are dependency/config
declarations: `package.json`, `package-lock.json`, `app.json`.

## 5. Issues hit & resolutions
1. **EOVERRIDE (react)** on first `expo install expo@^57.0.0` — override `react: 19.2.3` conflicted with the still-declared direct dep `react: 19.1.0`. Resolved by first restoring overrides to SDK 54 values → `expo install expo@^57` installs → `expo install --fix` writes the 57 direct deps → overrides re-pinned to the 57 values (`npm install` then EOVERRIDE `@types/react` → aligned the devDependency `~19.2.4`). No `--legacy-peer-deps`.
2. **expo-doctor: `should NOT have additional property 'splash'`** (new, upgrade-caused) — `splash` key removed from app config schema at SDK 57. Fixed by the `expo-splash-screen` plugin migration above (owner's Option A). Doctor back to 20/21.
3. **expo-router 6 → 57 major** — forked away from react-navigation at SDK 56. No direct `@react-navigation/*` imports existed in source, so no code change; the react-navigation tree (~191 packages) was pruned from `package-lock.json` automatically.
4. **Hermes v1 memory regressions** (documented at SDK 56) — resolved upstream by `expo@57.0.17` / RN 0.86.3; target exactly this combo.
5. **`expo/fetch` (WinterTC) becomes default `globalThis.fetch` at SDK 56** — RTK Query baseQuery in `store/api/slice.js` uses global fetch; no code change made, behavior watch-only (see §7).

## 6. Test results (offline full-app export — no server, no device per owner's decision)
Per owner's instruction, Metro was **not** started by the tooling. Verification used
`npx expo export --platform android --platform ios` (bounded, offline compile of the
entire route tree → Hermes bytecode) instead of the previous per-screen dev-bundle
HTTP checks. A single export entry bundle covers the full expo-router route graph.
PASS = export completed with all bundles + assets, no compile error.

| Target | Result |
|---|---|
| Full app entry (all routes graph), Android | PASS (entry .hbc, 5.7 MB) |
| Full app entry (all routes graph), iOS | PASS (entry .hbc, 5.5 MB) |

Production export is a superset of the SDK-54 per-screen dev-bundle matrix (same
module graph, stricter/minified build). Native runtime behavior (worklets,
simple-toast, version-check, edge-to-edge visuals) remains EAS-build-verified.

## 7. Warnings / issues left unresolved
- **expo-doctor RN Directory advisory (pre-existing):** only `react-native-version-check` "Untested on New Architecture". Owner's decision: keep as-is. Real New-Arch check requires an EAS build.
- **`react-native-simple-toast` 3.3.2** (dormant native module, used in 16+ files) **kept per owner decision**; native side unverified until an EAS build.
- **`expo-status-bar` deprecated props:** 10 usages of `backgroundColor`/`translucent` — no-op at SDK 55+ (edge-to-edge is the only behavior). Left in place per owner decision; noted for future cleanup.
- **`versionCode: 6` / `permissions` inside the `expo-build-properties` plugin block were never valid plugin options** (schema tolerates-and-ignores unknown keys) — pre-existing from earlier boots, not introduced by this bump. To take effect, they belong at top-level `app.json` `expo.android.versionCode` / `expo.android.permissions`. Flagged; not changed (production-impacting decision).
- **`expo/fetch` default fetch (SDK 56):** behavior watch-only; cannot be confirmed at bundle level.
- **Native module native builds unverified** (EAS cloud build only) — same standing as SDK 54.
- **Metro dev-server not exercised this run** (owner request to avoid auto-starting servers); prior V8 heap-crash caveat on Windows no longer relevant to this session.

## 8. Commit status
- No commits, no pushes, no history changes. Working tree: `app.json`, `package.json`, `package-lock.json` modified; `UPGRADE_LOG.md` untracked (gitignored per prior instruction; README.md also untracked).

---

# Expo SDK Upgrade Log — SDK 53 → 54

**Date:** 2026-09-23
**Scope:** SDK 53.0.27 → 54.0.37 only (task explicitly stops at SDK 54.)
**Nothing was committed or pushed; all changes left as uncommitted working-tree changes.**

---

## 1. SDK version

| | Before | After |
|---|---|---|
| expo | ~53.0.27 | ~54.0.37 |
| react-native | 0.79.6 | 0.81.5 |
| react | 19.0.0 | 19.1.0 |
| expo-router | ~5.1.11 | ~6.0.24 |

## 2. Package.json dependency diff (before → after)

### dependencies
| Package | Before | After | Type |
|---|---|---|---|
| expo | ~53.0.27 | ~54.0.37 | MAJOR (SDK bump) |
| @react-native-async-storage/async-storage | 2.1.2 | 2.2.0 | MINOR |
| expo-router | ~5.1.11 | ~6.0.24 | MAJOR |
| react | 19.0.0 | 19.1.0 | MINOR |
| react-native | 0.79.6 | 0.81.5 | MINOR (Android 16 / API 36 baseline) |
| react-native-reanimated | ~3.17.4 (3.17.5) | ~4.1.1 (4.1.7) | MAJOR (v4 — New Arch only, worklets split) |
| **react-native-worklets** | *(not installed)* | 0.5.1 (deduped) | **ADDED** (Reanimated 4 required native peer) |
| react-native-safe-area-context | 5.4.0 | ~5.6.0 (5.6.2) | MINOR |
| react-native-screens | ~4.11.1 | ~4.16.0 | MINOR |
| react-native-svg | 15.11.2 | 15.12.1 | MINOR |
| expo-build-properties | ~0.14.8 | ~1.0.10 | MINOR |
| expo-image | ~2.4.1 | ~3.0.11 | MINOR |
| expo-secure-store | ~14.2.4 | ~15.0.8 | MAJOR (SDK-54 aligned) |
| expo-application | ~6.1.5 | ~7.0.8 | MAJOR |
| expo-checkbox | ~4.1.4 | ~5.0.8 | MAJOR |
| expo-constants | ~17.1.8 | ~18.0.14 | MAJOR |
| expo-font | ~13.3.2 | ~14.0.12 | MAJOR |
| expo-asset | ~11.1.7 | ~12.0.13 | MAJOR |
| expo-linear-gradient | ~14.1.5 | ~15.0.8 | MAJOR |
| expo-linking | ~7.1.7 | ~8.0.12 | MAJOR |
| expo-status-bar | ~2.2.3 | ~3.0.9 | MAJOR |
| react-native-calendars | ^1.1311.0 (1.1311.0) | ^1.1311.0 (1.1314.0) | MINOR (bumped to drop hard-pinned safe-area-context 4.5.0 — de-dupe) |

Unchanged: @reduxjs/toolkit ^2.6.0, @rn-primitives/portal ^1.2.0, @rn-primitives/select ^1.1.0, clsx ^2.1.1, jwt-decode ^4.0.0, moment ^2.30.1, nativewind ^4.1.23, react-hook-form ^7.54.2, react-native-modal ^13.0.1, react-native-portalize ^1.0.7, react-native-simple-toast ^3.3.2, react-native-toast-message ^2.2.1, react-native-version-check ^3.5.0, react-redux ^9.2.0, tailwind-merge ^3.0.2, tailwindcss ^3.4.17.

### devDependencies
| Package | Before | After | Type |
|---|---|---|---|
| @types/react | ~19.0.10 (19.0.14) | ~19.1.10 (19.1.17) | MINOR |
| typescript | ^5.3.3 (5.8.3) | ~5.9.2 | MINOR (aligned by expo install --fix) |

### overrides (keep — peer conflict persists; values re-pinned to SDK 54 template)
```json
"overrides": {
  "@types/react": "~19.1.10",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "react-dom": "19.1.0",
  "react-server-dom-webpack": "~19.1.4"
}
```
Rationale: keeping the block (the SDK default template ships it for the same reason
as SDK 53 — unifying react / react-native / react-dom / rsc versions across the
dependency graph). Values were re-pinned from the SDK 53 literals to the SDK 54
expected versions because npm raises `EOVERRIDE` when an override no longer matches
the direct dependency (react 19.1.0, react-native 0.81.5, @types/react ~19.1.10
are exactly what `expo install` wrote to the manifest; react-server-dom-webpack ~19.1.4
matches `expo`'s `bundledNativeModules.json`). No EOVERIDE/ERESOLVE remains as verified by `expo-doctor` and `npm ls`.

## 3. App config changes (app.json)
- Bumped `expo-build-properties` Android `compileSdkVersion`/`targetSdkVersion` 35 → 36 and `buildToolsVersion` "35.0.0" → "36.0.0" (SDK 54 / RN 0.81 defaults require API 36; user-approved before applying).
- No plugin additions/removals required this time (expo-secure-store, expo-font, expo-asset already declared from the SDK 53 pass).

## 4. Code changes
**None.** No `.js`/`.jsx` source was modified. All changes are dependency/config
declarations: `package.json`, `package-lock.json`, `app.json`.

## 5. Issues hit & resolutions
1. **EOVERRIDE (react)** during `expo install --fix` — override `react: 19.0.0` conflicted with the newly-written direct dep `react: 19.1.0`. Re-pinned the whole overrides block to SDK 54 values (pre-approved plan; confirmed against `bundledNativeModules.json`). No `--legacy-peer-deps` used.
2. **expo-doctor: missing `react-native-worklets` peer** — Reanimated v4 hard-requires `react-native-worklets >= 0.5.0` as a direct dependency. Installed via `npx expo install react-native-worklets` (0.5.1). This is a NEW package in SDK 54's native-module set.
3. **expo-doctor: duplicate `react-native-safe-area-context`** (5.6.2 + 4.5.0 nested) — caused by `react-native-calendars@1.1311.0` hard-pinning `4.5.0` as a direct dependency. Bumped calendars to `1.1314.0`, which removed the dependency entirely → duplicate gone. (User decision: bump calendars.)
4. **Metro FATAL V8 "heap out of memory" crash** mid-verification after ~10 sequential cold Hermes dev bundles — identical to the SDK 53 session's documented crash (Windows + repeated cold-cache compiles). Clean Metro restart and re-run passed. Not a code defect.

## 6. Test results (Metro bundle verification — no device interaction per owner's decision)
Expo Go in Sept 2026 runs the latest SDK only (SDK 54 is two behind), so runtime
verification used forced full Metro (Hermes, dev-mode) compiles like SDK 53.
PASS = HTTP 200 + complete bundle, no bundler errors.

| Target | Android | iOS |
|---|---|---|
| Full app entry (all routes graph) | PASS (12,793,846 B) | PASS (12,798,530 B) |
| login (`app/login.jsx`) | PASS | PASS |
| attendance (`attendance-management/index`) | PASS | PASS |
| accounts (`accounts/index`) | PASS | PASS |
| exams (`exam/index`) | PASS | PASS |
| leave management (`leave-management/index`) | PASS | PASS |
| enrollment (`enrollment/index`) | PASS | PASS |
| blood bank (`blood-bank/index`) | PASS | PASS |
| notifications (`notifications/index`) | PASS | PASS |

**Interactive UI testing (login form, navigation, screen interactions) was NOT run** — deferred to you (no usable device/SDK-54 runtime available in this environment).

## 7. Warnings / issues left unresolved
- **expo-doctor RN Directory advisory (pre-existing, now narrowed):** only `react-native-version-check` "Untested on New Architecture" remains (clsx/moment/react-native-portalize advisories no longer flagged). Advisory only; real New-Arch risk assessment requires an EAS native build.
- **Native module native builds unverified:** no native build was executed (EAS cloud build only). New in SDK 54: `react-native-worklets` native module, `react-native-simple-toast`, `react-native-version-check`. JS/peer compatibility verified; native side requires EAS build.
- **Metro warning (pre-existing):** `@reduxjs/toolkit/query` and `/query/react` invalid package.json `exports` (".." subpaths) → Metro falls back to file resolution, bundle compiles fine. Same as SDK 53.
- **`expo-splash-screen` still not declared** (pre-existing; `SplashScreen` from expo-router no-ops safely without it).

## 8. Commit status
- No commits, no pushes, no history changes. Working tree: `app.json`, `package.json`, `package-lock.json` modified; UPGRADE_LOG.md untracked (gitignored per prior instruction; README.md also untracked).

---

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
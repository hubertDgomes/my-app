# Nativewind setup (Expo SDK 58)

This documents the Nativewind v5 setup used by this project. The project uses npm and Expo Router routes under `src/app/`.

> **Compatibility note:** Nativewind v5 is a release candidate. Its installation guide lists Expo 57.0.22 as its tested target, not SDK 58. This project uses Expo 58.0.24 and React Native 0.88.1; the setup was verified here by exporting web and Android bundles, but that does not make SDK 58 an officially supported/tested target.

## 1. Install packages

Install the exact Nativewind and React Native CSS release-candidate pair:

```powershell
npm.cmd install --save-exact nativewind@5.0.0-rc.0 react-native-css@3.1.0-rc.0
npm.cmd install --save-dev --save-exact tailwindcss@4.1.12 @tailwindcss/postcss@4.1.12 postcss lightningcss@1.30.1
```

This project already has `react-native-reanimated`, `react-native-worklets`, `react-native-safe-area-context`, and `expo-system-ui`. If setting up another Expo project and those are missing, install SDK-compatible versions with:

```powershell
npx.cmd expo install react-native-reanimated react-native-worklets react-native-safe-area-context expo-system-ui
```

Pin `lightningcss` in the root `package.json` to avoid CSS deserialization issues:

```json
"overrides": {
  "lightningcss": "1.30.1"
}
```

Merge this into the existing `package.json`; do not replace the rest of the file.

## 2. Configure PostCSS and Metro

Create `postcss.config.mjs` in the project root:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Create `metro.config.js` in the project root:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

module.exports = withNativewind(getDefaultConfig(__dirname));
```

Nativewind v5 does not need the Nativewind v4 Babel preset or a `tailwind.config.js` for this setup.

## 3. Add the global stylesheet

Create `src/global.css`:

```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";
@import "nativewind/theme";
```

Import it once from the Expo Router root layout, `src/app/_layout.tsx`:

```tsx
import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

Keep the CSS import in the root layout so it is loaded before the routes.

## 4. Set up TypeScript

Create `nativewind-env.d.ts` in the project root:

```ts
/// <reference types="react-native-css/types" />
```

Make sure the declaration file is included by `tsconfig.json`. This project's `include` already includes `nativewind-env.d.ts`.

## 5. Try a utility class

For example, in a route:

```tsx
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-[40px] font-bold text-red-500">
        Nativewind works
      </Text>
    </View>
  );
}
```

## 6. Restart Metro and verify

After adding or changing Metro configuration, stop the existing Expo server with **Ctrl+C** and restart with a cleared cache. In Windows PowerShell:

```powershell
npx.cmd expo start --web --clear
```

For Android or iOS, use `npx.cmd expo start --clear` and open the project on the device or simulator. If the default port is already in use, either stop the old server or choose another port:

```powershell
npx.cmd expo start --web --clear --port 8082
```

Open the URL printed by Expo. Confirm the test text is large, bold, and red.

## References

- [Nativewind v5 installation guide](https://www.nativewind.dev/v5/getting-started/installation)
- [Expo SDK 58 Metro configuration](https://docs.expo.dev/versions/v58.0.0/config/metro.md)

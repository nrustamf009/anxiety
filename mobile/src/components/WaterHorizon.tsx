import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, RadialGradient, Rect, Stop } from "react-native-svg";
import { useTheme } from "../theme";

/**
 * The app's signature art: a quiet horizon over still water.
 * Morning light in the light theme, moon over the lake in the dark theme.
 */
export function WaterHorizon({ height = 260 }: { height?: number }) {
  const { c, dark } = useTheme();
  return (
    <View style={[StyleSheet.absoluteFill, { height }]} pointerEvents="none">
      <Svg width="100%" height={height} viewBox="0 0 400 260" preserveAspectRatio="xMidYMax slice">
        <Defs>
          <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={c.skyTop} />
            <Stop offset="1" stopColor={c.skyBottom} />
          </LinearGradient>
          <RadialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
            <Stop offset="0" stopColor={dark ? "#E9E1C9" : "#F6D9A6"} stopOpacity={dark ? 0.35 : 0.75} />
            <Stop offset="1" stopColor={dark ? "#E9E1C9" : "#F6D9A6"} stopOpacity={0} />
          </RadialGradient>
          <LinearGradient id="w3" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={c.wave3} stopOpacity={0.55} />
            <Stop offset="1" stopColor={c.bg} stopOpacity={1} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="400" height="260" fill="url(#sky)" />
        <Circle cx="322" cy="150" r="90" fill="url(#glow)" />
        <Circle cx="322" cy="150" r={dark ? 20 : 26} fill={dark ? "#E6DFCB" : "#F2C987"} opacity={dark ? 0.85 : 0.9} />
        <Path d="M0 168 C 60 160, 120 172, 200 165 S 330 158, 400 166 L400 260 L0 260 Z" fill={c.wave1} />
        <Path d="M0 186 C 70 178, 150 194, 220 186 S 340 178, 400 188 L400 260 L0 260 Z" fill={c.wave2} opacity={0.75} />
        <Path d="M0 206 C 80 198, 160 214, 240 205 S 350 200, 400 208 L400 260 L0 260 Z" fill="url(#w3)" />
        {/* reflection of the light on still water */}
        <Path d="M292 176 h60 M300 184 h44 M309 192 h26 M315 199 h14" stroke={dark ? "#E6DFCB" : "#FFF3DC"} strokeWidth={2} strokeLinecap="round" opacity={0.55} />
      </Svg>
    </View>
  );
}

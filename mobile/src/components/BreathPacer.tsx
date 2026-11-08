import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Platform, Pressable, Text, View } from "react-native";
import { useTheme } from "../theme";

/**
 * Breath prayer pacer: ripples on still water.
 * Default rhythm 4s in / 6s out ≈ 6 breaths per minute — the pace that rhythmic prayer
 * (rosary, mantra) settles into in Bernardi et al., BMJ 2001.
 */
export function BreathPacer({ inhale = 4, exhale = 6, cycles = 10, phraseIn, phraseOut, onDone }: { inhale?: number; exhale?: number; cycles?: number; phraseIn: string; phraseOut: string; onDone?: () => void }) {
  const { c, fonts } = useTheme();
  const scale = useRef(new Animated.Value(0)).current;
  const [phase, setPhase] = useState<"ready" | "in" | "out" | "done">("ready");
  const [cycle, setCycle] = useState(0);
  const running = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => {});
    return () => {
      running.current = false;
      scale.stopAnimation();
    };
  }, [scale]);

  const tick = () => {
    if (Platform.OS !== "web") Haptics.selectionAsync().catch(() => {});
  };

  const run = (n: number) => {
    if (!running.current) return;
    if (n >= cycles) {
      setPhase("done");
      running.current = false;
      onDone?.();
      return;
    }
    setCycle(n + 1);
    setPhase("in");
    tick();
    Animated.timing(scale, { toValue: 1, duration: inhale * 1000, easing: Easing.inOut(Easing.sin), useNativeDriver: Platform.OS !== "web" }).start(({ finished }) => {
      if (!finished || !running.current) return;
      setPhase("out");
      tick();
      Animated.timing(scale, { toValue: 0, duration: exhale * 1000, easing: Easing.inOut(Easing.sin), useNativeDriver: Platform.OS !== "web" }).start(({ finished: f2 }) => f2 && run(n + 1));
    });
  };

  const start = () => {
    running.current = true;
    run(0);
  };
  const stop = () => {
    running.current = false;
    scale.stopAnimation();
    Animated.timing(scale, { toValue: 0, duration: 400, useNativeDriver: Platform.OS !== "web" }).start();
    setPhase("ready");
    setCycle(0);
  };

  const s = (from: number, to: number) => (reduceMotion ? 1 : scale.interpolate({ inputRange: [0, 1], outputRange: [from, to] }));
  const label = phase === "in" ? phraseIn : phase === "out" ? phraseOut : phase === "done" ? "Аминь" : "Нажмите, чтобы начать";
  const hint = phase === "in" ? `вдох · ${inhale} с` : phase === "out" ? `выдох · ${exhale} с` : phase === "done" ? "можно повторить" : `${cycles} дыханий · около ${Math.round(((inhale + exhale) * cycles) / 60)} мин`;

  return (
    <View style={{ alignItems: "center", paddingVertical: 12 }}>
      <Pressable accessibilityRole="button" accessibilityLabel={phase === "ready" || phase === "done" ? "Начать дыхательную молитву" : "Остановить"} onPress={phase === "ready" || phase === "done" ? start : stop} style={{ width: 280, height: 280, alignItems: "center", justifyContent: "center" }}>
        {[1, 0.72, 0.46].map((k, i) => (
          <Animated.View
            key={i}
            style={{
              position: "absolute",
              width: 280 * k,
              height: 280 * k,
              borderRadius: 140 * k,
              borderWidth: i === 0 ? 1 : 0,
              borderColor: c.water + "40",
              backgroundColor: i === 0 ? "transparent" : i === 1 ? c.water + "1A" : c.water + "2E",
              transform: [{ scale: s(i === 0 ? 0.86 : 0.7, 1.04) as any }],
            }}
          />
        ))}
        <Animated.View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: c.water, alignItems: "center", justifyContent: "center", transform: [{ scale: s(0.82, 1.18) as any }], shadowColor: c.waterDeep, shadowOpacity: 0.25, shadowRadius: 24, shadowOffset: { width: 0, height: 8 } }}>
          <Text style={{ color: c.onWater, fontFamily: fonts.sansSemi, fontSize: 14 }}>{phase === "ready" ? "Начать" : phase === "done" ? "Ещё раз" : `${cycle}/${cycles}`}</Text>
        </Animated.View>
      </Pressable>
      <Text accessibilityLiveRegion="polite" style={{ fontFamily: fonts.serif, fontSize: 24, lineHeight: 32, color: c.ink, textAlign: "center", marginTop: 8, minHeight: 64, paddingHorizontal: 16 }}>
        {label}
      </Text>
      <Text style={{ fontFamily: fonts.sansMedium, fontSize: 13, color: c.inkFaint, letterSpacing: 0.4 }}>{hint}</Text>
    </View>
  );
}

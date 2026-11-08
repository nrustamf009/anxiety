import { router } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme";
import { Icon } from "./Icon";

export function Screen({ children, header, scroll = true, contentStyle }: { children: ReactNode; header?: ReactNode; scroll?: boolean; contentStyle?: StyleProp<ViewStyle> }) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const body = (
    <View style={[{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40, maxWidth: 640, width: "100%", alignSelf: "center" }, contentStyle]}>{children}</View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      {scroll ? (
        <ScrollView contentContainerStyle={{ paddingTop: header ? 0 : insets.top }} showsVerticalScrollIndicator={false}>
          {header}
          {body}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, paddingTop: header ? 0 : insets.top }}>
          {header}
          {body}
        </View>
      )}
    </View>
  );
}

/** Top bar: back on the left, the always-visible crisis button on the right. */
export function TopBar({ back = true, tint }: { back?: boolean; tint?: string }) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.topbar, { paddingTop: insets.top + 8 }]}>
      {back ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))} hitSlop={12} style={[styles.round, { backgroundColor: c.surface + "CC", borderColor: c.line }]}>
          <Icon name="back" color={tint ?? c.ink} size={20} />
        </Pressable>
      ) : (
        <View />
      )}
      <CrisisButton />
    </View>
  );
}

export function CrisisButton() {
  const { c, fonts } = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Срочная помощь" onPress={() => router.push("/crisis")} style={({ pressed }) => [styles.crisis, { backgroundColor: c.roseMist, borderColor: c.rose + "40", opacity: pressed ? 0.7 : 1 }]}>
      <Icon name="lifebuoy" color={c.rose} size={16} />
      <Text style={{ color: c.rose, fontFamily: fonts.sansSemi, fontSize: 13 }}>Срочная помощь</Text>
    </Pressable>
  );
}

export function T({ children, style, kind = "body", numberOfLines }: { children: ReactNode; style?: StyleProp<TextStyle>; kind?: "display" | "title" | "h2" | "body" | "small" | "label" | "scripture" | "caption"; numberOfLines?: number }) {
  const { c, fonts } = useTheme();
  const k: Record<string, TextStyle> = {
    display: { fontFamily: fonts.serif, fontSize: 34, lineHeight: 40, color: c.ink, letterSpacing: -0.3 },
    title: { fontFamily: fonts.serif, fontSize: 26, lineHeight: 32, color: c.ink },
    h2: { fontFamily: fonts.serifBold, fontSize: 19, lineHeight: 26, color: c.ink },
    body: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 24, color: c.inkSoft },
    small: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: c.inkSoft },
    label: { fontFamily: fonts.sansBold, fontSize: 11, lineHeight: 14, letterSpacing: 1.4, textTransform: "uppercase", color: c.inkFaint },
    scripture: { fontFamily: fonts.serif, fontSize: 21, lineHeight: 32, color: c.ink },
    caption: { fontFamily: fonts.sansMedium, fontSize: 13, lineHeight: 18, color: c.inkFaint },
  };
  return (
    <Text style={[k[kind], style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

export function Card({ children, style, tone = "surface" }: { children: ReactNode; style?: StyleProp<ViewStyle>; tone?: "surface" | "water" | "sage" | "gold" | "rose" }) {
  const { c, radius } = useTheme();
  const bg = { surface: c.surface, water: c.waterMist, sage: c.sageMist, gold: c.goldMist, rose: c.roseMist }[tone];
  return <View style={[{ backgroundColor: bg, borderRadius: radius.lg, padding: 20, borderWidth: tone === "surface" ? StyleSheet.hairlineWidth : 0, borderColor: c.line }, style]}>{children}</View>;
}

/** Numbered step header for the six-step card path. */
export function StepHeader({ n, title, icon }: { n: number; title: string; icon: string }) {
  const { c, fonts } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 32, marginBottom: 12 }}>
      <View style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: c.gold + "80", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: fonts.serif, color: c.gold, fontSize: 14 }}>{n}</Text>
      </View>
      <T kind="label" style={{ color: c.gold }}>{title}</T>
      <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: c.line }} />
      <Icon name={icon} color={c.inkFaint} size={18} />
    </View>
  );
}

export function Button({ label, onPress, icon, kind = "primary", style }: { label: string; onPress: () => void; icon?: string; kind?: "primary" | "quiet" | "rose"; style?: StyleProp<ViewStyle> }) {
  const { c, fonts, radius } = useTheme();
  const bg = kind === "primary" ? c.water : kind === "rose" ? c.rose : "transparent";
  const fg = kind === "quiet" ? c.water : c.onWater;
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [{ backgroundColor: bg, borderRadius: radius.pill, paddingVertical: 15, paddingHorizontal: 22, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, borderWidth: kind === "quiet" ? 1 : 0, borderColor: c.water + "55", opacity: pressed ? 0.8 : 1 }, style]}>
      {icon ? <Icon name={icon} color={fg} size={18} /> : null}
      <Text style={{ color: fg, fontFamily: fonts.sansSemi, fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  const { c, fonts } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: !!active }} style={{ paddingVertical: 9, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1, borderColor: active ? c.water : c.line, backgroundColor: active ? c.waterMist : c.surface }}>
      <Text style={{ fontFamily: active ? fonts.sansSemi : fonts.sansMedium, color: active ? c.water : c.inkSoft, fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topbar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingBottom: 8, zIndex: 2 },
  round: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", borderWidth: StyleSheet.hairlineWidth },
  crisis: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1 },
});

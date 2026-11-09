import { router } from "expo-router";
import { Linking, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components/Icon";
import { Button, Screen, T } from "../components/ui";
import { crisis } from "../content";
import { useTheme } from "../theme";

/**
 * Crisis screen. No country binding and no phone numbers: plain steps that work anywhere,
 * plus an international directory of help lines. No scripture here on purpose —
 * nothing that could read as "pray harder" when someone needs a human being.
 */
export default function Crisis() {
  const { c, fonts } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Screen
      header={
        <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 16, flexDirection: "row", justifyContent: "flex-end" }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Закрыть" onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))} hitSlop={12} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: c.surface }}>
            <Icon name="close" color={c.ink} size={20} />
          </Pressable>
        </View>
      }
    >
      <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: c.roseMist, alignItems: "center", justifyContent: "center", marginTop: 4 }}>
        <Icon name="lifebuoy" color={c.rose} size={32} />
      </View>
      <T kind="title" style={{ marginTop: 18 }}>Срочная помощь</T>
      <T style={{ marginTop: 10, fontSize: 17, lineHeight: 26, color: c.ink }}>{crisis.message}</T>

      <View style={{ marginTop: 24, gap: 12 }}>
        {crisis.steps.map((s, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 14, padding: 18, borderRadius: 20, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
            <Text style={{ fontFamily: fonts.serifBold, fontSize: 20, color: c.rose, width: 18 }}>{i + 1}</Text>
            <T style={{ flex: 1, color: c.ink }}>{s}</T>
          </View>
        ))}
      </View>

      <Button kind="rose" icon="phone" label={crisis.directory.label} onPress={() => Linking.openURL(crisis.directory.url)} style={{ marginTop: 22 }} />
      <T kind="caption" style={{ marginTop: 10, textAlign: "center" }}>findahelpline.com — бесплатные линии помощи в разных странах мира</T>
    </Screen>
  );
}

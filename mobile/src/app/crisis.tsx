import { router } from "expo-router";
import { Linking, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components/Icon";
import { Chip, Screen, T } from "../components/ui";
import { crisis } from "../content";
import { useSettings, type RegionCode } from "../lib/settings";
import { useTheme } from "../theme";

/**
 * Crisis screen. No scripture here on purpose: nothing that could read as
 * "pray harder" when someone needs a human being. Copy follows WHO/IASP safe messaging.
 */
export default function Crisis() {
  const { c, fonts } = useTheme();
  const insets = useSafeAreaInsets();
  const { settings, update } = useSettings();
  const region = crisis.regions.find((r) => r.code === settings.region) ?? crisis.regions[0];

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

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
        {crisis.regions.map((r) => (
          <Chip key={r.code} label={r.name} active={r.code === region.code} onPress={() => update({ region: r.code as RegionCode })} />
        ))}
      </View>

      <View style={{ marginTop: 20, gap: 12 }}>
        {region.lines.map((l) => (
          <Pressable key={l.phone + l.label} accessibilityRole="button" accessibilityLabel={`Позвонить: ${l.label}`} onPress={() => Linking.openURL(`tel:${l.phone}`)} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 14, padding: 18, borderRadius: 20, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, opacity: pressed ? 0.8 : 1 })}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: c.rose, alignItems: "center", justifyContent: "center" }}>
              <Icon name="phone" color={c.onWater} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.sansSemi, fontSize: 15, color: c.ink }}>{l.label}</Text>
              <Text style={{ fontFamily: fonts.serifBold, fontSize: 20, color: c.ink, marginTop: 2 }}>{l.display ?? l.phone}</Text>
              {l.note ? <T kind="caption">{l.note}</T> : null}
            </View>
          </Pressable>
        ))}
      </View>

      <T kind="caption" style={{ marginTop: 20 }}>
        Если вы в непосредственной опасности — звоните в экстренные службы. Если можете, напишите или позвоните близкому человеку и скажите, что вам плохо.
      </T>
      {!crisis.verified ? <T kind="caption" style={{ marginTop: 8, color: c.rose }}>Сборка для разработки: номера ещё не сверены с официальными источниками.</T> : null}
    </Screen>
  );
}

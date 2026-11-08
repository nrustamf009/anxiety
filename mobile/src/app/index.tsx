import { Redirect, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components/Icon";
import { CrisisButton, Screen, T } from "../components/ui";
import { WaterHorizon } from "../components/WaterHorizon";
import { cards } from "../content";
import { useSettings } from "../lib/settings";
import { useTheme } from "../theme";

export default function Home() {
  const { c, fonts } = useTheme();
  const insets = useSafeAreaInsets();
  const { settings } = useSettings();
  if (!settings.welcomed) return <Redirect href="/welcome" />;

  const header = (
    <View style={{ height: 340 + insets.top, paddingTop: insets.top + 8 }}>
      <WaterHorizon height={340 + insets.top} />
      <View style={styles.bar}>
        <Pressable accessibilityRole="button" accessibilityLabel="Настройки" onPress={() => router.push("/settings")} hitSlop={12} style={[styles.round, { backgroundColor: c.surface + "B0", borderColor: c.line }]}>
          <Icon name="settings" color={c.ink} size={20} />
        </Pressable>
        <CrisisButton />
      </View>
      <View style={{ paddingHorizontal: 24, marginTop: 18, maxWidth: 640, width: "100%", alignSelf: "center" }}>
        <T kind="label" style={{ color: c.water }}>Тихие воды</T>
        <T kind="display" style={{ marginTop: 10 }}>Что у вас{"\n"}на сердце?</T>
        <Text style={{ fontFamily: fonts.serifItalic, fontSize: 15, color: c.inkSoft, marginTop: 10 }}>«…водит меня к водам тихим» — Пс 22:2</Text>
      </View>
    </View>
  );

  return (
    <Screen header={header}>
      {/* SOS */}
      <Pressable accessibilityRole="button" onPress={() => router.push("/sos")} style={({ pressed }) => [styles.sos, { backgroundColor: c.water, opacity: pressed ? 0.9 : 1, shadowColor: c.waterDeep }]}>
        <View style={[styles.sosIcon, { backgroundColor: c.onWater + "22" }]}>
          <Icon name="breath" color={c.onWater} size={30} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.serif, fontSize: 22, color: c.onWater }}>Мне тревожно сейчас</Text>
          <Text style={{ fontFamily: fonts.sansMedium, fontSize: 14, color: c.onWater, opacity: 0.85, marginTop: 4 }}>Две минуты дыхательной молитвы</Text>
        </View>
        <Icon name="chevron" color={c.onWater} size={20} />
      </Pressable>

      {/* Symptom navigator */}
      <View style={styles.sectionHead}>
        <T kind="h2">Что со мной</T>
        <T kind="caption">{cards.length} состояний</T>
      </View>
      <View style={styles.grid}>
        {cards.map((card) => (
          <Pressable key={card.id} accessibilityRole="button" accessibilityHint={card.symptom.user_label} onPress={() => router.push(`/card/${card.id}`)} style={({ pressed }) => [styles.tile, { backgroundColor: c.surface, borderColor: c.line, opacity: pressed ? 0.75 : 1 }]}>
            <View style={[styles.tileIcon, { backgroundColor: c.waterMist }]}>
              <Icon name={card.symptom.icon} color={c.water} size={22} />
            </View>
            <Text style={{ fontFamily: fonts.sansSemi, fontSize: 15, lineHeight: 20, color: c.ink, marginTop: 12 }}>{card.symptom.title}</Text>
            <Text numberOfLines={2} style={{ fontFamily: fonts.sans, fontSize: 12.5, lineHeight: 17, color: c.inkFaint, marginTop: 4 }}>{card.symptom.user_label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Lament */}
      <Pressable accessibilityRole="button" onPress={() => router.push("/lament")} style={({ pressed }) => [styles.lament, { backgroundColor: c.roseMist, opacity: pressed ? 0.85 : 1 }]}>
        <Icon name="quill" color={c.rose} size={26} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.serif, fontSize: 20, color: c.ink }}>Сказать Богу всё</Text>
          <Text style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: c.inkSoft, marginTop: 4 }}>Молитва-плач в четыре шага по образцу Псалма 12. Можно жаловаться.</Text>
        </View>
      </Pressable>

      <T kind="caption" style={{ textAlign: "center", marginTop: 36, paddingHorizontal: 12 }}>
        Писание и молитва для тревожных минут. Не заменяет врача или психолога — вера и профессиональная помощь совместимы.
      </T>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16 },
  round: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", borderWidth: StyleSheet.hairlineWidth },
  sos: { flexDirection: "row", alignItems: "center", gap: 16, padding: 20, borderRadius: 24, marginTop: -8, shadowOpacity: 0.22, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 6 },
  sosIcon: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  sectionHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginTop: 36, marginBottom: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  tile: { flexBasis: "47%", flexGrow: 1, padding: 16, borderRadius: 20, borderWidth: StyleSheet.hairlineWidth, minHeight: 138 },
  tileIcon: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center" },
  lament: { flexDirection: "row", gap: 16, padding: 20, borderRadius: 24, marginTop: 28, alignItems: "flex-start" },
});

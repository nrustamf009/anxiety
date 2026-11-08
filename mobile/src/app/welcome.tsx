import { router } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Verse } from "../components/Verse";
import { Button, Card, Screen, T } from "../components/ui";
import { WaterHorizon } from "../components/WaterHorizon";
import { flows } from "../content";
import { useSettings } from "../lib/settings";
import { useTheme } from "../theme";

/** Onboarding opens with permission to feel — before any "do not fear". */
export default function Welcome() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { update } = useSettings();
  const w = flows.welcome;

  const header = (
    <View style={{ height: 240 + insets.top, justifyContent: "flex-end" }}>
      <WaterHorizon height={240 + insets.top} />
    </View>
  );

  return (
    <Screen header={header}>
      <T kind="label" style={{ color: c.water, marginTop: 4 }}>Тихие воды</T>
      <T kind="display" style={{ marginTop: 10 }}>{w.title}</T>
      <T style={{ marginTop: 14, fontSize: 17, lineHeight: 26 }}>{w.lead}</T>

      {w.passages.map((p: any) => (
        <View key={p.syn} style={{ marginTop: 28 }}>
          <Verse refData={p} size="md" showNumbers={false} />
          <T kind="small" style={{ marginTop: 10, marginLeft: 18 }}>{p.note}</T>
        </View>
      ))}

      <Card tone="sage" style={{ marginTop: 32 }}>
        <T style={{ color: c.ink }}>{w.promise}</T>
      </Card>

      <Button
        label="Начать"
        style={{ marginTop: 28 }}
        onPress={() => {
          update({ welcomed: true });
          router.replace("/");
        }}
      />
      <T kind="caption" style={{ textAlign: "center", marginTop: 16 }}>Без регистрации. Всё остаётся на вашем устройстве.</T>
    </Screen>
  );
}

import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { BreathPacer } from "../components/BreathPacer";
import { Verse } from "../components/Verse";
import { Button, Card, Screen, T, TopBar } from "../components/ui";
import { flows } from "../content";
import { useTheme } from "../theme";

export default function Sos() {
  const { c } = useTheme();
  const s = flows.sos;
  const [done, setDone] = useState(false);
  return (
    <Screen header={<TopBar />}>
      <T kind="label" style={{ color: c.water, marginTop: 8 }}>Сейчас</T>
      <T kind="title" style={{ marginTop: 8 }}>Вы не одни. Давайте подышим.</T>
      <View style={{ marginTop: 20 }}>
        <Verse refData={s.passage} />
      </View>
      <View style={{ marginTop: 16 }}>
        <BreathPacer inhale={s.breath.inhale_sec} exhale={s.breath.exhale_sec} cycles={s.breath.cycles} phraseIn={s.breath.phrase_in} phraseOut={s.breath.phrase_out} onDone={() => setDone(true)} />
      </View>
      <Card tone={done ? "sage" : "surface"} style={{ marginTop: 20 }}>
        <T style={{ color: c.ink }}>{s.after}</T>
      </Card>
      <Button kind="quiet" label="Подобрать слово по состоянию" onPress={() => router.replace("/")} style={{ marginTop: 20 }} />
    </Screen>
  );
}

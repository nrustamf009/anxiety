import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Verse } from "../components/Verse";
import { Button, Card, Screen, T, TopBar } from "../components/ui";
import { flows } from "../content";
import { detectCrisis } from "../lib/safety";
import { useTheme } from "../theme";

/**
 * Lament in four movements (turn → complain → ask → trust), modelled on Ps 12 (Eng 13).
 * Text is held in memory only and is never saved or sent.
 */
export default function Lament() {
  const { c, fonts } = useTheme();
  const L = flows.lament;
  const steps = L.steps as { key: string; title: string; prompt: string; example: string; verse: any }[];
  const [i, setI] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [cantTrust, setCantTrust] = useState(false);
  const crisisHit = Object.values(answers).some(detectCrisis);

  const step = steps[i];
  const finished = i >= steps.length;

  return (
    <Screen header={<TopBar />}>
      {/* progress */}
      <View style={{ flexDirection: "row", gap: 6, marginTop: 8 }}>
        {steps.map((s, k) => (
          <View key={s.key} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: k <= i ? c.rose : c.line }} />
        ))}
      </View>

      {crisisHit ? (
        <Card tone="rose" style={{ marginTop: 20 }}>
          <T kind="h2">Похоже, вам сейчас очень тяжело</T>
          <T style={{ marginTop: 6, color: c.ink }}>Спасибо, что сказали это. Вы заслуживаете поддержки живого человека прямо сейчас.</T>
          <Button kind="rose" icon="phone" label="Связаться с помощью" onPress={() => router.push("/crisis")} style={{ marginTop: 14 }} />
        </Card>
      ) : null}

      {i === -1 && (
        <View style={{ marginTop: 20 }}>
          <T kind="label" style={{ color: c.rose }}>Плач</T>
          <T kind="title" style={{ marginTop: 8 }}>Сказать Богу всё</T>
          <T style={{ marginTop: 12 }}>{L.lead}</T>
          <View style={{ marginTop: 24 }}>
            <Verse refData={L.template} size="md" />
          </View>
          <T kind="caption" style={{ marginTop: 20 }}>Ваш текст не сохраняется и никуда не отправляется.</T>
          <Button label="Начать" onPress={() => setI(0)} style={{ marginTop: 20 }} />
        </View>
      )}

      {step && (
        <View style={{ marginTop: 20 }}>
          <T kind="label" style={{ color: c.rose }}>Шаг {i + 1} из {steps.length}</T>
          <T kind="title" style={{ marginTop: 8 }}>{step.title}</T>
          <T style={{ marginTop: 8 }}>{step.prompt}</T>
          <View style={{ marginTop: 18 }}>
            <Verse refData={step.verse} size="md" showNumbers={false} />
          </View>
          <TextInput
            multiline
            value={answers[step.key] ?? ""}
            onChangeText={(t) => setAnswers((a) => ({ ...a, [step.key]: t }))}
            placeholder={step.example}
            placeholderTextColor={c.inkFaint}
            style={{ marginTop: 20, minHeight: 130, padding: 16, borderRadius: 18, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface, color: c.ink, fontFamily: fonts.serif, fontSize: 18, lineHeight: 27, textAlignVertical: "top" }}
          />
          {step.key === "trust" && (
            <Button kind="quiet" label={L.cant_trust.label} onPress={() => { setCantTrust(true); setI(steps.length); }} style={{ marginTop: 14 }} />
          )}
          <View style={{ flexDirection: "row", gap: 12, marginTop: 14 }}>
            <Button kind="quiet" label="Назад" onPress={() => setI(i - 1)} style={{ flex: 1 }} />
            <Button label={i === steps.length - 1 ? "Завершить" : "Дальше"} onPress={() => setI(i + 1)} style={{ flex: 1 }} />
          </View>
        </View>
      )}

      {finished && (
        <View style={{ marginTop: 20 }}>
          <T kind="label" style={{ color: c.rose }}>Ваша молитва</T>
          <Card style={{ marginTop: 12 }}>
            {steps.map((s) =>
              answers[s.key]?.trim() ? (
                <Text key={s.key} style={{ fontFamily: fonts.serif, fontSize: 18, lineHeight: 28, color: c.ink, marginBottom: 12 }}>
                  {answers[s.key].trim()}
                </Text>
              ) : null,
            )}
            <Text style={{ fontFamily: fonts.serifItalic, fontSize: 18, color: c.inkSoft }}>Аминь.</Text>
          </Card>
          {cantTrust ? (
            <Card tone="rose" style={{ marginTop: 16 }}>
              <T style={{ color: c.ink }}>{L.cant_trust.text}</T>
              <View style={{ marginTop: 14 }}>
                <Verse refData={L.cant_trust.passage} size="md" />
              </View>
            </Card>
          ) : (
            <T style={{ marginTop: 16 }}>Плач — это не недостаток веры, а её язык. Можно вернуться к этой молитве в другой день и посмотреть, что изменилось.</T>
          )}
          <Button label="На главную" onPress={() => router.replace("/")} style={{ marginTop: 22 }} />
        </View>
      )}
    </Screen>
  );
}

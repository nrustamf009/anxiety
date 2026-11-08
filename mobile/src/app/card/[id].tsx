import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { BreathPacer } from "../../components/BreathPacer";
import { Icon } from "../../components/Icon";
import { Verse } from "../../components/Verse";
import { Button, Card, Screen, StepHeader, T, TopBar } from "../../components/ui";
import { formatRange, getCard, type Card as CardT } from "../../content";
import { recordSensitiveOpen } from "../../lib/safety";
import { useSettings } from "../../lib/settings";
import { useTheme } from "../../theme";

const KIND: Record<string, string> = {
  explicit: "Прямо о тревоге",
  implicit_narrative: "История",
  promise: "Обетование",
  lament: "Плач",
};
const TRADITION: Record<string, string> = {
  orthodox: "Православная традиция",
  catholic: "Католическая традиция",
  protestant: "Протестантская традиция",
  jewish: "Иудейская традиция",
  ecumenical: "Общехристианское",
};
const EVIDENCE: Record<string, string> = {
  physiological_plus_small_rct: "есть исследования",
  pilot_or_mixed: "предварительные данные",
  indirect_secular: "основано на светских методах",
  tradition_only: "практика традиции",
};

export default function CardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const card = getCard(String(id));
  const { c, fonts } = useTheme();
  const { settings } = useSettings();
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    if (card?.symptom.ocd_reassurance_sensitive) setLoop(recordSensitiveOpen());
  }, [card]);

  if (!card) {
    return (
      <Screen header={<TopBar />}>
        <T kind="title">Карточка не найдена</T>
      </Screen>
    );
  }

  const prayers = card.prayer.filter((p) => settings.tradition === "all" || p.tradition === "ecumenical" || p.tradition === settings.tradition);
  const breath = card.practice.breath;

  return (
    <Screen header={<TopBar />}>
      {/* Heading */}
      <View style={{ alignItems: "flex-start", marginTop: 12 }}>
        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: c.waterMist, alignItems: "center", justifyContent: "center" }}>
          <Icon name={card.symptom.icon} color={c.water} size={28} />
        </View>
        <T kind="title" style={{ marginTop: 16 }}>{card.symptom.title}</T>
        <T style={{ marginTop: 6 }}>{card.symptom.user_label}</T>
      </View>

      {loop && <ReassuranceNote card={card} />}

      {/* Permission to feel */}
      <Card tone="sage" style={{ marginTop: 22 }}>
        <Text style={{ fontFamily: fonts.serifItalic, fontSize: 17, lineHeight: 26, color: c.ink }}>{card.permission}</Text>
      </Card>

      {/* 1. Scripture */}
      <StepHeader n={1} title="Слово" icon="book" />
      {card.passages.map((p, i) => (
        <View key={i} style={{ marginBottom: 28 }}>
          <T kind="label" style={{ marginBottom: 12 }}>{KIND[p.kind]}</T>
          <Verse refData={p} size={i === 0 ? "lg" : "md"} />
          <T style={{ marginTop: 14 }}>{p.why_fits}</T>
          {p.context ? <T kind="caption" style={{ marginTop: 8 }}>Прочтите в контексте: {formatRange(p.book, p.context)}</T> : null}
          {p.misuse_warning ? (
            <Card tone="gold" style={{ marginTop: 14, padding: 16 }}>
              <T kind="label" style={{ color: c.gold, marginBottom: 6 }}>Бережно с этим стихом</T>
              <T kind="small" style={{ color: c.ink }}>{p.misuse_warning}</T>
            </Card>
          ) : null}
        </View>
      ))}

      {/* 2. Commentary */}
      <StepHeader n={2} title="Толкование" icon="quill" />
      {card.commentary.map((cm, i) => (
        <View key={i} style={{ marginBottom: 20 }}>
          <T kind="caption" style={{ color: c.sage }}>{TRADITION[cm.tradition]}</T>
          <T kind="h2" style={{ fontSize: 16, marginTop: 2 }}>{cm.author}</T>
          <T style={{ marginTop: 6 }}>{cm.summary}</T>
          <Pressable onPress={() => Linking.openURL(cm.source.url)} accessibilityRole="link">
            <T kind="caption" style={{ marginTop: 6, color: c.water }}>
              Источник: {cm.source.title}
              {cm.verified_quote ? "" : " · пересказ"}
            </T>
          </Pressable>
        </View>
      ))}

      {/* 3. Practice */}
      <StepHeader n={3} title="Практика" icon="breath" />
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
          <T kind="h2">{card.practice.name}</T>
          <T kind="caption">{Math.round(card.practice.duration_sec / 60)} мин · {EVIDENCE[card.practice.evidence_level]}</T>
        </View>
        {card.practice.steps.map((s, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 12, marginTop: 14 }}>
            <Text style={{ fontFamily: fonts.serif, color: c.gold, fontSize: 16, width: 18 }}>{i + 1}</Text>
            <T style={{ flex: 1, color: c.ink }}>{s}</T>
          </View>
        ))}
        {breath ? (
          <View style={{ marginTop: 12 }}>
            <BreathPacer inhale={breath.inhale_sec} exhale={breath.exhale_sec} cycles={Math.max(4, Math.round(card.practice.duration_sec / (breath.inhale_sec + breath.exhale_sec)))} phraseIn={breath.phrase_in} phraseOut={breath.phrase_out} />
          </View>
        ) : null}
      </Card>

      {/* 4. Prayer */}
      <StepHeader n={4} title="Молитва" icon="lamp" />
      {prayers.map((p, i) => (
        <View key={i} style={{ marginBottom: 18 }}>
          <Text style={{ fontFamily: fonts.serifItalic, fontSize: 19, lineHeight: 29, color: c.ink }}>{p.text}</Text>
          <T kind="caption" style={{ marginTop: 6 }}>
            {p.origin === "traditional" ? "Традиционная молитва" : p.origin === "scripture_based" ? "По словам Писания" : "Молитва своими словами"}
            {p.tradition !== "ecumenical" ? ` · ${TRADITION[p.tradition].toLowerCase()}` : ""}
          </T>
        </View>
      ))}

      {/* 5. Professional help */}
      <StepHeader n={5} title="Когда обратиться к специалисту" icon="lifebuoy" />
      <Card tone="water">
        {card.professional_help.triggers.map((t, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 10, marginBottom: 8 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.water, marginTop: 9 }} />
            <T style={{ flex: 1, color: c.ink }}>{t}</T>
          </View>
        ))}
        <T style={{ marginTop: 8 }}>{card.professional_help.message}</T>
        {card.symptom.crisis_adjacent ? <Button kind="rose" icon="lifebuoy" label="Мне нужна помощь сейчас" onPress={() => router.push("/crisis")} style={{ marginTop: 16 }} /> : null}
      </Card>

      {card.review.status !== "approved" ? (
        <T kind="caption" style={{ textAlign: "center", marginTop: 28 }}>
          Версия {card.version} · черновик: ожидает богословской и клинической проверки
        </T>
      ) : null}
    </Screen>
  );
}

/** Shown when reassurance-sensitive cards are reopened many times within an hour. */
function ReassuranceNote({ card }: { card: CardT }) {
  const { c } = useTheme();
  return (
    <Card tone="gold" style={{ marginTop: 20 }}>
      <T kind="label" style={{ color: c.gold, marginBottom: 6 }}>Мягкая подсказка</T>
      <T style={{ color: c.ink }}>
        Вы возвращаетесь к этой теме уже несколько раз за час. Иногда тревога просит всё новых заверений, и каждое помогает лишь ненадолго. Это не ваша вина и не духовный провал. Если так бывает часто, поговорите со специалистом по методу ЭПР (ERP): это помогает лучше, чем ещё одно перечитывание.
      </T>
      <T kind="caption" style={{ marginTop: 8 }}>{card.symptom.title}</T>
    </Card>
  );
}

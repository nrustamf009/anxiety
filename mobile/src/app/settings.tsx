import { router } from "expo-router";
import { View } from "react-native";
import { Card, Chip, Screen, T, TopBar } from "../components/ui";
import { crisis, translations, type TranslationCode } from "../content";
import { useSettings, type RegionCode, type TraditionPref } from "../lib/settings";
import { useTheme } from "../theme";

const TRADITIONS: { k: TraditionPref; label: string }[] = [
  { k: "all", label: "Все" },
  { k: "orthodox", label: "Православная" },
  { k: "catholic", label: "Католическая" },
  { k: "protestant", label: "Протестантская" },
];

export default function SettingsScreen() {
  const { c } = useTheme();
  const { settings, update } = useSettings();
  return (
    <Screen header={<TopBar />}>
      <T kind="title" style={{ marginTop: 8 }}>Настройки</T>

      <T kind="label" style={{ marginTop: 28, marginBottom: 12 }}>Перевод Библии</T>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {(Object.keys(translations) as TranslationCode[]).map((k) => (
          <Chip key={k} label={translations[k].name} active={settings.translation === k} onPress={() => update({ translation: k })} />
        ))}
      </View>
      <T kind="caption" style={{ marginTop: 8 }}>Нумерация псалмов меняется вместе с переводом: синодальная следует Септуагинте, английские — еврейскому тексту.</T>

      <T kind="label" style={{ marginTop: 28, marginBottom: 12 }}>Молитвы традиции</T>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {TRADITIONS.map((t) => (
          <Chip key={t.k} label={t.label} active={settings.tradition === t.k} onPress={() => update({ tradition: t.k })} />
        ))}
      </View>

      <T kind="label" style={{ marginTop: 28, marginBottom: 12 }}>Регион для кризисной помощи</T>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {crisis.regions.map((r) => (
          <Chip key={r.code} label={r.name} active={settings.region === r.code} onPress={() => update({ region: r.code as RegionCode })} />
        ))}
      </View>

      <Card style={{ marginTop: 32 }}>
        <T kind="h2">О приложении</T>
        <T style={{ marginTop: 8 }}>«Тихие воды» — Писание, короткие практики и молитвы для тревожных минут. Это не медицинское изделие и не замена врачу или психологу. Вера и профессиональная помощь совместимы.</T>
        <T kind="h2" style={{ marginTop: 18, fontSize: 16 }}>Приватность</T>
        <T style={{ marginTop: 6 }}>Без аккаунта, рекламы и аналитики. Настройки хранятся только на вашем устройстве; текст молитвы-плача не сохраняется.</T>
        <T kind="h2" style={{ marginTop: 18, fontSize: 16 }}>Тексты</T>
        {(Object.keys(translations) as TranslationCode[]).map((k) => (
          <T key={k} kind="small" style={{ marginTop: 4 }}>{translations[k].name} — {translations[k].license}</T>
        ))}
      </Card>

      <View style={{ marginTop: 20, alignItems: "flex-start" }}>
        <Chip label="Показать вступление снова" onPress={() => { update({ welcomed: false }); router.replace("/welcome"); }} />
      </View>
      <T kind="caption" style={{ marginTop: 16, color: c.inkFaint }}>Контент: черновик 0.1 · ожидает богословской и клинической редакции</T>
    </Screen>
  );
}

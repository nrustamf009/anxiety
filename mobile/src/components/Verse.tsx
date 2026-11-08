import { Text, View } from "react-native";
import { formatRef, getVerses, translations, type Ref } from "../content";
import { useSettings } from "../lib/settings";
import { useTheme } from "../theme";
import { T } from "./ui";

/** Scripture in the user's chosen translation, with both numbering systems shown when they differ. */
export function Verse({ refData, size = "lg", showNumbers = true }: { refData: Ref; size?: "lg" | "md"; showNumbers?: boolean }) {
  const { c, fonts } = useTheme();
  const { settings } = useSettings();
  const verses = getVerses(refData, settings.translation);
  const fontSize = size === "lg" ? 21 : 18;
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 2, borderRadius: 1, backgroundColor: c.gold + "90", marginRight: 16 }} />
        <Text style={{ flex: 1, fontFamily: fonts.serif, fontSize, lineHeight: fontSize * 1.5, color: c.ink }}>
          {verses.map((v, i) => (
            <Text key={v.n}>
              {showNumbers && verses.length > 1 ? <Text style={{ fontSize: fontSize * 0.55, color: c.gold, fontFamily: fonts.sansSemi }}>{v.n} </Text> : null}
              {v.text}
              {i < verses.length - 1 ? " " : ""}
            </Text>
          ))}
        </Text>
      </View>
      <T kind="caption" style={{ marginTop: 10, marginLeft: 18 }}>
        {formatRef(refData, { both: true })} · {translations[settings.translation].name}
      </T>
    </View>
  );
}

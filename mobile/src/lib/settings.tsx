import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { TranslationCode } from "../content";

/**
 * Local-first settings. Nothing leaves the device: no account, no analytics, no ad SDKs.
 * (Religion and health are special-category data under GDPR art. 9 and 152-FZ art. 10.)
 */
export type TraditionPref = "all" | "orthodox" | "catholic" | "protestant";

export interface Settings {
  translation: TranslationCode;
  tradition: TraditionPref;
  welcomed: boolean;
}

const DEFAULTS: Settings = { translation: "syn", tradition: "all", welcomed: false };
const KEY = "stillwaters.settings.v1";

const Ctx = createContext<{ settings: Settings; ready: boolean; update: (p: Partial<Settings>) => void }>({
  settings: DEFAULTS,
  ready: false,
  update: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => raw && setSettings({ ...DEFAULTS, ...JSON.parse(raw) }))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const update = useCallback((p: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...p };
      AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo(() => ({ settings, ready, update }), [settings, ready, update]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSettings = () => useContext(Ctx);

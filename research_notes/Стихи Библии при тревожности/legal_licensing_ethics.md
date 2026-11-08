# Legal, Licensing, Platform-Policy, Privacy, Ethical and Theological Constraints for a Bible-Based Anxiety-Help App (RU + EN)

Research notes, current to November 2026. Network note: direct fetches of crossway.org, api.esv.org, ebible.org and biblegateway.com were blocked in this research session (host not on the allowed list), so several licensing points rely on search-result excerpts of those official pages rather than full-page reads. Apple's App Store Review Guidelines were fetched in full from developer.apple.com.

## 1. Bible text licensing, free APIs, and Psalm/verse numbering

### Takeaway
Safe to ship offline without permission: BSB (public domain since 30 Apr 2023), WEB (public domain, but the name is trademarked), KJV (public domain outside the UK only), ASV, Douay-Rheims, and almost certainly the Russian Synodal 1876 text. ESV, NIV, NLT, NKJV, НРП/NRT, СРП (РБО), the Kulakov translation and the Kassian NT are copyrighted. You can quote them under each publisher's "fair use" allowance, usually up to about 500 verses, but a full or searchable Bible in a commercial app needs a licence. Psalm numbering differs between the Synodal (LXX) and the Hebrew/English traditions, so build a mapping table into the data layer.

### Cited Findings
**Public domain / free texts**
- BSB: "the Berean Bible and Majority Bible texts are officially dedicated to the public domain as of April 30, 2023"; all uses are freely permitted. Attribution is appreciated but not required. If a derivative changes the text, Berean asks that it not carry the Berean name. — [Berean Bible Terms](https://berean.bible/terms.htm)
- WEB: "The World English Bible is in the Public Domain"; however, "World English Bible" is a trademark of eBible.org, and a changed text should not be called by that name. — [eBible.org WEB copyright](https://ebible.org/web/copyright.htm); [eBible WEB about](https://ebible.org/study/content/texts/eng-web/about.html)
- KJV: public domain outside the UK. In the UK it is under perpetual Crown rights held through the Royal Prerogative and administered by letters patent, and Cambridge University Press is the Queen's/King's Printer. The patent bars anyone other than holders or their licensees from printing, publishing or importing the Authorized Version into the UK. — [eBible KJV copyright](https://ebible.org/KJV/copr.htm); [CrossWire KJV](https://wiki.crosswire.org/CrossWire_KJV). One forum source describes a UK quotation allowance (25% of a book, no more than 500 verses), but this is unverified. — [Puritan Board](https://puritanboard.com/threads/is-the-kjv-bible-copyrighted.95840/post-1171374)
- bible-api.com (seven1m): the code is MIT-licensed, and the API serves "public domain and open bible translations" with no key required. Each response carries a `translation_note` field. — [GitHub seven1m/bible_api](https://github.com/seven1m/bible_api)

**Licensed texts**
- ESV (Crossway): may be quoted in print, digital or audio "up to and inclusive of five hundred (500) verses without a formal license or express written permission". The quoted verses must not amount to half of any one book, and the allowance does not cover quotation in a commentary or biblical reference work. ESV text may not appear in any work released under a Creative Commons licence, and it may not be translated into another language. A copyright notice is required. Anything beyond these limits needs written permission or a licence via crossway.org/permissions. — [Crossway Guide to Permissions](https://www.crossway.org/permissions/) (seen through search excerpt; the full page fetch was blocked)
- ESV API: Crossway lets you pull ESV text from its server into a website or app "free of charge for non-commercial use" (api.esv.org). I did not see the commercial-app terms directly. — [Crossway Permissions](https://www.crossway.org/rights-and-permissions/esv/); [api.esv.org](https://api.esv.org/)
- НРП / New Russian Translation (Biblica): "These scriptures are not public domain". Copyright belongs to Biblica, Inc. Online, the text is for personal use only, and any other use, including copying or reposting, is prohibited. The text may not be altered. — [YouVersion NRT 143](https://bible.com/audio-bible-app-versions/143); [BibleGateway NRT](https://BibleGateWay.com/versions/New-Russian-Translation-NRT-Bible/)
- СРП (Modern Russian Translation): published by the Российское библейское общество (Moscow, 2011). The search found no public licensing terms. — [RUDN journal article](https://journals.rudn.ru/semiotics-semantics/article/view/7306/ru_RU)

**API.Bible (American Bible Society)**
- An app counts as commercial if it generates revenue in any way, including ads, in-app purchases, subscriptions or sponsorships. Using a non-commercial agreement after monetising violates the licence. — [API.Bible: Understanding Commercial Use](https://care.api.bible/article/384-understanding-commercial-use); [Non-commercial to commercial](https://care.api.bible/article/389-what-if-my-non-commercial-application-becomes-commercial)
- Commercial apps may pay an additional monthly fee for each copyrighted translation. Some translations are not available for commercial use at all. CC-NC texts cannot be used in a revenue-generating app, and sub-licensing is not allowed. — [API.Bible FAQ](https://api.bible/faq); [Licensing quick reference](https://care.api.bible/article/396-licensing-policies-quick-reference)
- FUMS (Fair Use Management System) is a tracking snippet that must be included wherever Scripture from the API is displayed in a web app. — [API.Bible docs](https://docs.api.bible/quick-start/licensing-and-access)
- Licences limit display to "500 consecutive verses at a time". — [Express Licensing FAQs](https://care.api.bible/article/405-express-licensing-faqs)

**Psalm numbering (LXX/Synodal vs Hebrew/English)**
- Hebrew 9+10 = LXX 9. Hebrew 11–113 = LXX 10–112. Hebrew 114+115 = LXX 113. Hebrew 116:1–9 = LXX 114, and Hebrew 116:10–19 = LXX 115. Hebrew 117–146 = LXX 116–145. Hebrew 147:1–11 = LXX 146, and Hebrew 147:12–20 = LXX 147. Psalms 1–8 and 148–150 are the same in both. — [Wikipedia: Psalms](https://en.wikipedia.org/wiki/Psalms); [catholic-resources.org Psalms](https://m.catholic-resources.org/Bible/Psalms.htm); [WLB Stuttgart table](https://www.wlb-stuttgart.de/fileadmin/user_upload/sammlungen/bibeln/psalmennummerierung.pdf)
- The Russian reference literature confirms that the Greek text joins 9+10 and 114+115 and splits 116 and 147. — [Azbyka bibliological dictionary](https://www.azbyka.ru/otechnik/Spravochniki/bibliologicheskij-slovar-tom-2/483)

### Inferences
- **Synodal 1876 status (inference; no primary legal source found):** the translators and editors died in the 19th century, long past the life-plus-70-year term in Russian Civil Code art. 1281. Under art. 1282, works whose term has expired are in the public domain. The bare Synodal text is therefore very likely free to use. A modern edition's own typesetting, notes, modern-orthography editing or verse markup may still carry a publisher's claim. Take the text from a known-clean digital source (for example the eBible.org or CrossWire Synodal modules, which list it as public domain; I could not fetch them to verify) and do not copy a modern edition's apparatus.
- **Superscription offset (prior knowledge; verify against the text):** the Synodal Psalter, like the Hebrew text, usually counts the superscription as verse 1, or verses 1–2 for long ones, while English Bibles leave it unnumbered. The verse offset therefore varies from 0 to 2 by psalm. Example: English Ps 51:10 ("Create in me a clean heart") = Synodal Пс 50:12. Ps 23:1 English = Пс 22:1, because the short superscription "Псалом Давида" is part of verse 1. Use per-verse mapping data rather than a formula. CrossWire/SWORD versification schemes ("Synodal" vs "KJV") and the OSIS/Copenhagen Alliance mapping tables are the standard machine-readable sources.
- Chapter and verse offsets also exist outside the Psalms. Examples are Romans 16:25–27 (in Synodal placed at 14:24–26), parts of Malachi 4 (Synodal Mal 4 vs Hebrew 3:19–24), and Joel 2/3. Do not hard-code only the Psalm rules.
- **Sirach anxiety passage:** the requester gives Sirach 30:21–25 (English) = Сир 30:22–27 (Synodal). This is consistent with known Sirach versification divergence, but I could not verify it here, so check it against the Synodal text.
- **Other publishers (prior knowledge, not verified this session):** Biblica (NIV), Tyndale (NLT) and Thomas Nelson (NKJV) each publish "gratis use" guidelines of roughly 500 verses. Typical conditions are no complete book and quoted verses under 25% of the new work's text, plus a required copyright notice. Commercial apps generally need a licence. Confirm on each publisher's permissions page before relying on this.
- **Practical recommendation:** EN = BSB or WEB as the primary bundled text, with KJV as an option (geo-flag the UK or rely on the Crown's non-enforcement only after legal review). RU = Synodal. A curated set of fewer than about 500 verses could carry a short ESV/NIV/NLT quote with a notice, but this cannot be mixed into a Creative Commons-licensed content pack for ESV.

### Gaps
- Exact current ESV API terms for commercial apps (the page could not be fetched).
- Licensing terms for СРП (РБО), the Kulakov translation (Институт перевода Библии в Заокском) and the Kassian NT (published by РБО). No public policy was found, so write to РБО (biblia.ru) and the Zaoksky Bible Translation Institute directly.
- getbible.net licence terms (nothing found).
- Primary confirmation of the Synodal text's public-domain status (eBible/CrossWire pages blocked).

## 2. Medical device / health claims and app-store policy

### Takeaway
An app that offers Scripture, prayer, journaling and general "peace/stress relief" support is a general-wellness product in the US, and it does not have a medical purpose under the EU MDR or in the UK. It becomes a regulated device as soon as it claims to diagnose, treat, mitigate or prevent anxiety disorder, or tailors "interventions based on symptom severity". Wording and intended purpose decide this, not the technology.

### Cited Findings
- FDA issued a revised final General Wellness guidance on 6 January 2026, replacing the September 2019 version. The definition of "general wellness products" is unchanged. The changes mainly concern non-invasive wearables, and the guidance took effect immediately without a comment period. — [King & Spalding](https://www.kslaw.com/insights/articles/fda-updates-general-wellness-and-clinical-decision-support-guidance-documents); [Ropes & Gray](https://www.ropesgray.com/en/insights/alerts/2026/01/fda-adapts-with-the-times-on-digital-health-updated-guidances-on-general-wellness-products); [FDA guidance PDF](https://www.fda.gov/media/90652/download)
- Commentators disagree on how much changed: Honigman calls the update "not wholesale revisions", while others say it significantly expands the wellness scope. CDRH held a Town Hall on 11 February 2026. — [Honigman](https://www.honigman.com/alert-3236); [Faegre Drinker](https://faegredrinker.com/en/insights/publications/2026/1/key-updates-in-fdas-2026-general-wellness-and-clinical-decision-support-software-guidance); [Hogan Lovells](https://hlc.com/en/publications/fda-town-hall-sheds-new-light-on-updated-general-wellness-policy)
- EU MDR Rule 11 / MDCG 2019-11 (Rev.1, June 2025): software with purely lifestyle or wellbeing purposes is outside the MDR. Software with an individual medical purpose usually lands in Class IIa or higher. The intended purpose, meaning what you claim, is decisive. Rev.1 warns against using a modular design to dodge classification. — [OpenRegulatory MDCG 2019-11](https://openregulatory.com/mdcg/mdcg-2019-11); [GMP Insiders Rev.1](https://gmpinsiders.com/mdcg-2019-11-rev1-mdr-ivdr/); [Forvis Mazars](https://www.forvismazars.com/de/en/who-we-are/news/press-media/newsletters/newsletter-healthcare/newsletter-healthcare-3-2025/klassifizierung-medizinischer-software)
- UK example: an app that "monitors anxiety and offers interventions based on symptom severity" may be considered to have a medical purpose under the MHRA's approach to digital mental health technology. — [Freyr on UK DMHT](https://www.freyrsolutions.com/blog/navigating-the-regulatory-path-for-digital-mental-health-technology-dmht-in-the-uk)
- Apple 1.4.1: "Medical apps that could provide inaccurate data or information, or that could be used for diagnosing or treating patients may be reviewed with greater scrutiny… Apps should remind users to check with a doctor in addition to using the app and before making medical decisions." — [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- Apple 5.1.1(ix): apps in "highly regulated fields (such as… healthcare…) or that require sensitive user information should be submitted by a legal entity that provides the services, and not by an individual developer." — [Apple Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- Apple 5.1.3: health data may not be used or disclosed to third parties for advertising, marketing or data mining. It may not be stored in iCloud (5.1.3(ii)), and the specific health data collected must be disclosed. — [Apple Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- Apple 5.1.2(i): you must disclose any sharing of personal data with third parties, "including with third-party AI", and get explicit permission first. — [Apple Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- A developer reports a wellness-only app being flagged as medical under 1.4.1. — [Apple Developer Forums thread 807508](https://developer.apple.com/forums/thread/807508)
- Google Play: every app must complete the Health apps declaration in Play Console (Policy > App content), including apps that certify they have no health features. Without it, updates cannot be submitted. Health and medical apps also need a privacy policy. — [Play Console Help: Health apps declaration](https://support.google.com/googleplay/android-developer/answer/14738291); [Health app policy](https://support.google.com/googleplay/android-developer/answer/13996367)

### Inferences
- **Wording to avoid in RU and EN** (it signals a medical purpose under the cited FDA/MDR/MHRA "intended purpose" logic): "treats/cures/heals anxiety", "лечит тревожность/тревожное расстройство", "therapy", "терапия", "clinically proven", "replaces medication/therapist", "diagnose", "assess your anxiety level/score" (a GAD-7 score with tailored interventions moves the app toward a device), and "evidence-based treatment for GAD".
- **Wording that is generally acceptable:** "Scripture and prayer for anxious moments", "Bible verses for comfort and peace", "spiritual encouragement", "helps you pause, breathe and reflect", "not a substitute for professional care". Add a disclaimer in the onboarding screens, the App Store description and the settings screen.
- Russia: Roszdravnadzor regulates software as a medical device (PP RF No. 1416 registration rules). The same intended-purpose logic applies, but I did not research it here.
- Publish as a legal entity (LLC or ministry non-profit), not as an individual developer, to avoid trouble under Apple 5.1.1(ix).
- On Google Play, choose a Lifestyle or Books & Reference category rather than Medical, and still file the declaration ("no health features", or wellness only).

### Gaps
- Primary-text reading of the 2026 FDA guidance and of FDA's separate digital mental health policies (the Digital Health Advisory Committee on generative AI mental-health devices, November 2025) was not done.
- No MHRA primary guidance was fetched.
- Russian SaMD rules were not researched.

## 3. Crisis safety

### Takeaway
Even a non-AI devotional app should include an always-visible "Need urgent help?" entry point with region-specific hotlines. It should also have keyword-triggered crisis screens if it has any free-text input (journal, prayer requests or chat), and its copy should follow WHO/IASP safe-messaging rules: no method details, no glorification, and an emphasis on help and hope.

### Cited Findings
- WHO and IASP published the 4th edition of *Preventing suicide: a resource for media professionals* on 12 September 2023, written as evidence-based "dos and don'ts". The accompanying quick guide encourages stories of people who overcame a suicidal crisis. — [IASP Suicide & Media SIG](https://www.iasp.info/specialinterestgroups/suicideandthemedia/); [WHO quick reference summary](https://wiert.me/2025/09/05/world-health-organisation-quick-reference-guide-responsible-reporting-on-suicide/)
- A comparison of 24 safe-messaging guidelines found more agreement on what not to do than on what to do. Common points are not glorifying suicide and not describing methods. — [Suicideinfo.ca systematic comparison](https://www.suicideinfo.ca/?p=154203)
- SAVE's Safe Messaging Guidelines (May 2026) point to the AFSP Media Resources Hub. — [SAVE PDF](https://www.save.org/wp-content/uploads/2026/05/Safe-Messaging-Guidelines-.pdf)
- Russia: the Детский телефон доверия, 8-800-2000-122, is free, 24/7 and nationwide (since 2010), and is aimed at children, teens and parents. — [school memo, gosuslugi](https://school14.gosuslugi.ru/netcat_files/164/3068/detskiytelefondoveriya.pdf)
- The МЧС emergency psychological help line, +7-495-989-50-50, is 24/7, anonymous and free. A federal number, 8-800-775-17-17, is also cited. — [Sovcombank journal](https://journal.sovcombank.ru/semya/telefony-i-caty-doveriia); [Habr](https://habr.com/ru/amp/publications/806105)
- Moscow: 051 (or 8-495-051 from mobile) reaches a professional psychologist at the Московская служба психологической помощи населению. Its reference line is 8-499-173-09-09. — [RIAMO](https://riamo.ru/article/319984/kak-poluchit-besplatnuyu-psihologicheskuyu-pomosch-v-moskovskom-regione-xl); [Habr](https://habr.com/ru/amp/publications/806105)
- The МГППУ emergency psychological help centre is reachable at 8-499-795-15-01 and 8-499-795-15-07. — [eduvluki.ru](https://eduvluki.ru/legislation/2374)
- The Apple guidelines I fetched contain no specific suicide or crisis-resource clause; the closest is 1.4 Physical Harm. — [Apple Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- California SB 243 (companion chatbots, effective 1 January 2026) reportedly requires AI disclosure, crisis-referral protocols and break reminders for minors, and gives a private right of action. — [AOL/news on SB 243](https://www.aol.com/news/california-senate-passes-bill-aims-234807786.html); [aicompanionpick summary](https://aicompanionpick.com/character-ai-lawsuits-explained-2026) (secondary sources; verify against the enacted text)

### Inferences
- **Hotlines from general knowledge (not fetched this session; verify before shipping):** US 988 Suicide & Crisis Lifeline (call or text 988). UK and Ireland Samaritans 116 123 (free, 24/7). Emergency numbers: 911 (US), 999/112 (UK/EU), 112 (RU). Ukraine, Kazakhstan, Belarus and the diaspora (Israel, Germany, US) all have Russian-speaking users, so resolve hotlines by locale or region rather than by language.
- Hotline numbers change. Keep them in a remotely updatable config and review them quarterly.
- **Recommended UX:** a persistent crisis button on the home screen and every verse screen. If the user types anything such as "хочу умереть", "не хочу жить", "kill myself" or "suicide", interrupt with a full-screen card: empathic line, call/text buttons, emergency number, and an option to continue.
- Never show verses that could be read as condemning (for example about Judas, or "the wages of sin") on that path. Do not imply that faith alone resolves a crisis.
- Pastoral content about suicide should follow safe-messaging rules. Avoid wording like "committed suicide"; say "died by suicide" / "покончил с собой" only when necessary.

### Gaps
- No official AFSP do/don't page and no 988 or Samaritans primary page was fetched.
- Official МЧС and Минздрав hotline confirmation was not fetched; the sources are secondary or regional.

## 4. Privacy

### Takeaway
Simply installing a "Bible for anxiety" app can reveal both religious belief and mental-health status, which are special-category data under GDPR Art. 9 and 152-FZ Art. 10. It is also "consumer health data" under Washington's MHMDA. The safest architecture is local-first: no account, no ad SDKs, no third-party analytics carrying content, and explicit opt-in consent for anything synced. For Russian users, any server-side collection triggers the data localization rule.

### Cited Findings
- 152-FZ Art. 10 lists a closed set of special categories that includes religious and philosophical beliefs and health status. Processing is prohibited except under the listed grounds, such as written consent. — [legalacts.ru Art. 10](https://legalacts.ru/doc/152_FZ-o-personalnyh-dannyh/glava-2/statja-10/); [Consultant подборка](https://www.consultant.ru/law/podborki/specialnye_kategorii_pdn/)
- 152-FZ Art. 18(5), localization: collection of data on Russian citizens must use databases located in Russia. From 1 July 2025 the amended rule forbids recording, systematising, accumulating, storing or changing such data in foreign databases, except in the listed cases. — [Unisender](https://www.unisender.com/ru/blog/otvetstvennost-za-personalnye-dannye-trebovaniya-k-lokalizacii/); [Garant](https://www.garant.ru/article/748180/); [current text, zakonrf.info](https://www.zakonrf.info/zakon-o-personalnyh-dannyh/)
- Turnover-based and large fixed fines for localization breaches were introduced. — [EPAM Law alert](https://epamlaw.com/storage/files/documents/insights/Legal%20Alert_Введены%20значительные%20штрафы%20за%20нарушение%20правила%20о%20локализации%20персональных%20данных.pdf)
- FTC v. BetterHelp (2023): $7.8M in consumer refunds and a ban on sharing health data for advertising, after the company shared data with Facebook and Snapchat despite privacy promises. Brought under FTC Act §5; the order was finalised 14 July 2023. — [DLA Piper](https://www.dlapiper.com/insights/publications/2023/03/ftc-orders-betterhelp-to-pay-7_8-million-and-limit-information-disclosures); [Fierce Healthcare](https://www.fiercehealthcare.com/health-tech/teladoc-owned-betterhelp-pay-78m-users-alleged-data-misuse-ftc-order)
- FTC v. GoodRx (2023): the first Health Breach Notification Rule enforcement, with a $1.5M penalty and a permanent ban on sharing health data for advertising. Sharing through tracking pixels counted as a "breach". — [Crowell](https://crowell.com/en/insights/client-alerts/ftc-enforcement-against-sharing-consumer-health-information-continues); [Proskauer](https://privacylaw.proskauer.com/2023/03/articles/data-privacy-laws/ftcs-one-two-punch-on-data-tracking-and-health-privacy/)
- Washington MHMDA: consent is required to collect or share data revealing past, present or future health status. Enforcement runs through the Consumer Protection Act, with a private right of action. The first class action, *Maxwell v. Amazon* (W.D. Wash., filed 10 February 2025), targets an Ads SDK in third-party apps. Commentary gives conflicting damage figures. — [Orrick](https://www.orrick.com/en/Insights/2025/02/First-Lawsuit-Filed-Under-Washingtons-My-Health-My-Data-Act); [WilmerHale](https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20250220-first-lawsuit-filed-under-washingtons-my-health-my-data-act)
- Mozilla *Privacy Not Included* (May 2022) reviewed 32 mental-health and prayer apps and gave 28 or 29 of them a warning (sources differ). "The vast majority of mental health and prayer apps are exceptionally creepy." Pray.com was among the worst; Hallow was the best of the five prayer apps and the only maker that answered Mozilla, though it still uses data for marketing. Mozilla logged into Hallow with the password "111111"; Hallow then fixed it. — [Mozilla PNI Hallow](https://foundation.mozilla.org/privacynotincluded/hallow/); [Becker's](https://www.beckershospitalreview.com/digital-health/most-mental-health-apps-have-exceptionally-creepy-privacy-practices-report-finds/); [gHacks](https://www.ghacks.net/?p=178367)
- Apple requires explicit permission before sharing personal data with third-party AI (5.1.2(i)) and forbids storing health information in iCloud (5.1.3(ii)). — [Apple Guidelines](https://developer.apple.com/app-store/review/guidelines/)

### Inferences
- **GDPR Art. 9** (text not fetched, but well established): "data revealing… religious or philosophical beliefs" and "data concerning health" are special categories. The realistic legal basis is explicit consent under Art. 9(2)(a). A DPIA under Art. 35 is advisable, and app usage logs (for example "opened anxiety verses at 3 a.m.") can themselves be health data.
- **Design rules:**
  1. Local-only storage by default.
  2. No advertising SDKs, Meta/TikTok pixels or attribution SDKs. These are exactly the BetterHelp, GoodRx and Maxwell patterns.
  3. Analytics, if any, should be self-hosted, aggregated, and should strip verse or topic context.
  4. Any cloud sync requires a separate explicit consent.
  5. Russian users who sync: host the primary database in Russia or don't collect at all. Be aware of the potential conflict with US/EU hosting and of sanctions issues around Russian hosting providers. A no-account offline app largely avoids this.
  6. Washington MHMDA requires a standalone Consumer Health Data Privacy Policy.
- Prayer requests and journal entries are the highest-risk data. Encrypt them on the device and never send them to an LLM without opt-in.

### Gaps
- The GDPR Art. 9 primary text was not fetched.
- The exact current wording of the 152-FZ Art. 18(5) exceptions after the 2025 amendments needs checking against consultant.ru.
- Current MHMDA damages figures are inconsistent across sources.

## 5. AI use (chatbots giving spiritual or mental-health advice)

### Takeaway
Do not market any AI feature as "therapy", "counselor" or a "Christian therapist". Illinois bans that, and other states are following. If you use an LLM at all, keep it narrow: retrieval-only verse finding from a curated set, with crisis interception, AI disclosure, no persona or companion behaviour, and no free-form pastoral or medical advice.

### Cited Findings
- **Illinois WOPR Act (HB 1806), signed August 2025** (IDFPR press release dated 4 August; others say 1 August): only licensed professionals may provide therapy. AI may not make independent therapeutic decisions, deliver psychotherapy, or be advertised as therapy without licensed oversight. Fines run up to $10,000 per violation, enforced by IDFPR. Administrative uses are allowed. The Act applies to providers serving Illinois residents wherever the provider is based. — [IDFPR press release](https://idfpr.illinois.gov/content/dam/soi/en/web/idfpr/news/2025/2025-08-04-idfpr-press-release-hb1806.pdf); [Baker Donelson](https://bakerdonelson.com/illinois-passes-extensive-law-regulating-ai-in-behavioral-health); [Baker Botts](https://ourtake.bakerbotts.com/post/102lr2p/illinois-enacts-first-in-the-nation-guardrails-on-ai-therapy)
- The Illinois Act excludes religious counseling, peer support, and self-help or educational resources that do not claim to offer therapy. — [Mondaq/Baker Botts](https://www.mondaq.com/unitedstates/new-technology/1696216/illinois-enacts-first-in-the-nation-guardrails-on-ai-therapy); [Engadget](https://www.engadget.com/ai/illinois-is-the-first-state-to-ban-ai-therapists-145755797.html)
- Character.AI and Google agreed in January 2026 to settle several family lawsuits over teen harm and suicide, including *Garcia* (Sewell Setzer III). The terms were not disclosed. — [Bloomberg Law](https://news.bloomberglaw.com/litigation/character-ai-google-agree-to-settle-teen-chatbot-harm-lawsuits); [Washington Times/AP](https://m.washingtontimes.com/news/2026/jan/7/google-chatbot-maker-character-settle-lawsuit-alleging-chatbot-pushed/)
- California SB 243 (effective 1 January 2026) covers companion chatbots: AI disclosure, crisis-referral protocols and protections for minors (see Section 3). — [aicompanionpick](https://aicompanionpick.com/character-ai-lawsuits-explained-2026) (secondary)
- Apple: chatbots fall under 4.7, apps that generate AI content need filtering and reporting under 1.2, and sharing data with a third-party AI requires explicit consent under 5.1.2(i). — [Apple Guidelines](https://developer.apple.com/app-store/review/guidelines/)

### Inferences
- **Recommended guardrails:**
  1. Disclose the AI on every screen where it is used.
  2. Prefer retrieval from a theologically reviewed verse library over open generation. Never let the model invent or paraphrase verses as quotations; cite the translation and reference.
  3. Run a crisis classifier before the LLM on every input, and send risky inputs to the crisis card.
  4. Hard refusals on medication, diagnosis, stopping treatment, and "is my anxiety a sin or lack of faith" style condemnation.
  5. No romantic or companion persona, no "I am your pastor", and session or break reminders.
  6. Age gate the app, or apply minor protections if under-18s are allowed.
  7. Don't log content, or minimise it with opt-in.
  8. Red-team the system in both RU and EN.
  9. Keep the marketing claim "self-help / devotional / educational", which is the category Illinois excludes.
- Other states (Nevada and Utah in 2025, among others) reportedly passed AI mental-health chatbot laws. Not verified this session.

### Gaps
- No primary text was read for SB 243, Nevada AB 406, Utah HB 452 or New York's companion-AI law.
- I found no Russian-specific AI-in-healthcare rule.
- EU AI Act obligations (transparency under Art. 50, applying from August 2026) are not researched in detail.

## 6. Theological caution

### Takeaway
The main risks are proof-texting (Phil 4:6, Jer 29:11 and Matt 6:34 pulled from context), "healing-promise" or prosperity framing that implies anxiety means weak faith or that faith guarantees relief, and denominational bias. The canon, numbering and translation each differ for Orthodox, Catholic and Protestant users. Mitigations are context notes, an explicit "faith and professional help are compatible" stance, deuterocanonical content as an opt-in, and named reviewers from each tradition.

### Cited Findings
- The Septuagint, followed by the Orthodox Synodal and Catholic Vulgate traditions, differs from the Hebrew Psalter in division and numbering, so Orthodox and Protestant users see different Psalm numbers for the same text. — [Wikipedia: Psalms](https://en.wikipedia.org/wiki/Psalms); [Azbyka](https://www.azbyka.ru/otechnik/Spravochniki/bibliologicheskij-slovar-tom-2/483)
- The Psalm superscriptions, which are numbered verses in the Synodal and Hebrew text, carry authorial and liturgical context. Patristic tradition, for example Gregory of Nyssa's "On the inscriptions of the Psalms", treats them as meaningful. — [Azbyka: Gregory of Nyssa](https://azbyka.ru/otechnik/Grigorij_Nisskij/o-nadpisanii-psalmov/)

### Inferences
These come from general knowledge, with no web sources gathered for them this session:
- **Canon:** Protestant Bibles (KJV without Apocrypha, BSB, WEB core, ESV, NIV) omit Sirach and Wisdom. Catholic Bibles (Douay-Rheims) include them as deuterocanonical. The Russian Synodal includes them as "неканонические" books, read for edification, and the Orthodox use them liturgically.
- Sirach 30:21–25 (on not giving yourself over to sorrow) is relevant to anxiety. Show it with a label such as "Deuterocanonical / Неканоническая книга". Let Protestant users hide these books. The requester's mapping (EN 30:21–25 = Syn 30:22–27) is unverified.
- **Out-of-context checklist for each verse card:**
  1. Who is speaking, and to whom (for example, Jer 29:11 is addressed to exiled Israel and comes after a 70-year exile, not as an immediate personal promise).
  2. Literary genre: lament Psalms such as Ps 13, 42/41(Syn) and 88/87 legitimise distress and are valuable precisely because they don't resolve quickly.
  3. Don't truncate. Phil 4:6–7 should be read with 4:4–9, and 1 Pet 5:7 with 5:6–10.
  4. Avoid "claim this promise" language.
- **Avoid prosperity or healing-guarantee framing:**
  - Never imply that anxiety is sin or a lack of faith, or that enough faith or prayer will make it vanish. Avoid "Do not be anxious" used as a command to shame.
  - Do affirm that seeking medical or psychological help is compatible with faith. All three traditions broadly allow this; Sirach 38:1–15 on honouring physicians is useful here and is itself deuterocanonical.
- **Neutrality:**
  - Use a common reference set for Psalms, Gospels and Epistles, with tradition-specific extras: Orthodox prayers (for example the Jesus Prayer) and Catholic and Protestant devotionals as optional packs.
  - Avoid contested doctrinal claims in the app's own commentary.
  - Russian-speaking users are predominantly Orthodox but include many evangelical/Baptist users. They will notice whether you use the Synodal or a modern translation, and whether you use "Господь" or "Иегова". Don't mix them.
- **Review process:**
  - Set up a small editorial board: at least one Orthodox priest or theologian, one Catholic and one evangelical reviewer, plus a licensed clinician (psychologist or psychiatrist) for the mental-health framing.
  - Document the review (reviewer, date, verse set version), version the content, and show "content reviewed by…" in the app.
  - Optionally seek a blessing ("По благословению…") or an imprimatur only if you target one tradition; in an ecumenical app, don't claim one.

### Gaps
- No primary or academic sources were gathered on proof-texting ethics, on denominational positions toward mental-health care (for example ОЦП documents such as «Основы социальной концепции РПЦ» section XI on health), or on the Sirach 30 verse mapping. These need dedicated follow-up.

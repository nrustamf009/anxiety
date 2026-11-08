# Неявные отрывки о страхе и тревоге: толкования, смысл для тревожного человека, практики (задача 3 ТЗ)

> **Ограничения сессии (важно для редактора).** Сеть облачной сессии не пускала на azbyka.ru, ekzeget.ru, ccel.org, biblestudytools.com, archive.spurgeon.org, pravoslavie.ru, predanie.ru, ru.wikisource.org (DNS/403 у прокси). Поэтому **ни одной дословной цитаты из Лопухина и ни одного русского перевода святоотеческих текстов получить не удалось**. Святоотеческие толкования ниже — дословно, но **в английском переводе**. Источник: открытая база *HistoricalChristianFaith / Commentaries-Database* (GitHub; тексты по изданиям NPNF, Ancient Christian Commentary on Scripture (ACCS) и др.). Западные толкования взяты дословно из модулей SWORD, это общественное достояние: Matthew Henry, *Concise Commentary* (пакет Debian `sword-comm-mhcc` 2.0, исходный текст CCEL `https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt`) и C. H. Spurgeon, *The Treasury of David* (пакет Debian `sword-comm-tdavid` 2.1, TextSource `http://archive.spurgeon.org/treasury/`). Русские переводы цитат в этих заметках сделаны редакцией. Это перевод, а не цитата из русского издания.
>
> Статусы: **ДОСЛОВНО (англ.)** — текст сверен по файлу или модулю; **ПЕРЕСКАЗ** — моё изложение; **НЕ НАЙДЕНО** — источник недоступен.
>
> URL-шаблон файла в базе HCF: `https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/<Автор>/<Книга Гл_Ст>.toml` (пробелы кодируются как `%20`, нумерация английская).

## Вопрос 0. Сверка нумерации (Синодальный ↔ BSB/KJV), проверено node по `mobile/.cache/bible/*.json`

### Takeaway
Почти все отрывки совпадают по нумерации. Расходятся псалмы (надписание в Синодальном тексте = ст. 1) и Иона 2. У Пс 141 (142) есть **аномалия в локальном наборе данных**: надписание в нём опущено.

### Cited Findings
- Пс 12:2–6 (Син.) = Ps 13:1–5 (BSB/KJV); Син. 12:1 = надписание («Начальнику хора. Псалом Давида.»); Син. 12:6 = Eng 13:5–6 (в Син. стих 6 длиннее, со вставкой в скобках) — `RusSynodal.json`, `BSB.json`, `KJV.json` (локально).
- Пс 76:2–21 (Син.) = Ps 77:1–20; Син. 76:3 «В день скорби моей ищу Господа… душа моя отказывается от утешения» = Eng 77:2; Син. 76:5 «Ты не даешь мне сомкнуть очей моих…» = Eng 77:4; Син. 76:12 «Буду вспоминать о делах Господа…» = Eng 77:11 — локальные JSON.
- Пс 138 (Син.) = Ps 139: **нумерация стихов совпадает** (138:1 «Господи! Ты испытал меня и знаешь» = 139:1; 138:7–12 = 139:7–12; 24 стиха в обоих) — локальные JSON.
- Пс 56:2 (Син.) «Помилуй меня, Боже… в тени крыл Твоих я укроюсь, доколе не пройдут беды» = Ps 57:1 (Син. 12 стихов, Eng 11) — локальные JSON.
- **Пс 141 (142): в `RusSynodal.json` 7 стихов, надписание отсутствует**. Поэтому в наборе Син. 141:N = Eng 142:N: 141:1 «Голосом моим к Господу воззвал я», 141:2 «излил пред Ним моление мое; печаль мою открыл Ему», 141:3 «Когда изнемогал во мне дух мой, Ты знал стезю мою», 141:5 «Ты прибежище мое и часть моя на земле живых». В печатном Синодальном издании, насколько я помню, 141:1 — это надписание («Учение Давида. Молитва его, когда он был в пещере»), а текст смещён на +1 (141:2–8). **Требуется сверка с печатным изданием.** Пока ссылки на Пс 141 в карточках давать нельзя: пользователь увидит номер, не совпадающий с его Библией — локальные JSON.
- Плач 3:19–26, Иов 42:7, 1 Цар 1 (набор: «I Samuel»), Быт 16, 21, 32, Исх 3–4, Иер 20:7–18, 2 Кор 1:8–10 — **нумерация совпадает** с BSB/KJV (сверены стихи 1 Цар 1:10–18, Быт 32:6–12 и 32:24–31, Быт 16:7–13, Быт 21:15–19, Исх 3:11–12, 4:1, 4:10–14, Иер 20:7–9, 14, 18, 2 Кор 1:8–10) — локальные JSON. В Быт 32 по 32 стиха в обоих текстах.
- **Иона:** Син. 2:1 «И повелел Господь большому киту поглотить Иону…» = Eng **1:17**; Син. 2:2–11 = Eng 2:1–10. В Син. гл. 1 — 16 стихов, в Eng — 17. Ключевые пары: Син. 2:3 «к Господу воззвал я в скорби моей, и Он услышал меня» = Eng 2:2; Син. 2:6 «Объяли меня воды до души моей» = Eng 2:5; Син. 2:8 «Когда изнемогла во мне душа моя, я вспомнил о Господе» = Eng 2:7; Син. 2:11 = Eng 2:10 — локальные JSON. Гипотеза из задания подтверждена.

### Inferences
- Для `books.json` нужны новые коды: `1Sam` (dataset «I Samuel», ru «1 Цар», en «1 Sam»), `Jonah` («Jonah», «Иона», «Jonah»), `Jer` («Jeremiah», «Иер», «Jer»), `Job` («Job», «Иов», «Job»), `Exod` («Exodus», «Исх», «Exod»). Названия наборов проверены по списку книг в `RusSynodal.json`.

### Gaps
- Не сверено с печатным Синодальным изданием (нет доступа к azbyka.ru и подобным сайтам), что Пс 141 там действительно имеет 8 стихов с надписанием.

## Вопрос 1. Авторитетные толкования по каждому отрывку

### Takeaway
По каждому отрывку есть хотя бы одно дословное западное толкование (Henry Concise; для псалмов также Spurgeon). По 11 из 14 есть дословное святоотеческое (в английском переводе). Лопухина получить не удалось ни по одному отрывку. Есть важная находка: несколько классических толкований содержат стыдящие формулировки («сомнения и страхи — от недостатка веры», «трусость, леность, неверие» у Моисея). Для приложения их нельзя брать без смягчения.

### Cited Findings

**Пс 12 (13) «Доколе?»**
- ДОСЛОВНО (англ.), Spurgeon, *Treasury of David*, Ps 13, Exposition v.1: «"How long?" This question is repeated no less than four times. It betokens very intense desire for deliverance, and great anguish of heart. And what if there be some impatience mingled therewith; is not this the more true a portrait of our own experience?… Even then, God is not far from the voice of our roaring; for he does not regard the music of our prayers, but his own Spirit's work in them.» Ниже в том же месте: «Ah, David! how like a fool thou talkest!» (это **резко**, не цитировать). — модуль SWORD `TDavid`; [archive.spurgeon.org/treasury](http://archive.spurgeon.org/treasury/) (страница не открывалась).
- ДОСЛОВНО (англ.), Spurgeon, там же, v.2: «Ruminating upon trouble is bitter work.» — [TDavid](http://archive.spurgeon.org/treasury/).
- ДОСЛОВНО (англ.), Spurgeon, там же, Division: «the question of anxiety, 1, 2; the cry of prayer, 3, 4; the song of faith, 5, 6.» — [TDavid](http://archive.spurgeon.org/treasury/).
- ДОСЛОВНО (англ.), Matthew Henry Concise, Ps 13: «It is a common temptation, when trouble lasts long, to think that it will last always. Those who have long been without joy, begin to be without hope. We should never allow ourselves to make any complaints but what drive us to our knees.» — модуль `MHCC`, [CCEL mhcc.txt](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt). Там же есть и рискованное место: «anxious cares are heavy burdens with which believers often load themselves more than they need».
- ДОСЛОВНО (англ.), свт. Иоанн Златоуст, *Commentary on the Psalms* (Ps 13 [LXX 12]): «Just as the sailor on leaving port wanders in every direction and the person deprived of light bumps into many things, so too the one who encounters God's forgetting is caught up constantly in worries and cares and sorrows.» — [HCF: John Chrysostom/Psalms 13_2](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/Psalms%2013_2.toml). Осторожно: в соседнем фрагменте (13_1) Златоуст говорит «when you are in trouble, do not say, "God has forgotten me"» и связывает «забвение» с жизнью во грехе. Тревожному читателю этот фрагмент давать нельзя — [HCF 13_1](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/Psalms%2013_1.toml).

**Пс 76 (77) — бессонная ночь, воспоминание**
- ДОСЛОВНО (англ.), блж. Иероним, *Homily 10 on Psalm 76*: «When we are in tribulation, we are cast down to the ground, we think of nothing else but our trouble; but this man in his tribulation is prompted to beseech God.» — [HCF: Jerome/Psalms 77_2](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Jerome/Psalms%2077_2.toml); первоисточник: [historicalchristian.faith, Jerome, Homily 10](https://historicalchristian.faith/by_father.php?file=Jerome%2FHomilies%2520on%2520Psalms%2Fhomily_010.html).
- ДОСЛОВНО (англ.), Spurgeon, Ps 77 v.4: «Sleep is a great comforter, but it forsakes the sorrowful… Great griefs are dumb… He had cried to God but he could not speak to man, what a mercy it is that if we can do the first, we need not despair though the second should be quite out of our power. Sleepless and speechless Asaph was reduced to great extremities, and yet he rallied, and even so shall we.» — [TDavid](http://archive.spurgeon.org/treasury/).
- ДОСЛОВНО (англ.), Spurgeon, Ps 77 v.11: «Memory is a fit handmaid for faith. When faith has its seven years of famine, memory like Joseph in Egypt opens her granaries.» — [TDavid](http://archive.spurgeon.org/treasury/).
- ДОСЛОВНО (англ.), Spurgeon, Ps 77 v.3: «He mused and mused but only sank the deeper.» — [TDavid](http://archive.spurgeon.org/treasury/).
- ДОСЛОВНО (англ.), Henry Concise, Ps 77:1–10: «Days of trouble must be days of prayer… He pored upon the trouble; the methods that should have relieved him did but increase his grief… The troubled fountain will work itself clear again; and the recollection of former times of joyful experience often raises a hope, tending to relief.» **Риск** в том же абзаце: «Doubts and fears proceed from the want and weakness of faith… to be thought upon by us with sorrow and shame.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).

**Пс 138 (139) «Куда пойду от Духа Твоего»**
- ДОСЛОВНО (англ.), блж. Августин, *Exposition on Psalm 139* (v.11): «The night was made to me light, because in the night I despaired of being able to cross so great a sea… For it is night so long as we are passing through this life. How was the night made light? Because Christ came down into the night.» — [HCF: Augustine/Psalms 139_11](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Augustine%20of%20Hippo/Psalms%20139_11.toml).
- ДОСЛОВНО (англ.), Августин, *Ten Homilies on 1 John*, Hom. 6 (о Пс 138:7): «If thou wouldest flee from Him, flee to Him. Flee to Him by confessing, not from Him by hiding.» — [HCF: Augustine/Psalms 139_7-8](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Augustine%20of%20Hippo/Psalms%20139_7-8.toml).
- ДОСЛОВНО (англ.), Henry Concise, Ps 139:7–16: «On the other hand, the believer cannot be removed from the supporting, comforting presence of his Almighty Friend… No outward circumstances can separate him from his Lord.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- ДОСЛОВНО (англ.), C. S. Lewis, *Letters to Malcolm*, Letter 14: «We may ignore, but we can nowhere evade, the presence of God. The world is crowded with Him.» — [HCF: CS Lewis/Psalms 139_7](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/CS%20Lewis/Psalms%20139_7.toml). Текст Льюиса **не в общественном достоянии** (авторские права), его можно только упоминать.
- Риск: у Spurgeon (139:11–12) акцент на том, что грешнику не спрятаться. Для ОКР/скрупулёзности это может звучать как надзор, а не утешение — [TDavid](http://archive.spurgeon.org/treasury/).

**Плач 3:19–26 «Милосердие обновляется каждое утро»**
- ДОСЛОВНО (англ.), св. Фома Аквинский, *Commentary on Lamentations* (3:21): «memory results regards faithfulness. "But this I call to mind, and therefore I have hope."» — [HCF: Thomas Aquinas/Lamentations 3_21](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Thomas%20Aquinas/Lamentations%203_21.toml).
- ДОСЛОВНО (англ.), блж. Феодорит Кирский, *Letter 78* (с цитатой Плач 3:25): «Let us not murmur at the storm that has arisen, for the Lord of all knows what is good for us.» — [HCF: Theodoret/Lamentations 3_26](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Theodoret%20of%20Cyrus/Lamentations%203_26.toml). Это пастырское письмо, а не толкование.
- ДОСЛОВНО (англ.), Henry Concise, Lam 3:21–36: «Bad as things are, it is owing to the mercy of God that they are not worse. We should observe what makes for us, as well as what is against us. God's compassions fail not; of this we have fresh instances every morning… If we cannot say with unwavering voice, The Lord is my portion; may we not say, I desire to have Him for my portion…?» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- Есть ещё проф. П. Юнгеров, толкование на Плач 3 (azbyka.ru), по поисковому сниппету: «Милость Господня (в том), что Он не оставил меня, ибо не истощилось Его милосердие». **Не сверено**, страница недоступна — [azbyka: Юнгеров, Плач 3](https://www.azbyka.ru/otechnik/Pavel_Yungerov/plach-ieremii/3).

**Иов 42:7 «вы говорили о Мне не так верно, как раб Мой Иов»**
- ДОСЛОВНО (англ.), свт. Григорий Двоеслов, *Moralia in Job*, кн. 35: «Behold, we know that in Thy judgment blessed Job is victorious, whom we believed to have sinned against Thee by his words. In Thy judgment those are condemned, who believed that they surpassed the merits of blessed Job by speaking in Thy behalf.» — [HCF: Gregory the Dialogist/Job 42_7](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Gregory%20the%20Dialogist/Job%2042_7.toml); [первоисточник](https://historicalchristian.faith/by_father.php?file=Gregory%2520the%2520Dialogist%2FMorals%2520on%2520the%2520Book%2520of%2520Job%2FGregoryMoralia%2FBook35.html).
- ДОСЛОВНО (англ.), Henry Concise, Job 42:7–9: «Job's friends had wronged God, by making prosperity a mark of the true church, and affliction a certain proof of God's wrath… if God say, Well done… it is of little consequence who says otherwise.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- ДОСЛОВНО (англ.), Фома Аквинский, *Commentary on Job* 42:7: друзья «had sinned gravely in asserting perverse doctrines», Иов — «who did not withdraw from the truth of faith». — [HCF: Aquinas/Job 42_7](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Thomas%20Aquinas/Job%2042_7.toml).

**1 Цар 1 (Анна)**
- ДОСЛОВНО (англ.), свт. Иоанн Златоуст, *Homilies on Hannah* 2 (ACCS): «You are aware, of course, how distressed souls are susceptible to abuse and insult: just as bad wounds cannot stand the slightest contact with the hand but become worse, so too the soul that is disturbed and upset has problems with everything and is stung by a chance remark.» — [HCF: John Chrysostom/1 Samuel 1_13-14](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/1%20Samuel%201_13-14.toml). Дальше Златоуст хвалит Анну за то, что она «not even upset», и призывает «put up nobly with those who insult us». Это аскетический акцент, его не стоит переносить как требование к тревожному человеку.
- ДОСЛОВНО (англ.), Златоуст, *Hom. on Matthew* 6.8: «those which are for God alone; such as were Hannah's, for "her lips moved," it is said, "but her voice was not heard;" however, her tears alone uttered a cry more clear than any trumpet.» — [HCF: 1 Samuel 1_13-14](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/1%20Samuel%201_13-14.toml); [первоисточник (NPNF)](https://historicalchristian.faith/by_father.php?file=John%2520Chrysostom%2FHomilies%2FOn%2520Matthew%2FHomily%25206.html).
- ДОСЛОВНО (англ.), Златоуст, *Hom. on Ephesians* 24: «So that the delay is not the result of envy or of witchcraft, but of providential kindness.» — [HCF: 1 Samuel 1_10-11](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/1%20Samuel%201_10-11.toml).
- ДОСЛОВНО (англ.), Henry Concise, 1 Sam 1:9–18: «Hannah mingled tears with her prayers; she considered the mercy of our God, who knows the troubled soul. God gives us leave, in prayer, not only to ask good things in general, but to mention that special good thing we most need and desire… She had herself by prayer committed her case to God, and Eli had prayed for her. Prayer is heart's ease to a gracious soul.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- Русский перевод «Бесед об Анне» Златоуста (СПбДА, т. 4) существует, но открыть его не удалось. **НЕ НАЙДЕНО.**

**Быт 32 (Иаков перед Исавом)**
- ДОСЛОВНО (англ.), Henry Concise, Gen 32:1–8: «Jacob received an account of Esau's warlike preparations against him, and was greatly afraid. A lively sense of danger, and quickening fear arising from it, may be found united with humble confidence in God's power and promise.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- ДОСЛОВНО (англ.), Henry Concise, Gen 32:9–23: «Times of fear should be times of prayer… Here is a thankful acknowledgement of former undeserved favours; a humble confession of unworthiness; a plain statement of his fears and distress; a full reference of the whole affair to the Lord… Jacob's fear did not make him sink into despair, nor did his prayer make him presume upon God's mercy, without the use of means. God answers prayers by teaching us to order our affairs aright.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- ДОСЛОВНО (англ.), Henry Concise, Gen 32:24–32: «Jacob being alone, more fully spread his fears before God in prayer.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- ДОСЛОВНО (англ.), Филоксен Маббугский (сирийский автор, нехалкидонит), *13 Ascetic Discourses*, 4: Иаков, «in giving thanks unto God for the things which he had, and entreating to be delivered from his brother», говорит «for I am afraid of him». — [HCF: Philoxenus/Genesis 32_10](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Philoxenus%20of%20Mabbug/Genesis%2032_10.toml). Для «православной» колонки Филоксен не годится.
- Святоотеческого толкования именно на страх Иакова (32:7–11) в базе HCF нет. Свт. Иоанн Златоуст, *Беседы на Бытие* 58, — ожидаемый источник, но **НЕ НАЙДЕН** в доступных файлах.

**Исх 3–4 (Моисей: «а если они не поверят?»)**
- ДОСЛОВНО (англ.), прп. Ефрем Сирин, *Commentary on Exodus* 3.3: «Although I have a royal title, I will not be received by him. And now that I do the work of a simple shepherd, who will allow me to go before Pharaoh?» — [HCF: Ephrem/Exodus 3_11](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Ephrem%20the%20Syrian/Exodus%203_11.toml).
- ДОСЛОВНО (англ.), Ориген, *Homilies on Exodus* 3: «when he began to hear the voice of God… then he perceived his own voice to be feeble and thin»; на 4:12 — «Because, therefore, he had advanced so far in understanding as to recognize his own self… the divine favor rewards him… "I will open your mouth"». — [HCF: Origen/Exodus 4_10](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Origen%20of%20Alexandria/Exodus%204_10.toml), [4_12](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Origen%20of%20Alexandria/Exodus%204_12.toml). Ориген не канонизирован, для «православной» колонки не подходит.
- ДОСЛОВНО (англ.), блж. Иероним, *Commentary on Isaiah*: Моисей «answered not out of contempt but out of humility». — [HCF: Jerome/Exodus 4_13](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Jerome/Exodus%204_13.toml).
- ДОСЛОВНО (англ.), блж. Августин, *Questions on Exodus* 10: Бог упрекнул Моисея, «who feared to go because he was less suitable… Still, he should have put all his hope in God.» — [HCF: Augustine/Exodus 4_14](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Augustine%20of%20Hippo/Exodus%204_14.toml).
- ДОСЛОВНО (англ.), Henry Concise, Exod 3:11–15: «Now, when the fittest person on earth for it, he knows his own weakness… But all objections are answered in, Certainly I will be with thee. That is enough.» **Риск**: Exod 4:10–17 — «there was much of cowardice, slothfulness, and unbelief in him… Even self-diffidence, when it hinders us from duty… is very displeasing to the Lord.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).

**Иер 20:7–18 (жалоба пророка)**
- ДОСЛОВНО (англ.), Ориген, *Homilies on Jeremiah* 20: «He speaks then having suffered something human, which we too are often in danger of having suffered… he often says: I withdraw; what have I to do with troubles?» — [HCF: Origen/Jeremiah 20_9](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Origen%20of%20Alexandria/Jeremiah%2020_9.toml).
- ДОСЛОВНО (англ.), Henry Concise, Jer 20:14–18: «He is angry that his first breath was not his last. While we remember that these wishes are not recorded for us to utter the like, we may learn good lessons from them.» На 20:7–13: «Let the people of God open their cause before Him, and he will enable them to see deliverance.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- ДОСЛОВНО (англ.), блж. Иероним, *Commentary on Jeremiah* (20:14–18): ставит слова Иеремии в один ряд с Иов 3 («cursed be the day on which I was born»). — [HCF: Jerome/Jeremiah 20_14-15](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Jerome/Jeremiah%2020_14-15.toml).
- **Безопасность**: 20:14–18 — это желание не родиться. Отрывок соседствует с суицидальной тематикой, карточка с ним должна быть `crisis_adjacent`.

**Иона 2**
- ДОСЛОВНО (англ.), блж. Феодорит Кирский, *Commentary on Jonah* 2:3 (ACCS): «"I," says Jonah, "who previously thought that God appears to prophets only in Jerusalem, found him present even in the whale's belly. And having prayed to him, I was delivered by his love of humanity."» — [HCF: Theodoret/Jonah 2_1-2](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Theodoret%20of%20Cyrus/Jonah%202_1-2.toml).
- ДОСЛОВНО (англ.), блж. Иероним, *Commentary on Jonah* 2:7 [Син. 2:8]: «Although I hoped for no aid, he says, the memory of the Lord saved me… I saw myself imprisoned in the intestines of the whale, and all my hope was the Lord.» Он же о 2:2 [Син. 2:3]: «He does not say, "I cry", but "I cried". He does not pray for the future, but gives thanks for the past.» — [HCF: Jerome/Jonah 2_7](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Jerome/Jonah%202_7.toml), [2_2](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Jerome/Jonah%202_2.toml).
- ДОСЛОВНО (англ.), свт. Василий Великий, *Letter 242*: «remembering how even he who was swallowed by the sea monster, because he did not despair of his life, but cried to the Lord, was saved. Thus too we, though we have reached the last pitch of peril, do not give up our hope in God.» — [HCF: Basil/Jonah 2_1-2](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Basil%20of%20Caesarea/Jonah%202_1-2.toml).
- ДОСЛОВНО (англ.), свт. Кирилл Александрийский, *Comm. on the Twelve Prophets: Jonah*: «the greatness of the danger and the weight of what had happened was in no way short of seeming to have died completely». — [HCF: Cyril/Jonah 2_7](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Cyril%20of%20Alexandria/Jonah%202_7.toml).
- ДОСЛОВНО (англ.), Henry Concise, Jonah 2:1–9: «No place is amiss for prayer. Men may shut us from communion with one another, but not from communion with God… But though he was perplexed, yet not in despair.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).

**2 Кор 1:8–10 («не надеялись остаться в живых»)**
- ДОСЛОВНО (англ.), свт. Иоанн Златоуст, *Homily 2 on 2 Corinthians*: «"We were weighed down exceedingly, beyond our power." Like a vessel sinking under some mighty burden… it both was great and surpassed our strength.» И на 1:9: «this did not come to the proof, but only as far as to our anticipations, and stopped there… permitted it to happen only in our thought and in expectation.» — [HCF: Chrysostom/2 Corinthians 1_8](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/2%20Corinthians%201_8.toml), [1_9](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/2%20Corinthians%201_9.toml); [первоисточник NPNF](https://historicalchristian.faith/by_father.php?file=John%2520Chrysostom%2FHomilies%2FOn%25202%2520Corinthians%2FHomily%25202.html).
- ДОСЛОВНО (англ.), блж. Феофилакт Болгарский, *Comm. on 2 Corinthians* 1: «a trial, even being severe, can be courageously endured by one who has the strength to endure it, he says that it was not only great but also exceeded our strength… we no longer hoped even to remain alive.» — [HCF: Theophylact/2 Corinthians 1_8](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Theophylact%20of%20Ohrid/2%20Corinthians%201_8.toml). Русский оригинал (перевод МДА) на azbyka.ru **не открыт**.
- ДОСЛОВНО (англ.), Henry Concise, 2 Cor 1:1–11 (начало): «The Lord is able to give peace to the troubled conscience, and to calm the raging passions of the soul.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).

**Быт 16 и 21 (Агарь)**
- ДОСЛОВНО (англ.), свт. Иоанн Златоуст, *Homilies on Genesis* 46.7–8 (о 21:19): «"He opened her eyes,"… not because she couldn't see before this but because even with her eyes open nothing was of any help to her before the visitation from on high… In like manner, whenever God wishes, even if we are utterly alone, even if we are in desperate trouble, even if we have no hope of survival, we need no other assistance». О 21:17–18: «Don't lose heart, he is saying, at being driven from home.» — [HCF: Chrysostom/Genesis 21_19](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/Genesis%2021_19.toml), [21_18](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/Genesis%2021_18.toml).
- ДОСЛОВНО (англ.), прп. Беда, *Commentary on Genesis* (16:13): Агарь поняла, что колодец «signified the deep divine dispensations by which He showed mercy to her affliction». — [HCF: Bede/Genesis 16_13](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Bede/Genesis%2016_13.toml).
- ДОСЛОВНО (англ.), Henry Concise, Gen 21:14–21: «Many who have reason to be comforted, go mourning from day to day, because they do not see the reason they have for comfort. There is a well of water near them… but they are not aware of it, till the same God that opened their eyes to see their wound, opens them to see their remedy.» **Риск**: на 16:7–16 Генри пишет, что Агарь была «out of the way of her duty»; на 21:14 — «they were justly punished». Обвиняющая рамка по отношению к жертве изгнания. — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).

**Пс 56 (57) и Пс 141 (142) — псалмы пещеры**
- ДОСЛОВНО (англ.), Spurgeon, Ps 57:1: «Urgent need suggests the repetition of the cry… Not in the cave alone would he hide, but in the cleft of the Rock of ages. As the little birds find ample shelter beneath the parental wing…» — [TDavid](http://archive.spurgeon.org/treasury/).
- ДОСЛОВНО (англ.), блж. Августин, *Sermon 77A*.1: «Who has hoped in God and been abandoned?… our struggle is known to Him, who knows how both to watch and to help.» — [HCF: Augustine/Psalms 57_1](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Augustine%20of%20Hippo/Psalms%2057_1.toml).
- ДОСЛОВНО (англ.), Spurgeon, Ps 142:2: «He must pour out the wormwood and the gall, he could not keep it in… we may learn from this text that our complaint must never be of a kind that we dare not bring before God. We may complain to God, but not of God.» — [TDavid](http://archive.spurgeon.org/treasury/).
- ДОСЛОВНО (англ.), Spurgeon, Ps 142:3: «A heavy fog settles down upon the mind… David was a hero, and yet his spirit sank… Truly it is well for us to know that God knows what we do not know. We lose our heads, but God never closes his eyes.» — [TDavid](http://archive.spurgeon.org/treasury/).
- ДОСЛОВНО (англ.), Henry Concise, Ps 142: «We are apt to show our troubles too much to ourselves, poring upon them, which does us no service; whereas, by showing them to God, we might cast the cares upon him who careth for us, and thereby ease ourselves.» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- ДОСЛОВНО (англ.), блж. Августин, *Exposition on Psalm 142*: «thy thought is thy cry to the Lord… My cry is my prayer, not reviling, not murmuring, not blaspheming.» — [HCF: Augustine/Psalms 142_1](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Augustine%20of%20Hippo/Psalms%20142_1.toml).

### Inferences
- Лучшие «опорные» цитаты для приложения: Henry о Иакове («A lively sense of danger… may be found united with humble confidence»), Henry об Анне («Prayer is heart's ease»), Spurgeon о Пс 77 («Memory is a fit handmaid for faith»), Spurgeon о Пс 142 («We may complain to God, but not of God»), Златоуст об Анне («the soul that is disturbed… is stung by a chance remark»), Иероним и Феодорит об Ионе.
- Классические толкователи часто читают страх как недостаток веры (Henry на Пс 77 и Исх 4; Spurgeon на Пс 13:1; Златоуст на Пс 13:1). Это противоречит принципу приложения «тревога — не грех». Такие места брать только с выборочным цитированием и с пометкой в `review.open_issues`.
- Святоотеческие толкования на Пс 56, Пс 141, Быт 16, Быт 32 почти полностью аллегорические (Христос, Церковь, синагога). Практического пастырского материала о страхе в них мало. Для этих отрывков «западная» колонка содержательнее.

### Gaps
- **Лопухин — НЕ НАЙДЕН ни по одному отрывку**: azbyka.ru и зеркала недоступны в сессии. Ожидаемые URL для ручной проверки: `https://azbyka.ru/otechnik/Lopuhin/tolkovaja_biblija_01/32` (Быт 32), `…_09/…` и т. п. Это шаблон, не проверенные ссылки.
- Русские переводы Златоуста (Беседы об Анне, на 2 Кор, на Бытие), Феофилакта (2 Кор), Феодорита (на 12 пророков) не открыты. Для приложения нужно найти русский текст и заменить английский.
- Calvin, Brueggemann и современные научные комментарии не найдены. CCEL и издательские сайты закрыты. Брюггеманна (типология псалмов orientation/disorientation/new orientation) я знаю только по памяти, без цитаты, поэтому в заметки он не включён.
- Для части цитат в HCF `source_url` пуст: это переводы ACCS (InterVarsity Press, **под авторским правом**). Цитировать их коротко можно, длинные выдержки в приложение вставлять нельзя.

## Вопрос 2. Чему каждый отрывок учит тревожного человека

### Takeaway
Отрывки складываются в пять уроков: (1) можно чувствовать и называть страх (Иаков «я боюсь его», Анна, Пс 12, Пс 76); (2) честная, даже «неприличная» речь к Богу принимается (Иов 42:7, Иер 20, Пс 141); (3) молитва и практическое действие идут вместе (Иаков, Агарь «встань, подними отрока»); (4) память о прошлой верности Бога — опора на сейчас (Пс 76:12, Плач 3:21, Иона 2:8); (5) присутствие Бога там, где кажется «дно» или «тьма» (Пс 138:11–12, Иона 2, 2 Кор 1:9).

### Cited Findings
- Разрешение чувствовать и называть: Henry — «a plain statement of his fears and distress» как часть образцовой молитвы Иакова — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt); Анна — «God gives us leave… to mention that special good thing we most need» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- Честная речь: Бог говорит друзьям Иова, что они говорили о Нём «не так верно, как раб Мой Иов» (Иов 42:7, Син.). Свт. Григорий: «those are condemned, who believed that they surpassed the merits of blessed Job by speaking in Thy behalf» — [HCF](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Gregory%20the%20Dialogist/Job%2042_7.toml). Spurgeon: «We may complain to God, but not of God» — [TDavid](http://archive.spurgeon.org/treasury/).
- Молитва и средства: Henry о Иакове — «nor did his prayer make him presume upon God's mercy, without the use of means» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt); Henry об Агари — «God's readiness to help us when we are in trouble, must not slacken, but quicken our endeavours to help ourselves» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- Память: Spurgeon, Ps 77:11 — «Memory is a fit handmaid for faith» — [TDavid](http://archive.spurgeon.org/treasury/); Аквинат, Плач 3:21 — «memory results regards faithfulness» — [HCF](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Thomas%20Aquinas/Lamentations%203_21.toml); Иероним, Иона 2:7 — «the memory of the Lord saved me» — [HCF](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/Jerome/Jonah%202_7.toml).
- Катастрофизация как «приговор в себе», которому не суждено исполниться: Златоуст о 2 Кор 1:9 — «permitted it to happen only in our thought and in expectation» — [HCF](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/2%20Corinthians%201_9.toml).
- Руминация названа прямо: Spurgeon, Ps 13:2 — «Ruminating upon trouble is bitter work»; Ps 77:3 — «He mused and mused but only sank the deeper» — [TDavid](http://archive.spurgeon.org/treasury/); Henry, Ps 142 — «poring upon them, which does us no service» — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- Ранимость тревожного человека: Златоуст о Анне — «the soul that is disturbed and upset… is stung by a chance remark» — [HCF](https://github.com/HistoricalChristianFaith/Commentaries-Database/blob/master/John%20Chrysostom/1%20Samuel%201_13-14.toml).

### Inferences (по отрывкам; это мои выводы, они не цитируются)
| Отрывок (Син. / Eng) | Урок для тревожного | Риск неверного прочтения |
|---|---|---|
| Пс 12:2–6 / 13:1–5 | «Доколе?» можно говорить Богу; плач — жанр молитвы | «Если чувствую оставленность, значит, я согрешил» (Златоуст 13_1) |
| Пс 76:3–12 / 77:2–11 | Бессонница и «не могу говорить» знакомы псалмопевцу; переход от «неужели навсегда?» к «буду вспоминать» | «Сомнения — от маловерия, стыдись» (Henry) |
| Пс 138:7–12 / 139:7–12 | Нет тьмы, где я один | Чтение как надзора для склонных к ОКР / скрупулёзности |
| Плач 3:19–26 | Честно назвать горечь (19–20), затем сознательно «отвечать сердцу» (21) | «Надо сразу перескочить к надежде» |
| Иов 42:7 | Бог предпочёл честную жалобу благочестивым объяснениям | Читать как разрешение на хулу; контекст 42:1–6 |
| 1 Цар 1:10–18 | Можно излить душу, даже если люди не поняли; после молитвы — поела, лицо не печально | «Помолись — и всё исполнится» (исход 1:20 не обещание каждому) |
| Быт 32:7–12 | Страх + план + молитва + сохранённая память об обещании | «План = неверие» или «молитва без действий» |
| Исх 3:11–4:13 | Сомнения в себе («кто я?», «а если?») Бог встречает обещанием присутствия и помощником (Аарон) | Henry: «cowardice, slothfulness» — стыдящая рамка |
| Иер 20:7–18 | Даже пророк хотел бросить всё и проклинал день рождения; это записано в Писании | Суицидальная близость 20:14–18 → кризисный протокол |
| Иона 2:1–11 / 1:17–2:10 | «Со дна» можно молиться; память о Боге в момент изнеможения | Иона в беде по своей вине — не переносить на тревогу как наказание |
| 2 Кор 1:8–10 | Апостол признаёт: «сверх силы», «не надеялись остаться в живых» | «Если тебе тяжело — ты мало доверяешь» |
| Быт 16:7–13; 21:15–19 | Бог видит невидимую; «открыл глаза ее» — выход рядом, но в панике его не видно; «встань, подними отрока» — маленький шаг | Henry обвиняет Агарь; не переносить |
| Пс 56:2 / 57:1; Пс 141:2–4 (печ.) / 142:2–4 | Молитва из «пещеры»: укрыться, пока не пройдут беды; излить печаль Богу, когда «никто не заботится о душе моей» | Нумерация Пс 141 в наборе данных |

### Gaps
- Нет дословных православных (русских) толкований, которые подтверждали бы эти «уроки». Сейчас они опираются на английские переводы отцов и на протестантских авторов.

## Вопрос 3. Практики на 1–5 минут (предложения)

### Takeaway
Для каждого отрывка предложена практика, связанная с распространённой светской техникой: экспрессивное письмо, когнитивная переоценка, откладывание тревоги, заземление, поведенческая активация, темповое дыхание. Уровень доказательности везде не выше `indirect_secular`: исследований именно этих библейских практик я не нашёл.

### Cited Findings
- Henry описывает молитву Иакова как структуру из четырёх шагов: благодарность за прошлое → признание недостоинства → «plain statement of his fears» → передача дела Богу; затем план. Это готовый каркас практики — [MHCC](https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt).
- Spurgeon делит Пс 13 на «the question of anxiety, 1, 2; the cry of prayer, 3, 4; the song of faith, 5, 6». Это готовый трёхшаговый шаблон плача — [TDavid](http://archive.spurgeon.org/treasury/).

### Inferences (предложения редакции)
| Отрывок | Практика | Мин | technique_pair |
|---|---|---|---|
| Пс 12 (13) | «Три строки Давида»: 1) «Доколе…» — допишите свою жалобу; 2) «Призри, услышь…» — одна просьба; 3) «Я же уповаю…» — одна причина надеяться (можно «хочу надеяться») | 3 | expressive_writing |
| Пс 76 (77) | «Ночная кладовая»: назвать мысль «неужели навсегда?»; вспомнить один конкретный случай помощи из прошлого; медленно прочесть ст. 12 на выдохах | 3 | cognitive_reframing |
| Пс 138 (139) | «Где бы я ни был»: заземление 5-4-3-2-1, на каждом шаге — «и там рука Твоя» | 2 | grounding |
| Плач 3:19–26 | «Что я отвечаю сердцу»: 1 фраза о горечи (ст. 19–20), 1 фраза о том, что ещё не исчезло (ст. 22), «буду надеяться» | 2 | cognitive_reframing |
| Иов 42:7 | «Честно, а не красиво»: 60 с сказать Богу то, что на самом деле чувствую, без благочестивых формул | 1–2 | expressive_writing |
| 1 Цар 1 | «Излить душу»: 2 мин пишу/шепчу всё, что тяжело, «как Анна — губы движутся»; затем одно простое действие заботы о теле (поесть, вода) | 3 | expressive_writing |
| Быт 32 | «План и молитва»: лист в 2 колонки — «что я могу сделать» (1–2 шага) / «что я отдаю Богу»; молитва по схеме Иакова | 4 | worry_postponement / cognitive_reframing |
| Исх 3–4 | «А если…» → «Я буду с тобою»: выписать 2–3 «а если», к каждому — реалистичный ответ и «кто мой Аарон?» (к кому можно обратиться) | 4 | cognitive_reframing |
| Иер 20 | «Огонь в костях»: короткая честная жалоба + вопрос «что во мне всё ещё горит, ради чего я продолжаю?»; кризисная плашка | 2 | expressive_writing |
| Иона 2 | «Со дна»: дыхание 4/6 с фразой Син. 2:3 «В скорби моей — / воззвал к Господу»; вспомнить один «храм» — место или момент, где было хорошо с Богом | 3 | paced_breathing |
| 2 Кор 1:8–10 | «Приговор в себе»: записать катастрофический прогноз; рядом — «было/избавляет/избавит»: одно прошлое избавление, одна поддержка сейчас, одна надежда | 3 | cognitive_reframing |
| Быт 16, 21 | «Открыть глаза»: 3 вещи, которые я сейчас вижу/имею (колодец рядом); один шаг «встань, подними» | 2 | grounding / behavioral_activation |
| Пс 56 (57), 141 (142) | «В пещере»: представить укрытие «в тени крыл»; излить печаль одной фразой; ст. 141:5 [набор] «Ты прибежище мое» на выдохе | 2 | paced_breathing |

### Gaps
- Эффективность конкретных библейских практик не исследована. Доказательная база есть только у светских аналогов (expressive writing, worry postponement и т. д.), но в этой сессии она не проверялась: это задача 5 других исследователей.

## Вопрос 4. Карточки в схеме приложения (черновики)

### Takeaway
Подготовлены 4 карточки (`cards_implicit.json`): Анна → `loneliness`; Иаков → `anticipatory`; Пс 76 (77) → `insomnia`; Иона → `loss_of_control`. Все ссылки разрешаются во всех трёх переводах. Карточки проходят проверки `build-content.mjs` (проверено локальным скриптом) при условии, что в `books.json` добавлены коды `1Sam` и `Jonah`.

### Cited Findings
- Допустимые коды симптомов, иконки, традиции, уровни доказательности, длительность 60–300 с и запрещённые фразы взяты из `mobile/scripts/build-content.mjs` (локально).
- Занятые id: anticipatory, exhaustion, fear-death, fear-future, financial, guilt-shame, health-anxiety, insomnia, loneliness, loss-of-control, loved-ones, panic, restlessness, social, worry-rumination (`mobile/content/cards/*.json`). Новые id: `hannah-poured-out`, `jacob-plan-and-prayer`, `night-remembering`, `jonah-from-the-depths`.

### Inferences
- В `commentary.summary` даны русские переводы английских оригиналов. `verified_quote: true` означает «английский оригинал сверен дословно», а не «русский текст взят из издания». Это отмечено в `review.open_issues` каждой карточки.
- Поле `context` дано в синодальной нумерации (так в существующих карточках, например «4:2-9» в 04-insomnia).

### Gaps
- Лопухин и русские переводы отцов в карточки не вошли: их нужно добавить после доступа к azbyka.ru.
- Клиническая проверка формулировок (особенно карточки Ионы, `crisis_adjacent: true`) не проводилась.

const path = require("path");
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625
pres.title = "LLM через API: GigaChat и DeepSeek";

const C = {
  ink: "161B26", paper: "FFFFFF", soft: "F2F4F7", line: "DDE1E7",
  text: "1F2430", muted: "6B7280", giga: "1DA462", gigaL: "8FD9B1",
  deep: "4D6BFE", deepL: "A9B8FF", warn: "E4572E", amber: "E9A23B",
  code: "1E2330", codeTx: "E6E8EE", codeCm: "8B93A7",
};
const H = "Arial", B = "Calibri", M = "Courier New";
const GIST = "https://gist.github.com/MikelazDotPy/83595966eef51a828f6a8edf89e1400f";
const MODELS = ["GigaChat-3-Pro", "GigaChat-3-Lightning", "deepseek-v4-pro", "deepseek-v4.1-flash"];
const MCOL = [C.giga, C.gigaL, C.deep, C.deepL];

function title(s, t, sub) {
  s.addText(t, { x: 0.5, y: 0.3, w: 9, h: 0.6, fontFace: H, fontSize: 28, bold: true, color: C.text, margin: 0, isTextBox: true });
  if (sub) s.addText(sub, { x: 0.5, y: 0.88, w: 9, h: 0.35, fontFace: B, fontSize: 14, color: C.muted, margin: 0, isTextBox: true });
}
function dot(s, x, y, d, color, label, fs) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color } });
  if (label) s.addText(label, { x, y, w: d, h: d, align: "center", valign: "middle", fontFace: H, bold: true, fontSize: fs || 12, color: "FFFFFF", margin: 0, isTextBox: true });
}
function card(s, x, y, w, h, fill) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill || C.soft }, line: { color: fill || C.soft } });
}
function item(s, x, y, w, col, head, desc, hs, ds, dh) {
  dot(s, x, y + 0.05, 0.2, col);
  s.addText(head, { x: x + 0.32, y, w: w - 0.32, h: 0.3, fontFace: H, fontSize: hs || 14, bold: true, color: C.text, margin: 0, isTextBox: true });
  s.addText(desc, { x: x + 0.32, y: y + 0.3, w: w - 0.32, h: dh || 0.5, fontFace: B, fontSize: ds || 12, color: C.muted, valign: "top", margin: 0, isTextBox: true });
}
const HL = { kw: "C792EA", str: "C3E88D", cm: "7F889C", num: "F78C6C", fn: "82AAFF", cls: "FFCB6B", def: "E6E8EE", punc: "89DDFF" };
const KW = new Set(["from", "import", "for", "in", "if", "def", "return", "None", "True", "False", "and", "or", "not", "with", "as", "POST"]);
function highlight(line) {
  const out = [];
  const re = /(#.*$)|("(?:\\.|[^"\\])*")|([A-Za-z_][A-Za-z0-9_]*)|(\d+(?:\.\d+)?)|(\s+)|(.)/g;
  let m;
  while ((m = re.exec(line)) !== null) {
    let color = HL.def;
    if (m[1]) color = HL.cm;
    else if (m[2]) color = HL.str;
    else if (m[3]) {
      const w = m[3];
      const next = line.slice(re.lastIndex).trimStart()[0];
      const prev = line[m.index - 1];
      if (KW.has(w)) color = HL.kw;
      else if (/^[A-Z]/.test(w) && prev !== ".") color = HL.cls;
      else if (next === "(") color = HL.fn;
    } else if (m[4]) color = HL.num;
    else if (m[6]) color = "=:.,".includes(m[6]) ? HL.punc : HL.def;
    const t = m[0];
    if (out.length && out[out.length - 1].options.color === color) out[out.length - 1].text += t;
    else out.push({ text: t, options: { color } });
  }
  if (!out.length) out.push({ text: " ", options: { color: HL.def } });
  return out;
}
function codeRuns(lines) {
  const runs = [];
  lines.forEach((l, i) => {
    const r = highlight(l);
    if (i < lines.length - 1) r[r.length - 1].options.breakLine = true;
    runs.push(...r);
  });
  return runs;
}
function codeBlock(s, x, y, w, h, lines, fs) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: C.code }, line: { color: C.code } });
  s.addText(codeRuns(lines), { x: x + 0.2, y: y + 0.15, w: w - 0.4, h: h - 0.3, fontFace: M, fontSize: fs || 11, valign: "top", margin: 0, isTextBox: true });
}
function chartBase(extra) {
  return Object.assign({
    catAxisLabelColor: C.text, catAxisLabelFontSize: 11, catAxisLabelFontFace: B,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 9, valAxisLabelFontFace: B,
    valGridLine: { color: "E8EBF0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 10, legendFontFace: B, legendColor: C.text,
  }, extra);
}

function tag(s, x, y, w, t, col) {
  s.addText(t, { x, y, w, h: 0.26, fontFace: H, fontSize: 10.5, bold: true, color: col, margin: 0, isTextBox: true });
}
function kv(rows, fs) {
  const out = [];
  rows.forEach(([k, v, col, mono], i) => {
    out.push({ text: k + " ", options: { bold: true, color: C.text, fontFace: B } });
    out.push({ text: v, options: { color: col || C.text, fontFace: mono ? M : B, fontSize: mono ? fs - 1 : fs, breakLine: i < rows.length - 1 } });
  });
  return out;
}

// ---------- 1. Титул ----------
{
  const s = pres.addSlide(); s.background = { color: C.ink };
  s.addText("LLM через API", { x: 0.6, y: 1.1, w: 8.8, h: 0.9, fontFace: H, fontSize: 44, bold: true, color: "FFFFFF", margin: 0, isTextBox: true });
  s.addText("GigaChat и DeepSeek: как отправлять запросы и какую модель выбрать по качеству, цене и скорости", { x: 0.6, y: 2.0, w: 8.8, h: 0.7, fontFace: B, fontSize: 18, color: "C9CEDA", valign: "top", margin: 0, isTextBox: true });
  dot(s, 0.6, 2.95, 0.32, C.giga, "G", 12);
  s.addText("GigaChat", { x: 1.02, y: 2.95, w: 1.6, h: 0.32, fontFace: B, fontSize: 15, color: "FFFFFF", valign: "middle", margin: 0, isTextBox: true });
  dot(s, 2.6, 2.95, 0.32, C.deep, "D", 12);
  s.addText("DeepSeek", { x: 3.02, y: 2.95, w: 1.6, h: 0.32, fontFace: B, fontSize: 15, color: "FFFFFF", valign: "middle", margin: 0, isTextBox: true });
  s.addText("Код, ответы моделей и данные эксперимента:", { x: 0.6, y: 3.85, w: 8.8, h: 0.3, fontFace: B, fontSize: 13, color: "9AA3B5", margin: 0, isTextBox: true });
  s.addText([{ text: GIST, options: { hyperlink: { url: GIST } } }], { x: 0.6, y: 4.15, w: 8.8, h: 0.35, fontFace: B, fontSize: 14, color: C.deepL, margin: 0, isTextBox: true });
  s.addText("Сабалиров Мухаммад", { x: 0.6, y: 4.85, w: 8.8, h: 0.3, fontFace: B, fontSize: 13, color: "9AA3B5", margin: 0, isTextBox: true });
  s.addNotes("[~35 с · к концу слайда 0:35] Тема доклада — работа с языковыми моделями через API на примере GigaChat и DeepSeek. Сначала коротко покажу, как устроены запросы к обоим API, а потом — результаты эксперимента: сравним четыре модели по качеству, времени ответа и стоимости и разберём, какую модель под какую задачу брать. Весь код и все ответы моделей лежат по ссылке.");
}

// ---------- 2. Как устроен запрос ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Как устроен запрос к LLM", "Обычный HTTP-запрос: отправляем модель и список сообщений, получаем JSON");
  const boxes = [["Ваш код", "Python + SDK"], ["LLM API", "/chat/completions"], ["Ответ", "текст + usage"]];
  boxes.forEach(([a, b], i) => {
    const x = 0.5 + i * 2.05;
    card(s, x, 1.55, 1.7, 1.0, i === 1 ? C.ink : C.soft);
    s.addText(a, { x, y: 1.65, w: 1.7, h: 0.4, align: "center", fontFace: H, fontSize: 15, bold: true, color: i === 1 ? "FFFFFF" : C.text, margin: 0, isTextBox: true });
    s.addText(b, { x, y: 2.05, w: 1.7, h: 0.35, align: "center", fontFace: M, fontSize: 10, color: i === 1 ? "C9CEDA" : C.muted, margin: 0, isTextBox: true });
    if (i < 2) s.addShape(pres.shapes.LINE, { x: x + 1.75, y: 2.05, w: 0.3, h: 0, line: { color: C.muted, width: 1.5, endArrowType: "triangle" } });
  });
  codeBlock(s, 0.5, 2.85, 5.8, 1.95, [
    "POST /chat/completions",
    "{",
    "  \"model\": \"GigaChat-2\",",
    "  \"messages\": [",
    "    {\"role\": \"system\", \"content\": \"Отвечай кратко\"},",
    "    {\"role\": \"user\",   \"content\": \"Привет!\"}",
    "  ]",
    "}",
  ], 10.5);
  const roles = [["system", "задаёт поведение и стиль модели", C.amber], ["user", "вопрос или задача пользователя", C.deep], ["assistant", "предыдущие ответы модели", C.giga]];
  s.addText("Роли сообщений", { x: 6.7, y: 1.55, w: 2.8, h: 0.35, fontFace: H, fontSize: 15, bold: true, color: C.text, margin: 0, isTextBox: true });
  roles.forEach(([r, d, col], i) => {
    const y = 2.0 + i * 0.72;
    dot(s, 6.7, y + 0.04, 0.2, col);
    s.addText(r, { x: 7.0, y, w: 2.5, h: 0.28, fontFace: M, fontSize: 13, bold: true, color: C.text, margin: 0, isTextBox: true });
    s.addText(d, { x: 7.0, y: y + 0.28, w: 2.5, h: 0.35, fontFace: B, fontSize: 12, color: C.muted, margin: 0, isTextBox: true });
  });
  card(s, 6.7, 4.25, 2.8, 0.9, "EEF1FF");
  s.addText("API не хранит диалог: чтобы продолжить чат, всю историю отправляют заново", { x: 6.85, y: 4.3, w: 2.5, h: 0.8, fontFace: B, fontSize: 12, color: C.text, valign: "middle", margin: 0, isTextBox: true });
  s.addNotes("[~40 с · к концу слайда 1:15] Любой запрос к LLM — обычный HTTP POST: модель и список сообщений с ролями. system задаёт поведение, user — наш вопрос, assistant — прошлые ответы модели. API не хранит состояние: чтобы модель «помнила» разговор, каждый раз отправляем всю историю. В ответе, кроме текста, приходит поле usage — сколько потрачено токенов. По нему мы потом считаем стоимость.");
}

// ---------- 3. GigaChat: ключ и токен ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "GigaChat: ключ и токен доступа", "Для физлиц есть бесплатный лимит токенов");
  const steps = [
    ["Вход", "developers.sber.ru → войти через Сбер ID"],
    ["Проект", "Создать проект GigaChat API для физлиц"],
    ["Ключ", "Сгенерировать Authorization key (показывается один раз) и сохранить в .env"],
    ["Сертификат", "Скачать корневой сертификат Минцифры, иначе SSLError"],
  ];
  steps.forEach(([h, d], i) => {
    const y = 1.45 + i * 0.88;
    dot(s, 0.5, y, 0.42, C.giga, String(i + 1), 14);
    s.addText(h, { x: 1.1, y: y - 0.02, w: 3.6, h: 0.3, fontFace: H, fontSize: 14, bold: true, color: C.text, margin: 0, isTextBox: true });
    s.addText(d, { x: 1.1, y: y + 0.28, w: 3.6, h: 0.5, fontFace: B, fontSize: 12, color: C.muted, valign: "top", margin: 0, isTextBox: true });
  });
  const flow = [["Authorization key", "постоянный, из кабинета", C.soft, C.text, "C9CEDA"], ["POST /api/v2/oauth", "обмен по OAuth — SDK делает его сам", C.ink, "FFFFFF", "C9CEDA"], ["access_token", "живёт 30 минут, SDK сам его обновляет", "E8F7EF", C.text, C.muted]];
  flow.forEach(([a, b, fill, col, sub], i) => {
    const y = 1.45 + i * 1.2;
    card(s, 5.2, y, 4.3, 0.64, fill);
    s.addText(a, { x: 5.4, y: y + 0.06, w: 3.9, h: 0.3, fontFace: M, fontSize: 13, bold: true, color: col, margin: 0, isTextBox: true });
    s.addText(b, { x: 5.4, y: y + 0.34, w: 3.9, h: 0.24, fontFace: B, fontSize: 11, color: fill === C.ink ? sub : C.muted, margin: 0, isTextBox: true });
    if (i < 2) s.addShape(pres.shapes.LINE, { x: 7.35, y: y + 0.7, w: 0, h: 0.46, line: { color: C.muted, width: 1.5, endArrowType: "triangle" } });
  });
  s.addNotes("[~40 с · к концу слайда 1:55] Доступ к GigaChat: на developers.sber.ru через Сбер ID создаём проект для физлиц и генерируем Authorization key — сразу в .env. Плюс корневой сертификат Минцифры, иначе SSLError. Ключ — не токен доступа: по протоколу OAuth он меняется на токен, который живёт 30 минут. SDK делает этот обмен сам и сам обновляет токен, так что в коде об этом думать не нужно.");
}

// ---------- 4. GigaChat: первый запрос ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "GigaChat: первый запрос", "pip install gigachat python-dotenv — код можно запускать как есть");
  codeBlock(s, 0.5, 1.4, 5.9, 3.5, [
    "import os",
    "from dotenv import load_dotenv",
    "from gigachat import GigaChat",
    "from gigachat.models import ChatCompletionRequest, ChatMessage",
    "",
    "load_dotenv()",
    "CERT = os.path.expanduser(\"~/certs/russian_trusted_root_ca.crt\")",
    "",
    "client = GigaChat(",
    "    credentials=os.getenv(\"GIGACHAT_AUTH_KEY\"),",
    "    scope=\"GIGACHAT_API_PERS\",  # тариф для физлиц",
    "    ca_bundle_file=CERT,",
    ")",
    "",
    "req = ChatCompletionRequest(",
    "    model=\"GigaChat-2\",",
    "    messages=[ChatMessage(role=\"user\", content=\"Привет, как дела?\")],",
    ")",
    "answer = client.chat.create(req).messages[0].content[0].text",
    "print(answer)",
  ], 9);
  const notes = [
    ["Модель обязательна", "Значения по умолчанию нет. Список: client.get_models()"],
    ["Объекты, а не словари", "ChatMessage, ChatCompletionRequest; параметры — в model_options"],
    ["Ответ", "«Привет! Всё отлично, заряжен на интересную беседу. А у тебя как дела?»"],
  ];
  notes.forEach(([h, d], i) => item(s, 6.75, 1.4 + i * 1.2, 2.75, C.giga, h, d, 14, 12, 0.85));
  s.addNotes("[~35 с · к концу слайда 2:30] Минимальный пример для GigaChat: если ключ лежит в .env, а сертификат в папке certs, код запускается как есть. Модель нужно указать явно, значения по умолчанию нет; список моделей возвращает get_models(). Запрос собирается из объектов ChatMessage и ChatCompletionRequest, параметры генерации — temperature и max_tokens — передаются через model_options. Текст ответа лежит в messages[0].content[0].text.");
}

// ---------- 5. DeepSeek: доступ и первый запрос ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "DeepSeek: доступ и первый запрос", "API совместим с OpenAI, поэтому используем пакет openai");
  codeBlock(s, 0.5, 1.4, 5.9, 3.5, [
    "import os",
    "from dotenv import load_dotenv",
    "from openai import OpenAI",
    "",
    "load_dotenv()",
    "client = OpenAI(",
    "    api_key=os.getenv(\"DEEPSEEK_API_KEY\"),",
    "    # напрямую у DeepSeek: https://api.deepseek.com",
    "    base_url=\"https://ai.starimg.ru/v1\",",
    ")",
    "",
    "resp = client.chat.completions.create(",
    "    model=\"deepseek-v4.1-flash\",",
    "    messages=[{\"role\": \"user\", \"content\": \"Привет, как дела?\"}],",
    ")",
    "print(resp.choices[0].message.content)",
  ], 9.5);
  const notes = [
    ["Оплата", "Бесплатных токенов нет, карты РФ не принимаются. Токены купили у агрегатора"],
    ["Свой base_url", "Меняются только base_url, api_key и model. Запросы идут через посредника"],
    ["Ответ", "«Привет! У меня всё отлично — готов помочь с чем угодно. А как у тебя дела?»"],
  ];
  notes.forEach(([h, d], i) => item(s, 6.75, 1.4 + i * 1.2, 2.75, C.deep, h, d, 14, 12, 0.85));
  s.addNotes("[~35 с · к концу слайда 3:05] У DeepSeek бесплатных токенов нет, а российские карты не принимаются, поэтому токены купили у агрегатора — он даёт свой ключ и адрес API. Собственный SDK не нужен: API совместим с OpenAI, берём пакет openai и подменяем base_url. Ключ постоянный, без OAuth и сертификатов. Минус агрегатора — все запросы идут через посредника.");
}

// ---------- 6. Отличия API ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "GigaChat и DeepSeek: отличия в работе", "Идея одна и та же, различаются детали");
  const hdr = (t, col) => ({ text: t, options: { bold: true, color: "FFFFFF", fill: { color: col }, fontFace: H, fontSize: 13 } });
  const cell = (t, mono, b) => ({ text: t, options: { fontFace: mono ? M : B, fontSize: mono ? 10.5 : 12, color: C.text, bold: !!b } });
  const rows = [
    [hdr("", C.ink), hdr("GigaChat", C.giga), hdr("DeepSeek", C.deep)],
    [cell("Библиотека", false, true), cell("gigachat", true), cell("openai", true)],
    [cell("Авторизация", false, true), cell("Ключ → OAuth-токен на 30 минут + сертификат"), cell("Постоянный API-ключ")],
    [cell("Сообщения", false, true), cell("ChatMessage(role=..., content=...)", true), cell("{\"role\": ..., \"content\": ...}", true)],
    [cell("Текст ответа", false, true), cell(".messages[0].content[0].text", true), cell(".choices[0].message.content", true)],
    [cell("Токены", false, true), cell("usage.input_tokens / output_tokens", true), cell("usage.prompt_tokens / completion_tokens", true)],
    [cell("Рассуждения", false, true), cell("В наших запросах не было"), cell("Скрытые reasoning-токены, тоже оплачиваются")],
    [cell("Доступ из РФ", false, true), cell("Бесплатный лимит, оплата картами РФ"), cell("Через посредников")],
  ];
  s.addTable(rows, { x: 0.5, y: 1.4, w: 9.0, colW: [1.9, 3.55, 3.55], rowH: 0.44, border: { type: "solid", pt: 0.75, color: C.line }, valign: "middle", margin: [0, 0.1, 0, 0.1] });
  s.addNotes("[~40 с · к концу слайда 3:45] Сведём отличия. Концептуально оба API одинаковы: модель плюс список сообщений. У GigaChat своя библиотека, двухшаговая авторизация и обязательный сертификат. У DeepSeek — формат OpenAI и простой постоянный ключ. Даже счётчики токенов называются по-разному. И важное отличие для дальнейшего: модели DeepSeek перед ответом скрыто «рассуждают». Эти токены не видны в тексте, но оплачиваются. Зато GigaChat удобнее с точки зрения доступа из России.");
}

// ---------- 7. Методика ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Эксперимент: одинаковые условия для всех", "4 модели × 4 задачи × 5 прогонов = 80 запросов");
  const pts = [
    ["Задачи", "Python (подсчёт слов), C (сортировка, malloc/free), матожидание, герои «Муму»"],
    ["Параметры", "temperature = 0,7 и max_tokens = 8192 — одинаковые для всех моделей"],
    ["Метрики", "Время до полного ответа, токены из usage, стоимость, качество по чек-листу"],
  ];
  pts.forEach(([h, d], i) => item(s, 0.5, 1.45 + i * 1.1, 4.6, i % 2 ? C.deep : C.giga, h, d, 14, 12, 0.55));
  s.addText("Цена, ₽ за 1M токенов", { x: 5.5, y: 1.45, w: 4.0, h: 0.35, fontFace: H, fontSize: 15, bold: true, color: C.text, margin: 0, isTextBox: true });
  const hc = (t) => ({ text: t, options: { bold: true, fontFace: B, fontSize: 11, color: C.muted } });
  const c1 = (t, col) => ({ text: t, options: { fontFace: M, fontSize: 11, color: col || C.text } });
  const c2 = (t) => ({ text: t, options: { fontFace: B, fontSize: 13, bold: true, color: C.text, align: "right" } });
  s.addTable([
    [hc("Модель"), { text: "₽", options: { bold: true, fontFace: B, fontSize: 11, color: C.muted, align: "right" } }],
    [c1("GigaChat-3-Pro"), c2("500*")],
    [c1("GigaChat-3-Lightning"), c2("65*")],
    [c1("deepseek-v4-pro"), c2("18,42")],
    [c1("deepseek-v4.1-flash"), c2("18,42")],
  ], { x: 5.5, y: 1.9, w: 4.0, colW: [2.9, 1.1], rowH: 0.36, border: { type: "solid", pt: 0.5, color: C.line }, valign: "middle", margin: [0, 0.08, 0, 0.08] });
  s.addText("Стоимость запроса = total_tokens × цена. Вход и выход тарифицируются одинаково. DeepSeek: 92,11 ₽ за 5M у агрегатора.", { x: 5.5, y: 3.8, w: 4.0, h: 0.6, fontFace: B, fontSize: 11, color: C.text, valign: "top", margin: 0, isTextBox: true });
  s.addText("* Цены GigaChat 3 не опубликованы — взяты пакеты GigaChat 2 Pro и Lite", { x: 5.5, y: 4.5, w: 4.0, h: 0.5, fontFace: B, fontSize: 10.5, italic: true, color: C.muted, valign: "top", margin: 0, isTextBox: true });
  s.addNotes("[~35 с · к концу слайда 4:20] Теперь эксперимент. Четыре модели получили одни и те же четыре задачи, каждый промпт — пять раз, с одинаковыми temperature 0,7 и лимитом 8192 токена. Для каждого запроса записали время, токены из usage и стоимость — токены умножить на цену за миллион. Цены GigaChat 3 не опубликованы, поэтому взяли пакеты второго поколения — это допущение.");
}

// ---------- 8. Токены ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Токены: куда они уходят", "Сумма по 20 запросам на модель, тыс. токенов");
  // снизу вверх: порядок категорий задан данными, без разворота оси
  const labels = [...MODELS].reverse();
  s.addChart(pres.charts.BAR, [
    { name: "Промпт", labels, values: [1.7, 3.5, 1.1, 1.3] },
    { name: "Видимый ответ", labels, values: [41.9, 16.8, 14.3, 17.9] },
    { name: "Скрытые рассуждения", labels, values: [29.9, 58.0, 0, 0] },
  ], chartBase({
    x: 0.4, y: 1.35, w: 5.9, h: 3.9, barDir: "bar", barGrouping: "stacked",
    chartColors: ["C9CEDA", C.giga, C.warn], barGapWidthPct: 45,
    catAxisLabelFontFace: B, catAxisLabelFontSize: 10.5,
    valAxisMaxVal: 80, valAxisMajorUnit: 20,
  }));
  const facts = [["78%", "ответа deepseek-v4-pro — скрытые рассуждения", C.warn], ["×4–5", "больше токенов тратит DeepSeek, чем GigaChat, на те же задачи", C.deep], ["15 тыс.", "токенов на 20 ответов у GigaChat-3-Lightning — самые короткие ответы", C.giga]];
  facts.forEach(([n, d, col], i) => {
    const y = 1.45 + i * 1.25;
    s.addText(n, { x: 6.7, y, w: 2.8, h: 0.5, fontFace: H, fontSize: 26, bold: true, color: col, margin: 0, isTextBox: true });
    s.addText(d, { x: 6.7, y: y + 0.5, w: 2.8, h: 0.6, fontFace: B, fontSize: 11.5, color: C.muted, valign: "top", margin: 0, isTextBox: true });
  });
  s.addNotes("[~55 с · к концу слайда 5:15] Тарифицируются токены — кусочки слов, причём и промпт, и ответ. На графике видно, куда они уходят. У GigaChat почти всё — видимый ответ. У DeepSeek заметная часть — скрытые рассуждения: модель «думает» перед ответом, в тексте мы этого не видим, но платим. У deepseek-v4-pro это 78 процентов всех токенов ответа. В итоге на те же задачи DeepSeek тратит в 4–5 раз больше токенов, чем GigaChat. Поэтому длину ответа мы рассматриваем не как показатель качества, а как объём, который определяет цену и время.");
}

// ---------- 9. Время ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Время ответа", "От отправки запроса до полного ответа, секунды");
  const labels = ["G-3-Pro", "G-3-Lightning", "v4-pro", "v4.1-flash"];
  s.addChart(pres.charts.BAR, [
    { name: "Медиана", labels, values: [6.0, 2.6, 53.7, 24.9] },
    { name: "Среднее", labels, values: [7.0, 2.5, 156.7, 23.0] },
  ], chartBase({
    x: 0.4, y: 1.35, w: 5.0, h: 3.9, barDir: "col", barGrouping: "clustered",
    chartColors: [C.ink, C.amber], barGapWidthPct: 50,
    showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 9, dataLabelFontFace: B, dataLabelColor: C.text, dataLabelFormatCode: "0.0",
    catAxisLabelFontSize: 10,
  }));
  const hc = (t) => ({ text: t, options: { bold: true, fontFace: B, fontSize: 10, color: C.muted, align: "center" } });
  const tc = (t) => ({ text: t, options: { bold: true, fontFace: B, fontSize: 11, color: C.text } });
  const vc = (v, hot) => ({ text: v, options: { fontFace: B, fontSize: 11, color: hot ? C.warn : C.text, bold: !!hot, align: "center" } });
  s.addText("Медиана по задачам, с", { x: 5.7, y: 1.4, w: 3.8, h: 0.3, fontFace: H, fontSize: 13, bold: true, color: C.text, margin: 0, isTextBox: true });
  s.addTable([
    [hc(""), hc("G-Pro"), hc("G-Light"), hc("v4-pro"), hc("flash")],
    [tc("Python"), vc("3,5"), vc("1,1"), vc("24,8"), vc("23,4")],
    [tc("C"), vc("5,2"), vc("2,4"), vc("22,1"), vc("7,3")],
    [tc("Матем."), vc("11,8"), vc("3,5"), vc("417", true), vc("26,6")],
    [tc("Литер."), vc("7,5"), vc("2,6"), vc("192", true), vc("32,0")],
  ], { x: 5.7, y: 1.8, w: 3.8, colW: [0.9, 0.7, 0.75, 0.7, 0.75], rowH: 0.34, border: { type: "solid", pt: 0.5, color: C.line }, valign: "middle", margin: [0, 0.04, 0, 0.04] });
  s.addText("GigaChat отвечает за секунды: 128–283 токена/с. deepseek-v4-pro — 24 токена/с, на математике ответ идёт ~7 минут.", { x: 5.7, y: 3.75, w: 3.8, h: 0.9, fontFace: B, fontSize: 12, color: C.text, valign: "top", margin: 0, isTextBox: true });
  s.addNotes("[~40 с · к концу слайда 5:55] Время ответа. Показываю и медиану, и среднее: у deepseek-v4-pro они сильно расходятся — медиана 54 секунды, среднее 157. Среднее тянут вверх ответы по математике: около семи минут на запрос. GigaChat отвечает за единицы секунд, Lightning — быстрее всех, в среднем две с половиной секунды. DeepSeek медленнее из-за тех самых скрытых рассуждений и из-за посредника-агрегатора: его задержка входит в измеренное время.");
}

// ---------- 10. Стоимость ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Стоимость: 1000 запросов", "Условная стоимость по ценам пакетов, ₽");
  const labels = ["G-3-Pro", "G-3-Lightning", "v4-pro", "v4.1-flash"];
  s.addChart(pres.charts.BAR, [
    { name: "Среднее", labels, values: [482, 50, 72, 68] },
    { name: "Медиана", labels, values: [412, 51, 47, 50] },
  ], chartBase({
    x: 0.4, y: 1.35, w: 5.0, h: 3.9, barDir: "col", barGrouping: "clustered",
    chartColors: [C.ink, C.amber], barGapWidthPct: 50,
    showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 9, dataLabelFontFace: B, dataLabelColor: C.text, dataLabelFormatCode: "0",
    catAxisLabelFontSize: 10,
  }));
  s.addText("Цена 1000 верных ответов", { x: 5.7, y: 1.4, w: 3.8, h: 0.3, fontFace: H, fontSize: 13, bold: true, color: C.text, margin: 0, isTextBox: true });
  const rows = [["deepseek-v4.1-flash", "76 ₽", C.deep], ["deepseek-v4-pro", "96 ₽", C.deep], ["GigaChat-3-Lightning", "133 ₽", C.giga], ["GigaChat-3-Pro", "742 ₽", C.giga]];
  rows.forEach(([m, v, col], i) => {
    const y = 1.85 + i * 0.44;
    card(s, 5.7, y, 3.8, 0.36, i === 0 ? "E8EDFF" : C.soft);
    dot(s, 5.82, y + 0.1, 0.16, col);
    s.addText(m, { x: 6.08, y, w: 2.3, h: 0.36, fontFace: M, fontSize: 10.5, color: C.text, valign: "middle", margin: 0, isTextBox: true });
    s.addText(v, { x: 8.4, y, w: 1.0, h: 0.36, fontFace: H, fontSize: 13, bold: true, color: C.text, align: "right", valign: "middle", margin: 0, isTextBox: true });
  });
  s.addText("= стоимость 1000 запросов / доля верных ответов по чек-листу. Lightning дешевле всех за запрос, но из-за ошибок верный ответ у него дороже, чем у DeepSeek.", { x: 5.7, y: 3.7, w: 3.8, h: 1.1, fontFace: B, fontSize: 11.5, color: C.text, valign: "top", margin: 0, isTextBox: true });
  s.addNotes("[~55 с · к концу слайда 6:50] Стоимость в пересчёте на тысячу запросов. Самый дорогой — GigaChat-3-Pro: около 480 рублей, примерно в семь раз дороже DeepSeek, хотя токенов он тратит меньше, — дело в цене пакета. Самый дешёвый за запрос — GigaChat-3-Lightning, 50 рублей. Но дешёвый запрос ничего не стоит, если ответ неверный. Поэтому справа — цена тысячи верных ответов: стоимость делим на долю верных. Здесь выигрывает deepseek-v4.1-flash — 76 рублей. Lightning при ошибках в половине задач выходит дороже обоих DeepSeek. Напомню, что цены GigaChat 3 — допущение.");
}

// ---------- 10б. Цена одного запроса ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Цена одного запроса по каждому промпту", "Среднее по 5 прогонам: копейки за запрос и токены на запрос");
  const hdr = (t, col) => ({ text: t, options: { bold: true, color: "FFFFFF", fill: { color: col }, fontFace: M, fontSize: 9, align: "center" } });
  const rowh = (t) => ({ text: t, options: { bold: true, fontFace: B, fontSize: 12, color: C.text } });
  const price = (t) => ({ text: t, options: { bold: true, fontFace: H, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } });
  const cell = (kop, tok, hot) => ({ text: [
    { text: kop + " коп.", options: { bold: true, fontFace: H, fontSize: 14, color: hot ? C.warn : C.text, breakLine: true } },
    { text: tok + " ток.", options: { fontFace: B, fontSize: 10, color: C.muted } },
  ], options: { align: "center" } });
  const data = [
    ["Python", [["25", "500", 1], ["2,4", "373"], ["2,9", "1 598"], ["2,1", "1 130"]]],
    ["C", [["39", "775", 1], ["5,1", "785"], ["2,8", "1 536"], ["3,0", "1 635"]]],
    ["Математика", [["79", "1 581", 1], ["6,9", "1 069"], ["15", "8 370"], ["12", "6 513"]]],
    ["Литература", [["50", "1 002", 1], ["5,5", "852"], ["7,7", "4 163"], ["10", "5 478"]]],
  ];
  const rows = [
    [{ text: "", options: { fill: { color: C.ink } } }, hdr("GigaChat-3-Pro", C.giga), hdr("GigaChat-3-Lightning", C.giga), hdr("deepseek-v4-pro", C.deep), hdr("deepseek-v4.1-flash", C.deep)],
    [rowh("Цена за 1M токенов"), price("500 ₽*"), price("65 ₽*"), price("18,42 ₽"), price("18,42 ₽")],
    ...data.map(([t, cells]) => [rowh(t), ...cells.map(([k, tk, hot]) => cell(k, tk, hot))]),
  ];
  s.addTable(rows, { x: 0.5, y: 1.4, w: 9.0, colW: [1.8, 1.8, 1.8, 1.8, 1.8], rowH: [0.42, 0.45, 0.58, 0.58, 0.58, 0.58], border: { type: "solid", pt: 0.75, color: C.line }, valign: "middle", margin: [0, 0.08, 0, 0.08] });
  s.addText("Цена запроса = токены × цена за 1M. * Цены GigaChat 3 не опубликованы — взяты пакеты GigaChat 2 Pro и Lite", { x: 0.5, y: 4.75, w: 9.0, h: 0.4, fontFace: B, fontSize: 11, italic: true, color: C.muted, valign: "top", margin: 0, isTextBox: true });
  s.addNotes("[~45 с · к концу слайда 7:35] Цена одного запроса по каждому промпту. Сверху — цена миллиона токенов, в ячейках — средняя цена запроса в копейках и сколько токенов он потратил. GigaChat-3-Pro тратит немного токенов, но из-за цены пакета один ответ по математике стоит 79 копеек. DeepSeek тратит в разы больше токенов, но токены дешёвые: самый дорогой его запрос — около 15 копеек. Самые дорогие задачи у всех — математика и литература: там самые длинные ответы.");
}

// ---------- 11. Лимит токенов ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "deepseek-v4-pro и лимит токенов", "Математика: модель расходует лимит на рассуждения и не успевает ответить");
  const cols = [
    ["max_tokens = 8192", "5 прогонов", C.warn, "FDEDE8", [["5 из 5", "ответов обрезаны"], ["404 с", "в среднем, почти 7 минут"], ["7 485", "из 8192 токенов в среднем — рассуждения"], ["1 из 5", "вообще без текста ответа"]]],
    ["Без лимита", "1 прогон", C.giga, "E8F7EF", [["Полный", "ответ, всё верно"], ["571 с", "почти 10 минут"], ["3 361", "из 4590 токенов — рассуждения"], ["0,09 ₽", "за запрос"]]],
  ];
  cols.forEach(([h, sub, col, fill, rows], i) => {
    const x = 0.5 + i * 4.6;
    card(s, x, 1.4, 4.4, 3.55, fill);
    s.addText([{ text: h, options: { bold: true, color: col } }, { text: "  ·  " + sub, options: { color: C.muted } }], { x: x + 0.25, y: 1.52, w: 3.9, h: 0.35, fontFace: H, fontSize: 15, margin: 0, isTextBox: true });
    rows.forEach(([n, d], j) => {
      const y = 2.05 + j * 0.7;
      s.addText(n, { x: x + 0.25, y, w: 1.55, h: 0.45, fontFace: H, fontSize: 18, bold: true, color: C.text, valign: "middle", margin: 0, isTextBox: true });
      s.addText(d, { x: x + 1.85, y, w: 2.35, h: 0.45, fontFace: B, fontSize: 12, color: C.muted, valign: "middle", margin: 0, isTextBox: true });
    });
  });
  s.addNotes("[~40 с · к концу слайда 8:15] Отдельная находка. На математике deepseek-v4-pro во всех пяти прогонах упёрся в лимит 8192 токена: почти весь лимит ушёл на скрытые рассуждения, ответ обрывался, а в одном прогоне вообще был пустым. Мы сделали дополнительный прогон без лимита: модель думала почти десять минут и выдала полный и верный ответ. Это один прогон, поэтому цифры справа — иллюстрация, а не статистика.");
}

// ---------- 12. Качество ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Качество ответов по чек-листу", "Баллы из 5 прогонов: ✓ = 1, неточность = 0,5, ошибка = 0");
  const tasks = ["Python", "C", "Математика", "Литература"];
  const grid = [
    [["2,5", "~✗~✓~"], ["5", "✓✓✓✓✓"], ["3", "~~~~✓"], ["2,5", "✗✗~✓✓"]],
    [["2,5", "✓~~~✗"], ["4,5", "✓✓~✓✓"], ["0,5", "~✗✗✗✗"], ["0", "✗✗✗✗✗"]],
    [["5", "✓✓✓✓✓"], ["5", "✓✓✓✓✓"], ["0*", "обрезан лимитом"], ["5", "✓✓✓✓✓"]],
    [["5", "✓✓✓✓✓"], ["5", "✓✓✓✓✓"], ["4,5", "✓✓~✓✓"], ["3,5", "✓✗~✓✓"]],
  ];
  const tot = ["65%", "38%", "75%", "90%"];
  const x0 = 2.45, cw = 1.5, y0 = 1.35, rh = 0.6;
  tasks.forEach((t, j) => s.addText(t, { x: x0 + j * cw, y: y0, w: cw, h: 0.3, align: "center", fontFace: H, fontSize: 11.5, bold: true, color: C.text, margin: 0, isTextBox: true }));
  s.addText("Итог", { x: x0 + 4 * cw, y: y0, w: 1.0, h: 0.3, align: "center", fontFace: H, fontSize: 11.5, bold: true, color: C.text, margin: 0, isTextBox: true });
  MODELS.forEach((m, i) => {
    const y = y0 + 0.38 + i * rh;
    card(s, 0.5, y, 9.0, rh - 0.08, i % 2 ? C.paper : C.soft);
    dot(s, 0.6, y + 0.18, 0.16, MCOL[i]);
    s.addText(m, { x: 0.82, y, w: 1.65, h: rh - 0.08, fontFace: M, fontSize: 9.5, color: C.text, valign: "middle", margin: 0, isTextBox: true });
    grid[i].forEach(([sc, marks], j) => {
      const v = parseFloat(sc.replace(",", "."));
      const col = sc.endsWith("*") ? C.warn : v >= 4.5 ? C.giga : v >= 2.5 ? C.amber : C.warn;
      const cx = x0 + j * cw;
      const spaced = marks.length === 5 ? marks.split("").join(" ") : marks;
      s.addText(sc, { x: cx, y, w: 0.5, h: rh - 0.08, fontFace: H, fontSize: 15, bold: true, color: col, align: "right", valign: "middle", margin: 0, isTextBox: true });
      s.addText(spaced, { x: cx + 0.58, y, w: 0.92, h: rh - 0.08, fontFace: B, fontSize: marks.length === 5 ? 9.5 : 8.5, color: C.muted, valign: "middle", margin: 0, isTextBox: true });
    });
    s.addText(tot[i], { x: x0 + 4 * cw, y, w: 1.0, h: rh - 0.08, fontFace: H, fontSize: 14, bold: true, color: C.text, align: "center", valign: "middle", margin: 0, isTextBox: true });
  });
  s.addText("* без лимита токенов — ответ верный (1 прогон)", { x: 0.5, y: 4.15, w: 9.0, h: 0.22, fontFace: B, fontSize: 10, italic: true, color: C.muted, margin: 0, isTextBox: true });
  card(s, 0.5, 4.42, 9.0, 0.8, "FFF6E8");
  s.addText([
    { text: "Проверка: ", options: { bold: true } }, { text: "код — запуск на 5 тестах, gcc -Wall, valgrind, сверка примера с реальным выводом; математика — условия сходимости, доказательства, примеры; литература — герои и факты сюжета", options: { breakLine: true } },
    { text: "Ограничения: ", options: { bold: true } }, { text: "4 промпта по 5 прогонов, одна temperature — качественная оценка, а не бенчмарк" },
  ], { x: 0.7, y: 4.42, w: 8.6, h: 0.8, fontFace: B, fontSize: 10.5, color: C.text, valign: "middle", margin: 0, isTextBox: true });
  s.addNotes("[~40 с · к концу слайда 8:55] Качество оценивали по чек-листу: код — запуском на тестах, математику — по строгости определений, доказательствам и примерам, литературу — по героям и фактам сюжета. Верно — балл, неточность — половина, ошибка — ноль. Лучший итог у deepseek-v4.1-flash — 90 процентов. deepseek-v4-pro безошибочен везде, кроме математики, обрезанной лимитом. Хуже всех с фактами GigaChat-3-Lightning. Выборка небольшая, поэтому это качественная оценка, а не бенчмарк.");
}

// ---------- 12б. Ошибки в коде: Python ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Ошибки в коде: Python", "Код запускали на 5 тестах. У DeepSeek ошибок не нашли");
  const cards = [
    ["GigaChat: Pro и Lightning", "Только латиница", [
      "re.sub(r\"[^a-zA-Z0-9\\s]\",",
      "       \"\", text.lower())",
    ], [["Вход:", "\"Привет, мир! Привет.\"", null, true], ["Ожидали:", "{\"привет\": 2, \"мир\": 1}", null, true], ["Получили:", "{}", C.warn, true]],
      "У Lightning регулярка [a-zA-Z]+ — итог тот же, а в ответе ещё и выдуманный «вывод»"],
    ["GigaChat-3-Lightning", "Слова склеиваются", [
      "re.sub(r\"[^a-zа-яё ]\",",
      "       \"\", text.lower())",
    ], [["Вход:", "\"Кот,кот\"", null, true], ["Получили:", "{\"коткот\": 1}", C.warn, true], ["Вход:", "\"Раз\\nдва\"", null, true], ["Получили:", "{\"раздва\": 1}", C.warn, true]],
      "Знаки удаляются без замены на пробел, перенос строки тоже"],
    ["GigaChat-3-Pro", "Пример вывода не тот", [
      "# вход: \"... Привет-привет,",
      "#   мир! Мир-мир.\"",
    ], [["В ответе:", "{..., \"мир\": 2}", C.warn, true], ["Реально:", "{..., \"мир\": 3}", null, true]],
      "Функция верная, но результат примера модель написала «на глаз»"],
  ];
  cards.forEach(([tg, h, code, rows, note], i) => {
    const x = 0.5 + i * 3.05, y = 1.4, w = 2.85;
    card(s, x, y, w, 3.3);
    tag(s, x + 0.18, y + 0.14, w - 0.36, tg, i === 1 ? C.giga : C.giga);
    s.addText(h, { x: x + 0.18, y: y + 0.42, w: w - 0.36, h: 0.35, fontFace: H, fontSize: 15, bold: true, color: C.text, margin: 0, isTextBox: true });
    codeBlock(s, x + 0.12, y + 0.85, w - 0.24, 0.62, code, 8.5);
    s.addText(kv(rows, 11), { x: x + 0.18, y: y + 1.6, w: w - 0.36, h: 1.2, fontFace: B, fontSize: 11, valign: "top", paraSpaceAfter: 2, margin: 0, isTextBox: true });
    s.addText(note, { x: x + 0.18, y: y + 2.55, w: w - 0.36, h: 0.65, fontFace: B, fontSize: 11, italic: true, color: C.muted, valign: "top", margin: 0, isTextBox: true });
  });
  s.addNotes("[~50 с · к концу слайда 9:45] Подробнее об ошибках в коде, начнём с Python. Первая — регулярное выражение только для латиницы: на русском тексте функция возвращает пустой словарь, а Lightning в том же ответе ещё и показывает «результат» с русскими словами — вывод выдуман. Вторая — знаки препинания удаляются без пробела, и слова склеиваются: «кот,кот» превращается в «коткот», даже перенос строки склеивает слова. Третья — у GigaChat-3-Pro код верный, но пример вывода в ответе не совпадает с тем, что код реально печатает.");
}

// ---------- 12в. Ошибки в коде: C ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Ошибки в коде: C", "Компиляция gcc -Wall и clang, 5 тестовых вводов, проверка утечек через valgrind");
  const cards = [
    ["GigaChat-3-Lightning", "Функция вызвана до объявления", [
      "void bubble_sort(int *arr, int size) {",
      "    ...",
      "    swap(&arr[j], &arr[j + 1]); // не объявлена",
      "}",
      "void swap(int *a, int *b) { ... }",
    ], [["GCC 13:", "предупреждение, программа собирается"], ["Clang 18, GCC 14:", "ошибка компиляции", C.warn]]],
    ["GigaChat-3-Pro, GigaChat-3-Lightning", "Нет проверки ввода", [
      "int n;",
      "scanf(\"%d\", &n);    // результат не проверяется",
      "int *arr = malloc(n * sizeof(int));",
    ], [["Ввод «-3»:", "«Ошибка выделения памяти» вместо понятного сообщения", C.warn], ["DeepSeek:", "проверяет ввод — «Некорректное значение n»", C.giga]]],
  ];
  cards.forEach(([tg, h, code, rows], i) => {
    const x = 0.5 + i * 4.6, y = 1.4, w = 4.4;
    card(s, x, y, w, 2.95);
    tag(s, x + 0.2, y + 0.14, w - 0.4, tg, C.giga);
    s.addText(h, { x: x + 0.2, y: y + 0.42, w: w - 0.4, h: 0.35, fontFace: H, fontSize: 15, bold: true, color: C.text, margin: 0, isTextBox: true });
    codeBlock(s, x + 0.12, y + 0.85, w - 0.24, i === 0 ? 1.0 : 0.72, code, 9);
    s.addText(kv(rows, 11), { x: x + 0.2, y: y + (i === 0 ? 1.95 : 1.67), w: w - 0.4, h: 0.95, fontFace: B, fontSize: 11, valign: "top", paraSpaceAfter: 2, margin: 0, isTextBox: true });
  });
  card(s, 0.5, 4.5, 9.0, 0.65, C.ink);
  s.addText("При этом все 20 программ на C сортируют правильно на 5 тестах, valgrind не нашёл утечек памяти", { x: 0.75, y: 4.5, w: 8.5, h: 0.65, fontFace: B, fontSize: 13, bold: true, color: "FFFFFF", valign: "middle", margin: 0, isTextBox: true });
  s.addNotes("[~40 с · к концу слайда 10:25] В C все двадцать программ отсортировали массивы правильно и без утечек памяти. Но есть два недочёта. У Lightning функция swap вызывается раньше, чем объявлена: GCC 13 выдаёт только предупреждение, а Clang 18 — уже ошибку компиляции. И у GigaChat встречается программа без проверки ввода: на отрицательное число она пишет «ошибка выделения памяти» вместо понятного сообщения. DeepSeek ввод проверяет всегда.");
}

// ---------- 13. Где ошиблись ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Ошибки в фактах и математике", "Ответы звучат уверенно, но их нужно проверять");
  const cards = [
    ["GigaChat-3-Lightning", "Литература: сюжет «Муму»", "Муму — «маленькая собачка, подаренная Герасиму барыней»", "На деле Герасим сам спас щенка из реки, а барыня потом велела от собаки избавиться", C.warn],
    ["GigaChat-3-Pro", "Биномиальное распределение", "«np(1 − p + p)^(n−1) = np^n»", "(1 − p + p)^(n−1) = 1, значит результат np, а не np^n. Итоговый ответ np модель написала верно", C.amber],
    ["GigaChat-3-Lightning", "Геометрическое распределение", "«E[X] = p / (1 − (1 − p)) = 1/p»", "Эта дробь равна p / p = 1. Верно: E[X] = p / (1 − (1 − p))² = 1/p", C.amber],
    ["GigaChat-3-Lightning", "Линейность матожидания", "«E[X + Y] = Σ(x_i + y_i)·p_i = Σx_i·p_i + Σy_i·p_i»", "X и Y принимают свои значения с разными вероятностями — нужна совместная вероятность P(X = x_i, Y = y_j)", C.amber],
  ];
  cards.forEach(([m, h, q, fact, col], i) => {
    const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.97;
    card(s, x, y, 4.4, 1.85);
    tag(s, x + 0.2, y + 0.1, 4.0, m, col);
    s.addText(h, { x: x + 0.2, y: y + 0.36, w: 4.0, h: 0.3, fontFace: H, fontSize: 13, bold: true, color: C.text, margin: 0, isTextBox: true });
    s.addText(q, { x: x + 0.2, y: y + 0.7, w: 4.0, h: 0.5, fontFace: B, fontSize: 12, italic: true, color: C.text, valign: "top", margin: 0, isTextBox: true });
    s.addText(fact, { x: x + 0.2, y: y + 1.22, w: 4.0, h: 0.55, fontFace: B, fontSize: 11, color: C.muted, valign: "top", margin: 0, isTextBox: true });
  });
  s.addNotes("[~45 с · к концу слайда 11:10] Теперь ошибки в фактах и математике. Литература: Lightning пишет, что Муму Герасиму подарила барыня, хотя он сам спас щенка из реки. Математика: GigaChat-3-Pro в выкладке для биномиального распределения получает np в степени n вместо np. Lightning для геометрического распределения пишет дробь, которая на самом деле равна единице, и «доказывает» линейность, не используя совместное распределение. Всё оформлено уверенно, поэтому выкладки и факты нужно проверять.");
}

// ---------- 14. Задача → модель ----------
{
  const s = pres.addSlide(); s.background = { color: C.paper };
  title(s, "Какую модель брать под задачу", "Качество — баллы из 5; цена — ₽ за 1000 запросов (среднее); скорость — медиана");
  const hdr = (t) => ({ text: t, options: { bold: true, color: "FFFFFF", fill: { color: C.ink }, fontFace: H, fontSize: 11.5 } });
  const c = (t, o) => ({ text: t, options: Object.assign({ fontFace: B, fontSize: 11, color: C.text }, o || {}) });
  const pick = (t) => c(t, { bold: true, color: C.text, fill: { color: "E8F7EF" } });
  const bad = { color: C.warn };
  s.addTable([
    [hdr("Задача"), hdr("Лучшая по качеству"), hdr("Дешевле всех"), hdr("Быстрее всех"), hdr("Что брать")],
    [c("Python", { bold: true }), c("v4-pro, v4.1-flash · 5"), c("v4.1-flash · 21 ₽"), c([{ text: "G-Lightning · 1,1 с " }, { text: "(2,5)", options: bad }]), pick("deepseek-v4.1-flash")],
    [c("C", { bold: true }), c("все модели · 4,5–5"), c("v4-pro · 28 ₽"), c("G-Lightning · 2,4 с"), pick("GigaChat-3-Lightning")],
    [c("Математика", { bold: true }), c("v4.1-flash · 4,5"), c([{ text: "G-Lightning · 69 ₽ " }, { text: "(0,5)", options: bad }]), c([{ text: "G-Lightning · 3,5 с " }, { text: "(0,5)", options: bad }]), pick("deepseek-v4.1-flash")],
    [c("Литература", { bold: true }), c("v4-pro · 5"), c([{ text: "G-Lightning · 55 ₽ " }, { text: "(0)", options: bad }]), c([{ text: "G-Lightning · 2,6 с " }, { text: "(0)", options: bad }]), pick("deepseek-v4-pro")],
  ], { x: 0.5, y: 1.4, w: 9.0, colW: [1.35, 2.05, 1.9, 1.95, 1.75], rowH: 0.6, border: { type: "solid", pt: 0.75, color: C.line }, valign: "middle", margin: [0, 0.08, 0, 0.08] });
  s.addText("Красным — балл качества у самой дешёвой или быстрой модели. Выигрыш в цене и скорости у GigaChat-3-Lightning оправдан только там, где он не ошибается — в коде на C.", { x: 0.5, y: 4.55, w: 9.0, h: 0.6, fontFace: B, fontSize: 12, color: C.text, valign: "top", margin: 0, isTextBox: true });
  s.addNotes("[~35 с · к концу слайда 11:45] Итоговая таблица «задача — модель». Дешевле и быстрее всех почти везде GigaChat-3-Lightning, но в скобках — его балл качества: на математике и литературе он почти всегда ошибается, так что экономия мнимая. Для C хватает Lightning, для Python и математики — deepseek-v4.1-flash, для литературы — deepseek-v4-pro, если можно подождать ответ.");
}

// ---------- 15. Выводы ----------
{
  const s = pres.addSlide(); s.background = { color: C.ink };
  s.addText("Выводы", { x: 0.6, y: 0.4, w: 8.8, h: 0.7, fontFace: H, fontSize: 36, bold: true, color: "FFFFFF", margin: 0, isTextBox: true });
  const items = [
    ["Работа с API почти одинаковая", "Модель + сообщения с ролями. GigaChat: OAuth-токен на 30 минут и сертификат. DeepSeek: формат OpenAI.", "FFFFFF"],
    ["Лучший баланс: v4.1-flash", "90% по чек-листу и самый дешёвый верный ответ: 76 ₽ за 1000. v4-pro лучше всех в литературе, но медленный.", C.deepL],
    ["GigaChat быстрее, но ошибается", "Lightning отвечает за 2–3 с, но выдумывает факты. Pro в 7 раз дороже DeepSeek при цене пакета.", C.gigaL],
    ["Ответы нужно проверять", "Уверенный тон не гарантирует правильность: код — запускать, факты и выкладки — сверять.", C.amber],
  ];
  items.forEach(([h, d, col], i) => {
    const x = 0.6 + (i % 2) * 4.5, y = 1.4 + Math.floor(i / 2) * 1.85;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 4.2, h: 1.6, rectRadius: 0.08, fill: { color: "232A38" }, line: { color: "232A38" } });
    dot(s, x + 0.25, y + 0.28, 0.2, col);
    s.addText(h, { x: x + 0.6, y: y + 0.18, w: 3.45, h: 0.4, fontFace: H, fontSize: 14.5, bold: true, color: "FFFFFF", margin: 0, isTextBox: true });
    s.addText(d, { x: x + 0.25, y: y + 0.68, w: 3.75, h: 0.8, fontFace: B, fontSize: 12.5, color: "C9CEDA", valign: "top", margin: 0, isTextBox: true });
  });
  s.addText([{ text: "Код и данные: ", options: { color: "9AA3B5" } }, { text: GIST, options: { hyperlink: { url: GIST }, color: C.deepL } }], { x: 0.6, y: 5.12, w: 8.8, h: 0.3, fontFace: B, fontSize: 11, margin: 0, isTextBox: true });
  s.addNotes("[~50 с · к концу слайда 12:35] Итоги. Первое: работа с API у обоих провайдеров почти одинаковая, различаются авторизация и детали формата. Второе: лучший баланс качества и цены показал deepseek-v4.1-flash — 90 процентов по чек-листу и самый дешёвый верный ответ. Третье: GigaChat отвечает в разы быстрее, но облегчённая модель выдумывает факты, а старшая при ценах пакетов обходится примерно в семь раз дороже DeepSeek. Четвёртое: даже уверенно оформленные ответы нужно проверять — код запускать, факты и выкладки сверять. Спасибо за внимание!");
}

// pptxgenjs пишет подписи категорий как multiLvlStrRef; Google Slides и часть просмотрщиков
// их не читают и показывают 1, 2, 3... Переписываем в обычный strRef.
const fs = require("fs");
let JSZip;
try { JSZip = require("jszip"); } catch (e) { JSZip = require(require.resolve("jszip", { paths: [path.dirname(require.resolve("pptxgenjs"))] })); }
const OUT = path.join(__dirname, "llm_api.pptx");
const MULTI = /<c:multiLvlStrRef>\s*<c:f>(.*?)<\/c:f>\s*<c:multiLvlStrCache>\s*(<c:ptCount val="\d+"\/>)\s*<c:lvl>([\s\S]*?)<\/c:lvl>\s*<\/c:multiLvlStrCache>\s*<\/c:multiLvlStrRef>/g;
pres.write({ outputType: "nodebuffer" })
  .then((buf) => JSZip.loadAsync(buf))
  .then(async (zip) => {
    const charts = Object.keys(zip.files).filter((n) => /^ppt\/charts\/chart\d+\.xml$/.test(n));
    for (const n of charts) {
      const xml = await zip.file(n).async("string");
      zip.file(n, xml.replace(MULTI, "<c:strRef><c:f>$1</c:f><c:strCache>$2$3</c:strCache></c:strRef>"));
    }
    return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  })
  .then((out) => { fs.writeFileSync(OUT, out); console.log("done:", OUT); });

---
model: deepseek-v4-pro
task: python
run: 4
timestamp: 2026-09-24T06:45:34
temperature: 0.7
max_tokens: 8192
latency_s: 49.819
input_tokens: 172
output_tokens: 2425
reasoning_tokens: 2181
total_tokens: 2597
finish_reason: stop
cost_rub: 0.04784
---

```python
import re

def word_count(text: str) -> dict:
    words = re.findall(r'\b\w+\b', text.lower())
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts
```

**Объяснение:**
- `text.lower()` приводит строку к нижнему регистру, чтобы не учитывать регистр.
- `re.findall(r'\b\w+\b', ...)` находит все слова — последовательности букв, цифр и символов `_`, игнорируя знаки препинания и пробелы.
- Словарь `counts` заполняется: ключ — слово, значение — количество вхождений.

**Пример вызова:**

```python
text = "Привет, мир! Привет, мир. Python - это здорово."
print(word_count(text))
```

**Результат:**

```python
{'привет': 2, 'мир': 2, 'python': 1, 'это': 1, 'здорово': 1}
```

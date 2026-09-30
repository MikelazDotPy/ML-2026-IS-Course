---
model: deepseek-v4.1-flash
task: python
run: 5
timestamp: 2026-09-24T07:06:29
temperature: 0.7
max_tokens: 8192
latency_s: 4.967
input_tokens: 85
output_tokens: 897
reasoning_tokens: 650
total_tokens: 982
finish_reason: stop
cost_rub: 0.01809
---

```python
import re
from collections import Counter

def word_count(text: str) -> dict[str, int]:
    # Приводим к нижнему регистру и оставляем только последовательности букв
    words = re.findall(r"[^\W\d_]+", text.lower(), flags=re.UNICODE)
    return dict(Counter(words))
```

**Как это работает:**
- `text.lower()` приводит строку к нижнему регистру.
- `re.findall(r"[^\W\d_]+", ...)` находит последовательности букв, игнорируя знаки препинания, цифры и подчёркивания.
- `Counter` подсчитывает, сколько раз встречается каждое слово.
- `dict(...)` превращает результат в обычный словарь.

**Пример вызова:**

```python
text = "Привет, мир! Привет, Python... Python — это здорово."
print(word_count(text))
```

**Результат:**

```python
{
    'привет': 2,
    'мир': 1,
    'python': 2,
    'это': 1,
    'здорово': 1
}
```

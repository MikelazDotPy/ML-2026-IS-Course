---
model: deepseek-v4.1-flash
task: python
run: 4
timestamp: 2026-09-24T06:57:48
temperature: 0.7
max_tokens: 8192
latency_s: 36.38
input_tokens: 97
output_tokens: 1040
reasoning_tokens: 721
total_tokens: 1196
finish_reason: stop
cost_rub: 0.02203
---

```python
import re
from collections import Counter

def word_count(text: str) -> dict[str, int]:
    # Приводим к нижнему регистру и находим последовательности букв,
    # игнорируя знаки препинания, цифры и подчёркивания.
    words = re.findall(r'[^\W\d_]+', text.lower(), flags=re.UNICODE)
    return dict(Counter(words))
```

**Как это работает:**

1. `text.lower()` приводит строку к нижнему регистру, чтобы `Привет` и `привет` считались одним словом.
2. `re.findall(r'[^\W\d_]+', ...)` выбирает только последовательности букв. Знаки препинания, пробелы, цифры и `_` игнорируются.
3. `Counter` считает количество вхождений каждого слова.
4. `dict(...)` превращает результат в обычный словарь.

**Пример вызова:**

```python
text = "Привет, мир! Привет, Python. Python — это здорово."
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

Если нужно считать словами также числа, можно заменить регулярное выражение на `r'\w+'`.

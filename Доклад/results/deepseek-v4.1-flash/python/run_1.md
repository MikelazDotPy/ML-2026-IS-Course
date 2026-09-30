---
model: deepseek-v4.1-flash
task: python
run: 1
timestamp: 2026-09-24T06:14:43
temperature: 0.7
max_tokens: 8192
latency_s: 23.888
input_tokens: 97
output_tokens: 1608
reasoning_tokens: 1369
total_tokens: 1764
finish_reason: stop
cost_rub: 0.0325
---

```python
import re
from collections import Counter

def word_count(text: str) -> dict[str, int]:
    # Приводим к нижнему регистру и находим последовательности букв,
    # игнорируя знаки препинания, цифры и подчёркивания
    words = re.findall(r'[^\W\d_]+', text.lower())
    return dict(Counter(words))
```

**Кратко:**  
`text.lower()` убирает влияние регистра. Регулярное выражение `[^\W\d_]+` выделяет слова, состоящие из букв, и пропускает пунктуацию. `Counter` подсчитывает частоты, а `dict(...)` возвращает обычный словарь.

**Пример вызова:**

```python
text = "Привет, мир! Привет, Python. Python — это здорово!"
print(word_count(text))
```

**Результат:**

```python
{'привет': 2, 'мир': 1, 'python': 2, 'это': 1, 'здорово': 1}
```

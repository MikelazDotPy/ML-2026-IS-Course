---
model: deepseek-v4.1-flash
task: python
run: 3
timestamp: 2026-09-24T06:43:10
temperature: 0.7
max_tokens: 8192
latency_s: 4.686
input_tokens: 85
output_tokens: 801
reasoning_tokens: 623
total_tokens: 886
finish_reason: stop
cost_rub: 0.01632
---

```python
import re
from collections import Counter

def word_count(text: str) -> dict[str, int]:
    words = re.findall(r'\b\w+\b', text.lower())
    return dict(Counter(words))
```

Кратко:  
- `text.lower()` приводит строку к нижнему регистру.  
- `re.findall(r'\b\w+\b', ...)` находит слова, игнорируя знаки препинания.  
- `Counter` считает количество каждого слова.  
- `dict(...)` возвращает обычный словарь.

Пример:

```python
text = "Привет, мир! Привет, Python... Python — это мир."

print(word_count(text))
```

Результат:

```python
{'привет': 2, 'мир': 2, 'python': 2, 'это': 1}
```

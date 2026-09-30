---
model: deepseek-v4.1-flash
task: python
run: 2
timestamp: 2026-09-24T06:29:19
temperature: 0.7
max_tokens: 8192
latency_s: 23.385
input_tokens: 85
output_tokens: 737
reasoning_tokens: 524
total_tokens: 822
finish_reason: stop
cost_rub: 0.01514
---

```python
import re
from collections import Counter

def word_count(text: str) -> dict[str, int]:
    words = re.findall(r'\w+', text.lower())
    return dict(Counter(words))
```

**Кратко:**  
- `text.lower()` приводит строку к нижнему регистру.  
- `re.findall(r'\w+', ...)` находит все слова, игнорируя знаки препинания.  
- `Counter` считает количество каждого слова.  
- `dict(...)` возвращает обычный словарь.

**Пример вызова:**

```python
s = "Привет, мир! Привет, Python. Python — это мир."
print(word_count(s))
```

**Результат:**

```python
{'привет': 2, 'мир': 2, 'python': 2, 'это': 1}
```

Если нужно учитывать только буквы, а не цифры и подчёркивания, можно заменить регулярку на `r'[^\W\d_]+'`.

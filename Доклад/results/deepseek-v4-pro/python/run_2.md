---
model: deepseek-v4-pro
task: python
run: 2
timestamp: 2026-09-24T06:16:54
temperature: 0.7
max_tokens: 8192
latency_s: 23.415
input_tokens: 172
output_tokens: 1129
reasoning_tokens: 897
total_tokens: 1301
finish_reason: stop
cost_rub: 0.02397
---

```python
import re
from collections import Counter

def word_count(text: str) -> dict:
    # Приводим к нижнему регистру и извлекаем слова (буквы и цифры без знаков препинания)
    words = re.findall(r'[^\W_]+', text.lower())
    return dict(Counter(words))
```

**Краткое объяснение:**  
1. Переводим строку в нижний регистр, чтобы не учитывать регистр.  
2. С помощью регулярного выражения `[^\W_]+` находим все последовательности букв и цифр — это слова. Знаки препинания и другие символы автоматически игнорируются.  
3. `Counter` подсчитывает частоту каждого слова, результат преобразуем в обычный словарь.

**Пример вызова:**
```python
text = "Hello, world! Hello again, World."
result = word_count(text)
print(result)
```
**Вывод:**
```
{'hello': 2, 'world': 2, 'again': 1}
```

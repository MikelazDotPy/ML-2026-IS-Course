---
model: deepseek-v4-pro
task: python
run: 5
timestamp: 2026-09-24T07:00:22
temperature: 0.7
max_tokens: 8192
latency_s: 20.717
input_tokens: 172
output_tokens: 1147
reasoning_tokens: 799
total_tokens: 1319
finish_reason: stop
cost_rub: 0.0243
---

```python
import re
from collections import Counter

def count_words(text: str) -> dict:
    """
    Принимает строку и возвращает словарь частот слов.
    Регистр не учитывается, знаки препинания игнорируются.
    """
    # Приводим к нижнему регистру и извлекаем слова (последовательности букв, цифр, "_")
    words = re.findall(r'\w+', text.lower())
    # Подсчитываем частоты с помощью Counter и преобразуем в обычный словарь
    return dict(Counter(words))
```

**Краткое объяснение**

1. `text.lower()` переводит всю строку в нижний регистр.
2. `re.findall(r'\w+', ...)` находит все последовательности символов, соответствующие `\w+` (буквы, цифры, знак подчёркивания), игнорируя пробелы и знаки препинания.
3. `Counter` из модуля `collections` автоматически подсчитывает количество вхождений каждого элемента списка.
4. `dict(...)` преобразует объект `Counter` в обычный словарь.

**Пример вызова**

```python
text = "Hello, world! Hello everyone. This is a test, test."
result = count_words(text)
print(result)
```

**Результат выполнения**

```
{'hello': 2, 'world': 1, 'everyone': 1, 'this': 1, 'is': 1, 'a': 1, 'test': 2}
```

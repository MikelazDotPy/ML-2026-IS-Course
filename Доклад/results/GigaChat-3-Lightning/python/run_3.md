---
model: GigaChat-3-Lightning
task: python
run: 3
timestamp: 2026-09-24T06:31:08
temperature: 0.7
max_tokens: 8192
latency_s: 1.054
input_tokens: 57
output_tokens: 278
reasoning_tokens: 0
total_tokens: 335
finish_reason: stop
cost_rub: 0.02178
---

Вот решение задачи на Python:

**Код функции:**
```python
import re
from collections import Counter

def word_count(text):
    # Приводим к нижнему регистру и удаляем знаки препинания с помощью регулярного выражения
    cleaned = re.sub(r'[^\w\s]', '', text.lower())
    # Делим строку на слова по пробелам
    words = cleaned.split()
    # Подсчитываем частоту каждого слова через Counter
    return dict(Counter(words))
```

**Краткое объяснение решения:**  
1. Используем `re.sub` для удаления знаков препинания (удаляются символы, не являющиеся буквами/цифрами или пробелом).  
2. Преобразуем строку в нижний регистр (`lower()`) — игнорируем регистр.  
3. Разбиваем текст на список слов через `split()` и подсчитываем их частоту функцией `collections.Counter`.  
4. Возвращаем результат в виде обычного словаря.

**Пример вызова и результата:**
```python
text = "Hello! Hello world, WORLD again... hello!"
result = word_count(text)
print(result)  # {'hello': 3, 'world': 2, 'again': 1}
```

Если нужны уточнения (например, сохранить апострофы как часть слова), можно скорректировать регулярное выражение.

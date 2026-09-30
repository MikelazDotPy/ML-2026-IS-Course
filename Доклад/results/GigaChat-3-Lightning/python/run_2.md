---
model: GigaChat-3-Lightning
task: python
run: 2
timestamp: 2026-09-24T06:16:22
temperature: 0.7
max_tokens: 8192
latency_s: 1.128
input_tokens: 70
output_tokens: 301
reasoning_tokens: 0
total_tokens: 371
finish_reason: stop
cost_rub: 0.02412
---

Вот решение на Python:

### Код функции

```python
import re
from collections import Counter

def word_count(text: str) -> dict:
    # Приводим к нижнему регистру и удаляем знаки препинания с помощью regex
    cleaned = re.sub(r'[^a-zа-яё ]', '', text.lower())
    
    # Разбиваем строку по пробелам и считаем вхождения каждого слова
    words = cleaned.split()
    return dict(Counter(words))
```

### Краткое объяснение решения:
1. **Регулярка `re.sub`**: заменяет все символы, кроме букв кириллицы (русский язык), латиницы и пробелов — так убираются знаки препинания.
2. `.lower()`: делает текст регистронезависимым.
3. `split()` разбивает строку на отдельные слова.
4. `collections.Counter` подсчитывает количество повторений слов.
5. `dict(...)` конвертирует объект Counter в обычный словарь для результата.

### Пример вызова:

```python
text = "Привет! Привет, как дела? Как дела, привет!"
result = word_count(text)
print(result)
```

**Результат:**
```python
{'привет': 3, 'как': 2, 'дела': 2}
```

Функция учитывает регистр (делает всё строчным) и игнорирует знаки препинания, что соответствует условиям задачи.

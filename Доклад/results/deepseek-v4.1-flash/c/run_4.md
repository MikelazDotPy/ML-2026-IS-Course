---
model: deepseek-v4.1-flash
task: c
run: 4
timestamp: 2026-09-24T06:57:59
temperature: 0.7
max_tokens: 8192
latency_s: 10.812
input_tokens: 110
output_tokens: 1363
reasoning_tokens: 795
total_tokens: 1532
finish_reason: stop
cost_rub: 0.02822
---

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;

    printf("Введите количество чисел: ");
    if (scanf("%d", &n) != 1) {
        fprintf(stderr, "Ошибка чтения n\n");
        return 1;
    }

    if (n <= 0) {
        fprintf(stderr, "n должно быть положительным\n");
        return 1;
    }

    int *a = malloc((size_t)n * sizeof *a);
    if (a == NULL) {
        fprintf(stderr, "Не удалось выделить память\n");
        return 1;
    }

    printf("Введите %d целых чисел: ", n);
    for (int i = 0; i < n; ++i) {
        if (scanf("%d", &a[i]) != 1) {
            fprintf(stderr, "Ошибка чтения элемента %d\n", i + 1);
            free(a);
            return 1;
        }
    }

    // Пузырьковая сортировка по возрастанию
    for (int i = 0; i < n - 1; ++i) {
        int swapped = 0;

        for (int j = 0; j < n - 1 - i; ++j) {
            if (a[j] > a[j + 1]) {
                int tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
                swapped = 1;
            }
        }

        if (!swapped) {
            break;
        }
    }

    printf("Отсортированный массив:\n");
    for (int i = 0; i < n; ++i) {
        printf("%d", a[i]);
        if (i + 1 < n) {
            putchar(' ');
        }
    }
    putchar('\n');

    free(a);
    return 0;
}
```

Как работает программа:

1. Считывает `n` — количество чисел.
2. Выделяет память под массив из `n` целых чисел через `malloc`.
3. Считывает элементы массива.
4. Сортирует массив пузырьковой сортировкой: сравнивает соседние элементы и меняет их местами, если они стоят в неправильном порядке.
5. Выводит отсортированный массив.
6. Освобождает выделенную память через `free`.

Компиляция, например:

```bash
gcc -std=c11 -Wall -Wextra -o bubble_sort bubble_sort.c
```

---
model: deepseek-v4.1-flash
task: c
run: 1
timestamp: 2026-09-24T06:14:50
temperature: 0.7
max_tokens: 8192
latency_s: 7.335
input_tokens: 125
output_tokens: 1465
reasoning_tokens: 878
total_tokens: 1590
finish_reason: stop
cost_rub: 0.02929
---

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;

    printf("Введите количество элементов: ");
    if (scanf("%d", &n) != 1 || n < 0) {
        fprintf(stderr, "Некорректное значение n.\n");
        return 1;
    }

    int *a = NULL;

    if (n > 0) {
        a = malloc((size_t)n * sizeof(*a));
        if (a == NULL) {
            fprintf(stderr, "Ошибка выделения памяти.\n");
            return 1;
        }
    }

    printf("Введите %d целых чисел:\n", n);
    for (int i = 0; i < n; ++i) {
        if (scanf("%d", &a[i]) != 1) {
            fprintf(stderr, "Ошибка чтения элемента.\n");
            free(a);
            return 1;
        }
    }

    // Пузырьковая сортировка
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
            printf(" ");
        }
    }
    printf("\n");

    free(a);

    return 0;
}
```

Как работает программа:

1. Сначала считывается число `n` — количество элементов массива.
2. Через `malloc` динамически выделяется память под `n` целых чисел.
3. Затем в цикле считываются сами числа.
4. Выполняется пузырьковая сортировка:
   - сравниваются соседние элементы;
   - если левый больше правого, они меняются местами;
   - после каждого прохода наибольший элемент “всплывает” в конец.
5. Отсортированный массив выводится на экран.
6. В конце память освобождается через `free`.

Скомпилировать можно, например, так:

```bash
gcc -std=c11 -Wall -Wextra -o sort sort.c
./sort
```

---
model: deepseek-v4-pro
task: c
run: 4
timestamp: 2026-09-24T06:46:03
temperature: 0.7
max_tokens: 8192
latency_s: 28.411
input_tokens: 185
output_tokens: 1523
reasoning_tokens: 929
total_tokens: 1708
finish_reason: stop
cost_rub: 0.03146
---

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int n;

    printf("Введите количество элементов: ");
    if (scanf("%d", &n) != 1 || n <= 0) {
        fprintf(stderr, "Некорректный размер массива.\n");
        return 1;
    }

    // Динамическое выделение памяти под массив из n целых чисел
    int *arr = malloc((size_t)n * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "Ошибка выделения памяти.\n");
        return 1;
    }

    printf("Введите %d целых чисел:\n", n);
    for (int i = 0; i < n; ++i) {
        if (scanf("%d", &arr[i]) != 1) {
            fprintf(stderr, "Ошибка чтения числа.\n");
            free(arr);
            return 1;
        }
    }

    // Пузырьковая сортировка
    for (int i = 0; i < n - 1; ++i) {
        int swapped = 0;

        for (int j = 0; j < n - 1 - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }

        // Если обменов не было, массив уже отсортирован
        if (!swapped) {
            break;
        }
    }

    printf("Отсортированный массив:\n");
    for (int i = 0; i < n; ++i) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // Освобождение выделенной памяти
    free(arr);

    return 0;
}
```

Как работает программа:

1. Сначала считывается число `n` — количество элементов массива.
2. Функция `malloc` выделяет память под `n` целых чисел.
3. В цикле считываются сами элементы массива.
4. Выполняется пузырьковая сортировка: соседние элементы сравниваются попарно, и если левый больше правого, они меняются местами. За каждый внешний проход наибольший элемент «всплывает» в конец массива.
5. Если за проход не было ни одной перестановки, массив уже отсортирован, и цикл завершается досрочно.
6. Отсортированный массив выводится на экран.
7. В конце память освобождается с помощью `free`.

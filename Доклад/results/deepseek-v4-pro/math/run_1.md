---
model: deepseek-v4-pro
task: math
run: 1
timestamp: 2026-09-24T06:13:21
temperature: 0.7
max_tokens: 8192
latency_s: 441.334
input_tokens: 178
output_tokens: 8192
reasoning_tokens: 7166
total_tokens: 8370
finish_reason: length
cost_rub: 0.15419
---

Пусть задано вероятностное пространство \((\Omega,\mathcal F,\mathbb P)\), а \(X:\Omega\to\mathbb R\) — случайная величина.

## 1. Определение математического ожидания

### Общее определение

Математическое ожидание определяется как интеграл Лебега по вероятностной мере:

\[
\mathbb E[X]=\int_\Omega X(\omega)\,d\mathbb P(\omega),
\]

если только

\[
\mathbb E|X|=\int_\Omega |X(\omega)|\,d\mathbb P(\omega)<\infty.
\]

Если \(\mathbb E|X|=\infty\), то говорят, что математическое ожидание не существует в конечном смысле.

### Дискретный случай

Если \(X\) принимает не более чем счётное множество значений \(x_1,x_2,\dots\) с вероятностями

\[
p_i=\mathbb P(X=x_i),
\]

то

\[
\mathbb E[X]=\sum_i x_i p_i,
\]

при условии, что ряд сходится абсолютно:

\[
\sum_i |x_i|p_i<\infty.
\]

### Непрерывный случай

Если \(X\) абсолютно непрерывна, то есть имеет плотность \(f_X(x)\), то

\[
\mathbb E[X]=\int_{-\infty}^{\infty} x f_X(x)\,dx,
\]

при условии, что

\[
\int_{-\infty}^{\infty} |x|f_X(x)\,dx<\infty.
\]

---

## 2. Основные свойства

Пусть \(X,Y\) — случайные величины с конечными математическими ожиданиями.

### 2.1 Ожидание константы

\[
\mathbb E[c]=c.
\]

**Доказательство.**

Константа \(c\) — это случайная величина, принимающая значение \(c\) с вероятностью \(1\). Поэтому

\[
\mathbb E[c]=\int_\Omega c\,d\mathbb P
=c\mathbb P(\Omega)=c.
\]

В дискретном случае: \(\sum c p_i=c\sum p_i=c\).  
В непрерывном: \(c\int f_X(x)\,dx=c\).

---

### 2.2 Линейность

Для любых \(a,b\in\mathbb R\)

\[
\mathbb E[aX+bY]=a\mathbb E[X]+b\mathbb E[Y].
\]

**Доказательство.**

По линейности интеграла Лебега

\[
\mathbb E[aX+bY]
=\int_\Omega (aX+bY)\,d\mathbb P
=a\int_\Omega X\,d\mathbb P
+b\int_\Omega Y\,d\mathbb P
=a\mathbb E[X]+b\mathbb E[Y].
\]

В дискретном случае это записывается как

\[
\sum_{i,j}(ax_i+by_j)\mathbb P(X=x_i,Y=y_j)
=a\sum_i x_i\mathbb P(X=x_i)
+b\sum_j y_j\mathbb P(Y=y_j).
\]

---

### 2.3 Монотонность

Если \(X\le Y\) почти наверное, то

\[
\mathbb E[X]\le \mathbb E[Y].
\]

**Доказательство.**

Если \(X\le Y\) почти наверное, то \(Y-X\ge 0\) почти наверное. Интеграл от неотрицательной измеримой функции неотрицателен, поэтому

\[
\mathbb E[Y-X]\ge 0.
\]

По линейности

\[
\mathbb E[Y-X]=\mathbb E[Y]-\mathbb E[X],
\]

следовательно,

\[
\mathbb E[Y]-\mathbb E[X]\ge 0
\]

и

\[
\mathbb E[X]\le \mathbb E[Y].
\]

В частности, из \(X\ge 0\) почти наверное следует \(\mathbb E[X]\ge 0\).

---

### 2.4 Математическое ожидание функции от случайной величины

Если \(g:\mathbb R\to\mathbb R\) измерима и \(\mathbb E|g(X)|<\infty\), то:

- в дискретном случае

\[
\mathbb E[g(X)]=\sum_i g(x_i)\mathbb P(X=x_i);
\]

- в непрерывном случае

\[
\mathbb E[g(X)]
=\int_{-\infty}^{\infty} g(x)f_X(x)\,dx.
\]

---

### 2.5 Математическое ожидание произведения независимых случайных величин

Если \(X\) и \(Y\) независимы и \(\mathbb E|X|<\infty\), \(\mathbb E|Y|<\infty\), то

\[
\mathbb E[XY]=\mathbb E[X]\mathbb E[Y].
\]

**Доказательство в дискретном случае.**

Пусть \(X\) принимает значения \(x_i\), а \(Y\) — значения \(y_j\). По независимости

\[
\mathbb P(X=x_i,Y=y_j)
=
\mathbb P

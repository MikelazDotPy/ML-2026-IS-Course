---
model: deepseek-v4-pro
task: math
run: 2
timestamp: 2026-09-24T06:24:04
temperature: 0.7
max_tokens: 8192
latency_s: 411.435
input_tokens: 178
output_tokens: 8192
reasoning_tokens: 6936
total_tokens: 8370
finish_reason: length
cost_rub: 0.15419
---

Пусть \(X\) — случайная величина на вероятностном пространстве \((\Omega,\mathcal F,\mathbb P)\).

## 1. Определение математического ожидания

### Общее определение

Математическое ожидание определяется как интеграл Лебега по вероятностной мере:

\[
\boxed{\mathbb E X=\int_\Omega X(\omega)\,d\mathbb P(\omega)}
\]

при условии, что \(\mathbb E|X|<\infty\), то есть \(X\) интегрируема. Если \(X=X^+-X^-\), где \(X^+=\max(X,0)\), \(X^-=\max(-X,0)\), то

\[
\mathbb E X=\mathbb E X^+-\mathbb E X^-,
\]

если хотя бы одна из величин \(\mathbb E X^+\), \(\mathbb E X^-\) конечна; если обе бесконечны, математическое ожидание не определено.

---

### Дискретный случай

Пусть \(X\) принимает не более чем счётное множество значений \(\{x_i\}\) с вероятностями

\[
p_i=\mathbb P(X=x_i).
\]

Тогда

\[
\boxed{\mathbb E X=\sum_i x_i p_i}
\]

при условии абсолютной сходимости ряда:

\[
\sum_i |x_i|p_i<\infty.
\]

---

### Непрерывный случай

Пусть \(X\) имеет плотность распределения \(f_X(x)\), то есть

\[
F_X(x)=\int_{-\infty}^{x} f_X(t)\,dt.
\]

Тогда

\[
\boxed{\mathbb E X=\int_{-\infty}^{\infty} x f_X(x)\,dx}
\]

при условии

\[
\int_{-\infty}^{\infty} |x| f_X(x)\,dx<\infty.
\]

---

## 2. Основные свойства

### Свойство 1: ожидание константы

Если \(X=c\) почти наверное, где \(c\in\mathbb R\), то

\[
\boxed{\mathbb E X=c}.
\]

**Доказательство.**

\[
\mathbb E X=\int_\Omega c\,d\mathbb P=c\,\mathbb P(\Omega)=c.
\]

---

### Свойство 2: линейность

Для любых постоянных \(a,b\in\mathbb R\) и случайных величин \(X,Y\) с конечными математическими ожиданиями

\[
\boxed{\mathbb E(aX+bY)=a\mathbb E X+b\mathbb E Y}.
\]

**Доказательство.**

По линейности интеграла Лебега:

\[
\mathbb E(aX+bY)
=\int_\Omega (aX+bY)\,d\mathbb P
=a\int_\Omega X\,d\mathbb P+b\int_\Omega Y\,d\mathbb P
=a\mathbb E X+b\mathbb E Y.
\]

Независимость \(X\) и \(Y\) здесь не требуется.

---

### Свойство 3: монотонность

Если \(X\le Y\) почти наверное и математические ожидания существуют, то

\[
\boxed{\mathbb E X\le \mathbb E Y}.
\]

**Доказательство.**

Так как \(Y-X\ge 0\) почти наверное, то

\[
\mathbb E(Y-X)\ge 0.
\]

По линейности

\[
\mathbb E Y-\mathbb E X\ge 0,
\]

откуда \(\mathbb E X\le \mathbb E Y\).

---

### Свойство 4: ожидание функции от случайной величины

Если \(g:\mathbb R\to\mathbb R\) — измеримая функция, то

\[
\boxed{\mathbb E g(X)=\int_\Omega g(X(\omega))\,d\mathbb P(\omega)}.
\]

В дискретном случае:

\[
\mathbb E g(X)=\sum_i g(x_i)p_i,
\]

в непрерывном случае:

\[
\mathbb E g(X)=\int_{-\infty}^{\infty} g(x)f_X(x)\,dx.
\]

Это следует из замены переменной: интегрирование по \(\mathbb P\) переходит в интегрирование по распределению \(P_X=\mathbb P\circ X^{-1}\).

---

### Свойство 5: произведение независимых случайных величин

Если \(X\) и \(Y\) независимы и \(\mathbb E|X|<\infty\), \(\mathbb E|Y|<\infty\), то

\[
\boxed{\mathbb E(XY)=\mathbb E X\,\mathbb E Y}.
\]

**Доказательство.**

В дискретном случае:

\[
\mathbb E(XY)
=\sum_{i,j}x_i y_j\,\mathbb P(X=x_i,Y=y_j).
\]

По независимости

\[
\mathbb P(X=x_i,Y=y_j)
=\mathbb P(X=x_i)\,\mathbb P(Y=y_j)
=p_i q_j.
\]

Поэтому

\[
\mathbb E(XY)
=\sum_i\sum_j x_i y_j p_i q_j
=\left(\sum_i x_i p_i\right)\left(\sum_j y_j q_j\right)
=\mathbb E X\,\mathbb E Y.
\]

В непрерывном случае совместная плотность независимых величин факторизуется:

\[
f_{X,Y}(x,y)=f_X(x)f_Y(y).
\]

Тогда

\[
\mathbb E(XY)
=\iint_{\mathbb R^2} xy f_X(x)f_Y(y)\,dx\,dy
=\left(\int_{\mathbb R}x f_X(x)\,dx\right)\left(\int_{\mathbb R}y f_Y(y)\,dy\right)
=\mathbb E X\,\mathbb E Y.
\]

В общем случае доказательство опирается на теорему Фубини, поскольку независимость означает, что совместное распределение является произведением распределений.

---

## 3. Примеры

### Дискретный пример

Пусть \(X\) — число, выпавшее на правильной игральной кости. Тогда

\[
\mathbb P(X=k)=\frac16,\

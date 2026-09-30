---
model: deepseek-v4.1-flash
task: math
run: 1
timestamp: 2026-09-24T06:15:22
temperature: 0.7
max_tokens: 8192
latency_s: 31.851
input_tokens: 118
output_tokens: 7229
reasoning_tokens: 5411
total_tokens: 7347
finish_reason: stop
cost_rub: 0.13535
---

## 1. Определения

Пусть задано вероятностное пространство \((\Omega,\mathcal F,\mathbb P)\), а \(X:\Omega\to\mathbb R\) — случайная величина.

**Общее (строгое) определение.** Если  
\[
\mathbb E|X|=\int_\Omega |X(\omega)|\,d\mathbb P(\omega)<\infty,
\]
то математическим ожиданием \(X\) называется
\[
\mathbb E X=\int_\Omega X(\omega)\,d\mathbb P(\omega)
\]
(интеграл Лебега). Если \(X\ge 0\), иногда допускают значение \(\mathbb E X=+\infty\).

### Дискретный случай
Пусть \(X\) принимает не более чем счётное множество значений \(x_i\), и
\[
p_i=\mathbb P(X=x_i)>0.
\]
Если
\[
\sum_i |x_i|p_i<\infty,
\]
то
\[
\boxed{\mathbb E X=\sum_i x_i p_i.}
\]
Если ряд сходится не абсолютно, математическое ожидание в собственном смысле не определено.

### Непрерывный случай
Пусть \(X\) абсолютно непрерывна и имеет плотность \(f_X(x)\). Если
\[
\int_{-\infty}^{\infty} |x|f_X(x)\,dx<\infty,
\]
то
\[
\boxed{\mathbb E X=\int_{-\infty}^{\infty} x f_X(x)\,dx.}
\]
Более общо,
\[
\mathbb E[g(X)]=\int_{-\infty}^{\infty} g(x)f_X(x)\,dx
\]
для измеримой \(g\), если интеграл существует.

---

## 2. Основные свойства математического ожидания

### 1. Ожидание константы
Если \(X=c\) почти наверное, то
\[
\mathbb E[c]=c.
\]
**Доказательство.**  
\[
\mathbb E[c]=\int_\Omega c\,d\mathbb P=c\,\mathbb P(\Omega)=c.
\]
В дискретном случае: \(\sum_i c p_i=c\sum_i p_i=c\).  
В непрерывном случае: \(\int c f_X(x)\,dx=c\).

---

### 2. Линейность
Если \(\mathbb E|X|<\infty\), \(\mathbb E|Y|<\infty\), то для любых \(a,b\in\mathbb R\)
\[
\boxed{\mathbb E[aX+bY]=a\mathbb E X+b\mathbb E Y.}
\]
**Доказательство.**  
По линейности интеграла Лебега:
\[
\mathbb E[aX+bY]
=\int_\Omega (aX+bY)\,d\mathbb P
=a\int_\Omega X\,d\mathbb P+b\int_\Omega Y\,d\mathbb P
=a\mathbb E X+b\mathbb E Y.
\]
В дискретном случае это сумма по совместному распределению; в непрерывном — двойной интеграл по совместной плотности.

Следствие:
\[
\mathbb E[cX]=c\mathbb E X.
\]

---

### 3. Монотонность
Если \(X\le Y\) почти наверное и математические ожидания существуют, то
\[
\boxed{\mathbb E X\le \mathbb E Y.}
\]
**Доказательство.**  
Тогда \(Y-X\ge 0\) почти наверное. Интеграл от неотрицательной случайной величины неотрицателен:
\[
\mathbb E(Y-X)\ge 0.
\]
По линейности \(\mathbb E Y-\mathbb E X\ge 0\), то есть \(\mathbb E X\le \mathbb E Y\).

В частности, если \(X\ge 0\) почти наверное, то \(\mathbb E X\ge 0\).

---

### 4. Ожидание индикатора
Если \(A\in\mathcal F\), то
\[
\mathbb E[\mathbf 1_A]=\mathbb P(A).
\]
**Доказательство.**  
\[
\mathbb E[\mathbf 1_A]=\int_\Omega \mathbf 1_A\,d\mathbb P=\mathbb P(A).
\]

---

### 5. Ожидание произведения независимых величин
Если \(X\) и \(Y\) независимы и \(\mathbb E|X|<\infty\), \(\mathbb E|Y|<\infty\), то
\[
\boxed{\mathbb E[XY]=\mathbb E X\cdot \mathbb E Y.}
\]
**Доказательство.**  
Независимость означает, что совместное распределение \((X,Y)\) есть произведение распределений. Поэтому
\[
\mathbb E[XY]
=\int_{\mathbb R^2} xy\,d\mathbb P_{(X,Y)}(x,y)
=\int_{\mathbb R}\int_{\mathbb R} xy\,d\mathbb P_X(x)\,d\mathbb P_Y(y)
=\left(\int_{\mathbb R}x\,d\mathbb P_X(x)\right)
 \left(\int_{\mathbb R}y\,d\mathbb P_Y(y)\right)
=\mathbb E X\,\mathbb E Y.
\]
В дискретном случае \(p_{ij}=p_iq_j\), и
\[
\sum_{i,j}x_i y_j p_iq_j
=\left(\sum_i x_i p_i\right)\left(\sum_j y_j q_j\right).
\]
В непрерывном случае \(f_{X,Y}(x,y)=f_X(x)f_Y(y)\), и двойной интеграл распадается в произведение.

Более общо, если \(X,Y\) независимы, то
\[
\mathbb E[g(X)h(Y)]=\mathbb E[g(X)]\,\mathbb E[h(Y)]
\]
при условии существования ожиданий.

---

### 6. Формула замены переменной
Если \(X\) дискретна, то
\[
\mathbb E[g(X)]=\sum_i g(x_i)p_i.
\]
Если \(X\) непрерывна с плотностью \(f_X\), то
\[
\mathbb E[g(X)]=\int_{-\infty}^{\infty} g(x)f_X(x)\,dx.
\]
**Доказательство.**  
Это следствие замены переменной в интеграле Лебега:
\[
\mathbb E[g(X)]=\int_\Omega g(X(\omega))\,d\mathbb P(\omega)
=\int_{\mathbb R}g(x)\,d\mathbb P_X(x),
\]
где \(\mathbb P_X\) — распределение \(X\).

---

### 7. Неравенство для модуля
Если \(\mathbb E|X|<\infty\), то
\[
|\mathbb E X|\le \mathbb E|X|.
\]
**Доказательство.**  
Из \(-|X|\le X\le |X|\) по монотонности:
\[
-\mathbb E|X|\le \mathbb E X\le \mathbb E|X|,
\]
что равносильно \(|\mathbb E X|\le \mathbb E|X|\).

---

## 3. Примеры вычисления

### Дискретный пример
Пусть \(X\) — число очков на честной игральной кости. Тогда
\[
\mathbb P(X=k)=\frac16,\qquad k=1,2,\dots,6.
\]
Следовательно,
\[
\mathbb E X=\sum_{k=1}^6 k\cdot \frac16
=\frac{1+2+3+4+5+6}{6}
=\frac{21}{6}=3{,}5.
\]
Проверка абсолютной сходимости:
\[
\sum_{k=1}^6 |k|\frac16=3{,}5<\infty.
\]

---

### Непрерывный пример
Пусть \(X\sim \mathrm{Exp}(\lambda)\), \(\lambda>0\), то есть
\[
f_X(x)=\lambda e^{-\lambda x},\qquad x\ge 0.
\]
Тогда
\[
\mathbb E X=\int_0^\infty x\lambda e^{-\lambda x}\,dx.
\]
Интегрируя по частям:
\[
\int_0^\infty x\lambda e^{-\lambda x}\,dx
=\left[-x e^{-\lambda x}\right]_0^\infty
+\int_0^\infty e^{-\lambda x}\,dx
=0+\frac1\lambda
=\frac1\lambda.
\]
Итак,
\[
\boxed{\mathbb E X=\frac1\lambda.}
\]
При этом
\[
\mathbb E|X|=\mathbb E X=\frac1\lambda<\infty.
\]

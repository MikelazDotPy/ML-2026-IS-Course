---
model: deepseek-v4.1-flash
task: math
run: 4
timestamp: 2026-09-24T06:58:51
temperature: 0.7
max_tokens: 8192
latency_s: 51.783
input_tokens: 103
output_tokens: 6724
reasoning_tokens: 4830
total_tokens: 6886
finish_reason: stop
cost_rub: 0.12685
---

Пусть \((\Omega,\mathcal F,\mathbb P)\) — вероятностное пространство, а \(X:\Omega\to\mathbb R\) — случайная величина. Общее строгое определение:
\[
\mathbb E X=\int_\Omega X(\omega)\,d\mathbb P(\omega),
\]
где интеграл понимается как интеграл Лебега. Если \(\mathbb E|X|<\infty\), то \(X\) называется интегрируемой, и \(\mathbb E X\) конечно.

## 1. Дискретный случай

Пусть \(X\) принимает не более чем счётное множество значений \(x_1,x_2,\dots\), причём
\[
p_i=\mathbb P(X=x_i)>0,\qquad \sum_i p_i=1.
\]
Тогда
\[
\boxed{\mathbb E X=\sum_i x_i p_i}
\]
при условии абсолютной сходимости:
\[
\sum_i |x_i|p_i<\infty.
\]
Если \(X\ge 0\), сумма может быть равна \(+\infty\).

## 2. Непрерывный случай

Обычно под непрерывной понимают абсолютно непрерывную случайную величину: у неё есть плотность \(f_X(x)\). Тогда
\[
\boxed{\mathbb E X=\int_{-\infty}^{\infty} x f_X(x)\,dx}
\]
при условии
\[
\int_{-\infty}^{\infty} |x|f_X(x)\,dx<\infty.
\]
Если \(X\ge 0\), интеграл может быть равен \(+\infty\).

Если непрерывность понимать как непрерывность функции распределения, но плотности нет, то формула с интегралом по плотности неприменима; нужно пользоваться общим определением или интегралом Стилтьеса:
\[
\mathbb E X=\int_{\mathbb R} x\,dF_X(x).
\]

---

## Основные свойства математического ожидания

### 1. Ожидание константы
Если \(c\in\mathbb R\), то
\[
\mathbb E[c]=c.
\]
**Доказательство.** Константа \(c\) принимает значение \(c\) с вероятностью \(1\), поэтому
\[
\mathbb E[c]=\int_\Omega c\,d\mathbb P=c\,\mathbb P(\Omega)=c.
\]

### 2. Линейность
Если \(X,Y\) интегрируемы и \(a,b\in\mathbb R\), то
\[
\mathbb E[aX+bY]=a\mathbb E X+b\mathbb E Y.
\]
**Доказательство.** Следует из линейности интеграла Лебега:
\[
\int_\Omega (aX+bY)\,d\mathbb P
=a\int_\Omega X\,d\mathbb P+b\int_\Omega Y\,d\mathbb P.
\]
В дискретном случае это просто перегруппировка сумм, в непрерывном — линейность интеграла.

### 3. Следствие: \(\mathbb E[cX]=c\mathbb E X\)
Это частный случай линейности при \(Y=0\).

### 4. Монотонность
Если \(X\le Y\) почти наверное, то
\[
\mathbb E X\le \mathbb E Y
\]
(при условии существования ожиданий).  
**Доказательство.** Тогда \(Y-X\ge 0\) п.н., значит
\[
\mathbb E(Y-X)=\int_\Omega (Y-X)\,d\mathbb P\ge 0.
\]
Отсюда \(\mathbb E Y-\mathbb E X\ge 0\).

### 5. Оценка модуля
\[
|\mathbb E X|\le \mathbb E|X|.
\]
**Доказательство.** Так как \(-|X|\le X\le |X|\), по монотонности и линейности:
\[
-\mathbb E|X|\le \mathbb E X\le \mathbb E|X|.
\]

### 6. Ожидание индикатора
Если \(A\in\mathcal F\), то
\[
\mathbb E[\mathbf 1_A]=\mathbb P(A).
\]
**Доказательство.** \(\mathbf 1_A\) принимает значение \(1\) с вероятностью \(\mathbb P(A)\) и \(0\) с вероятностью \(1-\mathbb P(A)\), поэтому
\[
\mathbb E[\mathbf 1_A]=1\cdot\mathbb P(A)+0\cdot(1-\mathbb P(A))=\mathbb P(A).
\]

### 7. Ожидание произведения независимых величин
Если \(X,Y\) независимы и интегрируемы, то
\[
\boxed{\mathbb E[XY]=\mathbb E X\cdot \mathbb E Y.}
\]
**Доказательство в общем виде.** Независимость означает, что совместное распределение \((X,Y)\) есть произведение распределений:
\[
\mathbb P_{(X,Y)}=\mathbb P_X\otimes \mathbb P_Y.
\]
Тогда по теореме Фубини—Тонелли
\[
\mathbb E[XY]
=\int_{\mathbb R^2} xy\,d\mathbb P_X(x)\,d\mathbb P_Y(y)
=\left(\int_{\mathbb R}x\,d\mathbb P_X(x)\right)
\left(\int_{\mathbb R}y\,d\mathbb P_Y(y)\right)
=\mathbb E X\,\mathbb E Y.
\]
Интегрируемость произведения гарантируется тем, что
\[
\mathbb E|XY|=\mathbb E|X|\,\mathbb E|Y|<\infty.
\]

**В дискретном случае.** Если
\[
p_i=\mathbb P(X=x_i),\qquad q_j=\mathbb P(Y=y_j),
\]
то из независимости
\[
\mathbb P(X=x_i,\ Y=y_j)=p_iq_j.
\]
Поэтому
\[
\mathbb E[XY]=\sum_{i,j}x_i y_j p_iq_j
=\left(\sum_i x_i p_i\right)\left(\sum_j y_j q_j\right)
=\mathbb E X\,\mathbb E Y.
\]

**В непрерывном случае.** Если \(X,Y\) независимы и имеют плотности, то
\[
f_{X,Y}(x,y)=f_X(x)f_Y(y).
\]
Тогда
\[
\mathbb E[XY]
=\int_{-\infty}^{\infty}\int_{-\infty}^{\infty}xy f_X(x)f_Y(y)\,dx\,dy
=\left(\int_{-\infty}^{\infty}x f_X(x)\,dx\right)
\left(\int_{-\infty}^{\infty}y f_Y(y)\,dy\right)
=\mathbb E X\,\mathbb E Y.
\]

### 8. Ожидание функции от случайной величины
Для измеримой функции \(g\)
\[
\mathbb E[g(X)]=
\begin{cases}
\displaystyle \sum_i g(x_i)p_i, & X\text{ дискретна},\\[6pt]
\displaystyle \int_{-\infty}^{\infty} g(x)f_X(x)\,dx, & X\text{ абсолютно непрерывна}.
\end{cases}
\]
Это «закон бессознательного статистика»; он следует из определения распределения \(X\).

### 9. Если \(X,Y\) независимы, то
\[
\mathbb E[g(X)h(Y)]=\mathbb E[g(X)]\,\mathbb E[h(Y)]
\]
для таких измеримых \(g,h\), что соответствующие ожидания существуют.  
Доказательство то же, что и для произведения \(XY\).

---

## Примеры вычисления

### Дискретный пример
Бросается честная игральная кость. Пусть \(X\) — выпавшее число очков. Тогда
\[
\mathbb P(X=k)=\frac16,\qquad k=1,2,\dots,6.
\]
Следовательно,
\[
\mathbb E X=\sum_{k=1}^6 k\cdot \frac16
=\frac{1+2+3+4+5+6}{6}
=\frac{21}{6}
=3{,}5.
\]

### Непрерывный пример
Пусть \(X\sim \mathrm{Exp}(\lambda)\), \(\lambda>0\), то есть
\[
f_X(x)=
\begin{cases}
\lambda e^{-\lambda x}, & x\ge 0,\\
0, & x<0.
\end{cases}
\]
Тогда
\[
\mathbb E X=\int_0^\infty x\lambda e^{-\lambda x}\,dx.
\]
Интегрируем по частям: \(u=x\), \(dv=\lambda e^{-\lambda x}dx\), тогда \(du=dx\), \(v=-e^{-\lambda x}\). Получаем
\[
\mathbb E X
=\left[-x e^{-\lambda x}\right]_0^\infty
+\int_0^\infty e^{-\lambda x}\,dx
=0+\frac1\lambda
=\frac1\lambda.
\]
Итак,
\[
\boxed{\mathbb E X=\frac1\lambda.}
\]

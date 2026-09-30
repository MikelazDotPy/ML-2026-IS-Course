---
model: deepseek-v4.1-flash
task: math
run: 3
timestamp: 2026-09-24T06:43:45
temperature: 0.7
max_tokens: 8192
latency_s: 26.587
input_tokens: 68
output_tokens: 5975
reasoning_tokens: 0
total_tokens: 6043
finish_reason: stop
cost_rub: 0.11132
---

# Математическое ожидание: определение, свойства, примеры

## 1. Определение

Всюду ниже $(\Omega,\mathcal F,\mathbb P)$ — вероятностное пространство, $X\colon\Omega\to\mathbb R$ — случайная величина.

### 1.1. Дискретный случай

Пусть $X$ принимает значения $x_1,x_2,\dots$ (конечный или счётный набор) с вероятностями

$$p_k=\mathbb P(X=x_k),\qquad p_k>0,\quad \sum_k p_k=1 .$$

**Определение.** Если ряд сходится *абсолютно*:

$$\sum_k |x_k|\,p_k<\infty ,$$

то математическим ожиданием (средним значением) называется

$$\boxed{\;\mathbb E X=\sum_k x_k\,p_k\;}$$

Если ряд не сходится абсолютно, математическое ожидание **не существует** как конечное число. При этом, если $\sum_k (x_k)_+p_k=+\infty$ и $\sum_k (x_k)_-p_k<+\infty$, иногда пишут $\mathbb E X=+\infty$ (аналогично $-\infty$); если расходятся оба односторонних ряда, ожидание не определено вовсе.

> Требование абсолютной сходимости принципиально: при условной сходимости сумма $\sum x_kp_k$ зависит от порядка суммирования, т.е. как определение среднего непригодна.

### 1.2. Непрерывный случай

Пусть распределение $X$ абсолютно непрерывно с плотностью $f$:

$$f\ge0,\qquad \int_{\mathbb R} f(x)\,dx=1,\qquad \mathbb P(X\in A)=\int_A f(x)\,dx .$$

**Определение.** Если

$$\int_{\mathbb R}|x|\,f(x)\,dx<\infty ,$$

то математическим ожиданием называется

$$\boxed{\;\mathbb E X=\int_{\mathbb R} x\,f(x)\,dx\;}$$

Если $\int|x|f(x)\,dx=\infty$, ожидание не является конечным: несобственный интеграл может расходиться к $+\infty$, $-\infty$ или не существовать (например, распределение Коши).

### 1.3. Общее (объединяющее) определение

Интеграл Лебега по вероятностной мере даёт общий рецепт:

$$\mathbb E X=\int_\Omega X(\omega)\,\mathbb P(d\omega)=\int_{\mathbb R} x\,dF_X(x),$$

где $F_X$ — функция распределения. Интеграл конечен $\iff \mathbb E|X|<\infty$. Обе формулы выше — частные случаи (сумма по точечной мере и интеграл по $f\,dx$). Всюду далее «ожидание существует» = «$\mathbb E|X|<\infty$».

Полезное следствие (LOTUS / «закон неосознанного статистика»): для борелевской $g$ с $\mathbb E|g(X)|<\infty$

$$\mathbb E\,g(X)=\sum_k g(x_k)p_k \quad\text{или}\quad \mathbb E\,g(X)=\int_{\mathbb R}g(x)f(x)\,dx .$$

---

## 2. Основные свойства

### (P1) Ожидание константы
$\mathbb E c=c$ для любого $c\in\mathbb R$.

**Доказательство.** Здесь $X\equiv c$: все $x_k$ равны $c$, $\sum p_k=1$, поэтому $\mathbb E X=c\sum_k p_k=c$. В непрерывном/общем виде: $\int_\Omega c\,d\mathbb P=c\,\mathbb P(\Omega)=c$. $\blacksquare$

### (P2) Индикатор
$\mathbb E\,\mathbf 1_A=\mathbb P(A)$.

**Доказательство.** $\mathbf 1_A$ дискретна со значениями $1$ и $0$ и вероятностями $\mathbb P(A)$ и $1-\mathbb P(A)$:
$\mathbb E\mathbf 1_A=1\cdot\mathbb P(A)+0\cdot(1-\mathbb P(A))=\mathbb P(A)$. $\blacksquare$

### (P3) Линейность
Если $\mathbb E|X|,\mathbb E|Y|<\infty$ и $a,b\in\mathbb R$, то

$$\mathbb E(aX+bY)=a\,\mathbb E X+b\,\mathbb E Y .$$

**Доказательство (дискретный случай — через совместное распределение).** Пусть $p(x,y)=\mathbb P(X=x,Y=y)$ — совместные вероятности. Тогда $p_X(x)=\sum_y p(x,y)$, $p_Y(y)=\sum_x p(x,y)$, и абсолютная сходимость обеспечивает перестановку сумм:

$$\mathbb E(aX+bY)=\sum_{x,y}(ax+by)p(x,y)
=a\sum_x x\sum_y p(x,y)+b\sum_y y\sum_x p(x,y)=a\,\mathbb E X+b\,\mathbb E Y .$$

В непрерывном случае то же самое с заменой сумм на интегралы и совместной плотности (теорема Фубини). В общем виде это просто линейность интеграла Лебега: $\int(aX+bY)d\mathbb P=a\int X\,d\mathbb P+b\int Y\,d\mathbb P$. $\blacksquare$

> **Важно:** линейность **не требует независимости** $X$ и $Y$. Это самое часто используемое свойство; индукцией $\mathbb E\sum_{i=1}^n a_iX_i=\sum a_i\mathbb E X_i$.

### (P4) Монотонность
Если $X\le Y$ почти наверное и оба ожидания существуют, то $\mathbb E X\le\mathbb E Y$.

**Доказательство.** $Z=Y-X\ge0$ п.н. По (P3) $\mathbb E Y-\mathbb E X=\mathbb E Z=\int Z\,d\mathbb P\ge0$, поскольку интеграл от неотрицательной функции неотрицателен (предел интегралов от неотрицательных простых функций, приближающих $Z$ снизу; в дискретном случае все слагаемые $\ge0$). $\blacksquare$

### (P5) Оценка модуля
$|\mathbb E X|\le\mathbb E|X|$ (при $\mathbb E|X|<\infty$).

**Доказательство.** $-|X|\le X\le|X|$; применяем (P4) и (P3): $-\mathbb E|X|\le\mathbb E X\le\mathbb E|X|$. $\blacksquare$

### (P6) Ожидание произведения независимых величин
Если $X$ и $Y$ независимы, $\mathbb E|X|<\infty$, $\mathbb E|Y|<\infty$, то $\mathbb E|XY|<\infty$ и

$$\mathbb E(XY)=\mathbb E X\cdot\mathbb E Y .$$

**Доказательство (дискретный случай).** Независимость означает, что совместные вероятности факторизуются: $p(x,y)=p_X(x)p_Y(y)$. Тогда

$$\mathbb E(XY)=\sum_{x,y}xy\,p_X(x)p_Y(y)
=\Big(\sum_x x\,p_X(x)\Big)\Big(\sum_y y\,p_Y(y)\Big)=\mathbb E X\cdot\mathbb E Y .$$

Абсолютная сходимость двойного ряда обеспечивается независимостью: $\mathbb E|XY|=\big(\sum_x|x|p_X(x)\big)\big(\sum_y|y|p_Y(y)\big)=\mathbb E|X|\,\mathbb E|Y|<\infty$. В непрерывном случае — то же с $f_{XY}(x,y)=f_X(x)f_Y(y)$ и теоремой Фубини; в общем виде — через $\sigma$-независимость и «разделение» интеграла. Индукция: для независимых $X_1,\dots,X_n$

$$\mathbb E\Big(\prod_{i=1}^n X_i\Big)=\prod_{i=1}^n \mathbb E X_i ,\qquad
\mathbb E\big(g(X)h(Y)\big)=\mathbb E g(X)\cdot\mathbb E h(Y).$$

**Обратное неверно:** из $\mathbb E(XY)=\mathbb E X\,\mathbb E Y$ независимость не следует. Пример: $\mathbb P(X=\pm1)=1/2$, $Y=X^2$. Тогда $\mathbb E X=0$, $\mathbb E Y=1$, $\mathbb E(XY)=\mathbb E X^3=0=\mathbb E X\,\mathbb E Y$, но $Y$ — функция от $X$, величины зависимы. $\blacksquare$

### (P7) Невырожденность неотрицательной величины
Если $X\ge0$ п.н. и $\mathbb E X=0$, то $X=0$ п.н.

**Доказательство.** Если $\mathbb P(X>\varepsilon)>0$ для некоторого $\varepsilon>0$, то по (P4) $\mathbb E X\ge\varepsilon\,\mathbb P(X>\varepsilon)>0$ — противоречие. Значит $\mathbb P(X>1/n)=0$ для всех $n$, и в силу непрерывности снизу $\mathbb P(X>0)=0$. $\blacksquare$

### (P8) Дисперсионное тождество (следствие линейности)
$\operatorname{Var}X=\mathbb E X^2-(\mathbb E X)^2\ge0$, т.е. $(\mathbb E X)^2\le\mathbb E X^2$ (неравенство Йенсена для $x^2$).

**Доказательство.** Пусть $\mu=\mathbb E X$. Тогда
$\operatorname{Var}X=\mathbb E(X-\mu)^2=\mathbb E\big(X^2-2\mu X+\mu^2\big)=\mathbb E X^2-2\mu\,\mathbb E X+\mu^2=\mathbb E X^2-\mu^2$,
где использованы (P3) и (P1). Неотрицательность — из $X\ge0\Rightarrow\mathbb E X\ge0$ для $(X-\mu)^2$. $\blacksquare$

### (P9) Зависимость только от распределения
$\mathbb E X$ определяется распределением $F_X$, а не реализацией на конкретном вероятностном пространстве (см. формулу $\int x\,dF_X$).

---

## 3. Пример дискретной величины

**Пуассон.** $X\sim\mathrm{Pois}(\lambda)$, $\lambda>0$: $\;p_k=\dfrac{\lambda^k}{k!}e^{-\lambda}$, $k=0,1,2,\dots$

*Проверка существования.* $\sum_{k\ge0}k\,p_k=\lambda e^{-\lambda}\sum_{k\ge1}\frac{\lambda^{k-1}}{(k-1)!}=\lambda<\infty$, значит $\mathbb E|X|=\mathbb E X<\infty$ и определение применимо.

*Вычисление.* Первое слагаемое ($k=0$) равно нулю:

$$\mathbb E X=\sum_{k=0}^\infty k\,\frac{\lambda^k}{k!}e^{-\lambda}
=\lambda e^{-\lambda}\sum_{k=1}^\infty \frac{\lambda^{\,k-1}}{(k-1)!}
=\lambda e^{-\lambda}\sum_{j=0}^\infty\frac{\lambda^{j}}{j!}
=\lambda e^{-\lambda}\cdot e^{\lambda}=\lambda .$$

**Дополнительно — тот же ответ «через линейность».** Для $X\sim\mathrm{Pois}(\lambda)$ и $N\ge1$ верно $\sum_{k=0}^{N}\mathbf 1_{\{X\ge k\}}=\min(X,N)$, а $X=\sum_{k\ge1}\mathbf 1_{\{X\ge k\}}$. Так как $\mathbb P(X\ge k)=\sum_{j\ge k}e^{-\lambda}\lambda^j/j!\le\lambda^k/k!$ и $\sum_k \lambda^k/k!<\infty$, ряд сходится абсолютно, и по (P3)+(P2):

$$\mathbb E X=\sum_{k=1}^\infty \mathbb P(X\ge k),$$

что для $\mathrm{Pois}(\lambda)$ снова даёт $\lambda$ (сумма «хвостов»). Этот приём (разложение на индикаторы) — стандартный способ считать ожидания без прямого суммирования.

---

## 4. Пример непрерывной величины

**Показательное распределение.** $X\sim\mathrm{Exp}(\lambda)$, $\lambda>0$:

$$f(x)=\begin{cases}\lambda e^{-\lambda x}, & x\ge0,\\ 0,& x<0.\end{cases}$$

*Проверка существования.*

$$\int_{\mathbb R}|x|f(x)\,dx=\int_0^\infty x\lambda e^{-\lambda x}dx
=\Big[-xe^{-\lambda x}\Big]_0^\infty+\int_0^\infty e^{-\lambda x}dx
=0+\frac1\lambda=\frac1\lambda<\infty .$$

*Вычисление* (интегрирование по частям, $u=x,\ dv=\lambda e^{-\lambda x}dx$):

$$\mathbb E X=\int_0^\infty x\lambda e^{-\lambda x}dx=\frac1\lambda .$$

*Бонус — второй момент тем же методом.* $u=x^2$:

$$\mathbb E X^2=\int_0^\infty x^2\lambda e^{-\lambda x}dx=\frac{2}{\lambda^2},
\qquad
\operatorname{Var}X=\mathbb E X^2-(\mathbb E X)^2=\frac{2}{\lambda^2}-\frac{1}{\lambda^2}=\frac1{\lambda^2}.$$

---

## 5. Замечание о том, когда ожидание не существует

Для симметричного распределения Коши $f(x)=\dfrac{1}{\pi(1+x^2)}$ имеем $\displaystyle\int_{\mathbb R}|x|f(x)dx=+\infty$, поэтому **математического ожидания нет** — несмотря на симметрию и «очевидный» кандидат $0$. Формально главное значение $\lim_{R\to\infty}\int_{-R}^{R}xf(x)dx=0$ ничего не значит: при условной сходимости результат зависит от способа урезания. Это подчёркивает, зачем в определении требуется **абсолютная** сходимость.

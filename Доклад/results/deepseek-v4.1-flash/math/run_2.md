---
model: deepseek-v4.1-flash
task: math
run: 2
timestamp: 2026-09-24T06:29:52
temperature: 0.7
max_tokens: 8192
latency_s: 25.752
input_tokens: 68
output_tokens: 6120
reasoning_tokens: 0
total_tokens: 6188
finish_reason: stop
cost_rub: 0.114
---

# Математическое ожидание: определение, свойства, примеры

## 1. Определения

### 1.1 Общее (вероятностное) определение

Пусть $(\Omega, \mathcal{F}, \mathrm{P})$ — вероятностное пространство и $X: \Omega \to \mathbb{R}$ — случайная величина (измеримая функция). **Математическим ожиданием** $X$ называется интеграл Лебега

$$
\mathrm{E}[X] \;=\; \int_{\Omega} X(\omega)\,\mathrm{d}\mathrm{P}(\omega),
$$

при условии, что этот интеграл определён, т.е. $\mathrm{E}|X| = \int_\Omega |X|\,\mathrm{d}\mathrm{P} < \infty$ (тогда $X$ называют *интегрируемой*). Это определение — «родительское»: оба частных случая ниже получаются из него заменой интеграла на сумму или на обычный интеграл Римана.

### 1.2 Дискретный случай

Пусть $X$ принимает не более чем счётное множество значений $x_1, x_2, \dots$ с вероятностями

$$
p_i = \mathrm{P}(X = x_i) > 0, \qquad \sum_{i\ge 1} p_i = 1 .
$$

Тогда

$$
\boxed{\;\mathrm{E}[X] = \sum_{i\ge 1} x_i\, p_i\;}
\qquad \text{при условии } \sum_{i\ge1} |x_i|\,p_i < \infty .
$$

**Замечание об абсолютной сходимости.** Условие $\sum |x_i|p_i<\infty$ не техническая придирка: без него ряд $\sum x_i p_i$ может не иметь суммы (расходиться), а при условной сходимости его сумма меняется от перестановки слагаемых — то есть «ожидание» перестало бы быть функцией распределения. Пример: $\mathrm{P}(X = (-2)^k) = 2^{-k}$, $k\ge 1$. Тогда $\sum |x_i|p_i = \sum_{k\ge1} 2^{-k}\cdot 2^k = \infty$, а $\sum_k (-2)^k 2^{-k} = \sum_k (-1)^k$ расходится: математического ожидания не существует.

### 1.3 Непрерывный случай

Пусть $X$ — абсолютно непрерывная величина с плотностью $f$, т.е. $\mathrm{P}(X \in B) = \int_B f(x)\,\mathrm{d}x$ и $\int_{\mathbb{R}} f(x)\,\mathrm{d}x = 1$. Тогда

$$
\boxed{\;\mathrm{E}[X] = \int_{-\infty}^{+\infty} x\, f(x)\,\mathrm{d}x\;}
\qquad \text{при условии } \int_{-\infty}^{+\infty} |x|\, f(x)\,\mathrm{d}x < \infty .
$$

Это — несобственный интеграл, понимаемый как $\lim_{A\to+\infty,\,B\to-\infty}\int_{-A}^{B} x f(x)\,dx$; при абсолютной сходимости он существует и не зависит от способа предельного перехода.

---

## 2. Свойства и доказательства

Ниже $X,Y$ — случайные величины, для которых все фигурирующие ожидания конечны; $a,b,c \in \mathbb{R}$.

### (P1) Ожидание константы
$$
\mathrm{E}[c] = c .
$$
**Доказательство.** $c$ — дискретная величина с единственным значением $x_1 = c$, $p_1 = 1$, значит по 1.2: $\mathrm{E}[c] = c\cdot 1 = c$. $\blacksquare$

### (P2) Линейность
$$
\mathrm{E}[aX + bY] = a\,\mathrm{E}[X] + b\,\mathrm{E}[Y].
$$

**Доказательство (дискретный случай).** Пусть $p_{ij} = \mathrm{P}(X=x_i,\,Y=y_j)$ — совместное распределение. Тогда $\sum_j p_{ij} = \mathrm{P}(X=x_i)$, $\sum_i p_{ij} = \mathrm{P}(Y=y_j)$, и

$$
\mathrm{E}[aX+bY] = \sum_{i,j} (a x_i + b y_j)\,p_{ij}
= a\sum_i x_i \Big(\sum_j p_{ij}\Big) + b\sum_j y_j\Big(\sum_i p_{ij}\Big)
= a\sum_i x_i \mathrm{P}(X=x_i) + b\sum_j y_j \mathrm{P}(Y=y_j).
$$

Перестановка суммирований законна, так как $\sum_{i,j}|ax_i+by_j|p_{ij} \le |a|\mathrm{E}|X| + |b|\mathrm{E}|Y| < \infty$ (теорема Тонелли/Фубини для абсолютно сходящихся сумм). $\blacksquare$

**Непрерывный случай.** Аналогично, с совместной плотностью $f_{X,Y}(x,y)$:
$$
\mathrm{E}[aX+bY]=\iint (ax+by) f_{X,Y}(x,y)\,dx\,dy = a\!\int x f_X(x)dx + b\!\int y f_Y(y)dy,
$$
где $f_X(x)=\int f_{X,Y}(x,y)dy$; смена порядка интегрирования законна по Фубини в силу $\mathrm{E}|X|,\mathrm{E}|Y|<\infty$. $\blacksquare$

*Следствие:* аддитивность $\mathrm{E}[X+Y]=\mathrm{E}[X]+\mathrm{E}[Y]$ верна **без всякого предположения о независимости**.

### (P3) Монотонность
Если $X \le Y$ почти наверное, то $\mathrm{E}[X] \le \mathrm{E}[Y]$.

**Доказательство.** Пусть $Z = Y - X \ge 0$ п.н. В дискретном случае
$$
\mathrm{E}[Z] = \sum_{i,j} (y_j - x_i)\,p_{ij} \ge 0,
$$
поскольку каждое слагаемое с $p_{ij}>0$ неотрицательно ($y_j \ge x_i$ там, где пара имеет ненулевую вероятность), а слагаемые с $p_{ij}=0$ равны нулю. Значит $\mathrm{E}[Y]-\mathrm{E}[X] = \mathrm{E}[Z]\ge0$. В непрерывном случае — то же с $f_{X,Y}(x,y)\ge0$. $\blacksquare$

**Следствие (неотрицательность):** $X\ge0$ п.н. $\Rightarrow \mathrm{E}[X]\ge0$ (монотонность при $Y\equiv 0$ и (P1)).

### (P4) Модульная оценка
$$
|\mathrm{E}[X]| \le \mathrm{E}|X| .
$$
**Доказательство.** Из $-|X| \le X \le |X|$ по (P3) и (P2): $-\mathrm{E}|X| \le \mathrm{E}[X] \le \mathrm{E}|X|$, что и есть двойное неравенство выше. $\blacksquare$

### (P5) Ожидание функции (правило «LOTUS»)
Для любой (борелевской) функции $g$
$$
\mathrm{E}[g(X)] = \sum_i g(x_i)\,p_i \quad (\text{дискретный}), \qquad
\mathrm{E}[g(X)] = \int_{-\infty}^{+\infty} g(x) f(x)\,\mathrm{d}x \quad (\text{непрерывный}),
$$
и **не нужно** находить распределение $g(X)$.

**Доказательство (дискретный).** Группируя слагаемые по значениям $X$:
$$
\mathrm{E}[g(X)] = \sum_i \sum_{\omega: X(\omega)=x_i} g(x_i)\mathrm{P}(\{\omega\}) = \sum_i g(x_i)\, \mathrm{P}(X=x_i). \;\blacksquare
$$
(В непрерывном случае это стандартная формула замены переменной/измеримого отображения.)

### (P6) Ожидание произведения независимых величин
Если $X$ и $Y$ **независимы**, то
$$
\mathrm{E}[XY] = \mathrm{E}[X]\cdot \mathrm{E}[Y].
$$

**Доказательство (дискретный).** Независимость даёт $p_{ij} = \mathrm{P}(X=x_i)\mathrm{P}(Y=y_j) =: p_i q_j$. Тогда
$$
\mathrm{E}[XY] = \sum_{i,j} x_i y_j\, p_i q_j = \Big(\sum_i x_i p_i\Big)\Big(\sum_j y_j q_j\Big) = \mathrm{E}[X]\,\mathrm{E}[Y].
$$
Сходимость: $\sum_{i,j}|x_i y_j|p_i q_j = \big(\sum_i |x_i|p_i\big)\big(\sum_j|y_j|q_j\big) = \mathrm{E}|X|\,\mathrm{E}|Y|<\infty$, так что факторизация законна. $\blacksquare$

**Непрерывный случай.** $f_{X,Y}(x,y) = f_X(x) f_Y(y)$, и по Фубини
$$
\mathrm{E}[XY] = \iint xy\, f_X(x)f_Y(y)\,dx\,dy = \Big(\int x f_X(x)dx\Big)\Big(\int y f_Y(y)dy\Big) = \mathrm{E}[X]\mathrm{E}[Y]. \;\blacksquare
$$

**Важно:** обратное неверно — $\mathrm{E}[XY]=\mathrm{E}[X]\mathrm{E}[Y]$ (некоррелированность) не влечёт независимость. Контрпример: $X$ равномерна на $\{-1,0,1\}$, $Y = \mathbf{1}\{X=0\}$ — величины некоррелированы, но зависимы.

### (P7) Дисперсия через моменты
$$
\mathrm{Var}(X) = \mathrm{E}\big[(X-\mathrm{E}X)^2\big] = \mathrm{E}[X^2] - (\mathrm{E}[X])^2 .
$$
**Доказательство.** Раскрываем квадрат и пользуемся линейностью (P2) и (P1):
$$
\mathrm{E}\big[(X-\mu)^2\big] = \mathrm{E}[X^2 - 2\mu X + \mu^2] = \mathrm{E}[X^2] - 2\mu\,\mathrm{E}[X] + \mu^2 = \mathrm{E}[X^2] - \mu^2,
$$
где $\mu = \mathrm{E}[X]$. $\blacksquare$

**Следствие:** для независимых $X,Y$
$$
\mathrm{Var}(X+Y) = \mathrm{Var}(X) + \mathrm{Var}(Y),
$$
так как $\mathrm{E}[(X-\mu_X)(Y-\mu_Y)] = \mathrm{E}[X-\mu_X]\mathrm{E}[Y-\mu_Y] = 0$ по (P6) и (P2).

### (P8) Формула «хвостов» (для неотрицательных целочисленных)
Если $X$ принимает значения $0,1,2,\dots$, то
$$
\mathrm{E}[X] = \sum_{k\ge 1} \mathrm{P}(X \ge k).
$$
**Доказательство.** Меняем порядок суммирования в неотрицательном двойном ряду:
$$
\sum_{k\ge1}\mathrm{P}(X\ge k) = \sum_{k\ge1}\sum_{i\ge k} p_i = \sum_{i\ge1} p_i \sum_{k=1}^{i} 1 = \sum_{i\ge1} i\,p_i = \mathrm{E}[X]. \;\blacksquare
$$

### (P9) Закон полного ожидания (башня)
$$
\mathrm{E}[X] = \mathrm{E}\big[\mathrm{E}[X\mid Y]\big].
$$
**Доказательство (дискретный).** $\mathrm{E}[X\mid Y=y_j] = \sum_i x_i \mathrm{P}(X=x_i \mid Y=y_j) = \sum_i x_i p_{ij}/q_j$. Тогда
$$
\mathrm{E}\big[\mathrm{E}[X\mid Y]\big] = \sum_j \Big(\sum_i x_i \frac{p_{ij}}{q_j}\Big) q_j = \sum_{i,j} x_i p_{ij} = \sum_i x_i p_i = \mathrm{E}[X]. \;\blacksquare
$$

### (P10) Неравенство Маркова (полезное следствие неотрицательности)
Для $X\ge 0$ и $t>0$: $\ \mathrm{P}(X\ge t) \le \mathrm{E}[X]/t$.
**Доказательство.** $t\,\mathbf{1}\{X\ge t\} \le X$ поточечно; применяем (P3), (P2) и (P1): $t\,\mathrm{P}(X\ge t) \le \mathrm{E}[X]$. $\blacksquare$

---

## 3. Примеры вычисления

### 3.1 Дискретный случай: число очков на честном кубике

$X$ — выпавшее число очков, $x_i = i$, $p_i = 1/6$, $i = 1,\dots,6$. Проверим условие интегрируемости: $\sum_i |x_i|p_i = 21/6 < \infty$. Тогда

$$
\mathrm{E}[X] = \sum_{i=1}^{6} i\cdot \frac16 = \frac{1+2+3+4+5+6}{6} = \frac{21}{6} = 3{,}5 .
$$

**Проверка формулой хвостов (P8):**
$$
\mathrm{E}[X] = \sum_{k=1}^{6}\mathrm{P}(X\ge k) = \frac{6+5+4+3+2+1}{6} = \frac{21}{6} = 3{,}5. \;\checkmark
$$

**Второй момент (по LOTUS, P5):**
$$
\mathrm{E}[X^2] = \sum_{i=1}^{6} i^2\cdot\frac16 = \frac{1+4+9+16+25+36}{6} = \frac{91}{6},
$$
$$
\mathrm{Var}(X) = \mathrm{E}[X^2]-(\mathrm{E}X)^2 = \frac{91}{6} - \frac{49}{4} = \frac{182-147}{12} = \frac{35}{12} \approx 2{,}917, \qquad \sigma_X \approx 1{,}708 .
$$

### 3.2 Непрерывный случай: показательное распределение

$X \sim \mathrm{Exp}(\lambda)$, $\lambda>0$, плотность $f(x) = \lambda e^{-\lambda x}$ при $x\ge 0$ и $f(x)=0$ при $x<0$. Интегрируемость: $\int_0^\infty x\lambda e^{-\lambda x}dx = 1/\lambda < \infty$ (см. ниже), так что ожидание существует.

$$
\mathrm{E}[X] = \int_0^{\infty} x\,\lambda e^{-\lambda x}\,\mathrm{d}x .
$$

Интегрируем по частям: $u = x$, $\mathrm{d}v = \lambda e^{-\lambda x}\mathrm{d}x \Rightarrow v = -e^{-\lambda x}$:

$$
\mathrm{E}[X] = \Big[-x e^{-\lambda x}\Big]_0^{\infty} + \int_0^{\infty} e^{-\lambda x}\,\mathrm{d}x
= \big(0-0\big) + \frac{1}{\lambda} = \boxed{\frac1\lambda}.
$$

**Второй момент (по LOTUS, P5):** ещё раз по частям ($u = x^2$, $\mathrm{d}v=\lambda e^{-\lambda x}dx$):
$$
\mathrm{E}[X^2] = \int_0^\infty x^2\lambda e^{-\lambda x}dx = \frac{2}{\lambda}\int_0^\infty x e^{-\lambda x}dx = \frac{2}{\lambda}\cdot\frac{1}{\lambda} = \frac{2}{\lambda^2}.
$$
Отсюда
$$
\mathrm{Var}(X) = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}, \qquad \sigma_X = \frac1\lambda .
$$

*(Для сверки: для равномерного $X\sim U[a,b]$ получаем $\mathrm{E}[X]=\int_a^b \frac{x}{b-a}dx = \frac{a+b}{2}$, $\mathrm{Var}(X)=\frac{(b-a)^2}{12}$.)*

---

## 4. Что стоит запомнить

1. Ожидание существует только при **абсолютной** сходимости ($\mathrm{E}|X|<\infty$), иначе нельзя переставлять слагаемые/интегралы.
2. Линейность (P2) — **без** требований независимости; мультипликативность (P6) — **только** при независимости (или, шире, при некоррелированности).
3. Для независимых величин дисперсии складываются; в общем случае $\mathrm{Var}(X+Y)=\mathrm{Var}X+\mathrm{Var}Y+2\mathrm{Cov}(X,Y)$.
4. Формулы «хвостов» (P8), «башни» (P9) и LOTUS (P5) — рабочие инструменты, экономящие целый шаг нахождения распределения.

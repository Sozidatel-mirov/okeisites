const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const nextButton = document.getElementById("nextButton");
let timeMinute;
let timeSecond;

// Добавляем обработчик события click
nextButton.addEventListener("click", function() {
    // Вызываем функцию Next() из объекта quiz

    quiz.Next();
    quiz.current--;

    // Обновляем содержимое страницы
    Update();
});

//Класс, который представляет сам тест
class Quiz
{
  constructor(type, questions, results)
  {
    //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
    this.type = type;

    //Массив с вопросами
    this.questions = questions;

    //Массив с возможными результатами
    this.results = results;

    //Количество набранных очков
    this.score = 0;

    //Номер результата из массива
    this.result = 0;

    //Номер текущего вопроса
    this.current = 0;
  }

  Click(index)
  {
    //Добавляем очки
    let value = this.questions[this.current].Click(index);
    this.score += value;

    let correct = -1;

    //Если было добавлено хотя одно очко, то считаем, что ответ верный
    if(value >= 1)
    {
      correct = index;
    }
    else
    {
      //Иначе ищем, какой ответ может быть правильным
      for(let i = 0; i < this.questions[this.current].answers.length; i++)
      {
        if(this.questions[this.current].answers[i].value >= 1)
        {
          correct = i;
          break;
        }
      }
    }

    this.Next();

    return correct;
  }

  //Переход к следующему вопросу
  Next()
  {
    this.current++;
    
    if(this.current >= this.questions.length) 
    {
      this.End();
    }

  }

  //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
  End()
  {
    for(let i = 0; i < this.results.length; i++)
    {
      if(this.results[i].Check(this.score))
      {
        this.result = i;
      }
    }
  }
} 

//Класс, представляющий вопрос
class Question 
{
  constructor(text, answers)
  {
    this.text = text; 
    this.answers = answers; 
  }

  Click(index) 
  {
    return this.answers[index].value; 
  }
}

//Класс, представляющий ответ
class Answer 
{
  constructor(text, value) 
  {
    this.text = text; 
    this.value = value; 
  }
}

//Класс, представляющий результат
class Result 
{
  constructor(text, value)
  {
    this.text = text;
    this.value = value;
  }

  //Этот метод проверяет, достаточно ли очков набрал пользователь
  Check(value)
  {
    if(this.value <= value)
    {
      return true;
    }
    else 
    {
      return false;
    }
  }
}

//Массив с результатами
const results = 
[
  new Result("Вам многому нужно научиться", 0),
  new Result("Вы уже неплохо разбираетесь", 2),
  new Result("Ваш уровень выше среднего", 4),
  new Result("Вы в совершенстве знаете тему", 6)
];

//Массив с вопросами
const questions = 
[
  new Question("Метод анализа SWOT используется для", 
  [
    new Answer("Тестирования идеи будущего продукта", 0),
    new Answer("Описания продукта с точки зрения силы, слабостей, возможностей и потенциальных", 1),
    new Answer("Анализа внешней среды, влияющей на бизнес", 0),
    new Answer("Тестирования идеи текущего продукта", 0)
  ]),

  new Question("Совокупность различных методов и способов исследования, предназначающийся для оценки положения компании. С их помощью организуется стратегическое планирование, выявляется спрос, определяется конкурентоспособность организации. Такое исследование необходимо проводить всем компаниям, занимающимся реализацией товаров или услуг для актуализации бизнеса и своевременного устранения недочетов. Определение какого вида анализа представлено? Выберите правильный", 
  [
    new Answer("Aнализ конкурентов", 0),
    new Answer("Aнализ целевой аудитории", 0),
    new Answer("Маркетинговый анализ", 1),
    new Answer("Aнализ рынка", 0)
  ]),

  new Question("Укажите верное описание цели интернет-маркетинга - масштабирование бизнеса.", 
  [
    new Answer("Выход на новые рынки и ниши, развитие линейки продукции, продвижение товара в других географических условиях", 1),
    new Answer("Организовать продажи товаров и услуг", 0),
    new Answer("Формирование образа компании и бренда, а также изменения публичного мнения о продукте", 0),
    new Answer("Для оценки эффективности бизнеса", 0)
  ]),

  new Question("Одной из задач интернет-маркетинга является составление стратегии продвижения продукта на интернет-рынке. В чем суть данной задачи? Выберите верный ответ:", 
  [
    new Answer("Показать преимущества продукта и его положение на рынке", 0),
    new Answer("Изучить все площадки и выбрать только те, которые реально покажут результат", 0),
    new Answer("Подключить все возможные веб-аналитики, которые помогут качественно и количественно отслеживать результат", 0),
    new Answer("Составить план, по которому ваш продукт начнет развиваться и масштабироваться", 1)
  ]),

  new Question("Укажите цель метода анализа конкурентов - Анализ пяти сил Портера", 
  [
    new Answer("проанализировать внешнюю среду, влияющую на бизнес. Анализируют политические, экономические, социальные и технологические аспекты рынка", 0),
    new Answer("проанализировать продукт с точки зрения силы, слабостей, возможностей и потенциальных угроз. Сильные и слабые стороны отражают продукт, возможности и угрозы — рынок", 0),
    new Answer("понять «привлекательность» отрасли через оценку рентабельности вложений. Провести данный анализ самостоятельно сложно: компания либо тратит много времени на подготовку и исследование, либо нанимает маркетологов и социологов", 1)
  ]),
new Question("Выберите понятия, относящиеся к интернет-маркетингу", 
  [
    new Answer("Конкуренты", 0),
    new Answer("Анализ рынка", 0),
    new Answer("Рынок", 0),
    new Answer("Все варианты", 1)
  ]),
  new Question("Выберите пункт, который не является этапом маркетинговых исследований.", 
  [
    new Answer("Определение проблемы и постановка цели исследования", 0),
    new Answer("Разработка плана исследования", 0),
    new Answer("Анализ вторичной и сбор первичной информации", 0),
    new Answer("Расширение клиентской базы", 1)
  ]),
  new Question("Укажите одно из направлений маркетингового анализа", 
  [
    new Answer("Анализ рынка", 1), 
    new Answer("Определение цели исследования", 0),
    new Answer("Формулирование гипотез", 0),
    new Answer("Определение цели предприятия", 0)
  ]),
  new Question("Укажите заключительный этап анализа рынка", 
  [
    new Answer("Составление плана маркетингового анализа", 0),
    new Answer("Презентация результатов", 1),
    new Answer("Определение методов исследования", 0),
    new Answer("Определение целей исследования", 0)
  ]),
  new Question("К какому направлению маркетингового исследования относится метод Сustdev (Customer Development)?", 
  [
    new Answer("Анализ бизнеса", 0),
    new Answer("Анализ конкурентов", 0),
    new Answer("Анализ целевой аудитории", 1),
    new Answer("Анализ рынка", 0)
  ])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
  //Проверяем, есть ли ещё вопросы
  if(quiz.current < quiz.questions.length) 
  {
    if (quiz.current >= quiz.questions.length - 1) {
  nextButton.innerHTML = "Показать результат";
  nextButton.addEventListener("click", function () {
    // Перенаправить на страницу с результатами
    window.location.href = "result.html?score=" + quiz.score + "&timeMinute=" + timeMinute + "&timeSecond=" + timeSecond; // Замените на фактический URL вашей страницы с результатами
  });
} else {
  // Для других случаев (не последний вопрос) оставьте оригинальный текст "Далее" и обработчик события
  nextButton.innerHTML = "Далее";
  nextButton.addEventListener("click", function () {
    quiz.Next();
    quiz.current--;
    Update();
  });
}

	
    
    //Если есть, меняем вопрос в заголовке
    headElem.innerHTML = quiz.questions[quiz.current].text;

    //Удаляем старые варианты ответов
    buttonsElem.innerHTML = "";

    //Создаём кнопки для новых вариантов ответов
    for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
    {
      let btn = document.createElement("button");
      btn.className = "button";

      btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

      btn.setAttribute("index", i);

      buttonsElem.appendChild(btn);
    }
    
    //Выводим номер текущего вопроса
    pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

    //Вызываем функцию, которая прикрепит события к новым кнопкам
    Init();
  }
  else
  {//Если это конец, то выводим результат
    
  }
}

function Init()
{
  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  for(let i = 0; i < btns.length; i++)
  {
    //Прикрепляем событие для каждой отдельной кнопки
    //При нажатии на кнопку будет вызываться функция Click()
    btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
  }
}

function Click(index) 
{
  //Получаем номер правильного ответа
  let correct = quiz.Click(index);

  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  //Делаем кнопки серыми
  for(let i = 0; i < btns.length; i++)
  {
    btns[i].className = "button button_passive";
    btns[i].disabled = "disabled";
  }

  //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
  if(quiz.type == 1)
  {
    if(correct >= 0)
    {
      btns[correct].className = "button button_correct";
    }

    if(index != correct) 
    {
      btns[index].className = "button button_wrong";
    } 
  }
  else
  {
    //Иначе просто подсвечиваем зелёным ответ пользователя
    btns[index].className = "button button_correct";
  }

  //Ждём секунду и обновляем тест

}
// Функция для обновления таймера
        function updateTimer() {
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            let minutes = parseInt(minutesElement.textContent);
            let seconds = parseInt(secondsElement.textContent);
            
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            
            minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
			 timeMinute = minutes < 10 ? '0' + minutes : minutes;
            timeSecond = seconds < 10 ? '0' + seconds : seconds;
        }

        // Обновляем таймер каждую секунду
        const timerInterval = setInterval(updateTimer, 1000);

        // Инициализация таймера
        window.onload = function() {
            updateTimer();
        };

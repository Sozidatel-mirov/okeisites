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
  new Question("Выберите верное определение понятия «внедрение информационных систем»?", 
  [
    new Answer("это процесс внедрения новых или обновления существующих информационных систем в организации;", 1),
    new Answer("это информационная система в целом;", 0),
    new Answer("это процесс сопровождения новых информационных систем в организации;", 1),
    new Answer("это процесс разработки и тестирования информационных систем в организации.", 0)
  ]),

  new Question("Выберите последовательность всех этапов внедрения информационных систем. ", 
  [
    new Answer("Планирование и оценка, разработка, тестирование, поддержка и сопровождение.", 0),
    new Answer("Планирование и анализ, разработка и настройка, тестирование, внедрение, поддержка и сопровождение. ", 1),
    new Answer("Планирование и анализ, внедрение, поддержка и сопровождение.", 0),
    new Answer("Анализ, разработка и настройка, тестирование, внедрение.", 0)
  ]),
  new Question("Что позволяю интерфейсные функции?", 
  [
    new Answer("Разделить задачи между разными компонентами программного обеспечения.", 0), 
    new Answer("Обеспечивают легкую интеграцию с другими системами.", 0),
    new Answer("Облегчить разработку и разделить ответственности между разработчиками.", 0),
    new Answer("Все ответы верны.", 1)
  ]),
  new Question("Для чего важно постоянно оценивать и мониторить процесс внедрения информационных систем?", 
  [
    new Answer("Для экономии ресурсов организации.", 0),
    new Answer("Для разнообразия выбора внедрения информационных систем.", 0),
    new Answer("Для сотрудников организации.", 0),
    new Answer("для улучшения эффективности и успешности внедрения организации ", 1)
  ]),
  new Question("С помощью чего может проводиться оценка качества функционирования информационной системы?", 
  [
    new Answer("С помощью сопровождения информационных систем.", 0),
    new Answer("С помощью тестирования, анализа отзывов пользователей, мониторинга производительности и других методов.", 1),
    new Answer("С помощью специализированного программного обеспечения.", 0),
    new Answer("Нет верного варианта.", 0)
  ]),
  new Question("Выберите верное определение понятия CALS технологии?", 
  [
    new Answer("Это методология и набор стандартов, разработанных для управления жизненным циклом информационных систем.", 1),
    new Answer("Это процессы, связанные управлением информационных систем.", 0),
    new Answer("Это стандарты в области качества информационных систем.", 0),
    new Answer("Это система взаимодействия пользователей с информационными системами.", 0)
  ]),
  new Question("В чем заключается масштабируемость информационной системы?", 
  [
    new Answer("Скорость и эффективность выполнения операций системой.", 0),
    new Answer("Способность системы эффективно работать с увеличением объема данных или числа пользователей.", 1),
    new Answer("Возможность внесения изменений и обновлений в систему без необходимости полной переработки.", 0),
    new Answer("Соответствие системы заявленным или ожидаемым функциям и возможностям.", 0)
  ]),
  new Question("Интерфейсные функции (API) — это …?", 
  [
    new Answer("процессы информационной системы;", 0),
    new Answer("набор характеристик взаимодействия пользователей с системой;", 0),
    new Answer("технология внедрения информационных систем;", 0),
    new Answer("набор функций и процедур, предоставляемых программным интерфейсом для взаимодействия с другими программами.", 1)
  ]),
  new Question("К какой технологии внедрения относится сеть физических устройств, которые собирают и обмениваются данными между собой и с информационными системами?", 
  [
    new Answer("CRM-системы.", 0),
    new Answer("Мобильные приложения.", 0),
    new Answer("Облачные технологии.", 0),
    new Answer("Интернет вещей.", 1)
  ]),
  new Question("Это поможет выявить проблемы и улучшить интерфейс и настройки доступа?", 
  [
    new Answer("Тестирование и обратная связь пользователей.", 1),
    new Answer("Разработка интуитивного интерфейса.", 0),
    new Answer("Разграничение прав доступа.", 0),
    new Answer("Обучение пользователей.", 0)
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

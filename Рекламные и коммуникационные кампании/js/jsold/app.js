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
  new Question("Придание товару, услуге или компании особых характеристик, которые позволяют дифференцироваться от конкурентов и быть уникальным", 
  [
    new Answer("Брендинг", 1),
    new Answer("Имиджирование", 0),
    new Answer("Дизайн", 0),
    new Answer("Идентичность", 0)
  ]),

  new Question("Реклама – это?", 
  [
    new Answer("Проведение комплексных рекламных мероприятий, связанных в определенной последовательности, способствующих повышению интереса к товару и имеющих целью прочное внедрение товара на рынок", 0),
    new Answer("Платное, однонаправленное, неличное, опосредованное обращение, пропагандирующее товар и готовящее потенциального потребителя к покупке", 1),
    new Answer("Целенаправленное и комплексное воздействие на внешнюю и внутреннюю среду фирмы, прямо или косвенно способствующее достижению основной ее цели: получение прибыли", 0)
  ]),

  new Question("Сущность рекламной деятельности определяется функциями рекламы", 
  [
    new Answer("Воспитание в человеке разумных потребностей", 0),
    new Answer("Обеспечение бесперебойного сбыта произведенной продукции", 0),
    new Answer("Увещевательное воздействие на человека с целью побудить его приобрести те или иные товары или услуги", 0),
    new Answer("Все вышеперечисленное", 1)
  ]),

  new Question("Маркетинговые коммуникации – это комплексная система внешних и внутренних коммуникаций по передаче информации", 
  [
    new Answer("Жестикуляцией, пластикой движения рук, мимикой лица", 0),
    new Answer("Изготовителя готовой продукции потребителю в целях удовлетворения запросов общества и получения прибыли", 1),
    new Answer("В речевой форме, которая характеризуется тембром голоса, громкостью, интонациейи в целом культурой речи", 0),
    new Answer("Для координации планово-управленческих решений и их реализации, корректировки и профилактики конфликтов", 0)
  ]),

  new Question("Реклама, цель которой, убедить покупателя в том, что он поступил правильно, купив именно этот товар, является", 
  [
    new Answer("Сравнительной", 0),
    new Answer("Информативной", 0),
    new Answer("Подкрепляющей", 1),
    new Answer("Избирательной", 0)
  ]),
new Question("Для проведения национальной рекламной компании подходят такие коммуникационные каналы, как?", 
  [
    new Answer("Телевидение", 1),
    new Answer("Интернет", 0),
    new Answer("Конференция", 0),
    new Answer("Выставка", 0)
  ]),
  new Question("Причина того, что технологические новации не всегда полностью вытесняют предшествующие технологии - это?", 
  [
    new Answer("Указ правительства", 0),
    new Answer("Привычки людей", 1),
    new Answer("Блогерство", 0)
  ]),
  new Question("В каких случаях возникает необходимость в разработке рекламной кампании?", 
  [
    new Answer("Появление новых каналов коммуникации", 0), 
    new Answer("Значительное изменение рыночной ситуации", 0),
    new Answer("Финансовые трудности у рекламодателя", 0),
    new Answer("Все вышеперечисленное", 1)
  ]),
  new Question("Для какого СМИ подходит описание: массовость, низкая стоимость, высокая географическая и демографическая избирательность, краткость рекламного контакта", 
  [
    new Answer("Телевидение", 0),
    new Answer("Радио", 1),
    new Answer("Директ-майл", 0),
    new Answer("Газеты", 0)
  ]),
  new Question("В какой маркетинговой коммуникации используют такие инстурменты, как чат-бот в мессенджерах, email-рассылки, SMS, Wwev push уведомления, SMM, телемаркетинг?", 
  [
    new Answer("Реклама", 0),
    new Answer("Прямой маркетинг", 1),
    new Answer("Спонсорство", 0),
    new Answer("Брендинг", 0)
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

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
  new Question("Несмотря на  много различных определений маркетинга в них есть нечто общее, а именно?", 
  [
    new Answer("Приоритет производителя", 0),
    new Answer("Приоритет  потребителя", 1),
    new Answer("Приоритет ситуации на рынке", 0)
  ]),

  new Question("Первый этап развития маркетинга характеризуется ", 
  [
    new Answer("Проблемами организации производства товарной продукции;", 0),
    new Answer("Нализом поведения социальных групп в процессе купли продажи товаров", 0),
    new Answer("Проблемами реализации товарной продукции, включая организацию рекламных кампаний", 1)
  ]),

  new Question("Рекламный Маркетинг – это?", 
  [
    new Answer("Это деятельность по организации и управлению рынка рекламы, с целью удовлетворения потребностей рекламной деятельности в эффективном влиянии на целевую аудиторию с помощью рекламных средств", 1),
    new Answer("Это целенаправленная позиция рекламодателя совместно с рекламораспространителями и рекламопроизводителями по регулированию рыночной устойчивости предприятия по средствам", 0),
    new Answer("Нет правильного ответа", 0)
  ]),

  new Question("Основная  цель  рекламной деятельности – это?", 
  [
    new Answer("Анализы планирования управления спросом", 0),
    new Answer("Разработка концепций и производства рекламы в компании", 0),
    new Answer("Обеспечение эффективного взоимодействия рекламодателя с потребителями", 1)
  ]),

  new Question("Основной принцип концепций отношений в рекламе", 
  [
    new Answer("Формирование долгосрочных отношений со всеми участниками потребительской цепочки", 1),
    new Answer("Удовлетворение интересов потребителя с точки зрения полноты и достоверности информации в рекламе", 0),
    new Answer("Нет правильного ответа", 0)
  ]),
new Question("Управление рекламной деятельностью – это?", 
  [
    new Answer("Повышение  адресности предприятия в рекламе для достижения малых целевых групп", 0),
    new Answer("Это  целенаправленная позиция рекламодателя совместно с рекламораспространителями и рекламопроизводителями по регулированию рыночной устойчивости предприятия по средствам", 1),
    new Answer("Оба варианта верны", 0)
  ]),
  new Question("Продвижение товаров и услуг на рынке представляет собой", 
  [
    new Answer("Любую форму сообщений, с помощью которых фирма информирует, убеждает, напоминает о своей деятельности / товарах / услугах / о себе в целом", 1),
    new Answer("Создание  запасов изделий и продвижение их от места производства к месту назначения", 0),
    new Answer("Средство , стимулирующее сбыт товаров в сфере торговли", 0)
  ]),
  new Question("Цели (задачи) деятельности фирм и цели маркетинга", 
  [
    new Answer("Совершенно идентичны", 0), 
    new Answer("Тесно  взаимосвязаны и соотносятся друг с другом как предмет и метод", 1),
    new Answer("Совершенно  не связаны", 0)
  ]),
  new Question("Маркетинговая среда фирмы складывается", 
  [
    new Answer("Из руководства фирмы", 0),
    new Answer("Из сотрудников службы маркетинга фирмы", 1),
    new Answer("Из активных сил и субъектов, действующих за пределами фирмы и неподдающихся непосредственному контролю с ее стороны", 1)
  ]),
  new Question("Использованием каких композиций в оформлении витрины достигается эффект динамичности и легкости?", 
  [
    new Answer("Дугообразные и веерные ", 0),
    new Answer("Диагональные и комбинированные", 1),
    new Answer("Горизонтальные", 0)
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

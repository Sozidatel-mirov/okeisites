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
const questions = [
  new Question("Какой вид графики существует из приведенных ниже?",
  [
    new Answer("Сегментная", 0),
    new Answer("Угловая", 0),
    new Answer("Фактическая", 0),
    new Answer("Колоритная", 0),
    new Answer("Станковая", 1)
  ]),

  new Question("Где применяют трехмерную графику (изображение)?",
  [
    new Answer("Кулинарии,общепитах", 0),
    new Answer("Торговли", 0),
    new Answer("Науке и промышленности, компьютерных играх, медицине", 1)
  ]),
  new Question("Программные обеспечения, позволяющие создавать трёхмерную графику это",
  [
    new Answer("Кулинарии,общепитах", 0),
    new Answer("Торговли", 0),
    new Answer("Программные обеспечения, позволяющие создавать трёхмерную графику это…", 0),
    new Answer("⦁	Blender Foundation Blender, Side Effects Software Houdini_", 1)
  ]),

  new Question("На этом этапе математическая (векторная) пространственная модель превращается в плоскую (растровую) картинку?",
  [
    new Answer("Алгоритмирование", 0),
    new Answer("Текстурирование", 1),
    new Answer("Моделирование", 0),
    new Answer("Рендеринг", 0)
  ]),

  new Question("Дайте определение термину Моделирование.",
  [
    new Answer("Назначение поверхностям моделей растровых или процедурных текстур", 0),
    new Answer("Установка и настройка источников света", 0),
    new Answer("Создание трёхмерной математической модели сцены и объектов в ней", 1),
    new Answer("Вывод полученного изображения на устройство вывода - дисплей или принтер", 0)
  ]),

  new Question("Что такое рендеринг?",
  [
    new Answer("Трёхмерные или стереоскопические дисплеи", 0),
    new Answer("Установка и настройка источников света", 0),
    new Answer("Построение проекции в соответствии с выбранной физической моделью", 1),
    new Answer("Вывод полученного изображения на устройство вывода - дисплей", 0)
  ]),

  new Question("К числу математических моделей относится",
  [
    new Answer("Формула корней квадратного уравнения", 1),
    new Answer("Правила дорожного движения", 0),
    new Answer("Кулинарный рецепт", 0),
    new Answer("Милицейский протокол", 0)
  ]),

  new Question("Какой инструмент используется для создания плавных переходов между цветами в растровой графике?",
  [
    new Answer("Волшебная палочка", 0),
    new Answer("Градиент", 1),
    new Answer("Эйрбраш", 0),
    new Answer("Овал", 0)
  ]),

  new Question("Каким образом можно управлять цветами в растровом изображении?",
  [
    new Answer("Слои", 0),
    new Answer("Карандаш", 0),
    new Answer("Цветовая палитра", 1),
    new Answer("Волшебная палочка", 0)
  ]),

  new Question("Какой формат лучше всего подходит для изображений, содержащих много цветов и деталей при минимальных потерях качества?",
  [
    new Answer("JPEG", 0),
    new Answer("GIF", 0),
    new Answer("BMP", 0),
    new Answer("PNG", 1)
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

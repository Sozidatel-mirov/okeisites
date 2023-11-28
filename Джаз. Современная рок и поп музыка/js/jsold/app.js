const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const nextButton = document.getElementById("nextButton");
let timeMinute;
let timeSecond;

// Добавляем обработчик события click
nextButton.addEventListener("click", function () {
  // Вызываем функцию Next() из объекта quiz

  quiz.Next();
  quiz.current--;

  // Обновляем содержимое страницы
  Update();
});

//Класс, который представляет сам тест
class Quiz {
  constructor(type, questions, results) {
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

  Click(index) {
    //Добавляем очки
    let value = this.questions[this.current].Click(index);
    this.score += value;

    let correct = -1;

    //Если было добавлено хотя одно очко, то считаем, что ответ верный
    if (value >= 1) {
      correct = index;
    }
    else {
      //Иначе ищем, какой ответ может быть правильным
      for (let i = 0; i < this.questions[this.current].answers.length; i++) {
        if (this.questions[this.current].answers[i].value >= 1) {
          correct = i;
          break;
        }
      }
    }

    this.Next();

    return correct;
  }

  //Переход к следующему вопросу
  Next() {
    this.current++;

    if (this.current >= this.questions.length) {
      this.End();
    }

  }

  //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
  End() {
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].Check(this.score)) {
        this.result = i;
      }
    }
  }
}

//Класс, представляющий вопрос
class Question {
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
  }

  Click(index) {
    return this.answers[index].value;
  }
}

//Класс, представляющий ответ
class Answer {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
}

//Класс, представляющий результат
class Result {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }

  //Этот метод проверяет, достаточно ли очков набрал пользователь
  Check(value) {
    if (this.value <= value) {
      return true;
    }
    else {
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
    new Question(
      "Композиция «What’d I Say» записана в 1959 году. Кто ее исполнял?",
      [
        new Answer("Рэя Чарльза", 1),
        new Answer("Луи Армстронгом", 0),
        new Answer("Фрэнка Синатры", 0),
        new Answer("Дюком Эллингтоном", 0)
      ]),
    new Question(
      "Композиция «New York, New York» написана в 1977 году. Исполнялась выдающимся американским певцом Френка Синатрой. Кто был композитором?",
      [
        new Answer("Рэя Чарльза", 0),
        new Answer("Джонам Кандером", 1),
        new Answer("Луи Армстронгом", 0),
        new Answer("Дюком Эллингтоном", 0)
      ]),
    new Question(
      "Основной инструмент в поп музыке...",
      [
        new Answer("Гитара", 0),
        new Answer("Человеческий голос", 1),
        new Answer("Ударная партия", 0),
        new Answer("Саксофон", 0)
      ]),
    new Question(
      "Какой жанр поп музыки исполнитери считают 'проверенным'? Или какой жанр входит в понятие поп музыка?",
      [
        new Answer("Диско", 1),
        new Answer("Электро", 0),
        new Answer("Хард рок", 0),
        new Answer("Поп рок", 0)
      ]),
    new Question(
      "Выберите правильное понятие для термина 'синти-поп'",
      [
        new Answer("был самым популярным жанром танцевальной поп-музыки. Ему присуще обилие эффектов, ведущая роль ритм-секции ударных и баса, а также второстепенное, фоновое звучание струнных и духовых инструментов", 0),
        new Answer("Один из танцевальных жанров, которому присущи четко выделенные доминирующие над всеми остальными инструментами ударники, низкая мелодичность, «неряшливый» пульсирующий ритм и кричащий вокал.", 0),
        new Answer("включает в себя большую часть оригинального звука и идей панк-рока, но в то же время более сложная в музыке и текстах.", 0),
        new Answer("жанр музыки, в котором синтезатор является доминирующим инструментом.", 1)
      ]),
    new Question(
      "Выберите правильное понятие для термина 'new wave'",
      [
        new Answer("был самым популярным жанром танцевальной поп-музыки. Ему присуще обилие эффектов, ведущая роль ритм-секции ударных и баса, а также второстепенное, фоновое звучание струнных и духовых инструментов", 0),
        new Answer("Один из танцевальных жанров, которому присущи четко выделенные доминирующие над всеми остальными инструментами ударники, низкая мелодичность, «неряшливый» пульсирующий ритм и кричащий вокал.", 0),
        new Answer("характеризуют: короткие песни энергичного ритма, зачастую аранжированные с обильным использованием синтезаторов при сохранении жёсткого звучания гитар.", 1),
        new Answer("жанр музыки, в котором синтезатор является доминирующим инструментом.", 0)
      ]),
    new Question(
      "Рок - это",
      [
        new Answer("музыка протеста против общества, власти или чего-то другого - музыка контркультур.", 1),
        new Answer("общедоступная музыка, музыка массовых жанров.", 0),
        new Answer("направление в музыке, которое возникло в США в самом начале XX века.", 0),
        new Answer("один из танцевальных жанров, которому присущи четко выделенные доминирующие над всеми остальными инструментами ударники, низкая мелодичность, «неряшливый» пульсирующий ритм и кричащий вокал.", 0)
      ]),
    new Question(
      "В каком из стилей жанра поп встречается предельная синкопированность партий всех инструментов?",
      [
        new Answer("Диско", 0),
        new Answer("Транс, техно и хаус", 0),
        new Answer("New Wave", 0),
        new Answer("Фанк", 1)
      ]),
    new Question(
      "В каком из стилей жанра рок встречается мощная ритм секция над остальными инструментами??",
      [
        new Answer("Диско", 0),
        new Answer("Транс, техно и хаус", 0),
        new Answer("Поп-рок", 0),
        new Answer("Хард-рок", 1)
      ]),
    new Question(
      "Фолк-рок - это...",
      [
        new Answer("Характеризуется центральной ролью соло-гитариста и композициями, построенными на рифах (основа мелодии, многократно повторяющаяся, по которой узнается песня. Остинато - ритмическая/мелодическая фигура гармонического оборота которая многократно повторяется).", 0),
        new Answer("Этот стиль отличается хорошей сбалансированностью, использованием всевозможных эффектов и популярных аранжировок.", 0),
        new Answer("музыкальный жанр, сочетающий элементы фольклорной и рок-музыки.", 1),
        new Answer("К этому жанру причисляется грубая, часто непрофессиональная, но выразительная музыка, для которой характерны простые, незатейливые, но шокирующие мелодии.", 0)
      ]),
  ];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update() {
  //Проверяем, есть ли ещё вопросы
  if (quiz.current < quiz.questions.length) {
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
    for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
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
  else {//Если это конец, то выводим результат

  }
}

function Init() {
  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  for (let i = 0; i < btns.length; i++) {
    //Прикрепляем событие для каждой отдельной кнопки
    //При нажатии на кнопку будет вызываться функция Click()
    btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
  }
}

function Click(index) {
  //Получаем номер правильного ответа
  let correct = quiz.Click(index);

  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  //Делаем кнопки серыми
  for (let i = 0; i < btns.length; i++) {
    btns[i].className = "button button_passive";
    btns[i].disabled = "disabled";
  }

  //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
  if (quiz.type == 1) {
    if (correct >= 0) {
      btns[correct].className = "button button_correct";
    }

    if (index != correct) {
      btns[index].className = "button button_wrong";
    }
  }
  else {
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
window.onload = function () {
  updateTimer();
};

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
    new Question("Сведение музыки - это...",
      [
        new Answer("многозначное понятие, характеризующее роды и виды музыкального творчества в связи с их происхождением, условиями исполнения и восприятием.", 0),
        new Answer("камерное вокальное произведение для голоса с инструментальным сопровождением.", 0),
        new Answer("стадия создания из отдельных записанных треков конечной записи, следующий после звукозаписи этап создания фонограммы, заключающийся в отборе и редактировании исходных записанных треков, объединении их в единый проект и обработке эффектами.", 1),
        new Answer("совокупность элементов речи, музыки, шумовых спецэффектов, которые посредством ассоциаций в обобщенном виде создают представление о явлении, материальном объекте, характере человека, историческом событии и т.п.", 0)
      ]),
    new Question("Музыкальный жанр - это...",
      [
        new Answer("совокупность элементов речи, музыки, шумовых спецэффектов, которые посредством ассоциаций в обобщенном виде создают представление о явлении, материальном объекте, характере человека, историческом событии и т.п.", 0),
        new Answer("многозначное понятие, характеризующее роды и виды музыкального творчества в связи с их происхождением, условиями исполнения и восприятием.", 1),
        new Answer("стадия создания из отдельных записанных треков конечной записи, следующий после звукозаписи этап создания фонограммы, заключающийся в отборе и редактировании исходных записанных треков, объединении их в единый проект и обработке эффектами.", 0),
        new Answer("живая история народной души, явленная в слове и переложенная на музыку.", 0)
      ]),
    new Question("Звуковой образ - это...",
      [
        new Answer("стадия создания из отдельных записанных треков конечной записи, следующий после звукозаписи этап создания фонограммы, заключающийся в отборе и редактировании исходных записанных треков, объединении их в единый проект и обработке эффектами.", 0),
        new Answer("живая история народной души, явленная в слове и переложенная на музыку.", 0),
        new Answer("совокупность элементов речи, музыки, шумовых спецэффектов, которые посредством ассоциаций в обобщенном виде создают представление о явлении, материальном объекте, характере человека, историческом событии и т.п.", 1),
        new Answer("многозначное понятие, характеризующее роды и виды музыкального творчества в связи с их происхождением, условиями исполнения и восприятием.", 0)
      ]),
    new Question("Электронная музыка - это...",
      [
        new Answer("широкий музыкальный жанр, обозначающий музыку, созданную с использованием электронных музыкальных инструментов и технологий (чаще всего при помощи специальных компьютерных программ).", 1),
        new Answer("многозначное понятие, характеризующее роды и виды музыкального творчества в связи с их происхождением, условиями исполнения и восприятием.", 0),
        new Answer("совокупность элементов речи, музыки, шумовых спецэффектов, которые посредством ассоциаций в обобщенном виде создают представление о явлении, материальном объекте, характере человека, историческом событии и т.п.", 0),
        new Answer("стадия создания из отдельных записанных треков конечной записи, следующий после звукозаписи этап создания фонограммы, заключающийся в отборе и редактировании исходных записанных треков, объединении их в единый проект и обработке эффектами.", 0),
      ]),
    new Question("Чистый электронный звук получают, применяя такие инструменты как: .....",
      [
        new Answer("гитара, барабаны, саксофон", 0),
        new Answer("кларнет, габой, скрипка", 0),
        new Answer("терменвокс, синтезатор и компьютер", 1),
        new Answer("литавры, фортепиано, виолончель", 0)
      ]),
    new Question("В 1857 году французский издатель и книготорговец ..... запатентовал изобретенное им устройство — фоноавтограф.",
      [
        new Answer("Томас А. Эдисон", 0),
        new Answer("Эдуард Леон Скотт де Мартинвилль", 1),
        new Answer("Эмиль Берлинер", 0),
        new Answer("Ли де Форестон", 0)
      ]),
    new Question("В 1878 году американский изобретатель ..... запатентовал фонограф.",
      [
        new Answer("Томас А. Эдисон", 1),
        new Answer("Эдуард Леон Скотт де Мартинвилль", 0),
        new Answer("Эмиль Берлинер", 0),
        new Answer("Ли де Форестон", 0)
      ]),
    new Question("В 1887 году американский изобретатель ..... представил свое изобретение — дисковой фонограф.",
      [
        new Answer("Томас А. Эдисон", 0),
        new Answer("Эдуард Леон Скотт де Мартинвилль", 0),
        new Answer("Эмиль Берлинер", 1),
        new Answer("Ли де Форестон", 0)
      ]),
    new Question("Терменвокс был создан русским изобретателем ..... приблизительно в 1919—1920 году.",
      [
        new Answer("Томас А. Эдисон", 0),
        new Answer("Янис Ксенакис", 0),
        new Answer("Львом Термином", 1),
        new Answer("Николаем Обуховым", 0)
      ]),
    new Question("К ранним электронным инструментам так же относят: звуковой крест (фр. Croix Sonore), изобретенный в 1926-м году русским композитором ..., изобретенный французским музыкантом Морисом Мартено в период с 1919-го по 1928-й годы.",
      [
        new Answer("Николаем Обуховым, и Волны Мартено", 0),
        new Answer("Николаем Обуховым", 0),
        new Answer("Львом Термином", 1),
        new Answer("Янис Ксенакисом", 0)
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

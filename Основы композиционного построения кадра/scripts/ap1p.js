const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

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
	new Question("Что такое промежуточный кадр?? ", 
	[
		new Answer("Сцена с ключевым движением", 0),
		new Answer("Позиция, сделанная в сцене, которая находится между ключами и разбивающими", 1),
		new Answer("Кадр под определенным углом, обозначенным режиссером", 0),
		new Answer("Позиция,, которая находится в начале и в конце сцены", 0)
	]),

	new Question("“Кривая движения” это…", 
	[
		new Answer("Линия основной общей позы", 1),
		new Answer("Диаграмма ритма движения", 0),
		new Answer("Детальная прорисовка движения героя", 0),
		new Answer("“Быстрая” раскадровка", 0)
	]),

	new Question("Расчет количества рисунков, из которых состоит определенное действие это…", 
	[
		new Answer("План", 0),
		new Answer("Аниматик", 0),
		new Answer("Тайминг", 1),
		new Answer("Схема", 0)
	]),

	new Question("Напишите 4 вида плана:", 
	[
		new Answer("0", 1),
		new Answer("0", 0),
		new Answer("0", 0),
		new Answer("0", 0)
	]),

	new Question("Виды восприятия бывают:", 
	[
		new Answer("Объективные", 1),
		new Answer("Субъективные", 1),
		new Answer("Абстрактные", 0),
		new Answer("Прямые", 0)
	]),

	new Question("Первое, чему должен научится аниматор:", 
	[
		new Answer("Как выставлять сцену", 0),
		new Answer("Сценарное мастерство", 0),
		new Answer("Походка персонажа", 1),
		new Answer("Рисовать", 0)
	]),
	new Question("Ракурс это…", 
	[
		new Answer("Градус камеры, относительно сцены", 1),
		new Answer("Градус сцены, относительно камеры", 0),
		new Answer("Сцена, относительно градуса камеры", 0),
		new Answer("Градус камеры, относительно кадра", 0)
	]),
	new Question("Расположение персонажа в сцене:", 
	[
		new Answer("Расстановка", 0),
		new Answer("Мизансцена", 1),
		new Answer("Предсцена", 0),
		new Answer("Установка", 0)
	]),
	new Question("Техника, которую используют для того, чтобы подготовить зрителя к действию, которое вот-вот произойдет:", 
	[
		new Answer("Преддействие", 0),
		new Answer("Подготовка", 1),
		new Answer("Вотдейство", 0),
		new Answer("Вход", 0)
	]),
	new Question("Чем определяется уровень камеры:", 
	[
		new Answer("Градус сцены", 0),
		new Answer("Линия горизонта", 1),
		new Answer("Драматургия", 0),
		new Answer("Положение персонажа", 0)
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
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
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
	setTimeout(Update, 1000);
}

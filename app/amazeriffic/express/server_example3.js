var express = require("express"),
		bodyParser = require('body-parser'),
		http = require("http"),
		app = express();
var toDos = [
      { "description" : "Купить продукты", "tags" : [ "шопинг", "рутина" ] },
      { "description" : "Сделать несколько новых задач", "tags" : [ "писательство", "работа" ] },
      { "description" : "Подготовиться к лекции в понедельник", "tags" : [ "работа", "преподавание" ] },
      { "description" : "Ответить на электронные письма", "tags" : [ "работа" ] },
      { "description" : "Вывести Грейси на прогулку в парк", "tags" : [ "рутина", "питомцы" ] },
      { "description" : "Закончить писать книгу", "tags" : [ "писательство", "работа" ] }
    ];

// определяем путь к статической папке, создаем сервер на порту 3000
app.use(express.static("../client"));
http.createServer(app).listen(3000);

// настроим маршруты GET
app.get("/hello", function (req, res) {res.send("Hello, World!");});
app.get("/goodbye", function (req, res) {res.send("Goodbye, World!");});
app.get("/todos.json", function (req, res) {res.json(toDos);});

// настроим маршруты POST
// приём от клиента объекта JSON, его обработка, сохранение и отклик клиенту 
app.use(bodyParser.urlencoded({ extended: false })); // выбираем кодировку для перобразования JSON в javaScript
app.post("/todos", function (req, res) { // принимаем сообщение
	var newToDo = req.body;
  console.log(newToDo);
  toDos.push(newToDo); // добавляем принятый объект в хранилище
  res.json({"message":"Сервер:Вы разместили данные на сервере! сервер отвечает клиенту в формате json"}); // отвечаем клиенту
});

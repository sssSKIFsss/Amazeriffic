// JavaScript Document

/* проверка корректности вводимой информациис на пятой вкладке
var main = function () {
 "use strict";
 var addCommentFromInputBox = function () {
  if ($(".comment-input input").val() !== "") {
   var new_comment = $("<p>").text($(".comment-input input").val());
   // что бы результат отображался плавно, сначала скрываем строку
   // а затем ее проявляем функцией fadeIn()
   new_comment.hide();
   $(".comments").append(new_comment);
   new_comment.fadeIn();
   $(".comment-input input").val("");
  }
 };

 // обрабатываем клик на кнопке как окончание ввода текста в поле <input>
 $(".comment-input button").on("click", function (event){ addCommentFromInputBox(); });

// обрабатываем нажатие клавиши Enter как окончание ввода текста в поле <input>
 $(".comment-input input").on("keypress", function (event) {
  // если нажата клавиша Enter, то выполняем отображение коммента
  if (event.keyCode === 13) addCommentFromInputBox();
 });
};
*/

//------------------------------------------------------------------------------------------------------------
// определяется ф-ция обработки клика на закладки: сначала приводится к удобному виду данные toDoObjects,   
// затем этими данными заполняются страницы
//------------------------------------------------------------------------------------------------------------
var main = function (toDoObjects) {
  "use strict";
  
  // ф-ция map делает итеррацию по всему массиву объектов и возвращает параметр description
  // (описание задачи) без тегов
  var toDos = toDoObjects.map(function (toDo) { return toDo.description; });
  
  // определение ф-ции-обработчика клика по закладке
  $(".tabs span").toArray().forEach(function (element) {
    $(element).on("click", function () {
      // поскольку мы используем версию элемента jQuery,
      // нужно создать временную переменную,
      // чтобы избежать постоянного обновления массива "element" в элемент jQerry "$(element)"  
      var $content, $element = $(element);      
      // делаем все вкладки неактивными
      $(".tabs span").removeClass("active");
      // делаем активной первую вкладку
      $element.addClass("active");
      // очищаем основное содержание, чтобы переопределить его
      $("main .content").empty();
	  // заполняем информацией первые четыре вкладки
	  // и принимаем данные с пятой вкладки
      if ($element.parent().is(":nth-child(1)")) { 
	    $content = $("<aside>");
	    $content.append($("<h2>").text("Amazeriffic изменит вашу жизнь!"));
	    $content.append($("<p>").text("Любя, съешь щипцы, — вздохнёт мэр, — кайф жгуч. Шеф взъярён тчк щипцы с эхом гудбай Жюль. Эй, жлоб! Где туз? Прячь юных съёмщиц в шкаф. Экс-граф? Плюш изъят. Бьём чуждый цен хвощ! Эх, чужак!")); 
	    $content.append($("<h3>").text("Почему вам нужен Amazeriffic?"));
	    var $ul = $("<ul>");
	    $ul.append($("<li>").text("Он легко впишется в вашу жизнь!"));
	    $ul.append($("<li>").text("Он классный!"));
	    $ul.append($("<li>").text("Он перевернет ваш мир!"));
	    $content.append($ul);
	    $("main .content").append($content);    
      } 
	  else if ($element.parent().is(":nth-child(2)")) {
	    $content = $("<ul>");
	    for(var i=toDos.length-1; i>=0; i--) { $content.append($("<li>").text(toDos[i])); }
	    $("main .content").append($content);
	  } 
	  else if ($element.parent().is(":nth-child(3)")) { 
	    $content = $("<ul>");
	    toDos.forEach(function(todo) { $content.append($("<li>").text(todo)); });
    	$("main .content").append($content);
      } 
	  else if ($element.parent().is(":nth-child(4)")) {
	    // ф-ция получает объект, содержащий задачи и массив тегов к каждой  
	    // и преобразует в объект, содержащий теги и массив задач к каждому
    	var organizeByTag = function (toDoObjects) {
		  /* --- забиваем массив tags[] тегами из toDoObjects --- */
	      /* --- следим, что бы теги в миссиве были уникальными --- */
	      // создание пустого массива для тегов
	      var tags = [];
	      // перебираем все задачи toDos
	      toDoObjects.forEach(function (toDo) {
		    // перебираем все теги для каждой задачи
		    toDo.tags.forEach(function (tag) {
		      // убеждаемся, что этого тега еще нет в массиве
		      if (tags.indexOf(tag) === -1) { tags.push(tag); }
		    });
	      });
	  
	      /* --- маппируем массив tag[], добавляю к каждому  --- */
	      /* --- его элементу массив задач toDoWithTagp[] --- */
	      var tagObjects = tags.map(function (tag) {
		    // здесь мы находим все задачи, содержащие этот тег
		    var toDosWithTag = [];
		    toDoObjects.forEach(function (toDo) {
		      // проверка, что результат indexOf is *не* равен -1
		      if (toDo.tags.indexOf(tag) !== -1) { toDosWithTag.push(toDo.description); }
		    });
		    // мы связываем каждый тег с объектом, который
		    // содержит название тега и массив
		    return { "name": tag, "toDos": toDosWithTag };
	      });
	      return tagObjects;
	    };
    	var organizedByTag = organizeByTag(toDoObjects);
    	organizedByTag.forEach(function (tag) {
	      var $tagName = $("<h3>").text(tag.name), $content = $("<ul>");
	      tag.toDos.forEach(function (description) {
	        var $li = $("<li>").text(description);
	        $content.append($li);
	      });
	      $("main .content").append($tagName);
	      $("main .content").append($content);
	    });
      } 
	  else if ($element.parent().is(":nth-child(5)")) {
	    var $input = $("<input>").addClass("description"),
		$inputLabel = $("<p>").text("Задача:"),
		$tagInput = $("<input>").addClass("tags"),
		$tagLabel = $("<p>").text("Область деятельности (через запятую): "),
		$button = $("<button>").text("+");
	    $button.on("click", function () {
	      var description = $input.val(),
		  // разделение в соответствии с запятыми
		  tags = $tagInput.val().split(",");
	      toDoObjects.push({"description":description, "tags":tags});
	      // обновление toDos
	      toDos = toDoObjects.map(function (toDo) { return toDo.description; });
	      $input.val("");
	      $tagInput.val("");
	    });
    	$content = $("<div>").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
	    $("main .content").append($content);
      }
      // возвращается false, так как мы не переходим по ссылке
      return false;
    });
  });
  // имитируем клик на первую вкладку, что бы отобразить ее при первоначальной загрузке
  $(".tabs a:first-child span").trigger("click");
};


//------------------------------------------------------------------------------------------------------------
// Стартер - вызывается после загрузки документа 
// считываются данные с файла todos.json после чего вызыватеся ф-ция main(toDoObjects)
//------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
  // читаем файл todos.json и передаем прочитанное в ф-цию main
  $.getJSON("todos.json", function (toDoObjects) { main(toDoObjects); });
});

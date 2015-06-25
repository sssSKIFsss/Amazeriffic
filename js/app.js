// JavaScript Document
/*
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

var main = function () {
 "use strict";
 var toDos = ["Закончить писать эту книгу", "Вывести Грейси на прогулку в парк", "Ответить на электронные письма",
 "Подготовиться к лекции в понедельник", "Обновить несколько новых задач", "Купить продукты"];
 
 $(".tabs span").toArray().forEach(function (element) {
  // создаем обработчик щелчков для этого элемента
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
    for(var i=toDos.length-1; i>=0; i--) {
     $content.append($("<li>").text(toDos[i]));    
    }
    $("main .content").append($content);
   }
   else if ($element.parent().is(":nth-child(3)")) { 
    $content = $("<ul>");
    toDos.forEach(function(todo) {
     $content.append($("<li>").text(todo));    
    });
    $("main .content").append($content);
   }
   else if ($element.parent().is(":nth-child(4)")) { console.log("Щелчок на 4 вкладке!"); }
   // возвращается false, так как мы не переходим по ссылке
   return false;
  });
 });
 // имитируем клик на первую вкладку, что бы отобразить ее при первоначальной загрузке
 $(".tabs a:first-child span").trigger("click");
};
























$(document).ready(main);


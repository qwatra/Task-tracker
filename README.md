TaskTracker
=======

Простой менеджер-задач написанный на reactjs+redux.  

Основные возможности:
---------------------
1. Список задач пользователя, представляется в табличном виде, с возможностью сортировки списка, фильтрации (по статусам) и смены представления (подробный/краткий вид/scrum доска).
2. При клике на задачу открывается страница с подробной информацией о задаче - название, описание, дата, приоритет, планируемое и затраченное время, статус выполнения.
3. Можно менять планируемое время на выполнение задачи и ее статус, а также время, затраченное на выполнение.
4. Можно добавлять задачу.
5. Scrum доска. Таблица, представленная в виде трех колонок - План, В процессе, Готово. Имеется возможность перемещение задач в таблице с помощью механизма drag&drop

Запуск
-----------
    npm install
    npm run start

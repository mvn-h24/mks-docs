---
title: Резервное копирование
---


## Регулярное копирование БД и статических данных.

Для сохранности данных в базе данных и статического контента (фотографий и документов клиентов) рекомендуется настроить регулярное копирование сначала в локальную директорию, а потом на удаленный сервер.

Cron-задача для регулярного резервного копирования БД и статических данных
```bash
0 5	 * * *  root	docker stop mks-app && mysqldump MYSQL_DATABASE -uMYSQL_USER -pMYSQL_PASSWORD -h127.0.0.1 --port MYSQL_PORT > /PATH/TO/BACKUP/DIRECTORY/mks-dbbackup-`date +\%Y\%m\%d`.sql && docker start mks-app
10 5 * * 6	root	mkdir /PATH/TO/BACKUP/DIRECTORY/`date +\%Y\%m\%d` && cp -r /PATH/TO/MKS/mks/shared/homeless/web/uploads/ /PATH/TO/BACKUP/DIRECTORY/`date +\%Y\%m\%d`
```

## Восстановление из резервной копии

Если возникли проблемы с базой данных, необходимо в mysql выгрузить последний дамп БД:

```bash
mysql MYSQL_DATABASE -uMYSQL_USER -pMYSQL_PASSWORD -h127.0.0.1 --port MYSQL_PORT < dump.sql
#Параметры MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_PORT необходимо поменять не те, которые указаны в файле, а dump.sql - на имя файла с последним дампом базы данных
```


и пройти все шаги начиная с 9 (см. [руководство](./update.md) по обновлению) 


Если не хватает каких-то данных (фотографий, документов) или к ним нет доступа, необходимо проверить, что на директорию со статическими данными `shared/homeless/web/uploads/` выставлены правильные права:

```bash
сhown -R USER:USER ~/shared/homeless/web/uploads/
#вместо USER нужно указать имя пользователя, от имени которого запускается МКС
```
Если после этого не хватает каких-либо файлов, необходимо скопировать их из директории, в которую регулярно сохраняются копии статических данных.



---
title: Установка
---


# Руководство по установке

::: warning
Если вы хотите установить “МКС”: 
1. разворачивая систему на вашем сервере, пожалуйста, не забудьте позаботиться о защите персональных данных ваших клиентов и сотрудников.
2. Пожалуйста, заполните небольшую [анкету](https://goo.gl/forms/YjhAaqSaxAvxMKoE3)
:::

::: warning
**Нельзя удалять папку с проектом `.mks/` после запуска сервера** 
:::

::: info
МКС устанавливается на ОС Linux (желательно использовать Ubuntu 18+).
Перед началом установки МКС необходимо установить docker и docker-compose, если они не были установлены до этого.
:::


## Подготовка системы

```bash
# удаляем старый docker, если есть (нужен Community Edition)

sudo apt-get purge docker docker-engine docker.io

# обновляем индекс пакетов
sudo apt-get update

# устанавливаем необходимые пакеты
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

# добавляем официальный GPG ключ, чтобы менеджер пакетов знал о нужном нам репозитории
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# добавляем репозиторий со стабильной версией к списку пакетов:
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# опять обновляем индекс пакетов
sudo apt-get update

# устанавливаем непосредственно docker
sudo apt-get install docker-ce

# кроме того необходимо установаить docker-compose для запуска проектов
# скачиваем его
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

# делаем docker-compose исполняемым
sudo chmod +x /usr/local/bin/docker-compose

```

Перед установкой прочитайте [руковоство](./security.md) по защите данных.
См. также [видео](https://youtu.be/-kkOCI2BgLs) на youtube с демонстрацией всех шагов установки МКС. 


## Шаги установки

1. Склонируйте репозиторий проекта:
```bash
git clone https://github.com/nochlezhka/mks.git
```
2. После клонирования перейдите в каталог проекта:
```bash
cd mks
```

3. Создайте локальные копии файлов `docker-compose.yml.dist` и `.env.dist`:
```bash
cp docker-compose.yml.dist docker-compose.yml
cp .env.dist .env
cp shared/homeless/app/config/parameters.yml.dist shared/homeless/app/config/parameters.yml
```
::: info
 Обязательно нужно поменять параметры подключения к БД в файле `.env`, в корне проекта: 
```dotenv
MYSQL_PASSWORD = MYSQL_ENV_PASSWORD_HERE
MYSQL_ROOT_PASSWORD = MYSQL_ENV_ROOT_PASSWORD_HERE
```    
в файле
`shared/homeless/app/config/parameters.yml`, необходимо установить значение свойства `database_password`
аналогичным `MYSQL_PASSWORD` в `.env` файле.
:::
   

4. Запустите сборку контейнеров:
```bash
docker-compose build
```
    
5. Для успешного запуска приложения необходимо установить права на директорию:
```bash
docker-compose exec php chown -R www-data:www-data /var/www/symfony/
```

6. запуск, после успешного окончания сборки:
```bash
docker-compose up -d
```

7. Подсоединитесь к контейнеру с symfony-приложением:
```bash
sh ./docker/docker/docker-symfony
```

8. С помощью `composer` установите необходимые библиотеки, затем укажите параметры подключения к БД:
```bash
composer install
```

9.  Запустите миграцию для создания первоначальной структуры базы данных и заполнения данными: 
```bash
./app/console doctrine:migrations:migrate
```

10. Сгенерируйте необходимые assets:
```bash
./app/console fos:js-routing:dump
./app/console assets:install --symlink
./app/console assetic:dump
```
<!--@TODO: change last step if host already on 80:80 -->
11.  Cайт должен быть доступен по адресу localhost или 127.0.0.1 в браузере. залогиньтесь с доступом `admin/password`.
    - При желании можете поменять пароль для входа в систему
    ```bash
    ./app/console fos:user:change-password admin
    ```

12. Настройте учетную запись для своей организации, внеся изменения в файл:
```bash
.mks/shared/homeless/app/config/parameters.yml
 ```

13. Замените логотип в 2 папках:
```bash
.mks/shared/homeless/web/render/
.mks/shared/homeless/app/Resources/img/
 ```
 
14. Почистите кэш:
```bash
./docker/docker/docker-symfony
./app/console cache:clear --env=prod
```

<!--@TODO: define requirements for foto -->
Вы великолепны.
<!-- Seriously if they can install MKS using our guideline, i'm impressed -->

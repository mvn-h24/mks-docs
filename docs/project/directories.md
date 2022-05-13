---
title: Структура директорий
---

# Структура директорий проекта

## Директории

- `docker` - директория, в которой хранятся Dockerfile основных образов (mailhog, node, php, nginx)
  - `docker/docker` скрипты входа в docker-контейнеры.

- `shared` - директория, в которой хранятся склонированные репозитории.

## Конфигурационные файлы

- `.env` - переменные окружения, в основном используется для конфигурации первоначальной сборки проекта.

- `docker-compose.yml` - https://docs.docker.com/compose/compose-file/compose-file-v2/

- `shared/homeless/app/config/parameters.yml` - https://symfony.com/doc/current/service_container/parameters.html


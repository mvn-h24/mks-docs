import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    repo: 'https://github.com/nochlezhka/mks',
    sidebar: [
      {
        link:'/intro.html',
        text:'Вступление'
      },
      {
        link:'/info/index.html',
        text:'Общая информация',
        collapsable: true,
        children:[
          {
            link:'/info/tech-stack.html',
            text:'Технологический стек'
          },
          {
            link:'/info/sys-reqs.html',
            text:'Системные требования'
          },
          {
            link:'/info/faq.html',
            text:'Часто задаваемые вопросы'
          },
          
        ]
      },
      {
        link:'/guides/index.html',
        text:'Руководства',
        collapsable: true,
        children:[
          {
            link:'/guides/install.html',
            text:'Установка'
          },
          {
            link:'/guides/dumps.html',
            text:'Резервное копирование'
          },
          {
            link:'/guides/update.html',
            text:'Обновление живой версии'
          },
          {
            link:'/guides/security.html',
            text:'Безопасность'
          },
          {
            link:'/guides/notices.html',
            text:'Важные заметки'
          },
        ]
      },
      {
        link:'/project/index.html',
        text:'МКС',
        collapsable: true,
        children:[
          {
            link:'/project/directories.html',
            text:'Структура директорий'
          },
          
        ]
      },
    ],
  },
  lang:'ru-RU',
  title:'МКС - CRM',
  description:'CRM-система для организации сопровождения клиентов и учета оказанных услуг, а также для сбора статистики. Проект благотворительной организации "Ночлежка"'
})
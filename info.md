== Основые понятия

* npm - это стандартный менеджер пакетов, используется для скачивания пакетов из облачного сервера npm.
  - package.json содержит в себе информацию приложении: название, версия, зависимости и тд.
  - webpack.config.js экспортируем из package js объект, который будет конфигурацией 

* Загрузчики - принимают содержимое файлов, а затем преобразуют его необходимым образом и включают результат преобразования в общую сборку.

* Загрузка режимов
   -  "start": "cross-env NODE_ENV=development webpack"
    
   - "build": "cross-env NODE_ENV=production webpack --mode production"
   
 
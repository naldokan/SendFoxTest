1. Open terminal and go to "backend" folder
2. Run cli command "composer install"
3. Create .env file and set configuration of MySQL database. 
    Set values for DB_DATABASE, DB_USERNAME, DB_PASSWORD.
4. Create MySQL empty database whose name is DB_DATABASE
5. Run cli command "php artisan key:generate"
4. Run cli command "php artisan migrate"
5. Run cli command "php artisan serve"
6. Visit localhost:8000 on your browser.

Pagniation will be showen after you create more than 5 email templates.

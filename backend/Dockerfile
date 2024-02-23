FROM composer AS vendor

WORKDIR /var/www/html

COPY composer.json composer.lock ./

RUN composer install --no-dev \
                 --ignore-platform-reqs \
               --no-interaction \
               --no-plugins \
               --no-scripts \
               --prefer-dist

FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    libonig-dev \
    libzip-dev

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip

COPY --from=vendor /var/www/html .

EXPOSE 9000

CMD ["php-fpm"]

# 1 СТО Дніпро TIR

Статичний багатосторінковий сайт вантажного СТО у Дніпрі. Проєкт працює без збірки, фреймворків, Bootstrap, jQuery або npm-залежностей.

## Структура

- `index.html` - головна сторінка.
- `poslugy.html` - послуги вантажного СТО.
- `vyizdna-tehdopomoga.html` - виїзна технічна допомога.
- `rozbirka-daf.html` - розбірка DAF Euro 2 і уточнення запчастин.
- `pro-nas.html` - інформація про СТО.
- `kontakty.html` - контакти, карта, маршрут і канали зв'язку.
- `404.html` - сторінка помилки.
- `assets/css/` - стилі.
- `assets/js/` - конфігурація і поведінка сайту.
- `assets/images/` - фото та локальні графічні файли.
- `assets/images/brands/` - SVG-файли марок вантажівок.
- `assets/icons/` - favicon placeholder.
- `robots.txt`, `sitemap.xml`, `site.webmanifest` - SEO і технічні файли.

## Як відкрити локально

Відкрийте `index.html` у браузері. Для перевірки ES modules краще запустити простий локальний сервер у корені проєкту.

## Контактні канали

Сайт приймає звернення тільки через:

- телефон;
- Viber;
- Instagram Direct, якщо URL додано в конфігурацію.

Усі змінні дані винесені у `assets/js/config.js`:

```js
export const businessConfig = {
  name: "1 СТО Дніпро TIR",
  address: "вул. Верстова, 33, Дніпро",
  phones: [
    {
      label: "+380 63 409 89 03",
      href: "tel:+380634098903"
    },
    {
      label: "+380 97 821 34 58",
      href: "tel:+380978213458"
    }
  ],
  schedule: "Пн–Сб: 09:00–18:00",
  viberUrl: "viber://chat?number=%2B380634098903",
  instagramUrl: "",
  googleMapsUrl: ""
};
```

## Як додати Instagram

У `assets/js/config.js` задайте:

```js
instagramUrl: "https://www.instagram.com/..."
```

Якщо значення порожнє, усі Instagram-кнопки та картки автоматично приховані, а в макеті не залишається порожнього місця.

## Як додати Google Maps

У `assets/js/config.js` задайте точне посилання:

```js
googleMapsUrl: "https://maps.google.com/..."
```

Якщо значення порожнє, сайт формує пошукове посилання Google Maps за адресою `вул. Верстова, 33, Дніпро`.

## Логотипи марок

Поточні файли в `assets/images/brands/` є нейтральними SVG-placeholder і не є офіційними логотипами:

- `assets/images/brands/daf.svg`
- `assets/images/brands/man.svg`
- `assets/images/brands/volvo.svg`
- `assets/images/brands/iveco.svg`
- `assets/images/brands/scania.svg`

Коли клієнт надасть офіційні brand assets, замініть ці файли без зміни шляхів. Назви марок залишаються в `alt`, `aria-label` і SEO-тексті.

## Як замінити фотографії

Замініть файли в `assets/images/` на реальні фото СТО з такими самими іменами або оновіть `src` в HTML. Бажано підготувати WebP або AVIF, додати `width` і `height`, залишити `loading="lazy"` для некритичних фото.

Поточні зображення є тимчасовими placeholders і не містять реальних фото СТО.

## Конфіденційність

Окремої політики немає, бо сайт не має аналітики, cookies або вбудованого збору персональних даних. Комунікація відбувається через телефон, Viber та Instagram Direct.

## Розміщення на Cloudflare Pages

1. Завантажте репозиторій у GitHub.
2. У Cloudflare Pages створіть новий проєкт з цього репозиторію.
3. Build command залиште порожнім.
4. Output directory залиште `/` або корінь проєкту.
5. Після отримання домену оновіть `sitemap.xml`, `robots.txt`, canonical URL і Open Graph URL за потреби.

## Дані, які ще бажано отримати від клієнта

- Реальні фотографії ремонтної зони, території, техніки і запчастин.
- Точне посилання Google Maps або Google Business Profile.
- Посилання на Instagram, якщо сторінка існує.
- Офіційні SVG-логотипи марок.
- Юридичні реквізити, якщо їх потрібно додати на сайт.
- Підтверджені гарантійні умови для різних видів ремонту.
- Підтверджені правила роботи з юридичними особами і ПДВ.

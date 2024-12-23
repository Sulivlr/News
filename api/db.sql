create schema news collate utf8mb4_general_ci;
use news;

create table posts
(
    id         int auto_increment
        primary key,
    title      varchar(255)                       not null,
    text       text                               not null,
    image      varchar(255)                       null,
    created_at datetime default CURRENT_TIMESTAMP null
);

create table comments
(
    id      int auto_increment
        primary key,
    post_id int          not null,
    author  varchar(255) null,
    text    text         not null,
    constraint comments_posts_id_fk
        foreign key (post_id) references posts (id)
            on update cascade on delete cascade
);

insert into comments (id, post_id, author, text)
values  (9, 2, 'Sultan', 'This is second comment'),
        (18, 2, 'Sultan', 'This is second comment'),
        (22, 2, 'Sultan', 'This is second comment');


insert into posts (id, title, text, image, created_at)
values  (2, 'My second post', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'images/a40c5905-8826-4f1b-8950-eeabb37d2eaa.webp', '2024-12-21 13:43:08'),
        (3, 'Greate Title', 'Some text', 'images/7fae02b5-864f-4528-8c55-e071b628633d.jpg', '2024-12-21 17:47:39'),
        (4, 'something', 'alsdmlaksmdl;sad', 'images/c1f51e0b-81ca-4068-9462-88e80d9de819.jpg', '2024-12-21 17:48:05'),
        (5, 'asdnkalndkaj', 'askjndklsnadad', 'images/feab583a-fedc-4852-ad69-f37eef1f886e.png', '2024-12-21 17:50:15'),
        (6, 'отлстыфлвтлф', 'фывфвтфлтвф', 'images/392a1165-4ff6-4677-86bd-eacfe853e158.jpg', '2024-12-21 17:53:44'),
        (7, 'asdsada', 'lasdkandlsaknl;d', 'images/5698c024-fae8-420e-a2d5-8227996d4ca5.jpg', '2024-12-21 17:59:39'),
        (8, 'asdasd', 'asdsadad', 'images/6be46c39-2ee9-4535-86c9-8fb66253815a.webp', '2024-12-21 18:30:14'),
        (9, 'флытвытжфвфв', 'фьывтлдфтвьфтв', 'images/e9e54e7e-df56-48cb-8f37-c362ffbd24c0.jpg', '2024-12-21 18:33:55'),
        (10, 'asdaldnad', 'asdasdad', 'images/b340e113-a72a-4912-9ce7-ab6a5ceeff7a.png', '2024-12-21 18:39:14'),
        (11, 'asdaldnad', 'asdasdad', 'images/e323309b-66cf-4414-bff1-86060e56eba3.png', '2024-12-21 18:39:15'),
        (12, 'фывфвфв', 'фывыфвфв', 'images/b403a5c1-7346-490f-a5f9-9d0958d928d8.jpg', '2024-12-21 18:40:14'),
        (13, 'фывыфвф', 'фывыфвыфв', 'images/3a909e0c-e451-42b7-b2fc-f5b88c2c11cf.png', '2024-12-21 18:41:23'),
        (14, 'ыфвыфвф', 'ыфвфывф', 'images/6edf94c8-f131-405b-b032-e9c11366f457.webp', '2024-12-21 18:41:43'),
        (15, 'asdsada', 'asdsadad', 'images/e92c0ac6-9bb4-4fc7-bff6-ef61b4b8df14.jpg', '2024-12-21 18:43:47'),
        (16, 'sadsada', 'asdada', 'images/efc53894-f2d8-4711-b050-bda320a37089.jpg', '2024-12-21 18:44:51'),
        (17, 'sadsada', 'asdada', 'images/24698f40-4426-4227-a153-60086a323256.jpg', '2024-12-21 18:46:27'),
        (18, 'asdsad', 'asdsad', 'images/9391466e-9063-4ba1-88de-bba66f21f730.png', '2024-12-21 18:48:20'),
        (19, 'asdsad', 'asdasda', 'images/269778b5-b736-4f2b-a7ae-6ddada9691e8.png', '2024-12-21 18:50:38'),
        (20, 'ashjkdksad', 'askjdksajda', 'images/dff3e99f-5165-45bd-aa8c-638c8825fc5e.jpg', '2024-12-21 18:53:04');
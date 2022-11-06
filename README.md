# blog-api

This is an api for a Blog app

---

## Requirements

1. User should be able to sign up
2. User should be able to and sign in to the blog app with passport authentication strategy token which expires after 1 hour
3. Users should have a first_name, last_name, email, password when signing up and - email and password to sign in
4. Logged in and not logged in users should be able to get a list of published blogs created
5. Logged in and not logged in users should be able to to get a published blog
6. A blog can be in two states; draft and published
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs.
13. It should be filterable by state
14. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
15. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated,
    default it to 20 blogs per page.
16. It is also searchable by author, title and tags.
17. It is also orderable by read_count, reading_time and timestamp
18. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1

---

## Setup

- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm start`

---

## Base URL

- https://blogs-api-v1.onrender.com/

## Models

### User

| field      | data_type | constraints      |
| ---------- | --------- | ---------------- |
| email      | string    | required, unique |
| first_name | string    | required         |
| last_name  | string    | required         |
| password   | string    | required         |

### Blog

| field       | data_type | constraints                 |
| ----------- | --------- | --------------------------- |
| title       | string    | required , unique           |
| description | string    |                             |
| author      | String    | ref:'User'                  |
| state       | string    | enum: ['draft','published'] |
| tags        | string    |                             |
| body        | string    | required                    |

## APIs

### Signup User

- Route: /auth/signup
- Method: POST
- Body:

```
{
    "first_name": "Kachi",
    "last_name": "Ozoemena",
    "email": "Kachi@gmail.com",
    "password": "password",
}
```

- Responses

Success

```
{
  "user": {
    "first_name": "kachi",
    "last_name": "Ozoemena",
    "email": "kachi@gmail.com",
    "password": "$2b$10$n4DlouV0ucabGCXHQ5gKeeyPO/ar8Gyzygqf.3Qi3.fK8pfQD8WdG",
    "_id": "636678b7283f52463dde032f",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2Njc4YjcyODNmNTI0NjNkZGUwMzJmIiwiZW1haWwiOiJlcmlAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJlcmkgT2d1bnNleWUiLCJpYXQiOjE2Njc2NTk5NTksImV4cCI6MTY2ODI2NDc1OX0.JWDLGOAkCtIAKmd1nR6Yr4RPZCoz5fwZ3Xy3JEy5yA4",
  "message": "account succesfully created"
}


```

---

### Login User

- Route: auth/login
- Method: POST
- Body:

```
{
  "email": "kachi@gmail.com",
  "password": "password",
}
```

- Responses

Success

```
{
  "user": {
    "user": {
      "_id": "636678b7283f52463dde032f",
      "first_name": "kachi",
      "last_name": "Ozoemena",
      "email": "kachi@gmail.com",
      "password": "$2b$10$n4DlouV0ucabGCXHQ5gKeeyPO/ar8Gyzygqf.3Qi3.fK8pfQD8WdG",
      "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2Njc4YjcyODNmNTI0NjNkZGUwMzJmIiwiZW1haWwiOiJlcmlAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJlcmkgT2d1bnNleWUiLCJpYXQiOjE2Njc2NjAzNTEsImV4cCI6MTY2ODI2NTE1MX0.YDKr40xcVslPKOM_ZHSS9d-JmBvCVAGjfkQ0af_O26c"
  },
  "message": "Login successful"
}
```

## logged in and not logged in users routes

### Get published blogs

- Route: /blogs
- Method: GET
- Query params:
  - page (default: 1)
  - per_page (default: 20)
  - order_by (default: createdAt)
  - order_by ('read_count = 1' for asc, 'read_count = -1' for desc)
  - order_by ('reading_time = 1' for asc, 'reading_time = -1' for desc)
  - author
  - title
  - tags
- Responses

Success

```
{
 status: true,
 [
    "blog": {
    "_id": "636685f9e392c6cf8c087d6a",
    "title": "My first blog",
    "description": "null",
    "author": {
      "_id": "6364f7f02d071da00221cb76",
      "first_name": "logo",
      "last_name": "semilogo",
      "email": "logo@gmail.com",
      "__v": 0
    },
    "state": "published",
    "read_count": 1,
    "reading_time": "0.168",
    "tags": "new",
    "body": "Hi guys, welcome to my blog ",
    "createdAt": "2022-11-05T15:49:13.054Z",
    "updatedAt": "2022-11-05T15:49:43.984Z",
    "__v": 0
  }
 ]
}
```

---

### Get a published blog

- Route: /blogs/:id
- Method: GET
- Responses

Success

```

{
    "_id": "636685f9e392c6cf8c087d6a",
    "title": "My first blog",
    "description": "null",
    "author": {
        "_id": "6364f7f02d071da00221cb76",
        "first_name": "logo",
        "last_name": "semilogo",
        "email": "logo@gmail.com",
        "__v": 0
    },
    "state": "published",
    "read_count": 1,
    "reading_time": 0.168,
    "tags": "new",
    "body": "Hi guys, welcome to my blog ",
    "createdAt": "2022-11-05T15:49:13.054Z",
    "updatedAt": "2022-11-05T15:49:43.984Z",
    "__v": 0
}

```

## logged in users only

### Create a Blog (logged in users only )

- Route: /blogs
- Method: POST
- Header
  - Authorization: Bearer {token}
- Body:

```
{
"title":"React digest",
"description":"A comprehensive react blog",
"state":"draft",
"tags":"react",
"body":"Did you know you could use useState to update state?"
}
```

- Responses

Success

```
  {

    "title":"React digest",
    "description":"A comprehensive react blog",
    "state":"draft",
    "tags":"react",
    "body":"Did you know you could use useState to update state?"
    "author": "6364f7f02d071da00221cb76",
    "state": "published",
    "read_count": 0,
    "reading_time": 0.188,
    "_id": "63659f18d3e7a0b702d0cad9",
    "createdAt": "2022-11-04T23:24:08.768Z",
    "updatedAt": "2022-11-04T23:24:08.768Z",
    "__v": 0
  }

```


---

### Get all my blogs created by me (logged in users only )

- Route: /blogs/my_blogs
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Query params:
  - page (default: 1)
  - per_page (default: 5)
  - state (Draft, Published)
- Responses

Success

```
{
 status: true,
 blog:[
      {

    "title":"React digest",
    "description":"A comprehensive react blog",
    "state":"draft",
    "tags":"react",
    "body":"Did you know you could use useState to update state?"
    "author": "6364f7f02d071da00221cb76",
    "read_count": 0,
    "reading_time": 0.188,
    "_id": "63659f18d3e7a0b702d0cad9",
    "createdAt": "2022-11-04T23:24:08.768Z",
    "updatedAt": "2022-11-04T23:24:08.768Z",
    "__v": 0
  }
 ]
}
```


---

### update my blog (logged in users only )

- Route: /blogs/:id
- Method: patch
- Header
  - Authorization: Bearer {token}
- Body:

```
{
    "state": "Published"
}
```

- Responses

Success

```
{
    "title":"React digest",
    "description":"A comprehensive react blog",
    "state":"published",
    "tags":"react",
    "body":"Did you know you could use useState to update state?"
    "author": "6364f7f02d071da00221cb76",
    "read_count": 0,
    "reading_time": 0.188,
    "_id": "63659f18d3e7a0b702d0cad9",
    "createdAt": "2022-11-04T23:24:08.768Z",
    "updatedAt": "2022-11-04T23:24:08.768Z",
    "__v": 0
  }


```

---

### delete a blog (logged in users only )

- Route: blogs/:id
- Method: delete
- Header
  - Authorization: Bearer {token}
- Responses

Success

```
{
  "status": true,
  "blog": {
    "acknowledged": true,
    "deletedCount": 1
  }
}


```

---

...

## Sole Contributor
- Ozoemena Kachi

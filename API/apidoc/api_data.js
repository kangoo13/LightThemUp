define({ "api": [
  {
    "type": "get",
    "url": "/comments/lastComments/:nbComments",
    "title": "Request the last comments",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetLastComments",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nbComments",
            "description": "<p>Number of comments wanted.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "author",
            "description": "<p>Comment's author.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Comment's message.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Comment's type.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"author\": \"John\",\n  \"message\": \"Hey !\",\n  \"type\":  \"news\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/comments.js",
    "groupTitle": "Comment"
  },
  {
    "type": "delete",
    "url": "/contact/:idContact",
    "title": "Delete a contact form by id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "DeleteContactByid",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idContact",
            "description": "<p>Contact form id that you want to delete.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>authentification token is mandatory.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the contact.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the contact.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the contact.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "remoteIp",
            "description": "<p>Remote IP of the contact.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"584932b0ea6f19740c2faee8\",\n   \"updatedAt\": \"2016-12-08T10:15:12.000Z\",\n   \"createdAt\": \"2016-12-08T10:15:12.000Z\",\n   \"remoteIp\": \"::ffff:163.5.220.100\",\n   \"message\": \"peti test\",\n   \"email\": \"test@test.fr\",\n   \"name\": \"Tanguy\",\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The token is not valid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": \"false\",\n  \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/contact.js",
    "groupTitle": "Contact"
  },
  {
    "type": "get",
    "url": "/contact/",
    "title": "Get all contact forms",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "GetContact",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>authentification token is mandatory.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the contact.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the contact.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the contact.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "remoteIp",
            "description": "<p>Remote IP of the contact.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   {\n       \"_id\": \"584932b0ea6f19740c2faee8\",\n       \"updatedAt\": \"2016-12-08T10:15:12.000Z\",\n       \"createdAt\": \"2016-12-08T10:15:12.000Z\",\n       \"remoteIp\": \"::ffff:163.5.220.100\",\n       \"message\": \"peti test\",\n       \"email\": \"test@test.fr\",\n       \"name\": \"Tanguy\",\n       \"__v\": 0\n   }\n   {\n       ...\n   }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The token is not valid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": \"false\",\n  \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/contact.js",
    "groupTitle": "Contact"
  },
  {
    "type": "get",
    "url": "/contact/:idContact",
    "title": "Get a contact form by id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "GetContactByid",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idContact",
            "description": "<p>Contact form id that you want to get.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>authentification token is mandatory.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the contact.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the contact.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the contact.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "remoteIp",
            "description": "<p>Remote IP of the contact.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"584932b0ea6f19740c2faee8\",\n   \"updatedAt\": \"2016-12-08T10:15:12.000Z\",\n   \"createdAt\": \"2016-12-08T10:15:12.000Z\",\n   \"remoteIp\": \"::ffff:163.5.220.100\",\n   \"message\": \"peti test\",\n   \"email\": \"test@test.fr\",\n   \"name\": \"Tanguy\",\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The token is not valid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": \"false\",\n  \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/contact.js",
    "groupTitle": "Contact"
  },
  {
    "type": "post",
    "url": "/contact/",
    "title": "Save a contact form",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "PostContact",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the contact.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the contact.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the contact.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"true\",\n  \"message\": \"Votre message a bien été envoyé.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CaptchaNotFound",
            "description": "<p>The form was submit without captcha.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CaptchaInvalid",
            "description": "<p>The captcha is not valid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SaveError",
            "description": "<p>Impossible to save the contact form in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "CaptchaNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": \"false\",\n  \"message\": \"Captcha non renseigné.\"\n}",
          "type": "json"
        },
        {
          "title": "CaptchaInvalid:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"success\": \"false\",\n  \"message\": \"Captcha invalide.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  \"success\": \"false\",\n  \"message\": \"Error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/contact.js",
    "groupTitle": "Contact"
  }
] });

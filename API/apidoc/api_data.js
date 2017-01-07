define({ "api": [
  {
    "type": "post",
    "url": "/achievements/:idAchievement",
    "title": "Add an achievement to an user",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "AddAnAchievementToUser",
    "group": "Achievement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idAchievement",
            "description": "<p>Achievement you want to edit.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to be authentified.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Achievement added to the user !'\n}",
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
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Impossible to add achievement to user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  \"success\": false,\n  \"message\": \"Error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/achievements.js",
    "groupTitle": "Achievement"
  },
  {
    "type": "delete",
    "url": "/achievements/:idAchievement",
    "title": "Delete an achievement by id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "DeleteAchievementById",
    "group": "Achievement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idAchievement",
            "description": "<p>Achievement you want to edit.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to be authentified.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'The achievement has been deleted.'\n}",
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
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/achievements.js",
    "groupTitle": "Achievement"
  },
  {
    "type": "put",
    "url": "/achievements/:idAchievement",
    "title": "Edit an achievement by id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "EditAchievementById",
    "group": "Achievement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idAchievement",
            "description": "<p>Achievement you want to edit.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to be authentified.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the achievement.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the achievement.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "picture",
            "description": "<p>Picture of the achievement.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Achievement updated !'\n}",
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
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/achievements.js",
    "groupTitle": "Achievement"
  },
  {
    "type": "get",
    "url": "/achievements/:idAchievement",
    "title": "Get an achievement by id",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetAchievementById",
    "group": "Achievement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idAchievement",
            "description": "<p>Achievement you want to get.</p>"
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
            "field": "description",
            "description": "<p>Description of the achievement.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the achievement.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the achievement.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   {\n      \"_id\": \"577cff520e5f32a50ac407c1\",\n       \"updatedAt\": \"2016-07-06T12:53:38.000Z\",\n       \"createdAt\": \"2016-07-06T12:53:38.000Z\",\n       \"description\": \"Compléter 100 musiques sans la moindre fausse note\",\n       \"name\": \"Virtuose\",\n       \"__v\": 0,\n       \"picture\": \"uploads/achievements/577cff520e5f32a50ac407c1/achievement.png\"\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/achievements.js",
    "groupTitle": "Achievement"
  },
  {
    "type": "get",
    "url": "/achievements/",
    "title": "Get all achievements",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetAchievements",
    "group": "Achievement",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the achievement.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the achievement.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the achievement.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   {\n      \"_id\": \"577cff520e5f32a50ac407c1\",\n       \"updatedAt\": \"2016-07-06T12:53:38.000Z\",\n       \"createdAt\": \"2016-07-06T12:53:38.000Z\",\n       \"description\": \"Compléter 100 musiques sans la moindre fausse note\",\n       \"name\": \"Virtuose\",\n       \"__v\": 0,\n       \"picture\": \"uploads/achievements/577cff520e5f32a50ac407c1/achievement.png\"\n   },\n   {\n       ...\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/achievements.js",
    "groupTitle": "Achievement"
  },
  {
    "type": "post",
    "url": "/achievements/",
    "title": "New achievement",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "NewAchievement",
    "group": "Achievement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to be authentified.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the new achievement.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the new achievement.</p>"
          },
          {
            "group": "Parameter",
            "type": "Image",
            "size": "2 Mo",
            "optional": true,
            "field": "picture",
            "description": "<p>Custom picture for the new achievement : MIME Type has to be : [&quot;image/jpeg&quot;, &quot;image/png&quot;, &quot;image/gif&quot;, &quot;image/tiff&quot;] and accepted extensions [&quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;, &quot;gif&quot;, &quot;tiff&quot;].</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Achievement created !'\n}",
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
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongArgs",
            "description": "<p>Missing arguments to create the achievement.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyExists",
            "description": "<p>Achievement already exists in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Impossible to create a new achievement.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   success: false,\n   message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "AlreadyExists:",
          "content": "HTTP/1.1 409 Conflict\n{\n   success: false,\n   message: 'Achievement already exists'\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503/500 Service Unavailable or Server Error\n{\n  \"success\": false,\n  \"message\": \"Error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/achievements.js",
    "groupTitle": "Achievement"
  },
  {
    "type": "post",
    "url": "/news/:idNews/comments/",
    "title": "Add a comment to a news",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "AddCommentToNews",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to be authentified.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Comment added.'\n}",
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
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongArgs",
            "description": "<p>Missing arguments to create the comment.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Impossible to save the comment.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  success: false,\n  message: \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"Error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/news.js",
    "groupTitle": "Comment"
  },
  {
    "type": "delete",
    "url": "/news/:idNews/comments/:idComment",
    "title": "Delete a news' comment",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "DeleteNewsComment",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idNews",
            "description": "<p>News id that you want to select.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idComment",
            "description": "<p>Comment id that you want to delete.</p>"
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
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Comment removed.'\n}",
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
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongArgs",
            "description": "<p>Missing arguments to delete the comment.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Comment doesn't exist in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Impossible to delete the comment.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  success: false,\n  message: \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Conflict\n{\n  success: false,\n  message: \"Comment doesn't exist.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"Error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/news.js",
    "groupTitle": "Comment"
  },
  {
    "type": "put",
    "url": "/news/:idNews/comments/:idComment",
    "title": "Edit a news' comment",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "EditNewsComment",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idNews",
            "description": "<p>News you want to select.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idComment",
            "description": "<p>Comment you want to edit.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to be authentified.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Message of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Comment edited.'\n}",
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
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongArgs",
            "description": "<p>Missing arguments to edit the comment.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Comment doesn't exist in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Impossible to edit the comment.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  success: false,\n  message: \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Conflict\n{\n  success: false,\n  message: \"Comment doesn't exist.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"Error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/news.js",
    "groupTitle": "Comment"
  },
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
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     success: true,\n     message: 'The contact form has been deleted.'\n}",
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
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"message\": \"Unauthorized.\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n   {\n       \"_id\": \"584932b0ea6f19740c2faee8\",\n       \"updatedAt\": \"2016-12-08T10:15:12.000Z\",\n       \"createdAt\": \"2016-12-08T10:15:12.000Z\",\n       \"remoteIp\": \"::ffff:163.5.220.100\",\n       \"message\": \"peti test\",\n       \"email\": \"test@test.fr\",\n       \"name\": \"Tanguy\",\n       \"__v\": 0\n   },\n   {\n       ...\n   }\n }",
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
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"message\": \"Unauthorized.\"\n}",
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
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"message\": \"Unauthorized.\"\n}",
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
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": \"Votre message a bien été envoyé.\"\n}",
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
            "field": "ServerError",
            "description": "<p>Impossible to save the contact form in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "CaptchaNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Captcha non renseigné.\"\n}",
          "type": "json"
        },
        {
          "title": "CaptchaInvalid:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"success\": false,\n  \"message\": \"Captcha invalide.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  \"success\": false,\n  \"message\": \"Error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/contact.js",
    "groupTitle": "Contact"
  },
  {
    "type": "post",
    "url": "/news/",
    "title": "Add a news",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "AddNews",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to be authentified.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the news.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the news.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author of the news.</p>"
          },
          {
            "group": "Parameter",
            "type": "Image",
            "size": "2 Mo",
            "optional": true,
            "field": "picture",
            "description": "<p>Custom picture for the news : MIME Type has to be : [&quot;image/jpeg&quot;, &quot;image/png&quot;, &quot;image/gif&quot;, &quot;image/tiff&quot;] and accepted extensions [&quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;, &quot;gif&quot;, &quot;tiff&quot;].</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'News created !'\n}",
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
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongArgs",
            "description": "<p>Missing arguments to create the news.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyExists",
            "description": "<p>News already exists in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Impossible to create a news.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  success: false,\n  message: \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "AlreadyExists:",
          "content": "HTTP/1.1 409 Conflict\n{\n  success: false,\n  message: \"News already exists\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"Error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/news.js",
    "groupTitle": "News"
  },
  {
    "type": "delete",
    "url": "/news/:idNews",
    "title": "Delete a news by id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "DeleteNewsById",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idNews",
            "description": "<p>News id that you want to delete.</p>"
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
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'The news has been deleted.'\n}",
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
          "content": "HTTP/1.1 401 Unauthorized\n{\n  success: false,\n  message: \"Unauthorized.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/news.js",
    "groupTitle": "News"
  },
  {
    "type": "put",
    "url": "/news/:idNews",
    "title": "Edit a news by id",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "EditNewsById",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idNews",
            "description": "<p>News you want to edit.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to be authentified.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the news.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the news.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "author",
            "description": "<p>Author of the news.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "slug",
            "description": "<p>Slug of the news.</p>"
          },
          {
            "group": "Parameter",
            "type": "Image",
            "size": "2 Mo",
            "optional": true,
            "field": "picture",
            "description": "<p>Custom picture for the news : MIME Type has to be : [&quot;image/jpeg&quot;, &quot;image/png&quot;, &quot;image/gif&quot;, &quot;image/tiff&quot;] and accepted extensions [&quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;, &quot;gif&quot;, &quot;tiff&quot;].</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'News updated !'\n}",
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
          "content": "HTTP/1.1 401 Unauthorized\n{\n  success: false,\n  message: \"Unauthorized.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/news.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/news/",
    "title": "Get all news",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetNews",
    "group": "News",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>Url translate of news' title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name / Title of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "comments",
            "description": "<p>Array with all comments id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Image",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the news.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  {\n    _id: \"57e54896ce58658110cd855e\",\n    updatedAt: \"2016-11-23T22:33:14.258Z\",\n    createdAt: \"2016-09-23T15:21:58.000Z\",\n    slug: \"DEVOS-Tanguy\",\n    author: \"577ea485fee4ec632f5c663f\",\n    description: \"yeaaah\",\n    name: \"A big news\",\n    \"__v\": 2,\n    comments: [\n      \"57f816c348165e7e18a84f37\",\n      \"5836192a48e54efc0a9b8695\"\n    ],\n    picture: \"uploads/news/default-news.jpg\"\n   },\n   {\n    ...\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/news.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/getNewsFromComment/:idComment/:index",
    "title": "Get a news by comment id",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetNewsByCommentId",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idComment",
            "description": "<p>News you want to get.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "index",
            "description": "<p>WTF is that param.</p>"
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
            "field": "slug",
            "description": "<p>Url translate of news' title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name / Title of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "comments",
            "description": "<p>Array with all comments (see comment section for an explanation about fields).</p>"
          },
          {
            "group": "Success 200",
            "type": "Image",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the news.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   {\n       _id: \"57e54896ce58658110cd855e\",\n       updatedAt: \"2016-11-23T22:33:14.258Z\",\n       createdAt: \"2016-09-23T15:21:58.000Z\",\n       slug: \"DEVOS-Tanguy\",\n       author: \"577ea485fee4ec632f5c663f\",\n       description: \"yeaaah\",\n       name: \"A big news\",\n       __v: 2,\n       comments: [\n              _id: \"5836192a48e54efc0a9b8695\",\n              updatedAt: \"2016-11-23T22:33:14.000Z\",\n              createdAt: \"2016-11-23T22:33:14.000Z\",\n              type: \"news\",\n              message: \"Super actualité ! :)\",\n              author: {\n                    _id: \"581e67289043e3880cad7ec0\",\n                    name: \"Faucheur\",\n                    picture: \"uploads/avatar/581e67289043e3880cad7ec0/reaper.jpg\"\n               },\n              __v: 0\n              ],\n       picture: \"uploads/news/default-news.jpg\"\n  }",
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
            "field": "NewsNotFound",
            "description": "<p>Impossible to create a news.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NewsNotFound:",
          "content": "HTTP/1.1 404 Service Not found\n{\n  success: false,\n  message: \"La news n'a pas été trouvée.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/news.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/news/idNews",
    "title": "Get a news by id",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetNewsById",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idNews",
            "description": "<p>News you want to get.</p>"
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
            "field": "slug",
            "description": "<p>Url translate of news' title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name / Title of the news.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "comments",
            "description": "<p>Array with all comments (see comment section for an explanation about fields).</p>"
          },
          {
            "group": "Success 200",
            "type": "Image",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the news.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   {\n       _id: \"57e54896ce58658110cd855e\",\n       updatedAt: \"2016-11-23T22:33:14.258Z\",\n       createdAt: \"2016-09-23T15:21:58.000Z\",\n       slug: \"DEVOS-Tanguy\",\n       author: \"577ea485fee4ec632f5c663f\",\n       description: \"yeaaah\",\n       name: \"A big news\",\n       __v: 2,\n       comments: [\n              _id: \"5836192a48e54efc0a9b8695\",\n              updatedAt: \"2016-11-23T22:33:14.000Z\",\n              createdAt: \"2016-11-23T22:33:14.000Z\",\n              type: \"news\",\n              message: \"Super actualité ! :)\",\n              author: {\n                    _id: \"581e67289043e3880cad7ec0\",\n                    name: \"Faucheur\",\n                    picture: \"uploads/avatar/581e67289043e3880cad7ec0/reaper.jpg\"\n               },\n              __v: 0\n              ],\n       picture: \"uploads/news/default-news.jpg\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/news.js",
    "groupTitle": "News"
  },
  {
    "type": "post",
    "url": "/token/",
    "title": "Token validation checker",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "GetTokenValidation",
    "group": "Token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token value to check.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Notify the success of current request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: \"Token valid.\"\n}",
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
            "field": "TokenInvalid",
            "description": "<p>The token is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "TokenInvalid:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  message: \"Failed to authenticate token.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/token.js",
    "groupTitle": "Token"
  }
] });

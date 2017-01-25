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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Achievement added to the user !'\n}",
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
          "content": "HTTP/1.1 401 Unauthorized\n{\n  success: false,\n  message: \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"Error message.\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'The achievement has been deleted.'\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Achievement updated !'\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n   {\n      _id: \"577cff520e5f32a50ac407c1\",\n      updatedAt: \"2016-07-06T12:53:38.000Z\",\n      createdAt: \"2016-07-06T12:53:38.000Z\",\n      description: \"Compléter 100 musiques sans la moindre fausse note\",\n      name: \"Virtuose\",\n      __v: 0,\n      picture: \"uploads/achievements/577cff520e5f32a50ac407c1/achievement.png\"\n   }",
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
          "content": "HTTP/1.1 200 OK\n{\n   {\n      _id: \"577cff520e5f32a50ac407c1\",\n      updatedAt: \"2016-07-06T12:53:38.000Z\",\n      createdAt: \"2016-07-06T12:53:38.000Z\",\n      description: \"Compléter 100 musiques sans la moindre fausse note\",\n      name: \"Virtuose\",\n      __v: 0,\n      picture: \"uploads/achievements/577cff520e5f32a50ac407c1/achievement.png\"\n   },\n   {\n      ...\n   }",
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Achievement created !'\n}",
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
          "content": "HTTP/1.1 409 Conflict\n{\n  success: false,\n  message: 'Achievement already exists'\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503/500 Service Unavailable or Server Error\n{\n  success: false,\n  message: \"Error message.\"\n}",
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
    "type": "post",
    "url": "/songs/:slug/comments",
    "title": "Add a comment to a song",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "AddCommentToSong",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>The song you want to select.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the comment.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: \"Comment added.\"\n}",
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
            "field": "WrongArgs",
            "description": "<p>Missing arguments to add a comment to a song.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The song is not found in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServiceUnavailable",
            "description": "<p>Impossible to add a comment to a song.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  message: \"Song is not found\"\n}",
          "type": "json"
        },
        {
          "title": "ServiceUnavailable:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/songs.js",
    "groupTitle": "Comment"
  },
  {
    "type": "delete",
    "url": "/songs/:slug/comments/:idComment",
    "title": "Delete a comment from a song",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "DeleteCommentFromSong",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>Song that you want to select.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idComment",
            "description": "<p>Comment that you want to delete.</p>"
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
            "field": "NotFound",
            "description": "<p>Comment or song don't exist in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongArgs",
            "description": "<p>Missing arguments to delete comment from song.</p>"
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
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  message: \"Comment/Song doesn't exist.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"Error message.\"\n}",
          "type": "json"
        },
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/songs.js",
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
    "url": "/songs/:slug/comments",
    "title": "Edit a comment from a song",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "EditCommentFromSong",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>The song you want to select.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the comment.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: \"Comment edited.\"\n}",
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
            "field": "WrongArgs",
            "description": "<p>Missing arguments to add a comment from a song.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Missing arguments to edit a comment from a song.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServiceUnavailable",
            "description": "<p>Impossible to add a comment from a song.</p>"
          },
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
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  message: \"Comment doesn't exist.\"\n}",
          "type": "json"
        },
        {
          "title": "ServiceUnavailable:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"error message.\"\n}",
          "type": "json"
        },
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  success: false,\n  message: \"Unauthorized.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/songs.js",
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
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  message: \"Comment doesn't exist.\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  author: \"John\",\n  message: \"Hey !\",\n  type:  \"news\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'The contact form has been deleted.'\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n   {\n       _id: \"584932b0ea6f19740c2faee8\",\n       updatedAt: \"2016-12-08T10:15:12.000Z\",\n       createdAt: \"2016-12-08T10:15:12.000Z\",\n       remoteIp: \"::ffff:163.5.220.100\",\n       message: \"peti test\",\n       email: \"test@test.fr\",\n       name: \"Tanguy\",\n       __v: 0\n   },\n   {\n       ...\n   }\n }",
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
          "content": "HTTP/1.1 200 OK\n{\n   _id: \"584932b0ea6f19740c2faee8\",\n   updatedAt: \"2016-12-08T10:15:12.000Z\",\n   createdAt: \"2016-12-08T10:15:12.000Z\",\n   remoteIp: \"::ffff:163.5.220.100\",\n   message: \"peti test\",\n   email: \"test@test.fr\",\n   name: \"Tanguy\",\n   __v: 0\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: \"Votre message a bien été envoyé.\"\n}",
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
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  message: \"Captcha non renseigné.\"\n}",
          "type": "json"
        },
        {
          "title": "CaptchaInvalid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: \"Captcha invalide.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"Error message\"\n}",
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
    "url": "/playlists/",
    "title": "Add a playlist",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "AddPlaylist",
    "group": "Playlist",
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
            "optional": true,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Playlist created !'\n}",
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
            "description": "<p>Missing arguments to create the playlist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyExists",
            "description": "<p>Playlist already exists in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Impossible to create a playlist.</p>"
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
          "content": "HTTP/1.1 409 Conflict\n{\n  success: false,\n  message: \"Playlist already exists\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"Error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/playlists.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "post",
    "url": "/playlists/:slug/",
    "title": "Add a song to a playlist",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "AddSongToPlaylist",
    "group": "Playlist",
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
            "field": "Slug",
            "description": "<p>from the playlist selected.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "idSong",
            "description": "<p>Id of the song.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Song added to the playlist !'\n}",
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
            "description": "<p>Missing arguments to create the playlist.</p>"
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
        }
      ]
    },
    "filename": "router/routes/api/playlists.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "delete",
    "url": "/playlists/:idPlaylist",
    "title": "Delete a playlist by id",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "DeletePlaylistById",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idPlaylist",
            "description": "<p>Playlist id that you want to delete.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'The playlist has been deleted.'\n}",
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
    "filename": "router/routes/api/playlists.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "delete",
    "url": "/playlists/:slugPlaylist/:idSong",
    "title": "Delete a song from a playlist",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "DeleteSongFromPlaylist",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slugPlaylist",
            "description": "<p>Playlist slug that you want to select.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idSong",
            "description": "<p>Song id that you want to delete.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Song removed from the playlist !'\n}",
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
    "filename": "router/routes/api/playlists.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "put",
    "url": "/playlists/:idPlaylist/",
    "title": "Edit a playlist",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "EditPlaylist",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idPlaylist",
            "description": "<p>Playlist you want to edit.</p>"
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
            "description": "<p>Name of the playlist.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Playlist updated !'\n}",
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
            "field": "ServerError",
            "description": "<p>Impossible to edit the playlist.</p>"
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
          "content": "HTTP/1.1 500 Service Error\n{\n  success: false,\n  message: \"Error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/playlists.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "get",
    "url": "/playlists/:idPlaylist",
    "title": "Get a playlist by id",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetPlaylistById",
    "group": "Playlist",
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
            "type": "Number",
            "optional": false,
            "field": "idPlaylist",
            "description": "<p>Id from the playlist.</p>"
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
            "description": "<p>Slug of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "created_by",
            "description": "<p>Playlist created by this id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "songs",
            "description": "<p>All songs from the playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  {\n    _id: \"5850501e16f93d1c0c6305f6\",\n    updatedAt: \"2016-12-13T19:46:38.000Z\",\n    createdAt: \"2016-12-13T19:46:38.000Z\",\n    slug: \"playlist1\",\n    created_by: \"581e67289043e3880cad7ec0\",\n    name: \"playlist1\",\n    __v: 0,\n    songs: []\n  }\n  {\n    ...\n  }\n}",
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
            "field": "NotFound",
            "description": "<p>Playlist not found in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not found\n{\n  success: false,\n  message: \"Playlist doesn't exist !\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/playlists.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "get",
    "url": "/playlists/user",
    "title": "Get all playlists from an user",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "GetPlaylistsFromUser",
    "group": "Playlist",
    "parameter": {
      "fields": {
        "Parameter": [
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
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>Slug of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "created_by",
            "description": "<p>Playlist created by this id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "songs",
            "description": "<p>All songs from the playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  {\n    _id: \"5850501e16f93d1c0c6305f6\",\n    updatedAt: \"2016-12-13T19:46:38.000Z\",\n    createdAt: \"2016-12-13T19:46:38.000Z\",\n    slug: \"playlist1\",\n    created_by: \"581e67289043e3880cad7ec0\",\n    name: \"playlist1\",\n    __v: 0,\n    songs: []\n  }\n  {\n    ...\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/playlists.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "get",
    "url": "/playlists/user",
    "title": "Get songs from a playlist",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "GetSongsFromPlaylist",
    "group": "Playlist",
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
            "field": "slug",
            "description": "<p>Slug from playlist.</p>"
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
            "description": "<p>Slug of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "created_by",
            "description": "<p>Playlist created by this id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "songs",
            "description": "<p>All songs from the playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  {\n    _id: \"5850501e16f93d1c0c6305f6\",\n    updatedAt: \"2016-12-13T19:46:38.000Z\",\n    createdAt: \"2016-12-13T19:46:38.000Z\",\n    slug: \"playlist1\",\n    created_by: \"581e67289043e3880cad7ec0\",\n    name: \"playlist1\",\n    __v: 0,\n    songs: []\n  }\n  {\n    ...\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/playlists.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "post",
    "url": "/songs",
    "title": "Add a song",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "AddSong",
    "group": "Song",
    "description": "<p>This api method has to ways to run : there is a method to add a song with audio file and another one from a scanned partition, without audio file.</p> <p>For the first method, just add &quot;file&quot; and &quot;preview&quot; with basic fields (name, artist, price, difficulty and a picture).</p> <p>For the second method, just add &quot;scan&quot; with basic fields (name, artist, price (optionnal), difficulty and a picture).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>authentification token is mandatory.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>Artist of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Image",
            "size": "2 Mo",
            "optional": false,
            "field": "picture",
            "description": "<p>Custom picture for the song : MIME Type has to be : [&quot;image/jpeg&quot;, &quot;image/png&quot;, &quot;image/gif&quot;, &quot;image/tiff&quot;] and accepted extensions [&quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;, &quot;gif&quot;, &quot;tiff&quot;].</p>"
          },
          {
            "group": "Parameter",
            "type": "Image",
            "size": "2 Mo",
            "optional": false,
            "field": "scan",
            "description": "<p>Custom scan for the song : MIME Type has to be : [&quot;image/jpeg&quot;, &quot;image/png&quot;, &quot;image/gif&quot;, &quot;image/tiff&quot;] and accepted extensions [&quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;, &quot;gif&quot;, &quot;tiff&quot;].</p>"
          },
          {
            "group": "Parameter",
            "type": "Song",
            "size": "20 Mo",
            "optional": false,
            "field": "file",
            "description": "<p>Audio file for the song : MIME Type has to be : [&quot;midi&quot;, &quot;mp3&quot;, &quot;wav&quot;, &quot;mid&quot;] and accepted extensions [&quot;audio/midi&quot;, &quot;audio/mid&quot;].</p>"
          },
          {
            "group": "Parameter",
            "type": "Song",
            "size": "20 Mo",
            "optional": false,
            "field": "preview",
            "description": "<p>Audio preview file for the song : MIME Type has to be : [&quot;midi&quot;, &quot;mp3&quot;, &quot;wav&quot;, &quot;mid&quot;] and accepted extensions [&quot;audio/midi&quot;, &quot;audio/mid&quot;].</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Song created !',\n}",
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
            "field": "WrongArgs",
            "description": "<p>Missing arguments to add a song.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyExists",
            "description": "<p>This song already exists in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Impossible to add a song.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CannotConvertScan",
            "description": "<p>Impossible to create song from scan.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Impossible to save the song.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "AlreadyExists:",
          "content": "HTTP/1.1 409 Conflict\n{\n  success: false,\n  message: 'Song already exists.'\n}",
          "type": "json"
        },
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  success: false,\n  message: \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "CannotConvertScan:",
          "content": "HTTP/1.1 501 Service Unavailable\n{\n  success: false,\n  message: \"Error while trying to convert the sheet music into MIDI song\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  success: false,\n  message: \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/songs.js",
    "groupTitle": "Song"
  },
  {
    "type": "post",
    "url": "/users/songs",
    "title": "Add a song to an user",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "AddSongUser",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idSong",
            "description": "<p>Song you want to add to user.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Song added to user.'\n}",
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
            "field": "WrongArgs",
            "description": "<p>Missing arguments to add a song to the user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyExists",
            "description": "<p>Song already added to user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServiceUnavailable",
            "description": "<p>Unable to add a song to the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "AlreadyExists:",
          "content": "HTTP/1.1 409 Conflict\n{\n  success: false,\n  message: 'Song already added to user.'\n}",
          "type": "json"
        },
        {
          "title": "ServiceUnavailable:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/users.js",
    "groupTitle": "Song"
  },
  {
    "type": "delete",
    "url": "/songs/:idSong",
    "title": "Delete a song",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "DeleteSong",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idSong",
            "description": "<p>Song that you want to delete.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'The song has been deleted.'\n}",
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
    "filename": "router/routes/api/songs.js",
    "groupTitle": "Song"
  },
  {
    "type": "delete",
    "url": "/users/songs/:idSong",
    "title": "Delete a song from an user",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "DeleteSongFromUser",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idSong",
            "description": "<p>Song that you want to delete.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Song removed.'\n}",
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
            "field": "ServiceUnavailable",
            "description": "<p>Impossible to delete a song from an user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServiceUnavailable:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/users.js",
    "groupTitle": "Song"
  },
  {
    "type": "put",
    "url": "/songs/:idSong",
    "title": "Edit a song",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.1.0",
    "name": "EditSong",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>authentification token is mandatory.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "artist",
            "description": "<p>Artist of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "price",
            "description": "<p>Price of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "difficulty",
            "description": "<p>Difficulty of the song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Image",
            "size": "2 Mo",
            "optional": true,
            "field": "picture",
            "description": "<p>Custom picture for the song : MIME Type has to be : [&quot;image/jpeg&quot;, &quot;image/png&quot;, &quot;image/gif&quot;, &quot;image/tiff&quot;] and accepted extensions [&quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;, &quot;gif&quot;, &quot;tiff&quot;].</p>"
          },
          {
            "group": "Parameter",
            "type": "Image",
            "size": "2 Mo",
            "optional": true,
            "field": "scan",
            "description": "<p>Custom scan for the song : MIME Type has to be : [&quot;image/jpeg&quot;, &quot;image/png&quot;, &quot;image/gif&quot;, &quot;image/tiff&quot;] and accepted extensions [&quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;, &quot;gif&quot;, &quot;tiff&quot;].</p>"
          },
          {
            "group": "Parameter",
            "type": "Song",
            "size": "20 Mo",
            "optional": true,
            "field": "file",
            "description": "<p>Audio file for the song : MIME Type has to be : [&quot;midi&quot;, &quot;mp3&quot;, &quot;wav&quot;, &quot;mid&quot;] and accepted extensions [&quot;audio/midi&quot;, &quot;audio/mid&quot;].</p>"
          },
          {
            "group": "Parameter",
            "type": "Song",
            "size": "20 Mo",
            "optional": true,
            "field": "preview",
            "description": "<p>Audio preview file for the song : MIME Type has to be : [&quot;midi&quot;, &quot;mp3&quot;, &quot;wav&quot;, &quot;mid&quot;] and accepted extensions [&quot;audio/midi&quot;, &quot;audio/mid&quot;].</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: \"Song updated !\"\n}",
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
    "filename": "router/routes/api/songs.js",
    "groupTitle": "Song"
  },
  {
    "type": "get",
    "url": "/songs/mostBoughtSongs/:nbSong",
    "title": "Get most bought songs (limit by n)",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetMostBoughtSongs",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nbSong",
            "description": "<p>Number of songs you want to retrieve.</p>"
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
            "description": "<p>Slug of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "preview",
            "description": "<p>Preview of the song (path to preview audio file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>Audio file of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the song (path to image file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>Artist of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>Comments from the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bought",
            "description": "<p>Number of how many times the song was bought.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty of the song.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    {\n      \"_id\": \"581e1eedfae905040b64874b\",\n      \"updatedAt\": \"2016-11-08T12:28:42.926Z\",\n      \"createdAt\": \"2016-11-05T18:03:25.000Z\",\n      \"slug\": \"Pirates-des-Caraibes\",\n      \"preview\": \"\",\n      \"file\": \"uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid\",\n      \"price\": 12,\n      \"picture\": \"uploads/songs/581e1eedfae905040b64874b/cover.jpg\",\n      \"artist\": \"Disney\",\n      \"name\": \"Pirates des Caraïbes\",\n      \"__v\": 0,\n      \"comments\": [],\n      \"bought\": 1,\n      \"difficulty\": 5\n      },\n      {\n       ...\n      }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/songs.js",
    "groupTitle": "Song"
  },
  {
    "type": "get",
    "url": "/songs/newSongs/:nbSong",
    "title": "Get new songs (limit by n)",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetNewSongs",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nbSong",
            "description": "<p>Number of songs you want to retrieve.</p>"
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
            "description": "<p>Slug of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "preview",
            "description": "<p>Preview of the song (path to preview audio file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>Audio file of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the song (path to image file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>Artist of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>Comments from the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bought",
            "description": "<p>Number of how many times the song was bought.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty of the song.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    {\n      \"_id\": \"581e1eedfae905040b64874b\",\n      \"updatedAt\": \"2016-11-08T12:28:42.926Z\",\n      \"createdAt\": \"2016-11-05T18:03:25.000Z\",\n      \"slug\": \"Pirates-des-Caraibes\",\n      \"preview\": \"\",\n      \"file\": \"uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid\",\n      \"price\": 12,\n      \"picture\": \"uploads/songs/581e1eedfae905040b64874b/cover.jpg\",\n      \"artist\": \"Disney\",\n      \"name\": \"Pirates des Caraïbes\",\n      \"__v\": 0,\n      \"comments\": [],\n      \"bought\": 1,\n      \"difficulty\": 5\n      },\n      {\n       ...\n      }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/songs.js",
    "groupTitle": "Song"
  },
  {
    "type": "get",
    "url": "/songs/randomSongs/:nbSong",
    "title": "Get random songs (limit by n)",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetRandomSongs",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nbSong",
            "description": "<p>Number of songs you want to retrieve.</p>"
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
            "description": "<p>Slug of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "preview",
            "description": "<p>Preview of the song (path to preview audio file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>Audio file of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the song (path to image file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>Artist of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>Comments from the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bought",
            "description": "<p>Number of how many times the song was bought.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty of the song.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    {\n      \"_id\": \"581e1eedfae905040b64874b\",\n      \"updatedAt\": \"2016-11-08T12:28:42.926Z\",\n      \"createdAt\": \"2016-11-05T18:03:25.000Z\",\n      \"slug\": \"Pirates-des-Caraibes\",\n      \"preview\": \"\",\n      \"file\": \"uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid\",\n      \"price\": 12,\n      \"picture\": \"uploads/songs/581e1eedfae905040b64874b/cover.jpg\",\n      \"artist\": \"Disney\",\n      \"name\": \"Pirates des Caraïbes\",\n      \"__v\": 0,\n      \"comments\": [],\n      \"bought\": 1,\n      \"difficulty\": 5\n      },\n      {\n       ...\n      }\n }",
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
            "field": "NumberTooBig",
            "description": "<p>There are not enough songs in database for requested number.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NumberTooBig:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"Il n'y a pas assez de musiques pour cette demande.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/songs.js",
    "groupTitle": "Song"
  },
  {
    "type": "get",
    "url": "/songs/:slug",
    "title": "Get song by slug or id",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetSong",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "slug",
            "description": "<p>Slug of the song to retrieve.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "idSong",
            "description": "<p>idSong of the song to retrieve.</p>"
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
            "description": "<p>Slug of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "preview",
            "description": "<p>Preview of the song (path to preview audio file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>Audio file of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the song (path to image file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>Artist of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>Comments from the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bought",
            "description": "<p>Number of how many times the song was bought.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty of the song.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    {\n      \"_id\": \"581e1eedfae905040b64874b\",\n      \"updatedAt\": \"2016-11-08T12:28:42.926Z\",\n      \"createdAt\": \"2016-11-05T18:03:25.000Z\",\n      \"slug\": \"Pirates-des-Caraibes\",\n      \"preview\": \"\",\n      \"file\": \"uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid\",\n      \"price\": 12,\n      \"picture\": \"uploads/songs/581e1eedfae905040b64874b/cover.jpg\",\n      \"artist\": \"Disney\",\n      \"name\": \"Pirates des Caraïbes\",\n      \"__v\": 0,\n      \"comments\": [],\n      \"bought\": 1,\n      \"difficulty\": 5\n      }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/songs.js",
    "groupTitle": "Song"
  },
  {
    "type": "get",
    "url": "/songs/getSongFromComment/:idComment/:index",
    "title": "Get a song from a comment",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetSongFromComment",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idComment",
            "description": "<p>Comment you want to select.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "index",
            "description": "<p>???.</p>"
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
            "description": "<p>Slug of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "preview",
            "description": "<p>Preview of the song (path to preview audio file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>Audio file of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the song (path to image file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>Artist of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>Comments from the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bought",
            "description": "<p>Number of how many times the song was bought.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty of the song.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    {\n      \"_id\": \"581e1eedfae905040b64874b\",\n      \"updatedAt\": \"2016-11-08T12:28:42.926Z\",\n      \"createdAt\": \"2016-11-05T18:03:25.000Z\",\n      \"slug\": \"Pirates-des-Caraibes\",\n      \"preview\": \"\",\n      \"file\": \"uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid\",\n      \"price\": 12,\n      \"picture\": \"uploads/songs/581e1eedfae905040b64874b/cover.jpg\",\n      \"artist\": \"Disney\",\n      \"name\": \"Pirates des Caraïbes\",\n      \"__v\": 0,\n      \"comments\": [],\n      \"bought\": 1,\n      \"difficulty\": 5\n      }\n }",
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
            "field": "NotFound",
            "description": "<p>Song doesn't exist in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  message: \"La musique n'a pas été trouvée\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/songs.js",
    "groupTitle": "Song"
  },
  {
    "type": "get",
    "url": "/songs/",
    "title": "Get all songs",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetSongs",
    "group": "Song",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>Slug of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "preview",
            "description": "<p>Preview of the song (path to preview audio file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>Audio file of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture of the song (path to image file).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "artist",
            "description": "<p>Artist of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>Comments from the song.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bought",
            "description": "<p>Number of how many times the song was bought.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Difficulty of the song.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    {\n      \"_id\": \"581e1eedfae905040b64874b\",\n      \"updatedAt\": \"2016-11-08T12:28:42.926Z\",\n      \"createdAt\": \"2016-11-05T18:03:25.000Z\",\n      \"slug\": \"Pirates-des-Caraibes\",\n      \"preview\": \"\",\n      \"file\": \"uploads/songs/581e1eedfae905040b64874b/Pirates of the Caribbean - He's a Pirate.mid\",\n      \"price\": 12,\n      \"picture\": \"uploads/songs/581e1eedfae905040b64874b/cover.jpg\",\n      \"artist\": \"Disney\",\n      \"name\": \"Pirates des Caraïbes\",\n      \"__v\": 0,\n      \"comments\": [],\n      \"bought\": 1,\n      \"difficulty\": 5\n      },\n      {\n       ...\n      }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/songs.js",
    "groupTitle": "Song"
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
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Add an user",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "AddUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Address of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "country",
            "description": "<p>Country of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Image",
            "size": "2 Mo",
            "optional": true,
            "field": "picture",
            "description": "<p>Custom picture for the user : MIME Type has to be : [&quot;image/jpeg&quot;, &quot;image/png&quot;, &quot;image/gif&quot;, &quot;image/tiff&quot;] and accepted extensions [&quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;, &quot;gif&quot;, &quot;tiff&quot;].</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'User created !',\n}",
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
            "field": "WrongArgs",
            "description": "<p>Missing arguments to add the user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyExists",
            "description": "<p>User already exists in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User not found in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServiceUnavailable",
            "description": "<p>Impossible to add an user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Unable to add an user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "AlreadyExists:",
          "content": "HTTP/1.1 409 Conflict\n{\n  success: false,\n  message: 'User already exists'\n}",
          "type": "json"
        },
        {
          "title": "UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  message: \"Authentication failed. User not found.\"\n}",
          "type": "json"
        },
        {
          "title": "ServiceUnavailable:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  success: false,\n  message: \"error message.\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  success: false,\n  message: \"error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/authenticate",
    "title": "Authenticate an user",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "AuthenticateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email to be authentified.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password to be authentified.</p>"
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
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token of authentification.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'Enjoy your token!',\n  token: token,\n  id: user.id\n}",
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
            "field": "WrongPassword",
            "description": "<p>The password isn't correct.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongArgs",
            "description": "<p>Missing arguments to authenticate the user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User not found in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  success: false,\n  message: \"Authentication failed. Wrong password.\"\n}",
          "type": "json"
        },
        {
          "title": "WrongArgs:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: 'Wrong arguments'\n}",
          "type": "json"
        },
        {
          "title": "UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  message: \"Authentication failed. User not found.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/users.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:idUser",
    "title": "Delete an user by id",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "DeleteUserById",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idUser",
            "description": "<p>User that you want to delete.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'The user has been deleted.'\n}",
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
    "filename": "router/routes/api/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:idUser",
    "title": "Edit an user",
    "permission": [
      {
        "name": "user"
      }
    ],
    "version": "0.1.0",
    "name": "EditUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idUser",
            "description": "<p>User you want to edit.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Address of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "country",
            "description": "<p>Country of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Image",
            "size": "2 Mo",
            "optional": true,
            "field": "picture",
            "description": "<p>Custom picture for the user : MIME Type has to be : [&quot;image/jpeg&quot;, &quot;image/png&quot;, &quot;image/gif&quot;, &quot;image/tiff&quot;] and accepted extensions [&quot;jpg&quot;, &quot;jpeg&quot;, &quot;png&quot;, &quot;gif&quot;, &quot;tiff&quot;].</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  success: true,\n  message: 'User updated !'\n}",
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
            "field": "NotFound",
            "description": "<p>User doesn't exist in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Minssing email field to edit user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Impossible to edit the user.</p>"
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
          "title": "NotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false,\n  message: \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  success: false,\n  message: \"Email cannot be empty\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  success: false,\n  message: \"Error message.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "Get all users",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture URL of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "songs",
            "description": "<p>All songs from the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "achievements",
            "description": "<p>All achievements from the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    {\n      updatedAt: \"2016-11-23T22:33:14.258Z\",\n      updatedAt: \"2016-11-23T22:33:14.258Z\",\n      createdAt: \"2016-09-23T15:21:58.000Z\",\n      slug: \"DEVOS-Tanguy\",\n      author: \"577ea485fee4ec632f5c663f\",\n      description: \"yeaaah\",\n      name: \"A big news\",\n      __v: 2,\n      comments: [\n        \"57f816c348165e7e18a84f37\",\n        \"5836192a48e54efc0a9b8695\"\n      ],\n      picture: \"uploads/news/default-news.jpg\"\n     },\n     {\n      ...\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:idUser",
    "title": "Get an user by id",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.1.0",
    "name": "GetUsersById",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idUser",
            "description": "<p>User you want to get.</p>"
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
            "description": "<p>Name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture URL of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "songs",
            "description": "<p>All songs from the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "achievements",
            "description": "<p>All achievements from the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    {\n      updatedAt: \"2016-11-23T22:33:14.258Z\",\n      updatedAt: \"2016-11-23T22:33:14.258Z\",\n      createdAt: \"2016-09-23T15:21:58.000Z\",\n      slug: \"DEVOS-Tanguy\",\n      author: \"577ea485fee4ec632f5c663f\",\n      description: \"yeaaah\",\n      name: \"A big news\",\n      __v: 2,\n      comments: [\n        \"57f816c348165e7e18a84f37\",\n        \"5836192a48e54efc0a9b8695\"\n      ],\n      picture: \"uploads/news/default-news.jpg\"\n     },\n     {\n      ...\n     }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "router/routes/api/users.js",
    "groupTitle": "User"
  }
] });

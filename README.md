#=========== User Stories ===================
1. user login
2. user wants to build a project as the following steps.
    - start with new project by selecting new project option
    - Name the project
    - Select data (from a list of available API) to display on the map.
    - Build some analysis (query, selected features, change map)
    - or user can add his/her own esri API
    - Print/save map as image
    - Save project
3. user want to edit a project
    - Load the project
    - Edit map (add new data, change esri basemap, change title,  etc..)
    - Comment on changes
    - Save/print map/project
4. user want to delete a project
    - Select a created project
    -  Delete selected project
5. user might want to share project (public projects: where everyone can see it)
    - Select user(s) in the list
    - Select project to share
    - Click share to confirm

#=========== Schema =======================
user schema {
  - username: string
  - name: string
  - password. string
  - projects: []. // set of project id
}

project schema{
  - project_name: string
  - name: string
  - map:  img
  - description: string
  - comment:string  (if edit, should leave comment
  - ersi webservice id: integer // many
  - user_is: integer
  - Category: string
}

Esri webservices schema  {
  - title: string
  - url: string. // webservice
  - description: string
  - type: string.  // data-type
  - source: string // original public by "…"
  - project id: integer // many
}

#All users can see this project
shared project schema{
  - username: string
  - name: string
  - project_name: string
  - projects_id: integer  // project id
  - user_id; integer
}

#=========== Technologies List =======================

Back End:      	
  - Ruby on Rails, Postgresql
  - Argis API webservices
  - AJAX
  - JWT authentication

Front End
  - AngularJS
  - ArcGIS API for JavaScript
  - HTML
  - JavaScript
  - Jquery
  - Boostrap css



#=========== End =======================

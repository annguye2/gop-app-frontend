
 App location: https://project5-gop-app-frontend.herokuapp.com/

 -  Geospatial online project (GOP) is an web-based app where user can display Feature Server URL provided by ArcGIS Services API.
 You can find more information about ArcGIS Web-Service API by following "http://resources.arcgis.com/en/help/arcgis-rest-api/".
 With this initial version, GOP can only display  Feature Sever type (e.g. "https://services2.arcgis.com/1cdV1mIckpAyI7Wo/ArcGIS/rest/services/Airports_(USACE_IENC)/FeatureServer/0)".  A single layer built by ArcGIS server.  In the future, this app might be developed into taking a group of layer (Map Server) and other type of ArcGIS geospatial data such as KML and Shape. However, due to the bandwidth limitation of Heroku's free account, the newer version might not be deployed in the same environment.
 -  Initially, user can play around with the app as the following steps:
    1.  Select any available shared features/projects (in public/shared projects dropdown menu) and LOAD into the interest area on the map.
    2.  User has many options to chose a base-map as listed under "Base-Map" gallery in a drop down menu
    3.  Display project/layer one at a time
    4.  The Attribute table give user the layer's attribute information.  
    5.  Selecting information on the table could help user to locate an asset on specified location listed
    6.  If user wants to save the interest project/layer, he/she needs to login.
    7.  User can have an account with this app by registering
    8.  User can save, or create his/her own project with diff Feature Server url, then save and shared to others.

 -  Steps that user can perform after successfully login

    1. Creating new project
        - Start with new project by selecting new project option
        - Enter Name the project (suggest using the name of feature layer, and location for later reuse)
        - Enter FeatureServer url
        - Fill description of the project (not required but suggested)
        - Fill in comment (e.g: basemap used, location interest.  This info are not required but suggested for later use)
        - Click on Share option if user wants created project share to other user
        - Save project
        - Check and see the new project added into user's projects list
        - If the project was shared to the public, the project should be appeared in shared project list
    2. Edit a project
        - Load the project in user's project list
        - Edit project information (change esri basemap, change title,  etc..)
        - Comment on changes (not required but suggested for later use)
        - Save and/share the project to the public
    3. Delete a project (Note: User can not delete the public/shared project)
        - Select a created project
        - Delete selected project
    4. User might want to share project (public projects: where everyone can see it)
        - Select project to share
        - Click share to confirm
    5. Creating a new project from a list of shared project.
        - Select a share project in a shared project list
        - Load selected project to the map
        - Save into user list by click on Save Map to your project
        - To add more information with saved project, use edit
    6.  Creating a project by using available feature data on drop down
        - Select one of feature layer's name on the drop down
        - Use add to map button to add the selected layer into map
        - Zoom to interest area
        - Analysis information from attribute table can be use

  -   Map's tools:
    1. Search: like Google search, this search will find and zoom into location that you want to find
    2. Home button: used to zoom back to initial map set up
    3. Add To Map: will add selected layer on feature services menu (dropdown)  
    4. Remove Layer: will remove the latest add-in layer
    5. Save Map To Project: this tool only show and use after user successfully logged in
    6. Save Current Project: Once user loads the selected project on Shared Project list, this tool shows up, and allow user to save the project
    7. Hide Show button: will only show once a layer/project loaded into the map.  This tool toggles the attribute table

  -  Data resources:
      1.  https://hifld-dhs-gii.opendata.arcgis.com/
      2.  https://services2.arcgis.com/1cdV1mIckpAyI7Wo/ArcGIS/rest/services


  - Technologies:
      . AngularJS
      . ArcGIS API for JavaScript
      . HTML
      . JavaScript
      . Jquery
      . Boostrap css


# epa-opp-explorer
## Overview
OPP Explorer is an electronic work environment for the EPA's Office of Pesticide Programs that brings together many underlying systems into a single easy-to-use web-based application. OPP Explorer is implemented as a lightweight javascript web application that consumes JSON API data from OPP's centralized API layer. 

The current version of OPP Explorer has been based on understanding the Review Manager's work needs but has been built with OPP-wide cross-divitional participation at all levels. Current modules are: 

**My Work** - The current decisions in progress for the logged in Review Manager

**Product View** - A product-centric page including ingredient summary information, current and past decisions, electronic document library and more

**Chemical View** - This page is a chemical summary page that includes OPP-wide decisions in progress for that chemical and more. 


OPP Explorer is implemeted as a Ruby on Rails project with minimal server-side code and using JQuery to pull AJAX JSON API calls and compose the page. The current version of code is of prototype level. 

## Developer Setup

To get OPP explorer running on a developer machine:

1. Clone the repository
2. Run 'bundle exec install'
3. rails s

## Dependencies
This web application reads all of its data from OPP's central API layer. 

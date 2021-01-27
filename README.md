# HereProject

This Web App is a navigation application, which suggests the safest way from a source to a destination taking the accidents data into account. Google/Here maps typically suggests the minimum time route, our app on the other hand uses the Here Maps APIs avoiding the accident prone neighbourhoods in Toronto.

We applied the two machine learning strategies of K-Means Clustering and Classification models to determine the severity of an accident as well as the accident prone neighbourhoods. 

Finally, we prepared a navigation application which avoids the accident prone areas on top of the APIs pro- vided by HereMaps and the data results from Machine Learning, in addition to other functions.

##  WebApp Demo(Angular)

### Default route suggested by Google Maps:
The below screenshot shows the default route, which passes through the green highlighted region.

The green region is an accident-prone region and shall be avoided.



![Alt text](s1.png?raw=true "Title")

### Rerouted by Web App:
Our web-application suggests the route which avoids all the accident heavy routes.


![Alt text](s2.png?raw=true "Title")



## Submission
Final project codebase for the project submission of coursework EECS 6414 at York University.


## Data Set
We use the [KSI Dataset](https://www.google.com) published by toronto police, containing the accident list and its severity.
This dataset includes all traffic collisions events where a person was either Killed or Seriously Injured (KSI) from 2006 – 2019. For more information about Killed or Seriously Injured (KSI) statistics click



## K-Means Clustering with elbow method
We finally used K-Means clustering with embow method. Below are the stats:

![Alt text](k-means.png?raw=true "Title")

![Alt text](elbow.png?raw=true "Title")



## How to Run
* `npm install`
* `ng build`
* `ng serve` for a dev server. Navigate to `http://localhost:4200/`
The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

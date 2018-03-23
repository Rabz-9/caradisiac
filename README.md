# CARADISIAC

> Drive comfortably

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Introduction](#introduction)
- [Setup](#setup)
- [Description](#description)
- [Populate](#populate)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

[caradisiac.com](http://www.caradisiac.com/fiches-techniques) provides a tone of technical records related to car specification.

## Setup

First of all, to launch the project we need a device with 'NodeJs' installed. You can install it [here](https://nodejs.org/en/)

Then, we have to install all the packages required for the project. To achieved that use the following commands :

* Install the packages :

```js
npm install
```

* Launch the app :

```js
npm run dev
```

## Description

**Build an api that get the list of SUV with the higher rate and the higher volume (car boot)**

The api

* listen port `9292`
* provide endpoint `/populate` to index records to Elasticsearch
* provide endpoint `/suv` that return list of paginated higher rate and higher volume suv

## Populate

1. Use the package [node-car-api](https://github.com/92bondstreet/node-car-api) to get all records in json format

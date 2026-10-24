# TFL Expenses App

[![CI](https://github.com/AlexBramhill/tfl-expenses-calculator/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/AlexBramhill/tfl-expenses-calculator/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/AlexBramhill/tfl-expenses-calculator)](https://github.com/AlexBramhill/tfl-expenses-calculator/releases)
![Node.js 24+](https://img.shields.io/badge/node-24%2B-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
[![Biome](https://img.shields.io/badge/lint-biome-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

Tired of calculating TFL expenses? This tool provides several useful summaries to make expensing a breeze.

![screenshot](screenshot/app.png)

## Table of contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Uninstall](#uninstall)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Features](#features)
  - [Configure multiple home and office stations](#configure-multiple-home-and-office-stations)
  - [Set stations straight from a journey](#set-stations-straight-from-a-journey)
  - [Highlight anomalies at a glance](#highlight-anomalies-at-a-glance)
  - [Group by file or by month](#group-by-file-or-by-month)
  - [Count office days by week](#count-office-days-by-week)
  - [Paginate long journey lists](#paginate-long-journey-lists)

## Installation

### Prerequisites

- Node.js 24+ and npm

Without linking:
```
npm install
npm run start
```

With linking (adds tfl command in terminal)
```
npm install
npm run build
npm link
```

Remove the link with
```
npm unlink -g tfl-expenses-calculator
```

- Run for the first time will create a config file in `~/.tfl-expense-calculator/config.json`
- Download your Pay as you go journey history CSV from your TfL account and drop it in the app folder (default `~/.tfl-expense-calculator/`, configurable in settings)

## Keyboard shortcuts

- `w` home, `s` settings, `r` help, `q` quit
- `Tab`/`Shift+Tab` to move focus between panels, arrow keys to scroll the focused one
- `t` to toggle grouping by file or month
- `f` to toggle fullscreen for the focused panel
- `Enter` on a journey to open it, then `←`/`→` to set its stations as home, office, both or none

## Features

### Configure multiple home and office stations

Like a little walk after work? Set multiple home and office stations so you don't miss a trip.

![multiple stations](screenshot/multiple-stations.gif)

### Set stations straight from a journey

Spotted a trip that should count? Open it with `Enter` and mark its stations as home, office or both without leaving
your journeys.

![station roles](screenshot/station-roles.gif)

### Highlight anomalies at a glance

Get an overview of your tube journeys while still having the details easily accessible and verifiable. Clearly see any
anomalies in accounting.

![summaries](screenshot/summaries.gif)

### Group by file or by month

Swap between arrange by file and by month. No more having to juggle multiple files.

![group by](screenshot/group-by.gif)

### Count office days by week

Per diems made easy with a weekly sum of how many days you were in the office. Never miss a day with smart highlighting
of incomplete weeks

![weekly summary](screenshot/weekly-summary.gif)

### Paginate long journey lists

Travel a lot in a month? Look at all your journeys with ease.

![pagination](screenshot/pagination.gif)

### Focus on one panel

Don't let a small screen get in the way of doing your expenses. Expand your focuses panel with `f`.

![fullscreen](screenshot/fullscreen.gif)

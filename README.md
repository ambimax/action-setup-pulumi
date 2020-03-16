<h1 align="center">ambimax/action-setup-pulumi</h1>

<p align="center">
  GitHub Action to install pulumi CLI.
</p>

<br>


## Introduction

Github Action to install a specific version of `pulumi` CLI (http://pulumi.com).

This action takes a large portion of its code from [https://github.com/prepor/setup-pulumi](prepor/setup-pulumi).


## Usage

```yml
name: Print pulumi version

on:
  push:
    branches:
      - master

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: ambimax/action-setup-pulumi@v1
      with:
        version: 1.12.1

    - run: pulumi version
```

The version is optional but it is highly recommended to specify it.


## Development

Clone this repository

```
git clone https://github.com/ambimax/action-setup-pulumi
```

Install all dependencies

```
yarn
```

Build the project

```
yarn build
```

Once done, commit the lib folder to a new feature branch and create a pull request.


## Author Information

- [Andrew Rudenko](https://github.com/prepor), original author
- [Tobias Faust](https://github.com/FaustTobias), [ambimax® GmbH](https://ambimax.de)

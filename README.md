# Commit Conf 2018 - Adding software quality with Puppeteer

## Introduction
Within this repo are hosted the examples used in my about Puppeteer and its use for giving quality to web applications beyond the unit testing. This talk aims to show different approaches to complement other traditional quality assurance techniques. The presentation can be found [here](https://es.slideshare.net/sema_hkd/commit-conf-2018-testing-qa-y-puppeteer)

## Examples
The examples are structured in the following way:

### Basic Examples
Small unit examples to show how Puppeteer could be used: navigation, click, write a text, take a screenshot...

### Advanced Examples
Advanced examples like:
- HTTP Interceptors: example to intercept all HTTP requests and abort those that retrieve images.
- Disable JavaScript: disable the load of JavaScript content in order to check the application's behavior.
- Generate PDF: generate a PDF from the current content.
- Tracing: generate profiling information like network requests, frames, screenshots, memory...
- Complex navigation: an example of how different basic commands can be combined to perform navigation over a web page.

### Use cases
Some typical use cases:
#### Performance
- 01-coverage: uses Chrome's feature about CSS and JS coverage.
- 02-service-worker: tests for the correct caching feature of ServiceWorkers.
- 03-network-throttle: simulates low bandwith.
- 04-ssr-seo: Server Side Rendering feature implemented as Lambda / Cloud Function.
- 05-lighthouse: evaluation of web application through Lighthouse and get a file with the stats.

### Backup files
As this examples are designed to show them during the talk, if some problem occurs, this folder contains the generated files to display results.

## Questions and improvements
Some question, doubt or improvement, please, open an issue.

## Contributions
Please, if you want to contribute, fork and make a PR :-)

Thanks!

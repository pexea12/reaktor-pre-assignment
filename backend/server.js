const fs = require('fs')
const http = require('http')


const STATUS_FILE_PATH = process.env.STATUS_FILE_PATH || './status'
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000

fs.readFile(STATUS_FILE_PATH, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  // Split packages
  const rawItems = data.split('\n\n')
    .filter(item => item.startsWith('Package'))

  // To quickly search for a package
  const itemDict = {}

  const items = rawItems.map((item, index) => {
    const package = {
      index,
      reverse_depends: [],
    }

    // Find name
    package.name = item.match(/(?<=Package: ).+/)[0]
    itemDict[package.name] = index

    // Find description
    const descriptionSearch = item.match(/(?<=Description: )[\s\S]+?(?=\n[A-Z])/)
    package.description = descriptionSearch && descriptionSearch[0].replace('\n', '<br/>')

    // Format dependencies, remove version
    const dependsSearch = item.match(/(?<=Depends: ).+/)
    if (dependsSearch) {
      const dependsList = dependsSearch[0].split(', ')
      package.depends = dependsList.map((depend) => {
        return depend.replace(/ \(.+\)/, '')
          .split(' | ')
      })
    } else package.depends = []

    return package
  })

  // Calculate reverse dependencies
  items.forEach((item, index) => {
    item.depends.forEach((depend, index) => {
      depend.forEach((package, index) => {
        if (itemDict[package]) {
          items[itemDict[package]].reverse_depends.push(item.name)
        }
      })
    })
  })

  // Add HTML links to reverse dependencies
  items.forEach((item, index) => {
    // Create a Set to remove duplicate values
    item.reverse_depends = [...new Set(item.reverse_depends)]
      .map((package) => {
        return `<a href="#${package}">${package}</a>`
      })
      .join(', ')
  })


  // Add HTML links to dependencies
  items.forEach((item) => {
    item.depends.forEach((depend, index) => {
      // Remove duplicate packages
      item.depends[index] = [...new Set(depend)]

      item.depends[index].forEach((package, packageIndex) => {
        // In case the dependency is in the list
        if (itemDict[package])
          item.depends[index][packageIndex] = `<a href="#${package}">${package}</a>`
      })

      item.depends[index] = item.depends[index].join(' | ')
    })

    // Remove duplicate packages
    item.depends = [...new Set(item.depends)]

    item.depends = item.depends.join(', ')
  })


  // Start server
  const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(generateHTML(items))
  })

  server.listen(PORT, HOST, () => {
    console.log(`Server running at ${HOST}:${PORT}`)
  })
})


// Generate HTML function
const generateHTML = (items) => {
  const htmlItems = items.map((item) => {
    return `
      <tr id="${item.name}">
        <td>${item.index + 1}</td>
        <td>
          <a href="#${item.name}">${item.name}</a>
        </td>
        <td>${item.description || 'None'}</td>
        <td>${item.depends}</td>
        <td>${item.reverse_depends}</td>
      </tr>
    `
  })

  return `
    <html>
      <head>
        <title>Dependencies</title>
        <style>
          td, th {
            border: 1px solid black;
          }

          :target {
            -webkit-animation: target-fade 1s;
            -moz-animation: target-fade 1s;
            -o-animation: target-fade 1s;
            animation: target-fade 1s;
          }

          @-webkit-keyframes target-fade {
            from { background-color: yellow; } /* [1] */
            to { background-color: transparent; }
          }

          @-moz-keyframes target-fade {
            from { background-color: yellow; } /* [1] */
            to { background-color: transparent; }
          }

          @-o-keyframes target-fade {
            from { background-color: yellow; } /* [1] */
            to { background-color: transparent; }
          }

          @keyframes target-fade {
            from { background-color: yellow; } /* [1] */
            to { background-color: transparent; }
          }
        </style>
      </head>
      <body>
        <h1>${items.length} package(s)</h1>
        <table>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Description</th>
            <th>Dependencies</th>
            <th>Reverse dependencies</th>
          </tr>

          ${htmlItems.join('')}
        </table>
      </body>
    </html>
  `
}

class ProductController {
  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response 
  */
  getAll(request, response) {
    console.log(`there all URL GET params ${request.query}`)
    response.send('get all products')
  }
  /**
 * @param {import("express").Request} request
 * @param {import("express").Response} response 
 */
  create(request, response) {
    console.log(`there POST method body ${request.body}`)
    response.send('created new one product')
  }
}


module.exports = new ProductController()

var request = require('supertest')
    , app = require('../app')

describe("Test http request", function () {
    it("Show all categories", function (done) {
        request(app)
            .get("/categories")
            .expect(200, done)
    })
    it('Create a new category', function (done) {
        request(app)
            .post('/categories')
            .type('json')
            .send({'category': { name: "Candy" }})
            .expect(201, done)
    });
    it('Show products list from category', function (done) {
        request(app)
            .get("/categories/1/products")
            .expect(200, done)
    });
    it('Create a new product in the category', function (done) {
        request(app)
            .post('/categories/1/products')
            .type('json')
            .send({'product': { name: "Butter" , price: 2.6}})
            .expect(201, done)
    });
    it('Delete product from category', function (done) {
        request(app)
            .delete('/products/1')
            .expect(204, done)
    });
})
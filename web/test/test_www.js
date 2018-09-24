var request = require('supertest')
    , app = require('../app')

describe("Show all categories", function () {
    it("list categories", function (done) {
        request(app)
            .get("/categories")
            .expect(200, done)
    })
});
describe("Create a new category", function () {
    it('correct json', function (done) {
        request(app)
            .post('/categories')
            .type('json')
            .send({'category': {name: "Candy"}})
            .expect(201, done)
    });
    it('bad json', function (done) {
        request(app)
            .post('/categories')
            .type('json')
            .send({})
            .expect(400, done)

    });
});
describe("Show products list from category", function () {
    it('get', function (done) {
        request(app)
            .get("/categories/1/products")
            .expect(200, done)
    });
});
describe("Create a new product in the category", function () {
    it('correct json', function (done) {
        request(app)
            .post('/categories/1/products')
            .type('json')
            .send({'product': { name: "Butter" , price: 2.6}})
            .expect(201, done)
    });
});
describe("Delete product from category", function () {
    it('correct id', function (done) {
        request(app)
            .delete('/products/1')
            .expect(204, done)
    });
})
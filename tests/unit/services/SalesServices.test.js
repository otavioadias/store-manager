const { describe, it } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const salesModels = require("../../../src/models/salesModels.js");
const salesServices = require("../../../src/services/salesServices");
const {
  allProductsResponse,
  rightProductBody,
  productCreateResponse,
} = require("../../../__tests__/_dataMock");

const saleById = [
  {
    date: "2022-09-15T18:20:00.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2022-09-15T18:20:00.000Z",
    productId: 2,
    quantity: 10,
  },
];

describe("Teste de unidade do salesServices", () => {
  describe("Retorna um objeto com o id correspondente", () => {
    beforeEach(async () => {
      sinon.stub(salesModels, "getSaleById").resolves(saleById);
    });
    afterEach(async () => salesModels.getSaleById.restore());

    it("Retorna um objeto com o id correspondente", async () => {
      const result = await salesServices.getSaleById(1);
      expect(result.message).to.be.deep.equal(saleById);
    });
  });

  describe("Retorna um array", async () => {
    before(async () => {
      sinon.stub(salesModels, "getAllSales").resolves([]);
    });
    after(async () => salesModels.getAllSales.restore());
    it("Retorna um array", async () => {
      const result = await salesServices.getAllSales();
      expect(result).to.be.an("array");
    });
  });
});



// describe("Teste se é adicionado um novo produto - Camada Service", async () => {
//   before(async () => {
//     sinon.stub(productsModels, "insertProduct").resolves({ insertId: 4 });
//   });
//   after(async () => productsModels.insertProduct.restore());
//   it("Teste se é adicionado um novo produto - Camada Service", async () => {
//     const result = await productsServices.insertProduct(rightProductBody);
//     expect(result.insertId).to.equal(4);
//   });
// });

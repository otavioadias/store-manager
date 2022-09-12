const { describe, it } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");


const productsModels = require("../../../src/models/productsModels.js");
const productsServices = require("../../../src/services/productsServices.js");
const { allProductsResponse } = require("../../../__tests__/_dataMock");

describe("Teste de unidade do productsControllers", () => {
  describe("Retorna uma mensagem de erro se perquisar um id inexistente e um objeto com o id correspondente", async () => {
    it("Retorna uma mensagem de erro", async () => {
      before(async () => {
        sinon
          .stub(productsModels, "getProductById")
          .resolves(999);
      });

      const result = await productsServices.getProductById(999);

      expect(result.message).to.be.deep.equal({
        message: "Product not found",
      });

      after(async () => sinon.restore());
    });

    it("Retorna um objeto com o id correspondente", async () => {
      before(async () => {
        sinon.stub(productsModels, "getProductById").resolves(1);
      });

      const result = await productsServices.getProductById(1);
      expect(result.message).to.be.deep.equal(allProductsResponse[0]);

      after(async () => sinon.restore());
    });

     it("Retorna um array", async () => {
       before(async () => {
         sinon.stub(productsModels, "getAllProducts").resolves();
       });

       const result = await productsServices.getAllProducts();
       expect(result).to.be.deep.equal(allProductsResponse);

       after(async () => sinon.restore());
     });
  });
});

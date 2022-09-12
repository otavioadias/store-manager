const { describe, it } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chai = require("chai");
chai.use(sinonChai);

const productsControllers = require("../../../src/controllers/productsControllers.js");
const productsServices = require("../../../src/services/productsServices.js");

const { allProductsResponse } = require("../../../__tests__/_dataMock");

describe("Teste de unidade do productsControllers", () => {
  describe("Retorna uma mensagem de erro se perquisar um id inexistente e um objeto com o id correspondente", async () => {
    before(async () => {
      sinon
        .stub(productsServices, "getProductById")
        .onFirstCall()
        .resolves({ type: 404, message: { message: "Product not found" } })
        .onSecondCall()
        .resolves({ type: 200, message: allProductsResponse[0] })
        .onThirdCall()
        .resolves({ type: 200, message: allProductsResponse });
    });

    it("Retorna uma mensagem de erro", async () => {
      const res = {};
      const req = { params: { id: 999 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    it("Retorna um objeto", async () => {
      const res = {};
      const req = { params: { id: 1 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        name: "Martelo de Thor",
      });
    });

    after(async () => sinon.restore());
  });
  
  describe("Retorna um array com os dados", async () => {
    before(async () => {
      sinon
        .stub(productsServices, "getAllProducts")
        .onFirstCall()
        .resolves({ type: 200, message: allProductsResponse });
    });
    const res = {};
    const req = { params: {}, body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsControllers.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsResponse);

    after(async () => sinon.restore());
  });

});

const { describe, it } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chai = require("chai");
chai.use(sinonChai);

const salesControllers = require("../../../src/controllers/salesControllers.js");
const salesServices = require("../../../src/services/salesServices.js");

const {
  saleCreateResponse,
  rightSaleBody,
} = require("../../../__tests__/_dataMock");

describe("Teste de unidade do salesControllers", () => {
  describe("Cadastrar um novo produto - Camada Sale Controller", async () => {
    before(async () => {
      sinon
        .stub(salesServices, "insertSalesProducts")
        .resolves(saleCreateResponse);
    });
    const res = {};
    const req = { params: {}, body: rightSaleBody };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.insertSalesProducts(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleCreateResponse);

    after(async () => sinon.restore());
  });
});

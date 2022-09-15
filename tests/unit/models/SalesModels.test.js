const { expect } = require("chai");
const { describe, it } = require("mocha");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chai = require("chai");
chai.use(sinonChai);

const salesModels = require('../../../src/models/salesModels.js');
const conn = require("../../../src/models/connection.js");
const date = new Date();

const {
  saleCreateResponse,
  rightSaleBody,
} = require("../../../__tests__/_dataMock");

describe("Teste de unidade da salesModels", () => {
  describe("Teste do insertSales", () => {
    before(async () => {
      sinon.stub(conn, "execute").resolves([{ insertId: 3 }]);
    });

    after(async () => conn.execute.restore());

    it("Teste se é adicionado uma nova venda - Camada Model", async () => {
      const result = await salesModels.insertSales(date);
      expect(result.insertId).to.equal(3);
    });
  });

  describe("Teste do insertSales", () => {
    before(async () => {
      sinon.stub(conn, "execute").resolves(true);
    });

    after(async () => conn.execute.restore());
    const inputSale = [
      {
        productId: 1,
        quantity: 3,
      },
    ]; 
    it("Teste se é adicionado uma relação da nova venda com os produtos - Camada Model", async () => {
      const result = await salesModels.insertSalesProducts(3, inputSale);
      expect(result).to.be.true;
    });
  });

  
});
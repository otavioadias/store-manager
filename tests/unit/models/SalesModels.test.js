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
  it("Teste se é adicionado uma nova venda - Camada Model", async () => {
    before(async () => {
      sinon.stub(conn, "execute").resolves(new Date());
    });

    const result = await salesModels.insertSales(date);
    
    expect(result.insertId).to.equal(3);

    after(async () => sinon.restore());
  });

  // it("Teste se é adicionado uma relação da nova venda com os produtos - Camada Model", async () => {
  //   before(async () => {
  //     sinon.stub(conn, "execute").resolves(saleCreateResponse);
  //   });

  //   const result = await salesModels.insertSalesProducts(3, rightSaleBody);

  //   expect(result).to.have.length.equal(2);

  //   after(async () => sinon.restore());
  // });
});
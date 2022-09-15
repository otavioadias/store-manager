const { expect } = require("chai");
const { describe, it } = require("mocha");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chai = require("chai");
chai.use(sinonChai);

const productsModels = require('../../../src/models/productsModels.js');
const conn = require("../../../src/models/connection.js");
const {
  allProductsResponse,
  rightProductBody,
} = require("../../../__tests__/_dataMock");

describe('Teste de unidade do productsModels', () => {
  describe("Retorna um array", async () => {
     before(async () => {
       sinon.stub(conn, "execute").resolves(allProductsResponse);
     });
     after(async () => sinon.restore());
      it("Retorna um array", async () => {
        const allProducts = await productsModels.getAllProducts();
        expect(allProducts).to.be.an('array');
      });
  });

  describe("Retorna um objeto de acordo com o id pesquisado", async () => {
    before(() => {
      sinon.stub(conn, "execute").resolves(allProductsResponse[0]);
    });
    after(() => sinon.restore());
      it("Retorna um objeto de acordo com o id pesquisado", async () => {
        const productOne = await productsModels.getProductById(1);
        expect(productOne).to.be.deep.equal(allProductsResponse[0]);
      });
  });

  describe('Teste se é adicionado um novo produto - Camada Model', async () => {
    before(async () => {
      sinon.stub(conn, "execute").resolves([{ insertId: 6 }]);
    });
    after(async () => sinon.restore());
      it('Teste se é adicionado um novo produto - Camada Model', async () => {
        const result = await productsModels.insertProduct(rightProductBody);
        expect(result.insertId).to.equal(6);
      });
  });
});
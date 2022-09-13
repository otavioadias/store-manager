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
  it("Retorna um array", async () => {
     before(() => {
       sinon.stub(productsModels, "execute").resolves(allProductsResponse);
     });
    
    const allProducts = await productsModels.getAllProducts();
    expect(allProducts).to.be.an('array');

    after(() => sinon.restore());
  });

  it("Retorna um objeto de acordo com o id pesquisado", async () => {
    before(() => {
      sinon.stub(productsModels, "execute").resolves(allProductsResponse[0]);
    });

    const [productOne] = await productsModels.getProductById(1);
    expect(productOne).to.be.deep.equal(allProductsResponse[0]);

    after(() => sinon.restore());
  });

  it('Teste se é adicionado um novo produto - Camada Model', async () => {
    before(async () => {
      sinon.stub(conn, "execute").resolves([{ insertId: 6 }]);
     });

    const result = await productsModels.insertProduct(rightProductBody);
    expect(result.insertId).to.equal(6);

    after(async () => sinon.restore());
  });
});
const { expect } = require("chai");
const { describe, it } = require("mocha");
const sinon = require("sinon");

const productsModels = require('../../../src/models/productsModels.js');
const { allProductsResponse } = require('../../../__tests__/_dataMock');

describe('Teste de unidade do productsModels', () => {
  it("Retorna um array", async () => {
     before(() => {
       sinon.stub(productsModels, "execute").resolves(allProductsResponse);
     });
    
    const allProducts = await productsModels.getAllProducts();
    expect(allProducts).to.be.deep.equal(allProductsResponse);

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
});
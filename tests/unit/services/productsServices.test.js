const { describe, it } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const productsModels = require("../../../src/models/productsModels.js");
const productsServices = require("../../../src/services/productsServices");
const {
  allProductsResponse,
  rightProductBody,
  productCreateResponse,
} = require("../../../__tests__/_dataMock");

describe("Teste de unidade do productsServices", () => {
  describe("Retorna uma mensagem de erro se perquisar um id inexistente", () => {
    before(async () => {
      sinon
        .stub(productsModels, "getProductById")
        .resolves( [{message: {message: "Product not found"}}] );
    });
    after(async () => productsModels.getProductById.restore());

    it("Retorna uma mensagem de erro", async () => {
      const result = await productsServices.getProductById(9);
      expect(result.message).to.be.undefined;
    });
  });
});

describe("Retorna um objeto com o id correspondente", () => {
  beforeEach(async () => {
    sinon
      .stub(productsModels, "getProductById")
      .resolves([allProductsResponse]);
  });
  afterEach(async () => productsModels.getProductById.restore());

  it("Retorna um objeto com o id correspondente", async () => {
    const result = await productsServices.getProductById(1);
    console.log('correct', result);
    expect(result.message).to.be.deep.equal(allProductsResponse[0]);
  });
});

describe("Retorna um array", async () => {
  before(async () => {
    sinon.stub(productsModels, "getAllProducts").resolves([]);
  });
  after(async () => productsModels.getAllProducts.restore());
  it("Retorna um array", async () => {
    const result = await productsServices.getAllProducts();
    expect(result).to.be.an("array");
  });
});

describe('Teste se é adicionado um novo produto - Camada Service', async () => {
  before(async () => {
    sinon.stub(productsModels, "insertProduct").resolves({ insertId: 4 });
  });
  after(async () => productsModels.insertProduct.restore());
  it('Teste se é adicionado um novo produto - Camada Service', async () => {
    const result = await productsServices.insertProduct(rightProductBody);
    expect(result.insertId).to.equal(4);
  });
});

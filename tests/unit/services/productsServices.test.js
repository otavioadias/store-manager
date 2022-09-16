const { describe, it } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const productsModels = require("../../../src/models/productsModels.js");
const productsServices = require("../../../src/services/productsServices");
const {
  allProductsResponse,
  rightProductBody,
  productSearchNameResponse,
} = require("../../../__tests__/_dataMock");

  describe("Retorna uma mensagem de erro se perquisar um id inexistente", () => {
    before(async () => {
      sinon
        .stub(productsModels, "getProductById")
        .resolves([{ type: 404, message: { message: "Product not found" } }]);
    });
    after(async () => productsModels.getProductById.restore());

    it("Retorna uma mensagem de erro", async () => {
      const result = await productsServices.getProductById(9);
      console.log(result);
      expect(result.message).to.be.undefined;
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
  
 describe("Deleta um produto com o id correspondente", () => {
   beforeEach(async () => {
     sinon.stub(productsModels, "deleteProductById").resolves({ type: 204 });
   });
   afterEach(async () => productsModels.deleteProductById.restore());

   it('Deleta produto', async() => {
     const result = await productsModels.deleteProductById(1);
     expect(result).to.be.deep.equal({ type: 204 });
   })
 });

describe('Retorna false caso tente deletar um produto com id inexistente', () => {
  beforeEach(async () => {
    sinon
      .stub(productsModels, "deleteProductById")
      .resolves({ type: 404, message: { message: "Product not found" } });
  });
  afterEach(async () => productsModels.deleteProductById.restore());

  it('Retorna false', async () => {
    const result = await productsModels.deleteProductById(99);
    expect(result).to.be.deep.equal({ type: 404, message: { message: 'Product not found' } });
  });
});

describe('Retorna um produto quando pesquisado um termo do name', () => {
  beforeEach(async () => {
    sinon
      .stub(productsModels, "findProductByName")
      .resolves(productSearchNameResponse);
  });
  afterEach(async () => productsModels.findProductByName.restore());

  it('Retorna o produto pesquisado', async () => {
    const result = await productsServices.findProductByName("Martelo");
    expect(result.message).to.be.equal(productSearchNameResponse[0]);
  });
});

describe("Retorna todos os produtos quando pesquisado um termo do name inexistente", () => {
  beforeEach(async () => {
    sinon
      .stub(productsModels, "findProductByName")
      .resolves([allProductsResponse]);
  });
  afterEach(async () => productsModels.findProductByName.restore());

  it("Retorna o produto pesquisado", async () => {
    const result = await productsServices.findProductByName("Submarino");
    expect(result.message).to.be.equal(allProductsResponse);
  });
});
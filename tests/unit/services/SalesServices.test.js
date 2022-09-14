// const { describe, it } = require("mocha");
// const { expect } = require("chai");
// const sinon = require("sinon");
// const chai = require("chai");


// const productsModels = require("../../../src/models/productsModels.js");
// const productsServices = require("../../../src/services/productsServices.js");
// const { allProductsResponse , rightProductBody,
//   productCreateResponse,} = require("../../../__tests__/_dataMock");

// describe("Teste de unidade do productsServices", () => {
//   describe("Retorna uma mensagem de erro se perquisar um id inexistente e um objeto com o id correspondente", async () => {
//     it("Retorna uma mensagem de erro", async () => {
//       before(async () => {
//         sinon
//           .stub(productsModels, "getProductById")
//           .resolves(999);
//       });

//       const result = await productsServices.getProductById(999);

//       expect(result.message).to.be.deep.equal({
//         message: "Product not found",
//       });

//       after(async () => sinon.restore());
//     });

//     it("Retorna um objeto com o id correspondente", async () => {
//       before(async () => {
//         sinon.stub(productsModels, "getProductById").resolves(1);
//       });

//       const result = await productsServices.getProductById(1);
//       expect(result.message).to.be.deep.equal(allProductsResponse[0]);

//       after(async () => sinon.restore());
//     });

//      it("Retorna um array", async () => {
//        before(async () => {
//          sinon.stub(productsModels, "getAllProducts").resolves();
//        });

//        const result = await productsServices.getAllProducts();
//        expect(result).to.be.an('array');

//        after(async () => sinon.restore());
//      });
//   });

//   describe('Teste se é adicionado um novo produto - Camada Service', async () => {
//     before(async () => {
//       sinon.stub(productsModels, "insertProduct").resolves([{ insertId: 4 }]);
//     });
    
//     const result = await productsServices.insertProduct(rightProductBody);
//     expect(result.insertId).to.equal(4);
   
//     after(async () => sinon.restore());
//   });
// }); 

/* eslint-disable @typescript-eslint/no-require-imports */

const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

const exportData = async () => {
  try {
    // Buscar todos os restaurantes com suas relações
    const restaurants = await prisma.restaurant.findMany({
      include: {
        menuCategories: {
          include: {
            products: true,
          },
        },
        orders: {
          include: {
            orderProducts: true,
          },
        },
      },
    });

    // Criar a estrutura do arquivo seed.ts
    let seedFileContent = `/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const main = async () => {
  // Limpar o banco de dados antes de inserir novos dados
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.restaurant.deleteMany();

`;

    // Processar cada restaurante
    for (const restaurant of restaurants) {
      const { menuCategories, orders, ...restaurantData } = restaurant;

      seedFileContent += `
  // Criando restaurante: ${restaurantData.name}
  const restaurant_${restaurantData.id.replace(/-/g, "_")} = await prisma.restaurant.create({
    data: ${JSON.stringify(restaurantData, null, 2)}
  });

`;

      // Processar categorias de menu
      for (const category of menuCategories) {
        const { products, ...categoryData } = category;

        seedFileContent += `
  // Criando categoria: ${categoryData.name}
  const category_${categoryData.id.replace(/-/g, "_")} = await prisma.menuCategory.create({
    data: {
      ...${JSON.stringify({ ...categoryData, restaurantId: undefined }, null, 2)},
      restaurantId: restaurant_${restaurantData.id.replace(/-/g, "_")}.id,
    }
  });

`;

        // Processar produtos
        if (products.length > 0) {
          seedFileContent += `
  // Criando produtos para categoria: ${categoryData.name}
  await prisma.product.createMany({
    data: [
`;

          for (const product of products) {
            seedFileContent += `      {
        ...${JSON.stringify({ ...product, restaurantId: undefined, menuCategoryId: undefined }, null, 2)},
        restaurantId: restaurant_${restaurantData.id.replace(/-/g, "_")}.id,
        menuCategoryId: category_${categoryData.id.replace(/-/g, "_")}.id,
      },
`;
          }

          seedFileContent += `    ],
  });

`;
        }
      }

      // Processar pedidos (caso necessário)
      if (orders.length > 0) {
        seedFileContent += `
  // Opcionalmente, você pode adicionar código para restaurar os pedidos
  // Isso é necessário apenas se você precisar manter o histórico de pedidos
  
`;
      }
    }

    // Finalizar o arquivo
    seedFileContent += `
  console.log('Seed concluído com sucesso!');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

    // Escrever o conteúdo no arquivo seed-export.ts
    fs.writeFileSync("prisma/seed-export.ts", seedFileContent);

    console.log("Arquivo de seed gerado com sucesso: prisma/seed-export.ts");
  } catch (error) {
    console.error("Erro ao exportar dados:", error);
  } finally {
    await prisma.$disconnect();
  }
};

exportData();

/* eslint-disable @typescript-eslint/no-require-imports */
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


  // Criando restaurante: FSW Donalds
  const restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb = await prisma.restaurant.create({
    data: {
  "id": "41f762f7-ec11-45e2-b69d-20157fb15deb",
  "name": "FSW Donalds",
  "slug": "fsw-donalds",
  "description": "O melhor fast food do mundo",
  "avatarImageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy",
  "coverImageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQac8bHYlkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
  "createdAt": "2025-03-01T20:23:07.236Z",
  "updatedAt": "2025-03-01T20:23:07.236Z"
}
  });


  // Criando categoria: Combos
  const category_086eeab6_4e24_4fd8_bd9f_5f8ae945213b = await prisma.menuCategory.create({
    data: {
      ...{
  "id": "086eeab6-4e24-4fd8-bd9f-5f8ae945213b",
  "name": "Combos",
  "createdAt": "2025-03-01T20:23:08.438Z",
  "updatedAt": "2025-03-01T20:23:08.438Z"
},
      restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
    }
  });


  // Criando produtos para categoria: Combos
  await prisma.product.createMany({
    data: [
      {
        ...{
  "id": "567125e9-1736-4e08-8f2a-915a762367ad",
  "name": "McOferta Média Big Mac Duplo",
  "description": "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
  "price": 39.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
  "ingredients": [
    "Pão com gergilim",
    "Hambúrguer de carne 100% bovina",
    "Alface americana",
    "Queijo fatiado sabor cheddar",
    "Molho especial",
    "Cebola",
    "Picles"
  ],
  "createdAt": "2025-03-01T20:23:09.623Z",
  "updatedAt": "2025-03-01T20:23:09.623Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_086eeab6_4e24_4fd8_bd9f_5f8ae945213b.id,
      },
      {
        ...{
  "id": "5e330bd1-5dde-4415-9ed3-1ba9fd622c8f",
  "name": "Novo Brabo Melt Onion Rings",
  "description": "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
  "price": 41.5,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQeGQofnEPyQaHEV2WL8rGUs41oMICtYfNkphl",
  "ingredients": [
    "Pão tipo brioche",
    "Hambúrguer de carne 100% bovina",
    "Méquinese",
    "Maionese especial com sabor de carne defumada",
    "Onion rings",
    "Fatias de bacon",
    "Queijo processado sabor cheddar",
    "Molho lácteo com queijo tipo cheddar"
  ],
  "createdAt": "2025-03-01T20:23:09.623Z",
  "updatedAt": "2025-03-01T20:23:09.623Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_086eeab6_4e24_4fd8_bd9f_5f8ae945213b.id,
      },
      {
        ...{
  "id": "d7e32c71-ea35-49bf-95ff-a8372e339d0f",
  "name": "McCrispy Chicken Elite",
  "description": "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
  "price": 39.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQr12aTqPo3SsGjBJCaM7yhxnbDlXeL5N9dckv",
  "ingredients": [
    "Pão tipo brioche",
    "Batata",
    "Molho Honey&Fire",
    "Bacon em fatias",
    "Alface",
    "Tomate",
    "Queijo sabor cheddar",
    "Carne 100% de peito de frango"
  ],
  "createdAt": "2025-03-01T20:23:09.623Z",
  "updatedAt": "2025-03-01T20:23:09.623Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_086eeab6_4e24_4fd8_bd9f_5f8ae945213b.id,
      },
      {
        ...{
  "id": "8e43cc46-e3e7-44c3-8167-a9db2cd91432",
  "name": "Duplo Cheddar McMelt",
  "description": "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
  "price": 36.2,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQWdq0w8niS9XCLQu7Nb4jvBYZze16goaOqsKR",
  "ingredients": [
    "Pão escuro com gergelim",
    "Hambúrguer de carne 100% bovina",
    "Molho lácteo com queijo tipo cheddar",
    "Cebola ao molho shoyu"
  ],
  "createdAt": "2025-03-01T20:23:09.623Z",
  "updatedAt": "2025-03-01T20:23:09.623Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_086eeab6_4e24_4fd8_bd9f_5f8ae945213b.id,
      },
    ],
  });


  // Criando categoria: Lanches
  const category_624c486d_52da_4b6b_b145_f7706f7426ae = await prisma.menuCategory.create({
    data: {
      ...{
  "id": "624c486d-52da-4b6b-b145-f7706f7426ae",
  "name": "Lanches",
  "createdAt": "2025-03-01T20:23:10.798Z",
  "updatedAt": "2025-03-01T20:23:10.798Z"
},
      restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
    }
  });


  // Criando produtos para categoria: Lanches
  await prisma.product.createMany({
    data: [
      {
        ...{
  "id": "265baa5b-a7e8-4f26-a2fd-1503cc30f9f7",
  "name": "Big Mac",
  "description": "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
  "price": 39.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQKfI6fivqActTvBGLXfQe4a8CJ6d3HiR7USPK",
  "ingredients": [
    "Pão com gergilim",
    "Hambúrguer de carne 100% bovina",
    "Alface americana",
    "Queijo fatiado sabor cheddar",
    "Molho especial",
    "Cebola",
    "Picles"
  ],
  "createdAt": "2025-03-01T20:23:11.932Z",
  "updatedAt": "2025-03-01T20:23:11.932Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_624c486d_52da_4b6b_b145_f7706f7426ae.id,
      },
      {
        ...{
  "id": "c30e3dd0-d2f7-40bd-978d-30a75a88c9b6",
  "name": "Duplo Quarterão",
  "description": "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
  "price": 41.5,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ99rtECuYaDgmA4VujBU0wKn2ThXJvF3LHfyc",
  "ingredients": [
    "Pão tipo brioche",
    "Hambúrguer de carne 100% bovina",
    "Méquinese",
    "Maionese especial com sabor de carne defumada",
    "Onion rings",
    "Fatias de bacon",
    "Queijo processado sabor cheddar",
    "Molho lácteo com queijo tipo cheddar"
  ],
  "createdAt": "2025-03-01T20:23:11.932Z",
  "updatedAt": "2025-03-01T20:23:11.932Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_624c486d_52da_4b6b_b145_f7706f7426ae.id,
      },
      {
        ...{
  "id": "30144199-94e7-4f79-82ad-0e74a7e2fba5",
  "name": "McMelt",
  "description": "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
  "price": 39.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQUY0VlDTmvPeJLoyOjzNsMqFdxUI423nBl6br",
  "ingredients": [
    "Pão tipo brioche",
    "Batata",
    "Molho Honey&Fire",
    "Bacon em fatias",
    "Alface",
    "Tomate",
    "Queijo sabor cheddar",
    "Carne 100% de peito de frango"
  ],
  "createdAt": "2025-03-01T20:23:11.932Z",
  "updatedAt": "2025-03-01T20:23:11.932Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_624c486d_52da_4b6b_b145_f7706f7426ae.id,
      },
      {
        ...{
  "id": "60af330e-7d34-4e50-a9b6-4419e407d823",
  "name": "McNífico Bacon",
  "description": "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
  "price": 36.2,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBBmifbjzEVXRoycAtrP9vH45bZ6WDl3QF0a1",
  "ingredients": [
    "Pão escuro com gergelim",
    "Hambúrguer de carne 100% bovina",
    "Molho lácteo com queijo tipo cheddar",
    "Cebola ao molho shoyu"
  ],
  "createdAt": "2025-03-01T20:23:11.932Z",
  "updatedAt": "2025-03-01T20:23:11.932Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_624c486d_52da_4b6b_b145_f7706f7426ae.id,
      },
    ],
  });


  // Criando categoria: Fritas
  const category_93849142_233e_4464_b68b_ca8a35989372 = await prisma.menuCategory.create({
    data: {
      ...{
  "id": "93849142-233e-4464-b68b-ca8a35989372",
  "name": "Fritas",
  "createdAt": "2025-03-01T20:23:13.023Z",
  "updatedAt": "2025-03-01T20:23:13.023Z"
},
      restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
    }
  });


  // Criando produtos para categoria: Fritas
  await prisma.product.createMany({
    data: [
      {
        ...{
  "id": "d4291771-34fa-468b-9bab-dd04234a1a21",
  "name": "Fritas Grande",
  "description": "Batatas fritas crocantes e sequinhas. Vem bastante!",
  "price": 10.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQNd3jSNrcJroaszwjUAlM6iSO5ZTx2HV70t31",
  "ingredients": [],
  "createdAt": "2025-03-01T20:23:14.094Z",
  "updatedAt": "2025-03-01T20:23:14.094Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_93849142_233e_4464_b68b_ca8a35989372.id,
      },
      {
        ...{
  "id": "a8d91c3d-3e77-47fa-a02b-aef6b45dfb25",
  "name": "Fritas Média",
  "description": "Batatas fritas crocantes e sequinhas. Vem uma média quantidade!",
  "price": 9.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
  "ingredients": [],
  "createdAt": "2025-03-01T20:23:14.094Z",
  "updatedAt": "2025-03-01T20:23:14.094Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_93849142_233e_4464_b68b_ca8a35989372.id,
      },
      {
        ...{
  "id": "9c9aa357-4ead-4107-87f1-c24aa5bb3126",
  "name": "Fritas Pequena",
  "description": "Batatas fritas crocantes e sequinhas. Vem pouquinho (é bom pra sua dieta)!",
  "price": 5.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ5toOZxYa1oARJCUGh4EY3x8NjXHtvZ7lnVfw",
  "ingredients": [],
  "createdAt": "2025-03-01T20:23:14.094Z",
  "updatedAt": "2025-03-01T20:23:14.094Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_93849142_233e_4464_b68b_ca8a35989372.id,
      },
    ],
  });


  // Criando categoria: Bebidas
  const category_4145a4fb_2604_46c1_8c8e_4ad720d63a49 = await prisma.menuCategory.create({
    data: {
      ...{
  "id": "4145a4fb-2604-46c1-8c8e-4ad720d63a49",
  "name": "Bebidas",
  "createdAt": "2025-03-01T20:23:15.158Z",
  "updatedAt": "2025-03-01T20:23:15.158Z"
},
      restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
    }
  });


  // Criando produtos para categoria: Bebidas
  await prisma.product.createMany({
    data: [
      {
        ...{
  "id": "8ed73756-016f-4e1f-8066-d38c4300a1aa",
  "name": "Coca-cola",
  "description": "Coca-cola gelada para acompanhar seu lanche.",
  "price": 5.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
  "ingredients": [],
  "createdAt": "2025-03-01T20:23:16.238Z",
  "updatedAt": "2025-03-01T20:23:16.238Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_4145a4fb_2604_46c1_8c8e_4ad720d63a49.id,
      },
      {
        ...{
  "id": "bd7865dd-45d8-4c48-a643-30a8b4e45ca1",
  "name": "Fanta Laranja",
  "description": "Fanta Laranja gelada para acompanhar seu lanche.",
  "price": 5.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
  "ingredients": [],
  "createdAt": "2025-03-01T20:23:16.238Z",
  "updatedAt": "2025-03-01T20:23:16.238Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_4145a4fb_2604_46c1_8c8e_4ad720d63a49.id,
      },
      {
        ...{
  "id": "0c307c3c-3903-4e46-8cf4-b8e8126a91d9",
  "name": "Água Mineral",
  "description": "A bebida favorita do Cristiano Ronaldo.",
  "price": 2.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
  "ingredients": [],
  "createdAt": "2025-03-01T20:23:16.238Z",
  "updatedAt": "2025-03-01T20:23:16.238Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_4145a4fb_2604_46c1_8c8e_4ad720d63a49.id,
      },
    ],
  });


  // Criando categoria: Sobremesas
  const category_ad25260e_fd06_48f0_8884_290774dec39b = await prisma.menuCategory.create({
    data: {
      ...{
  "id": "ad25260e-fd06-48f0-8884-290774dec39b",
  "name": "Sobremesas",
  "createdAt": "2025-03-01T20:23:17.398Z",
  "updatedAt": "2025-03-01T20:23:17.398Z"
},
      restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
    }
  });


  // Criando produtos para categoria: Sobremesas
  await prisma.product.createMany({
    data: [
      {
        ...{
  "id": "71deba0b-6b74-4ec3-9595-4fe889ed97cc",
  "name": "Casquinha de Baunilha",
  "description": "Casquinha de sorvete sabor baunilha.",
  "price": 3.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQtfuQrAKkI75oJfPT0crZxvX82ui9qV3hLFdY",
  "ingredients": [],
  "createdAt": "2025-03-01T20:23:18.466Z",
  "updatedAt": "2025-03-01T20:23:18.466Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_ad25260e_fd06_48f0_8884_290774dec39b.id,
      },
      {
        ...{
  "id": "36ac1a88-4290-41a2-aeaf-52887db92a1f",
  "name": "Casquinha de Chocolate",
  "description": "Casquinha de sorvete sabor chocolate.",
  "price": 3.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
  "ingredients": [],
  "createdAt": "2025-03-01T20:23:18.466Z",
  "updatedAt": "2025-03-01T20:23:18.466Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_ad25260e_fd06_48f0_8884_290774dec39b.id,
      },
      {
        ...{
  "id": "8159e6ee-5964-43db-a866-1026bc77f637",
  "name": "Casquinha de Mista",
  "description": "Casquinha de sorvete sabor baunilha e chocolate.",
  "price": 2.9,
  "imageUrl": "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ4rBrtULypXmR6JiWuhzS8ALjVkrF3yfatC7E",
  "ingredients": [],
  "createdAt": "2025-03-01T20:23:18.466Z",
  "updatedAt": "2025-03-01T20:23:18.466Z"
},
        restaurantId: restaurant_41f762f7_ec11_45e2_b69d_20157fb15deb.id,
        menuCategoryId: category_ad25260e_fd06_48f0_8884_290774dec39b.id,
      },
    ],
  });


  // Opcionalmente, você pode adicionar código para restaurar os pedidos
  // Isso é necessário apenas se você precisar manter o histórico de pedidos
  

  // Criando restaurante: Arucará
  const restaurant_c0580798_24f3_43e2_8c2a_b0094d5ab349 = await prisma.restaurant.create({
    data: {
  "id": "c0580798-24f3-43e2-8c2a-b0094d5ab349",
  "name": "Arucará",
  "slug": "aruacara",
  "description": "Restaurante, Churrascaria e espaço para eventos",
  "avatarImageUrl": "https://img.freepik.com/vetores-premium/design-de-logotipo-de-churrasco-premium-moderno-simples-modelo-de-comida-ou-grelha_106546-1115.jpg?w=90",
  "coverImageUrl": "https://pixabay.com/pt/photos/shish-kebab-espeto-de-carne-417994/",
  "createdAt": "2025-03-02T04:07:09.317Z",
  "updatedAt": "2025-03-02T04:10:04.666Z"
}
  });


  // Criando categoria: Churrascos
  const category_98afe623_dade_45ba_828d_6e308616fbfa = await prisma.menuCategory.create({
    data: {
      ...{
  "id": "98afe623-dade-45ba-828d-6e308616fbfa",
  "name": "Churrascos",
  "createdAt": "2025-03-02T19:19:26.846Z",
  "updatedAt": "2025-03-02T19:19:26.846Z"
},
      restaurantId: restaurant_c0580798_24f3_43e2_8c2a_b0094d5ab349.id,
    }
  });


  // Criando categoria: Drinks
  const category_7e6a278c_cbf0_419b_89f8_66ff533ec324 = await prisma.menuCategory.create({
    data: {
      ...{
  "id": "7e6a278c-cbf0-419b-89f8-66ff533ec324",
  "name": "Drinks",
  "createdAt": "2025-03-02T19:19:33.778Z",
  "updatedAt": "2025-03-02T19:19:33.778Z"
},
      restaurantId: restaurant_c0580798_24f3_43e2_8c2a_b0094d5ab349.id,
    }
  });


  // Opcionalmente, você pode adicionar código para restaurar os pedidos
  // Isso é necessário apenas se você precisar manter o histórico de pedidos
  

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

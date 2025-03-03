// Este script pode ser executado manualmente no console da Vercel
// Vai ajudar a popular o banco de dados de produção com os restaurantes necessários

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Verifique se o restaurante já existe antes de criar
  const restaurants = [
    {
      slug: "fsw-donalds",
      name: "FSW Donalds",
      description: "Restaurante de fast food",
      avatarImageUrl: "/restaurants/fsw-donalds.jpg",
      coverImageUrl: "/restaurants/fsw-donalds-cover.jpg",
    },
    {
      slug: "ponto",
      name: "Ponto Restaurant",
      description: "Restaurante casual",
      avatarImageUrl: "/restaurants/fsw-donalds.jpg", // Usar mesma imagem temporariamente
      coverImageUrl: "/restaurants/fsw-donalds-cover.jpg", // Usar mesma imagem temporariamente
    },
    {
      slug: "arucara",
      name: "Arucara",
      description: "Culinária brasileira",
      avatarImageUrl: "/restaurants/fsw-donalds.jpg", // Usar mesma imagem temporariamente
      coverImageUrl: "/restaurants/fsw-donalds-cover.jpg", // Usar mesma imagem temporariamente
    },
  ];

  for (const restaurant of restaurants) {
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { slug: restaurant.slug },
    });

    if (!existingRestaurant) {
      await prisma.restaurant.create({
        data: restaurant,
      });
      console.log(`Restaurante ${restaurant.name} criado com sucesso!`);
    } else {
      console.log(`Restaurante ${restaurant.name} já existe, pulando...`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

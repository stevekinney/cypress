const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient();

async function main() {
	const deletePosts = prisma.post.deleteMany({});
	const deleteUsers = prisma.user.deleteMany({});

	await prisma.$transaction([deletePosts, deleteUsers]);

	console.log('All data has been cleared!');
}

module.exports = main;

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@cyberassassin.com'
  const password = process.env.ADMIN_PASSWORD || 'Cyberassassin@AdminPanel@123456'

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create or update admin user
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'admin',
    },
    create: {
      email,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  })

  console.log('✅ Admin user created/updated:', {
    id: user.id,
    email: user.email,
    role: user.role,
  })
  console.log('📧 Email:', email)
  console.log('🔑 Password:', password)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


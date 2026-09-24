import path from 'node:path';
import { PrismaClient } from '@/generated/prisma/client';

// always use prisma/dev.db from the project root (avoids empty relative DBs under .next)
const datasourceUrl = `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`;

export const db = new PrismaClient({ datasourceUrl });

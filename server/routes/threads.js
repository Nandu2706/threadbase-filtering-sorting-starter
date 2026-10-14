import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

// ─────────────────────────────────────────────────────────────
// GET /api/threads?search=<term>&sort=<newest|oldest>
//
// ⚠️  THIS IS THE STARTER (BROKEN) VERSION.
// It reads req.query correctly, but it filters and sorts an
// IN-MEMORY ARRAY with JavaScript after loading every row.
// Your job: replace the array logic with a real Prisma
// `where` + `orderBy` so the DATABASE does the filtering.
// ─────────────────────────────────────────────────────────────

router.get("/", async (req, res) => {
  try {
    const { search, sort } = req.query;

    // Build the database search condition
    const where = search
      ? {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {};

    // Build the database sorting condition
    const orderBy = {
      createdAt: sort === "oldest" ? "asc" : "desc",
    };

    // PostgreSQL handles filtering and sorting
    const threads = await prisma.thread.findMany({
      where,
      orderBy,
    });

    res.json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

export default router;

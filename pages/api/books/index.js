// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await addBook(req, res);
  } else if (req.method === "GET") {
    return await readBooks(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function addBook(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.bookSuggestion.create({
      data: {
        bookTitle: body.bookTitle,
        bookAuthor: body.bookAuthor,
        bookGenre: body.bookGenre,
      },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating book", success: false });
  }
}

async function readBooks(req, res) {
  try {
    const allBooks = await prisma.bookSuggestion.findMany();
    return res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
  }res.status(500).json({ error: "Error in getting books", success: false });
}


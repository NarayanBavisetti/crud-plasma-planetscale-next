import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  const bookId = parseInt(id);

  if (req.method === "GET") {
    return await getBook(req, res, bookId);
  } else if (req.method === "DELETE") {
    return await deleteBooks(req, res, bookId);
  } else if (req.method === "PATCH") {
    return await updateBooks(req, res, bookId);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function getBook(req, res, bookId) {
  try {
    const getBook = await prisma.bookSuggestion.findUnique({
      where: {
        id: bookId,
      },
    });
    return res.status(200).json(getBook);
  } catch (error) {
    console.log(error);
  }
  res.status(500).json({ error: "Error in getting books", success: false });
}

async function updateBooks(req, res, bookId) {
  const { bookTitle, bookAuthor, bookGenre } = req.body;
  try {
    const deleteBook = await prisma.bookSuggestion.update({
      where: {
        id: bookId,
      },
      data: {
        bookTitle,
        bookAuthor,
        bookGenre,
      },
    });
    return res.status(200).json(deleteBook);
  } catch (error) {
    console.log(error);
  }
  res.status(500).json({ error: "Error in editing books", success: false });
}

async function deleteBooks(req, res, bookId) {
  try {
    const deleteBook = await prisma.bookSuggestion.delete({
      where: {
        id: bookId,
      },
    });
    return res.status(200).json(deleteBook);
  } catch (error) {
    console.log(error);
  }
  res.status(500).json({ error: "Error in deleting books", success: false });
}

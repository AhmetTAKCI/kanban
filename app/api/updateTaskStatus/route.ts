import { prisma } from "@/utils/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { taskId, newStatus, boardId } = req.body;

    if (!taskId || !newStatus || !boardId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      await prisma.task.update({
        where: { id: taskId },
        data: { status: newStatus, boardId: boardId },
      });

      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

import { PrismaClient, List, Element } from "@prisma/client";
import { ObjectId } from "mongodb";

type customList = {
     title: string;
     description: string;
     date: Date; //json date format "2023-06-14T12:00:00Z" , new Date(customList.date)
     userID: string;
};

type customElement = {
     due_date: Date;
     date_created: Date;
     title: string;
     priority: number;
     description: string;
     ListId: string;
     state: boolean;
};

const prisma = new PrismaClient();

async function getLists(userId: string): Promise<List[]> {
     const lists = await prisma.list.findMany({
          where: {
               userID: userId,
          },
          include: {
               elements: true,
          },
     });

     return lists;
}

async function postList(list: customList): Promise<boolean> {
     const elements: Element[] = [];
     const newList = await prisma.list.create({
          data: {
               title: list.title,
               date: new Date(list.date),
               userID: list.userID,
          },
     });

     if (!newList) {
          return false;
     }
     return true;
}

async function deleteList(listId: string): Promise<void> {
     await prisma.element.deleteMany({
          where: {
               id: listId,
          },
     });

     await prisma.list.delete({
          where: {
               id: listId,
          },
     });
}

async function postElement(element: customElement): Promise<Boolean> {
     const newElement = await prisma.element.create({
          data: {
               due_date: new Date(element.due_date),
               date_created: new Date(element.date_created),
               title: element.title,
               priority: element.priority,
               description: element.description,
               list: {
                    connect: {
                         id: element.ListId,
                    },
               },
               ListId: element.ListId,
               state: element.state,
          },
     });

     if (!newElement) {
          return false;
     }
     return true;
}
async function deleteElement(id: string): Promise<void> {
     await prisma.element.delete({
          where: {
               id: id,
          },
     });
}

async function changeElementState(elementId: string): Promise<Boolean> {
     const element = await prisma.element.findUnique({
          where: {
               id: elementId,
          },
     });

     if (!element) {
          return false;
     }

     const newState = !element.state;

     const updatedElement = await prisma.element.update({
          where: {
               id: elementId,
          },
          data: {
               state: newState,
          },
     });

     if (!updatedElement) return false;
     return true;
}

export {
     getLists,
     postList,
     deleteList,
     changeElementState,
     deleteElement,
     postElement,
};

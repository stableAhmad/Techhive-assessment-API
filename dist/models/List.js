"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postElement = exports.deleteElement = exports.changeElementState = exports.deleteList = exports.postList = exports.getLists = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getLists(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const lists = yield prisma.list.findMany({
            where: {
                userID: userId,
            },
            include: {
                elements: true,
            },
        });
        return lists;
    });
}
exports.getLists = getLists;
function postList(list) {
    return __awaiter(this, void 0, void 0, function* () {
        const elements = [];
        const newList = yield prisma.list.create({
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
    });
}
exports.postList = postList;
function deleteList(listId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.element.deleteMany({
            where: {
                id: listId,
            },
        });
        yield prisma.list.delete({
            where: {
                id: listId,
            },
        });
    });
}
exports.deleteList = deleteList;
function postElement(element) {
    return __awaiter(this, void 0, void 0, function* () {
        const newElement = yield prisma.element.create({
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
                state: element.state,
            },
        });
        if (!newElement) {
            return "";
        }
        return newElement.id;
    });
}
exports.postElement = postElement;
function deleteElement(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.element.delete({
            where: {
                id: id,
            },
        });
    });
}
exports.deleteElement = deleteElement;
function changeElementState(elementId) {
    return __awaiter(this, void 0, void 0, function* () {
        const element = yield prisma.element.findUnique({
            where: {
                id: elementId,
            },
        });
        if (!element) {
            return false;
        }
        const newState = !element.state;
        const updatedElement = yield prisma.element.update({
            where: {
                id: elementId,
            },
            data: {
                state: newState,
            },
        });
        if (!updatedElement)
            return false;
        return true;
    });
}
exports.changeElementState = changeElementState;

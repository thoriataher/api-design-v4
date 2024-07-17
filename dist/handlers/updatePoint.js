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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePointUpdates = exports.updatePointUpdates = exports.createPointUpdates = exports.getOnePointUpdate = exports.getPointUpdates = void 0;
var db_1 = __importDefault(require("../db"));
var getPointUpdates = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updates, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.update.findMany({
                        where: {
                            id: req.body.updateId
                        },
                        include: {
                            updatepoints: true
                        }
                    })];
            case 1:
                updates = _a.sent();
                res.json({ data: updates });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPointUpdates = getPointUpdates;
var getOnePointUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var update, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.updatePoint.findUnique({
                        where: {
                            id: req.params.id
                        }
                    })];
            case 1:
                update = _a.sent();
                res.json({ data: update });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                next(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOnePointUpdate = getOnePointUpdate;
var createPointUpdates = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var update, updated, _a, _b, e_3;
    var _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 4, , 5]);
                return [4 /*yield*/, db_1.default.update.findUnique({
                        where: {
                            id: req.body.updateId
                        },
                        include: {
                            product: {
                                include: {
                                    belongsTo: true
                                }
                            }
                        }
                    })];
            case 1:
                update = _g.sent();
                if (!update || update.product.belongsToId !== req.user.id) {
                    //does not belong to user
                    return [2 /*return*/, res.json({ message: 'nope' })];
                }
                _b = (_a = db_1.default.updatePoint).create;
                _c = {};
                _d = {
                    name: req.body.name,
                    description: req.body.description
                };
                _e = {};
                _f = {};
                return [4 /*yield*/, update];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.update = (_e.connect = (_f.id = (_g.sent()).id, _f), _e),
                        _d),
                        _c)])];
            case 3:
                updated = _g.sent();
                res.json({ data: update });
                return [3 /*break*/, 5];
            case 4:
                e_3 = _g.sent();
                next(e_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createPointUpdates = createPointUpdates;
var updatePointUpdates = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updated, updates, match, updatePoint, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_1.default.update.findMany({
                        where: {
                            id: req.body.updateId
                        },
                        include: {
                            updatepoints: true
                        }
                    })];
            case 1:
                updated = _a.sent();
                updates = updated.reduce(function (allUpdates, currentUpdated) {
                    return __spreadArray(__spreadArray([], allUpdates, true), currentUpdated.updatepoints, true);
                }, []);
                match = updates.find(function (updatePoint) { return updatePoint.id == req.params.id; });
                if (!match) {
                    res.json({ message: 'nope' });
                }
                return [4 /*yield*/, db_1.default.updatePoint.update({
                        where: {
                            id: req.params.id
                        },
                        data: {
                            name: req.body.name,
                            description: req.body.description
                        }
                    })];
            case 2:
                updatePoint = _a.sent();
                res.json({ data: updatePoint });
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                next(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePointUpdates = updatePointUpdates;
var deletePointUpdates = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updated, updates, match, deleteupdatePoint, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_1.default.update.findMany({
                        where: {
                            id: req.body.updateId
                        },
                        include: {
                            updatepoints: true
                        }
                    })];
            case 1:
                updated = _a.sent();
                updates = updated.reduce(function (allUpdates, currentUpdated) {
                    return __spreadArray(__spreadArray([], allUpdates, true), currentUpdated.updatepoints, true);
                }, []);
                match = updates.find(function (updatePoint) { return updatePoint.id == req.params.id; });
                if (!match) {
                    res.json({ message: 'nope' });
                }
                return [4 /*yield*/, db_1.default.updatePoint.delete({
                        where: {
                            id: req.params.id
                        }
                    })];
            case 2:
                deleteupdatePoint = _a.sent();
                res.json({ data: deleteupdatePoint });
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                next(e_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePointUpdates = deletePointUpdates;
//# sourceMappingURL=updatePoint.js.map
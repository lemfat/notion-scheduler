"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
// JSONオブジェクトの受信設定
app.use(express_1.default.json());
// 配列側のオブジェクトの受信設定
app.use(express_1.default.urlencoded({ extended: true }));
// ルーティング
app.use('/v1', routes_1.default);
// 3000ポートで受信
var port = process.env.PORT || 3000;
// APIサーバ起動
app.listen(port);
console.log('Express WebApi listening on port ' + port);
//# sourceMappingURL=index.js.map